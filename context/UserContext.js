import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserByEmail = async (email) => {
        try {
            const q = query(collection(db, 'users'), where('email', '==', email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                setUser({ id: userDoc.id, ...userDoc.data() });
            } else {
                console.log('No such user document!');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const loggedInUserEmail = auth?.currentUser?.email;
        if (loggedInUserEmail) {
            fetchUserByEmail(loggedInUserEmail);
        } else {
            console.log('No logged-in user email!');
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchUserByEmail(user.email);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);
console.log(user)
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
