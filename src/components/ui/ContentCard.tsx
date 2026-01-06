import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface ContentCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, style }) => {
    return (
        <View style={[styles.card, theme.shadows.card, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 5,
    },
});
