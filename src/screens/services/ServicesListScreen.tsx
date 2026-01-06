import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Header3D } from '../../components/ui/Header3D';
import { ContentCard } from '../../components/ui/ContentCard';
import { theme } from '../../theme/theme';
import { getServices } from '../../services/services';
import { Service } from '../../types';
import { FontAwesome5 } from '@expo/vector-icons';

export const ServicesListScreen = ({ navigation }: any) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const data = await getServices();
        setServices(data);
        setLoading(false);
    };

    const renderItem = ({ item }: { item: Service }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
        >
            <ContentCard style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <FontAwesome5 name="chevron-right" size={16} color={theme.colors.grey} />
                </View>
                <Text style={styles.description}>{item.description}</Text>
                {item.priceRange && (
                    <Text style={styles.price}>{item.priceRange}</Text>
                )}
            </ContentCard>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header3D title="Our Services" />
            <View style={styles.listContainer}>
                {loading ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading services...</Text>
                ) : (
                    <FlatList
                        data={services}
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
        marginBottom: 8,
    },
    price: {
        fontWeight: 'bold',
        color: theme.colors.secondary,
        marginTop: 5,
    }
});
