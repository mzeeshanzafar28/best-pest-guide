import { Guide } from '../types';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock Data
const MOCK_GUIDES: Guide[] = [
    {
        id: '1',
        title: 'How to get rid of Ants',
        description: 'Complete guide to removing ants from your kitchen.',
        isPaid: false,
        content: `
# Ant Removal Guide

Ants are a common nuisance. Here is how to deal with them:

1. **Identify the species**: Sugar ants vs Carpenter ants.
2. **Remove food sources**: Clean up crumbs.
3. **Seal entry points**: Caulk cracks.
4. **Use Baits**: Slow acting baits are best.
    `
    },
    {
        id: '2',
        title: 'Advanced Bed Bug Treatment',
        description: 'Professional grade steps for bed bugs. (Premium)',
        isPaid: true,
        content: `
# Bed Bug Protocol (Premium)

This is a premium guide for advanced users.

1. **Inspection**: check mattresses seams.
2. **Heat Treatment**: Wash clothes in hot water.
3. **Chemicals**: Use residuals (only if licensed).
4. **Follow up**: Re-inspect in 2 weeks.
    `
    },
    {
        id: '3',
        title: 'Rodent Control 101',
        description: 'Mouse vs Rat identification and trapping.',
        isPaid: false,
        content: 'Rodents can be tricky. Use snap traps effectively...'
    },
    {
        id: '4',
        title: 'Termite Prevention Secrets',
        description: 'Save your home foundation.',
        isPaid: true,
        content: 'Termites cause billions in damages. Here is the secret...'
    }
];

export const getGuides = async (): Promise<Guide[]> => {
    try {
        const snapshot = await getDocs(collection(db, 'guides'));
        const guides = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || 'Untitled',
                description: data.description || '',
                isPaid: !!data.isPaid,
                content: data.content || '',
                imageUrl: data.imageUrl
            } as Guide;
        });

        if (guides.length === 0) {
            console.log("No guides found in Firestore, returning mock data.");
            return MOCK_GUIDES;
        }

        return guides;
    } catch (e) {
        console.error("Error fetching guides:", e);
        // Fallback to mock data if there's an error (e.g., permission denied or offline)
        return MOCK_GUIDES;
    }
};
