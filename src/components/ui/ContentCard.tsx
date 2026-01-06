import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';

interface ContentCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, style }) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={[styles.card, theme.shadows.card, style]}>
            {children}
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card, // Use new 'card' color token
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 5,
    },
});
