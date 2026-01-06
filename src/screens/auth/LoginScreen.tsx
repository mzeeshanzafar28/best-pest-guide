import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, Animated, Easing, Dimensions, Platform } from 'react-native';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Pests background image - infinite scroll animation
const PestsBackground = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width], // Move left by one screen width
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.bgContainer, { transform: [{ translateX }] }]}>
                {/* Two images side-by-side for seamless looping */}
                <Image
                    source={require('../../../assets/login_bg.png')}
                    style={styles.bgImage}
                    resizeMode="cover"
                />
                <Image
                    source={require('../../../assets/login_bg.png')}
                    style={styles.bgImage}
                    resizeMode="cover"
                />
            </Animated.View>

            {/* Overlay gradient/tint for better readability */}
            <View style={styles.overlay} />
        </View>
    );
};

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();

    // Entry Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (e) {
            Alert.alert('Error', 'Failed to login. Please check credentials.');
        }
    };

    return (
        <View style={styles.container}>
            <PestsBackground />

            <SafeAreaView style={styles.safeArea}>
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/logo 1.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.subtitle}>Sign in to continue</Text>
                    </View>

                    <View style={styles.glassCard}>
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            placeholderTextColor="#666"
                        />

                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Password"
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="#666"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={24}
                                    color={theme.colors.text}
                                />
                            </TouchableOpacity>
                        </View>

                        <NeumorphicButton
                            title={loading ? "Loading..." : "Login"}
                            onPress={handleLogin}
                            style={styles.loginBtn}
                        />

                        <NeumorphicButton
                            title="Create Account"
                            variant="secondary"
                            onPress={() => navigation.navigate('Signup')}
                            style={{ marginTop: 15 }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                            style={{ marginTop: 20, alignItems: 'center' }}
                        >
                            <Text style={{ color: '#FF3B30', fontWeight: 'bold' }}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F9F7',
    },
    bgContainer: {
        flexDirection: 'row',
        width: width * 2,
        height: height,
        position: 'absolute',
    },
    bgImage: {
        width: width,
        height: height,
        opacity: 0.6,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Light overlay to ensure text readability
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 280,
        height: 120,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: theme.colors.primary,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 25,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.9)',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        fontSize: 16,
        color: '#333',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    passwordInput: {
        flex: 1,
        padding: 18,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 15,
    },
    loginBtn: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    }
});
