// Basic Screen Wrapper to ensure consistency
import React, { useMemo } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';

export const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scroll: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
});
