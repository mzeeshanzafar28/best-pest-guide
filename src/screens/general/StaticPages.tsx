import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { useTheme } from '../../context/ThemeContext';
import { Theme } from '../../theme/theme';
import { NeumorphicButton } from '../../components/ui/NeumorphicButton';

export const AboutUsScreen = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Header3D title="About Us" />
            <ScreenWrapper>
                <ContentCard>
                    <Text style={styles.sectionTitle}>Best@Pest Exterminating</Text>
                    <Text style={styles.paragraph}>
                        We are NYC's Pest Experts. Serving New York & New Jersey.
                        From ants to rodents, we've got you covered. Safeguard your home and business with our professional pest control service today.
                    </Text>
                    <Text style={styles.paragraph}>
                        Eco Friendly-IPM + Inspection & Estimates + Fast Pest Removal.
                    </Text>
                    <NeumorphicButton
                        title="Visit Website"
                        onPress={() => Linking.openURL('https://bestatpestnyc.com/')}
                        variant="secondary"
                    />
                </ContentCard>
            </ScreenWrapper>
        </View>
    );
};

export const SchoolScreen = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Header3D title="Our School" />
            <ScreenWrapper>
                <ContentCard>
                    <Text style={styles.sectionTitle}>NYC Pest Management School</Text>
                    <Text style={styles.paragraph}>
                        Become a certified pest controller with NYC Pest Management School.
                        We offer online Pest Control courses, certification, and training for pest control professionals.
                    </Text>
                    <Text style={styles.bullet}>• Structural and Rodent (7A)</Text>
                    <Text style={styles.bullet}>• Fumigation (7B)</Text>
                    <Text style={styles.bullet}>• Termite Control (7C)</Text>
                    <NeumorphicButton
                        title="View Courses"
                        onPress={() => Linking.openURL('https://nycpestmanagementschool.com/')}
                        variant="secondary"
                    />
                </ContentCard>
            </ScreenWrapper>
        </View>
    );
};

export const SupplyStoreScreen = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Header3D title="Pest Supplies" />
            <ScreenWrapper>
                <ContentCard>
                    <Text style={styles.sectionTitle}>Best Pest Supplies</Text>
                    <Text style={styles.paragraph}>
                        Your Trusted Destination for the Best Pest Control Supplies!
                        Termite, Rodent, Ant, Flies, Cockroach, Bedbug solutions and more.
                    </Text>
                    <NeumorphicButton
                        title="Shop Online"
                        onPress={() => Linking.openURL('https://bestpestsupplies.com/')}
                        variant="secondary"
                    />
                </ContentCard>
            </ScreenWrapper>
        </View>
    );
};

export const ContactUsScreen = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            <Header3D title="Contact Us" />
            <ScreenWrapper>
                <ContentCard>
                    <Text style={styles.sectionTitle}>Headquarters</Text>
                    <Text style={styles.paragraph}>297 Broadway, Bethpage Long Island</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('tel:7182847379')}>+718-284-7379</Text>
                </ContentCard>

                <ContentCard>
                    <Text style={styles.sectionTitle}>Brooklyn Office</Text>
                    <Text style={styles.paragraph}>1611 McDonald Ave Brooklyn, NY</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('tel:7182847378')}>+718-284-7378</Text>
                </ContentCard>

                <ContentCard>
                    <Text style={styles.sectionTitle}>Email Us</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('mailto:bestexterminating@aol.com')}>bestexterminating@aol.com</Text>
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 15,
        lineHeight: 22,
    },
    bullet: {
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 5,
        marginLeft: 10,
    },
    link: {
        fontSize: 18,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});
