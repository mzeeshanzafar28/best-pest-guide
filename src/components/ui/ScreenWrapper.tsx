// Basic Screen Wrapper to ensure consistency
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { theme } from '../../theme/theme';

export const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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

const styles = StyleSheet.create({
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
