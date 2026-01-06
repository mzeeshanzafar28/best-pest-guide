import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export const SignupScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signup, loading } = useAuth();

    const handleSignup = async () => {
        try {
            await signup(email, password);
        } catch (e: any) {
            console.error(e);
            let msg = 'Failed to create account';
            if (e.code === 'auth/email-already-in-use') msg = 'Email already in use';
            if (e.code === 'auth/weak-password') msg = 'Password is too weak';
            if (e.code === 'auth/invalid-email') msg = 'Invalid email address';
            Alert.alert('Error', msg);
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Join Us</Text>
                <Text style={styles.subtitle}>Create your account today</Text>
            </View>

            <View style={[styles.formCard, theme.shadows.card]}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
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
                    title={loading ? "Creating..." : "Sign Up"}
                    onPress={handleSignup}
                />

                <NeumorphicButton
                    title="Back to Login"
                    variant="white"
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 10, borderWidth: 0 }}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.secondary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.text,
    },
    formCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
    },
    input: {
        backgroundColor: theme.colors.background,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
    },
    eyeIcon: {
        padding: 10,
    }
});
