import { Chemical } from '../types';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock Data
const MOCK_CHEMICALS: Chemical[] = [
    {
        id: '1',
        title: 'Boric Acid',
        description: 'A common and effective insecticide.',
        isPaid: false,
        content: `
<h1>Boric Acid</h1>
<p>Boric acid is widely used for controlling cockroaches, ants, and other pests.</p>
<h2>How it works</h2>
<p>It acts as a stomach poison for insects and also damages their exoskeletons.</p>
<h2>Application</h2>
<ul>
    <li>Apply in cracks and crevices.</li>
    <li>Keep away from children and pets.</li>
</ul>
    `
    },
    {
        id: '2',
        title: 'Diatomaceous Earth',
        description: 'Natural pest control for various insects.',
        isPaid: false,
        content: `
<h1>Diatomaceous Earth</h1>
<p>DE is made from fossilized remains of diatoms.</p>
<h2>Safety</h2>
<p>Use food-grade DE for household pest control.</p>
    `
    },
    {
        id: '3',
        title: 'Imidacloprid (Professional)',
        description: 'Potent neurotoxin for severe infestations.',
        isPaid: true,
        content: `
<h1>Imidacloprid</h1>
<p>This is a systemic insecticide which acts as an insect neurotoxin.</p>
<p><strong>Warning:</strong> Use with extreme caution and follow label instructions strictly.</p>
    `
    }
];

export const getChemicals = async (): Promise<Chemical[]> => {
    try {
        const snapshot = await getDocs(collection(db, 'chemicals'));
        const chemicals = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || 'Untitled',
                description: data.description || '',
                isPaid: !!data.isPaid,
                content: data.content || '',
                imageUrl: data.imageUrl
            } as Chemical;
        });

        if (chemicals.length === 0) {
            console.log("No chemicals found in Firestore, returning mock data.");
            return MOCK_CHEMICALS;
        }

        return chemicals;
    } catch (e) {
        console.error("Error fetching chemicals:", e);
        return MOCK_CHEMICALS;
    }
};
