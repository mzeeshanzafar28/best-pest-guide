import { Service } from '../types';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock Data for fallback
const MOCK_SERVICES: Service[] = [
    {
        id: '1',
        title: 'General Pest Inspection',
        description: 'Comprehensive home inspection for all common pests.',
        content: 'Our certified technicians will inspect your entire property...',
        priceRange: '$100 - $150'
    },
    {
        id: '2',
        title: 'Termite Treatment',
        description: 'Protect your home structural integrity.',
        content: 'We use the latest liquid defense systems...',
        priceRange: 'Call for Quote'
    }
];

export const getServices = async (): Promise<Service[]> => {
    try {
        const snapshot = await getDocs(collection(db, 'services'));
        const services = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || 'Untitled Service',
                description: data.description || '',
                content: data.content || '',
                imageUrl: data.imageUrl,
                priceRange: data.priceRange
            } as Service;
        });

        if (services.length === 0) {
            console.log("No services found in Firestore, returning mock data.");
            return MOCK_SERVICES;
        }

        return services;
    } catch (e) {
        console.error("Error fetching services:", e);
        return MOCK_SERVICES;
    }
};
