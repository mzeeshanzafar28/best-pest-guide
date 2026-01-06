import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, TextInput, Switch } from 'react-native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export const AccountScreen = ({ navigation }: any) => {
    const { user, upgradeToPremium, logout, auth } = useAuth();
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    // Password Change State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    useEffect(() => {
        if (user?.photoURL) {
            setImage(user.photoURL);
        }
    }, [user]);

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled) {
                handleImageUpload(result.assets[0].uri);
            }
        } catch (e: any) {
            console.error(e);
            Alert.alert("Error launching picker", e.message);
        }
    };

    const handleImageUpload = async (uri: string) => {
        if (!user) return;
        setUploading(true);
        try {
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });

            // const storage = getStorage();
            const storageRef = ref(storage, `profilePictures/${user.uid}`);

            await uploadBytes(storageRef, blob);

            // cleanup blob
            // @ts-ignore
            if (blob.close) {
                // @ts-ignore
                blob.close();
            }

            const downloadUrl = await getDownloadURL(storageRef);

            // Note: In a real app we should update the auth profile via updateProfile(auth.currentUser, { photoURL: downloadUrl })
            // For now, we update local state
            setImage(downloadUrl);
            Alert.alert("Success", "Profile picture updated!");
            // Trigger refresh or update context if needed
        } catch (error: any) {
            console.error("Upload failed", error);
            // Fallback: If storage fails (e.g. due to billing), show the local image anyway so the user can see it works
            setImage(uri);

            if (error.code === 'storage/unauthorized' || error.message.includes('unknown')) {
                Alert.alert("Storage Warning", "Firebase Storage requires a configured billing plan. Showing local preview instead.");
            } else {
                Alert.alert("Error", "Failed to upload image. " + error.message);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters.");
            return;
        }

        if (!auth.currentUser || !user?.email) return;

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            Alert.alert("Success", "Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setShowPasswordSection(false);
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to update password. Check your current password.");
        }
    };

    const handleSubscribe = async () => {
        Alert.alert(
            "Confirm Subscription",
            "Subscribe to Premium for $9.99/mo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Pay Now (Mock)",
                    onPress: async () => {
                        await upgradeToPremium();
                        Alert.alert("Success!", "You are now a Premium member.", [
                            { text: "OK", onPress: () => navigation.navigate('Home') }
                        ]);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header3D title="Account" />
            <ScreenWrapper>
                {/* User Details Section */}
                <ContentCard style={styles.profileCard}>
                    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.profileImage} />
                        ) : (
                            <View style={[styles.profileImage, styles.placeholderImage]}>
                                <MaterialIcons name="person" size={50} color={theme.colors.grey} />
                            </View>
                        )}
                        <View style={styles.editIcon}>
                            <MaterialIcons name="edit" size={16} color="white" />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.emailText}>{user?.email}</Text>
                    <View style={styles.badgeContainer}>
                        {user?.isPremium ? (
                            <View style={styles.badgePaid}>
                                <MaterialIcons name="star" size={14} color="white" />
                                <Text style={styles.badgeText}>Premium Member</Text>
                            </View>
                        ) : (
                            <View style={styles.badgeFree}>
                                <Text style={styles.badgeText}>Free Plan</Text>
                            </View>
                        )}
                    </View>
                </ContentCard>

                {/* Dark Mode Toggle */}
                <ContentCard style={styles.darkModeCard}>
                    <View style={styles.darkModeRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="dark-mode" size={24} color={theme.colors.text} style={{ marginRight: 10 }} />
                            <Text style={styles.sectionTitle}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                            thumbColor={isDarkMode ? theme.colors.white : '#f4f3f4'}
                        />
                    </View>
                </ContentCard>

                {/* Change Password Section */}
                <ContentCard>
                    <TouchableOpacity
                        style={styles.accordionHeader}
                        onPress={() => setShowPasswordSection(!showPasswordSection)}
                    >
                        <Text style={styles.sectionTitle}>Change Password</Text>
                        <MaterialIcons
                            name={showPasswordSection ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>

                    {showPasswordSection && (
                        <View style={styles.passwordForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="Current Password"
                                placeholderTextColor={theme.colors.grey}
                                secureTextEntry
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="New Password"
                                placeholderTextColor={theme.colors.grey}
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm New Password"
                                placeholderTextColor={theme.colors.grey}
                                secureTextEntry
                                value={confirmNewPassword}
                                onChangeText={setConfirmNewPassword}
                            />
                            <NeumorphicButton
                                title="Update Password"
                                onPress={handleChangePassword}
                                style={{ marginTop: 10 }}
                            />
                        </View>
                    )}
                </ContentCard>

                {/* Premium / Upgrade Section */}
                {!user?.isPremium && (
                    <ContentCard style={styles.planCard}>
                        <Text style={styles.planName}>Monthly Plan</Text>
                        <Text style={styles.price}>$9.99<Text style={styles.perMonth}>/mo</Text></Text>
                        <View style={styles.features}>
                            <Text style={styles.feature}>✓ Unlimited Access to All Guides</Text>
                            <Text style={styles.feature}>✓ Video Content</Text>
                            <Text style={styles.feature}>✓ Expert Support</Text>
                        </View>
                        <NeumorphicButton
                            title="Subscribe Now"
                            onPress={handleSubscribe}
                        />
                    </ContentCard>
                )}

                <NeumorphicButton
                    title="Log Out"
                    variant="danger"
                    onPress={logout}
                    style={{ marginTop: 20, marginBottom: 40 }}
                />
            </ScreenWrapper>
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    profileCard: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: theme.colors.card,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderImage: {
        backgroundColor: theme.colors.grey, // Updated
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.white,
    },
    emailText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 10,
    },
    badgeContainer: {
        marginBottom: 10,
    },
    badgePaid: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeFree: {
        backgroundColor: theme.colors.grey,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    passwordForm: {
        marginTop: 15,
    },
    input: {
        backgroundColor: theme.dark ? '#333' : '#f5f5f5', // Dynamic input bg
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.text,
    },
    // Dark Mode Card
    darkModeCard: {
        marginBottom: 20,
        backgroundColor: theme.colors.card,
    },
    darkModeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // Plan Card Styles
    planCard: {
        backgroundColor: theme.colors.card, // Updated to dynamic card color
        padding: 30,
        alignItems: 'center',
    },
    planName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 10,
    },
    price: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 20,
    },
    perMonth: {
        fontSize: 16,
        color: theme.colors.grey,
    },
    features: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    feature: {
        fontSize: 16,
        marginBottom: 5,
        color: theme.colors.text,
    },
});
