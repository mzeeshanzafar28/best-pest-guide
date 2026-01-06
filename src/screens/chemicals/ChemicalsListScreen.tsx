import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { theme } from '../../theme/theme';
import { getChemicals } from '../../services/chemicals';
import { Chemical } from '../../types';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export const ChemicalsListScreen = ({ navigation }: any) => {
    const [chemicals, setChemicals] = useState<Chemical[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadChemicals();
    }, []);

    const loadChemicals = async () => {
        const data = await getChemicals();
        setChemicals(data);
        setLoading(false);
    };

    const filteredChemicals = chemicals.filter(chemical =>
        chemical.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chemical.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Chemical }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ChemicalDetail', { chemical: item })}
        >
            <ContentCard style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.isPaid ? (
                        <View style={styles.badgePaid}>
                            <MaterialIcons name="lock" size={14} color="white" />
                            <Text style={styles.badgeText}>Premium</Text>
                        </View>
                    ) : (
                        <View style={styles.badgeFree}>
                            <Text style={styles.badgeText}>Free</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.description}>{item.description}</Text>
            </ContentCard>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header3D title="Chemicals" />
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search chemicals..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="gray"
                />
            </View>
            <View style={styles.listContainer}>
                {loading ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading chemicals...</Text>
                ) : (
                    <FlatList
                        data={filteredChemicals}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ padding: 15 }}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContainer: {
        flex: 1,
    },
    card: {
        marginBottom: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        flex: 1,
    },
    description: {
        color: theme.colors.text,
        opacity: 0.8,
    },
    badgePaid: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeFree: {
        backgroundColor: theme.colors.grey,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 15,
        marginBottom: 5,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        ...theme.shadows.card,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
    },
});
