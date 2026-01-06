import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';

export const ForgotPasswordScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    const [email, setEmail] = useState('');

    const handleReset = () => {
        Alert.alert('Success', 'Password reset email sent (simulated)');
        navigation.goBack();
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>Enter your email to receive instructions</Text>
            </View>

            <View style={[styles.formCard, theme.shadows.card]}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.colors.grey}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <NeumorphicButton
                    title="Send Reset Link"
                    onPress={handleReset}
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

const getStyles = (theme: Theme) => StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center',
    },
    formCard: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: 20,
    },
    input: {
        backgroundColor: theme.dark ? '#333' : theme.colors.background,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.text,
    }
});
