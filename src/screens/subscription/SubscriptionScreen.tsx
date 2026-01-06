import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export const SubscriptionScreen = ({ navigation }: any) => {
    const { user, upgradeToPremium, logout } = useAuth();

    const handleSubscribe = async () => {
        // In real app, this would open Stripe PaymentSheet
        Alert.alert(
            "Confirm Subscription",
            "Subscribe to Premium for $9.99/mo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Pay Now (Mock)",
                    onPress: async () => {
                        await upgradeToPremium();
                        Alert.alert("Success!", "You are now a Premium member.");
                        navigation.navigate('Home');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header3D title="Premium Access" />
            <ScreenWrapper>
                {user?.isPremium ? (
                    <ContentCard>
                        <Text style={styles.title}>You are Premium!</Text>
                        <Text style={styles.text}>
                            Thank you for subscribing. You have access to all guides.
                        </Text>
                        <NeumorphicButton
                            title="Log Out"
                            variant="danger"
                            onPress={logout}
                            style={{ marginTop: 20 }}
                        />
                    </ContentCard>
                ) : (
                    <>
                        <ContentCard style={styles.planCard}>
                            <Text style={styles.planName}>Monthly Plan</Text>
                            <Text style={styles.price}>$9.99<Text style={styles.perMonth}>/mo</Text></Text>
                            <View style={styles.features}>
                                <Text style={styles.feature}>✓ Unlimited Access to All Guides</Text>
                                <Text style={styles.feature}>✓ Video Content</Text>
                                <Text style={styles.feature}>✓ Expert Support</Text>
                            </View>
                            <NeumorphicButton
                                title="Subscribe Now"
                                onPress={handleSubscribe}
                            />
                        </ContentCard>

                        <NeumorphicButton
                            title="Restore Purchases"
                            variant="white"
                            style={{ borderWidth: 0 }}
                            onPress={() => Alert.alert("Restore", "Simulating restore...")}
                        />
                    </>
                )}
            </ScreenWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.secondary,
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    planCard: {
        backgroundColor: theme.colors.white,
        padding: 30,
        alignItems: 'center',
    },
    planName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 10,
    },
    price: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 20,
    },
    perMonth: {
        fontSize: 16,
        color: '#999',
    },
    features: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    feature: {
        fontSize: 16,
        marginBottom: 5,
        color: theme.colors.text,
    },
});
