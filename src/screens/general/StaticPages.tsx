import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Image, Animated, Easing } from 'react-native';
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

    // Flashing Animation for Popular Card
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 0.6,
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const courses = [
        {
            title: 'Structural and Rodent',
            category: '(Category 7A)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/7a-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/structural-and-rodent-category-7a/'
        },
        {
            title: 'Fumigation',
            category: '(Category 7B)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/7b-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/fumigation-category-7b/'
        },
        {
            title: 'Termite Control',
            category: '(Category 7C)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/7c-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/termite-control-category-7c/'
        },
        {
            title: 'Food Processing',
            category: '(Category 7F)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/food-processing-category-7f-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/'
        },
        {
            title: 'Cooling Towers',
            category: '(Category 7G)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/7g-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/cooling-tower-category-7g/'
        },
        {
            title: 'Public Health',
            category: '(Category 8A)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/8-1-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/public-health-category-8/'
        },
        {
            title: 'Ornamental and Turf',
            category: '(Category 3A)',
            image: 'https://nycpestmanagementschool.com/wp-content/uploads/2024/10/3a-1300x1300-1.webp',
            link: 'https://nycpestmanagementschool.com/termite-control-category-7c/'
        }
    ];

    return (
        <View style={styles.container}>
            <Header3D title="Our School" />
            <ScreenWrapper>
                <ContentCard>
                    <Text style={styles.sectionTitle}>NYC Pest Management School</Text>
                    <Image
                        source={{ uri: 'https://bestatpestnyc.com/wp-content/uploads/2025/04/best-pest-nyc.webp' }}
                        style={styles.storeImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.paragraph}>
                        Become a certified pest controller with NYC Pest Management School.
                        We offer online Pest Control courses, certification, and training for pest control professionals.
                    </Text>

                    <NeumorphicButton
                        title="View All Courses"
                        onPress={() => Linking.openURL('https://nycpestmanagementschool.com/all-courses/')}
                        variant="secondary"
                        style={{ marginBottom: 15 }}
                    />

                    <NeumorphicButton
                        title="Go to LMS (Online Courses)"
                        onPress={() => Linking.openURL('https://lms.nycpestmanagementschool.com/')}
                    />
                </ContentCard>

                {/* Popular Course - Flashing Card */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary, marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>Most Popular Course</Text>

                <Animated.View style={{ opacity: opacityAnim }}>
                    <ContentCard style={styles.popularCard}>
                        <View style={styles.popularBadge}>
                            <Text style={styles.popularBadgeText}>POPULAR</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://lms.nycpestmanagementschool.com/wp-content/uploads/2025/12/30-Hours-Thumbnail.png' }}
                            style={styles.popularImage}
                            resizeMode="cover"
                        />
                        <View style={{ padding: 10 }}>
                            <Text style={styles.popularTitle}>30 Hours Training</Text>

                            <View style={styles.metaRow}>
                                <Text style={styles.metaText}>⏱ 30h</Text>
                                <Text style={styles.metaText}>⭐️ 5.0</Text>
                            </View>

                            <Text style={styles.metaInstructor}>By fidadhothar@gmail.com</Text>

                            <NeumorphicButton
                                title="Start Learning"
                                onPress={() => Linking.openURL('https://lms.nycpestmanagementschool.com/')}
                                style={{ marginTop: 15, backgroundColor: theme.colors.primary }}
                            />
                        </View>
                    </ContentCard>
                </Animated.View>

                <Text style={[styles.sectionTitle, { marginHorizontal: 20, marginTop: 10 }]}>Featured Courses</Text>

                <View style={styles.courseGrid}>
                    {courses.map((course, index) => (
                        <ContentCard key={index} style={styles.courseCard}>
                            <Image source={{ uri: course.image }} style={styles.courseImage} resizeMode="contain" />
                            <Text style={styles.courseTitle}>{course.title}</Text>
                            <Text style={styles.courseCategory}>{course.category}</Text>
                            <NeumorphicButton
                                title="Details"
                                onPress={() => Linking.openURL(course.link)}
                                style={{ paddingVertical: 8, paddingHorizontal: 15, marginTop: 10 }}
                                textStyle={{ fontSize: 12 }}
                            />
                        </ContentCard>
                    ))}
                </View>
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

                {/* Long Island Location */}
                <ContentCard>
                    <Text style={styles.sectionTitle}>Long Island Store</Text>
                    <Image
                        source={{ uri: 'https://bestatpestnyc.com/wp-content/uploads/2026/01/297-broadway-scaled.jpeg' }}
                        style={styles.storeImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.addressTitle}>Address:</Text>
                    <Text style={styles.paragraph}>
                        297 Broadway, Bethpage{'\n'}Long Island 11714
                    </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('tel:5162619022')}>
                        516-261-9022
                    </Text>
                </ContentCard>

                {/* Brooklyn Location */}
                <ContentCard>
                    <Text style={styles.sectionTitle}>Brooklyn Store</Text>
                    <Image
                        source={{ uri: 'https://bestatpestnyc.com/wp-content/uploads/2026/01/brooklyn.jpeg' }}
                        style={styles.storeImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.addressTitle}>Address:</Text>
                    <Text style={styles.paragraph}>
                        1611 McDonald Ave, Brooklyn{'\n'}NY 11230
                    </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('tel:7182847379')}>
                        718-284-7379
                    </Text>
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
    },
    storeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 5,
    },
    courseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    courseCard: {
        width: '46%',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    courseImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    courseTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 2,
    },
    courseCategory: {
        fontSize: 12,
        color: theme.colors.grey,
        textAlign: 'center',
        marginBottom: 5,
    },
    popularCard: {
        backgroundColor: theme.colors.card,
        padding: 0,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#FFD700', // Gold border for pop
    },
    popularImage: {
        width: '100%',
        height: 180,
    },
    popularBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFD700',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        zIndex: 10,
    },
    popularBadgeText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 12,
    },
    popularTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 5,
    },
    metaRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    metaText: {
        fontSize: 14,
        color: theme.colors.text,
        marginRight: 15,
        fontWeight: '600',
    },
    metaInstructor: {
        fontSize: 12,
        color: theme.colors.grey,
        marginBottom: 5,
    }
});
