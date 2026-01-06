export interface Guide {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    isPaid: boolean;
    content: string; // Markdown or plain text
}

export interface UserProfile {
    uid: string;
    email: string;
    isPremium: boolean;
    photoURL?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl?: string;
    priceRange?: string;
}

export interface Chemical {
    id: string;
    title: string;
    description: string;
    isPaid: boolean;
    content: string; // HTML/Markdown
    imageUrl?: string;
}
