import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const unsubscribeRef = useRef(null); // Track the real-time listener

  const subscribeToUserDocument = (userId) => {
    const userDocRef = doc(db, "users", userId);

    unsubscribeRef.current = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const newUser = { id: docSnapshot.id, ...docSnapshot.data() };

            // Update state only if data has changed
            setUser((prevUser) => {
              const hasChanged =
                  !prevUser ||
                  JSON.stringify(prevUser) !== JSON.stringify(newUser);

              return hasChanged ? newUser : prevUser;
            });
          } else {
            console.log("User document no longer exists!");
            setUser(null);
          }
        },
        (error) => {
          console.error("Error listening to user document:", error);
        }
    );
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const email = authUser.email;
        const q = query(collection(db, "users"), where("email", "==", email));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = { id: userDoc.id, ...userDoc.data() };

            // Update state once when user is authenticated
            setUser(userData);

            // If a subscription exists, unsubscribe from the previous one
            if (unsubscribeRef.current) unsubscribeRef.current();

            // Subscribe to real-time changes
            subscribeToUserDocument(userDoc.id);
          } else {
            console.log("No such user document!");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Handle logout or unauthenticated state
        setUser(null);
        if (unsubscribeRef.current) unsubscribeRef.current(); // Unsubscribe from any previous listener
      }
    });

    // Cleanup on unmount or when auth state changes
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
      unsubscribeAuth(); // Unsubscribe from the auth listener
    };
  }, []);

  return (
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
