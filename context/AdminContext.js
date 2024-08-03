// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {auth} from '../firebaseConfig'

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setIsAdmin(user.email === 'admin@tcf.com');
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AdminContext.Provider value={{ user, isAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
