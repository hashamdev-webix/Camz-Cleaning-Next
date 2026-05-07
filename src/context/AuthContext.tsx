"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  approval_status: string;
  source: string;
  is_blocked: boolean;
};

type AuthContextType = {
  user: User | null;
  userData: UserData | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
    phone_number: string,
  ) => Promise<{ error: string | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<UserData | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Fetch user data from 'users' table
  const getCurrentUser = async (): Promise<UserData | null> => {
    try {
      // Check if user is logged in first
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      // Return null immediately if no user is logged in
      if (!authUser) return null;

      // Use maybeSingle() instead of single() to avoid crashes when no user exists
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user data:", error);
        return null;
      }

      // Return null if no data found
      if (!data) return null;

      return data as UserData;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user data but don't block anything if it fails
        try {
          const userData = await getCurrentUser();
          setUserData(userData);
        } catch (error) {
          console.error("Failed to fetch user data on init:", error);
          setUserData(null);
        }
      }

      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch user data but don't block anything if it fails
        try {
          const userData = await getCurrentUser();
          setUserData(userData);
        } catch (error) {
          console.error("Failed to fetch user data on auth change:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    phone_number: string,
  ) => {
    try {
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) return { error: authError.message };
      if (!authData.user) return { error: "Failed to create user" };

      // Step 2: Insert into users table
      const { error: insertError } = await supabase.from("users").insert({
        id: authData.user.id,
        name: name,
        email: email,
        role: "customer",
        phone_number: phone_number,
        approval_status: "approved",
        source: "Web",
        is_blocked: false,
      });

      if (insertError) {
        console.error("Error inserting user data:", insertError);
        return { error: "Failed to create user profile" };
      }

      // Use window.location for hard navigation
      window.location.href = "/login";
      return { error: null };
    } catch (error) {
      console.error("Signup error:", error);
      return { error: "An unexpected error occurred" };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };

      // Use window.location for hard navigation after auth
      // This ensures the auth state is properly picked up
      window.location.href = "/";

      return { error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: "An unexpected error occurred" };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    // Use window.location for hard navigation
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
