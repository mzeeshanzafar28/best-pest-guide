import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface NeumorphicButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'danger' | 'white';
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'primary'
}) => {
    let backgroundColor = theme.colors.primary;
    let textColor = theme.colors.white;

    if (variant === 'secondary') {
        backgroundColor = theme.colors.secondary;
    } else if (variant === 'danger') {
        backgroundColor = theme.colors.danger;
    } else if (variant === 'white') {
        backgroundColor = theme.colors.white;
        textColor = theme.colors.primary;
    }

    return (
        <TouchableOpacity
            style={[
                styles.button,
                theme.shadows.button,
                { backgroundColor },
                style
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)', // Subtle highlight
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});
