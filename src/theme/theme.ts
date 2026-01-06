export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textLight: string;
    white: string;
    grey: string;
    danger: string;
    card: string; // New: explicit card background color
    border: string; // New: border color
}

export interface Theme {
    colors: ThemeColors;
    shadows: {
        card: any;
        button: any;
    };
    dark: boolean; // flag
}

const commonShadows = {
    card: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    button: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
};

export const lightTheme: Theme = {
    dark: false,
    colors: {
        primary: '#E63946',
        secondary: '#2A9D8F',
        background: '#F1FAEE',
        text: '#1D3557',
        textLight: '#F1FAEE',
        white: '#FFFFFF',
        grey: '#A8DADC',
        danger: '#D00000',
        card: '#FFFFFF',
        border: '#E0E0E0',
    },
    shadows: commonShadows
};

export const darkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#FF6B6B', // Lighter red for dark mode
        secondary: '#4ECDC4', // Lighter green
        background: '#121212', // Dark background
        text: '#F1FAEE', // Light text
        textLight: '#A8DADC',
        white: '#1E1E1E', // Dark card background (repurposing 'white' var or using 'card')
        grey: '#457B9D',
        danger: '#FF4545',
        card: '#1E1E1E',
        border: '#333333',
    },
    shadows: {
        ...commonShadows,
        card: {
            ...commonShadows.card,
            shadowColor: "#000", // Shadows are harder to see on dark, might leverage elevation more or lighter borders in components
            shadowOpacity: 0.5,
        }
    }
};

// Default export for backward compatibility during refactor (points to light)
export const theme = lightTheme;
