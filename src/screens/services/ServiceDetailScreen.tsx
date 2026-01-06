import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Linking, Image, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import { Service } from '../../types';
import RenderHtml from 'react-native-render-html';

export const ServiceDetailScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { service } = route.params as { service: Service };
    const { width } = useWindowDimensions();
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    const handleBookNow = () => {
        // Open dialer or contact form
        Linking.openURL('tel:7182847379');
    };

    return (
        <View style={styles.container}>
            <Header3D title="Service Detail" />
            <ScreenWrapper>
                <ContentCard>
                    {service.imageUrl && (
                        <Image
                            source={{ uri: service.imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}

                    <Text style={styles.title}>{service.title}</Text>

                    {service.priceRange && (
                        <Text style={styles.price}>{service.priceRange}</Text>
                    )}

                    {/* Rich HTML Content */}
                    <RenderHtml
                        contentWidth={width - 90}
                        source={{ html: service.content }}
                        tagsStyles={{
                            p: { fontSize: 16, color: theme.colors.text, marginBottom: 10, lineHeight: 24 },
                            h1: { fontSize: 22, color: theme.colors.primary, marginVertical: 10 },
                            h2: { fontSize: 20, color: theme.colors.secondary, marginVertical: 8 },
                            li: { fontSize: 16, color: theme.colors.text },
                            img: { marginVertical: 10, borderRadius: 10 },
                            body: { color: theme.colors.text }
                        }}
                    />

                    <NeumorphicButton
                        title="Book Now"
                        onPress={handleBookNow}
                        style={{ marginTop: 20 }}
                    />

                    <NeumorphicButton
                        title="Back"
                        variant="white"
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 10, borderWidth: 0 }}
                    />
                </ContentCard>
            </ScreenWrapper>
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: theme.colors.text,
        lineHeight: 24,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    }
});
