/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "@/types/User";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient, apiLogin } from "@/service/api";

// --- Types ---
type AuthContextType = {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUserActive: boolean;
  loginWithNomor: (nomor: string) => Promise<void>;
  // validateOtp: (nomor: string, otp: string) => Promise<void>;
  // logout: () => Promise<void>;
  // registerUser: (userData: {
  //   username: string;
  //   nomor: string;
  // }) => Promise<void>;
};

// --- Create Context ---
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.MasterUserRole?.name === "Admin";
  const isUserActive = user?.active === true;

  // --- Load session from AsyncStorage on app start ---
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load session", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  // --- 1. Kirim nomor → dapat OTP ---
  const loginWithNomor = async (nomor: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin({ nomor: nomor });
      console.log("Response provider login", response);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal kirim OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          token,
          isLoading,
          isAuthenticated,
          isAdmin,
          isUserActive,
          loginWithNomor,
          // validateOtp,
          // logout,
          // registerUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
