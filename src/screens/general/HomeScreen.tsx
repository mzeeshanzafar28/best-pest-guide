import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export const HomeScreen = ({ navigation }: any) => {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    const DashboardItem = ({ title, icon, color, onPress }: any) => (
        <TouchableOpacity
            style={[styles.dashboardItem, theme.shadows.card]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                {icon}
            </View>
            <Text style={styles.itemTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header3D
                title="Best@Pest Guide"
                logo={require('../../../assets/logo 1.png')}
            />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.welcomeText}>Welcome, {user?.email?.split('@')[0]}!</Text>

                <ContentCard style={styles.bannerCard}>
                    <Text style={styles.bannerTitle}>Pest problem?</Text>
                    <Text style={styles.bannerText}>Find the best solutions to your pest issues.</Text>
                    <NeumorphicButton
                        title="Browse Guides"
                        onPress={() => navigation.navigate('GuidesTab')}
                        style={{ marginTop: 10, width: '100%' }}
                        variant="white" // Ensure visibility on primary color bg
                    />
                </ContentCard>

                <View style={styles.grid}>
                    <DashboardItem
                        title="Our School"
                        color="#2A9D8F"
                        icon={<FontAwesome5 name="university" size={24} color="white" />}
                        onPress={() => navigation.navigate('School')}
                    />
                    <DashboardItem
                        title="Supplies"
                        color="#E63946"
                        icon={<FontAwesome5 name="store" size={24} color="white" />}
                        onPress={() => navigation.navigate('SupplyStore')}
                    />
                    <DashboardItem
                        title="Services"
                        color="#457B9D"
                        icon={<MaterialIcons name="bug-report" size={24} color="white" />}
                        onPress={() => navigation.navigate('ServicesList')}
                    />
                    <DashboardItem
                        title="Contact"
                        color="#1D3557"
                        icon={<MaterialIcons name="phone" size={24} color="white" />}
                        onPress={() => navigation.navigate('ContactUs')}
                    />
                </View>

                {!user?.isPremium && (
                    <ContentCard style={{ backgroundColor: '#FFD700' }}>
                        <Text style={[styles.bannerTitle, { color: '#000' }]}>Go Premium!</Text>
                        <Text style={{ color: '#000', marginBottom: 10 }}>Unlock exclusive expert guides.</Text>
                        <NeumorphicButton
                            title="Upgrade Now"
                            variant="white"
                            textStyle={{ color: '#000' }}
                            onPress={() => navigation.navigate('Subscription')}
                        />
                    </ContentCard>
                )}

                <NeumorphicButton
                    title="Log Out"
                    variant="danger"
                    onPress={logout}
                    style={{ marginTop: 20 }}
                />
            </ScrollView>
        </View>
    );
};

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    bannerCard: {
        marginBottom: 25,
        backgroundColor: theme.colors.primary,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bannerText: {
        color: 'white',
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dashboardItem: {
        width: '48%',
        backgroundColor: theme.colors.card, // Dynamic card color
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    itemTitle: {
        fontWeight: 'bold',
        color: theme.colors.text,
    },
});
