import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

// Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { HomeScreen } from '../screens/general/HomeScreen';
import { AboutUsScreen, SchoolScreen, SupplyStoreScreen, ContactUsScreen } from '../screens/general/StaticPages';
// Guides & Subscription
import { GuidesListScreen } from '../screens/guides/GuidesListScreen';
import { GuideDetailScreen } from '../screens/guides/GuideDetailScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
// Services
import { ServicesListScreen } from '../screens/services/ServicesListScreen';
import { ServiceDetailScreen } from '../screens/services/ServiceDetailScreen';

// Chemicals
import { ChemicalsListScreen } from '../screens/chemicals/ChemicalsListScreen';
import { ChemicalDetailScreen } from '../screens/chemicals/ChemicalDetailScreen';
// Account
import { AccountScreen } from '../screens/account/AccountScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main content
const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false as boolean,
                tabBarStyle: {
                    backgroundColor: theme.colors.white,
                    borderTopWidth: 0,
                    ...theme.shadows.card
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: 'home' | 'home-outline' | 'book' | 'book-outline' | 'flask' | 'flask-outline' | 'person' | 'person-outline' = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'GuidesTab') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'ChemicalsTab') {
                        iconName = focused ? 'flask' : 'flask-outline';
                    } else if (route.name === 'AccountTab') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size ?? 24} color={color ?? 'gray'} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false as boolean }}
            />
            <Tab.Screen
                name="GuidesTab"
                component={GuidesListScreen}
                options={{ title: 'Guides', headerShown: false as boolean }}
            />
            <Tab.Screen
                name="ChemicalsTab"
                component={ChemicalsListScreen}
                options={{ title: 'Chemicals', headerShown: false as boolean }}
            />
            <Tab.Screen
                name="AccountTab"
                component={AccountScreen}
                options={{ title: 'Account', headerShown: false as boolean }}
            />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    // Auth Stack
                    <Stack.Group>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    </Stack.Group>
                ) : (
                    // App Stack
                    <Stack.Group>
                        <Stack.Screen name="MainTabs" component={MainTabNavigator} />

                        {/* General Pages */}
                        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
                        <Stack.Screen name="School" component={SchoolScreen} />
                        <Stack.Screen name="SupplyStore" component={SupplyStoreScreen} />
                        <Stack.Screen name="ContactUs" component={ContactUsScreen} />

                        {/* Feature Screens */}
                        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} />
                        <Stack.Screen name="ChemicalDetail" component={ChemicalDetailScreen} />
                        <Stack.Screen name="Subscription" component={AccountScreen} />

                        {/* Services */}
                        <Stack.Screen name="ServicesList" component={ServicesListScreen} />
                        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};