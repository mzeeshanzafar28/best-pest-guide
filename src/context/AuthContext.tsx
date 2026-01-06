import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserProfile } from '../types';
import { auth, db } from '../config/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    upgradeToPremium: () => Promise<void>;
    auth: typeof auth;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in, fetch profile from Firestore
                await fetchUserProfile(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const fetchUserProfile = async (firebaseUser: User) => {
        try {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUser(userDoc.data() as UserProfile);
            } else {
                // If no profile exists (legacy/error), create a basic one
                const newProfile: UserProfile = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    isPremium: false
                };
                setUser(newProfile);
            }
        } catch (e) {
            console.error("Error fetching user profile:", e);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Create User Profile in Firestore
            const newProfile: UserProfile = {
                uid: firebaseUser.uid,
                email: email,
                isPremium: false
            };

            await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
            setUser(newProfile);

        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (e) {
            console.error(e);
        }
    };

    const upgradeToPremium = async () => {
        if (user) {
            // In a real app, verify payment via Stripe first
            // For now, update Firestore directly
            try {
                const updatedProfile = { ...user, isPremium: true };
                await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
                setUser(updatedProfile);
            } catch (e) {
                console.error("Error upgrading user:", e);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, upgradeToPremium, auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
