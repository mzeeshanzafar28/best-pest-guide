import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your actual Firebase Project keys
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEmZhvYmiVo5VVvUf2uXeI6Tji9u6gYtA",
  authDomain: "bestatpest28.firebaseapp.com",
  projectId: "bestatpest28",
  storageBucket: "bestatpest28.firebasestorage.app",
  messagingSenderId: "928683868538",
  appId: "1:928683868538:web:37ffc4dd21aae1e03dd6c3",
  measurementId: "G-60EFY1Y1C1"
};

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
