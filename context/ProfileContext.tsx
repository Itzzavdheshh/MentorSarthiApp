import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  dob: string;
};

const PROFILE_STORAGE_KEY = '@mentorsarthi/profile';

const defaultProfile: UserProfile = {
  name: 'Avdhesh Kumar',
  email: 'itzzavdhesh@email.com',
  phone: '+91 98765 43210',
  dob: '12 Jan 2002',
};

type ProfileContextValue = {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(PROFILE_STORAGE_KEY)
      .then((value) => {
        if (!value || !isMounted) return;
        setProfile({ ...defaultProfile, ...JSON.parse(value) });
      })
      .catch(() => {});

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isMounted) {
        setProfile((prev) => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
        }));
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const updateProfile = useCallback((nextProfile: UserProfile) => {
    setProfile(nextProfile);
    AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile)).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ profile, updateProfile }),
    [profile, updateProfile]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }

  return context;
}
