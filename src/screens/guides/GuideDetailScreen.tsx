import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import { Guide } from '../../types';
import RenderHtml from 'react-native-render-html';

export const GuideDetailScreen = ({ navigation }: any) => {
    const route = useRoute();
    const { guide } = route.params as { guide: Guide };
    const { user } = useAuth();
    const { width } = useWindowDimensions();

    const isLocked = guide.isPaid && !user?.isPremium;

    return (
        <View style={styles.container}>
            <Header3D title="Guide Detail" />
            <ScreenWrapper>
                <ContentCard>
                    {guide.imageUrl && (
                        <Image
                            source={{ uri: guide.imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}

                    <Text style={styles.title}>{guide.title}</Text>

                    {isLocked ? (
                        <View style={styles.lockedContainer}>
                            <Text style={styles.lockedTitle}>Premium Content</Text>
                            <Text style={styles.lockedText}>
                                This guide is only available to premium subscribers.
                            </Text>
                            <NeumorphicButton
                                title="Subscribe to Unlock"
                                onPress={() => navigation.navigate('Subscription')}
                            />
                        </View>
                    ) : (
                        <RenderHtml
                            contentWidth={width - 90} // Adjusted for ScreenWrapper padding (40) + ContentCard margin (10) + ContentCard padding (40)
                            source={{ html: guide.content }}
                            tagsStyles={{
                                p: { fontSize: 16, color: theme.colors.text, marginBottom: 10, lineHeight: 24 },
                                h1: { fontSize: 22, color: theme.colors.primary, marginVertical: 10 },
                                h2: { fontSize: 20, color: theme.colors.secondary, marginVertical: 8 },
                                li: { fontSize: 16, color: theme.colors.text },
                                img: { marginVertical: 10, borderRadius: 10 }
                            }}
                        />
                    )}

                    <NeumorphicButton
                        title="Back"
                        variant="white"
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20, borderWidth: 0 }}
                    />
                </ContentCard>
            </ScreenWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: theme.colors.text,
        lineHeight: 24,
    },
    lockedContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFE5EC',
        borderRadius: 10,
        marginBottom: 20,
    },
    lockedTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.danger,
        marginBottom: 10,
    },
    lockedText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: theme.colors.text,
    }
});
