import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';

interface Header3DProps {
    title: string;
    logo?: ImageSourcePropType;
}

export const Header3D: React.FC<Header3DProps> = ({ title, logo }) => {
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.content}>
                {logo ? (
                    <Image source={logo} style={styles.logo} resizeMode="contain" />
                ) : (
                    <Text style={styles.title}>{title}</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4B9F8E', // Slightly lighter than theme.colors.primary (#2A9D8F)
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        ...theme.shadows.card,
        zIndex: 10,
    },
    content: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        color: theme.colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    logo: {
        width: 180,
        height: 60,
    }
});
