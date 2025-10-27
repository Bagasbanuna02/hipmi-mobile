import {
  apiConfig,
  apiLogin,
  apiRegister,
  apiValidationCode,
} from "@/service/api-config";
import { IUser } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

// --- Types ---
type AuthContextType = {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUserActive: boolean;
  loginWithNomor: (nomor: string) => Promise<void>;
  validateOtp: (nomor: string) => Promise<any>;
  logout: () => Promise<void>;
  registerUser: (userData: {
    username: string;
    nomor: string;
  }) => Promise<void>;
  userData: (token: string) => Promise<any>;
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
  const isAdmin = user?.masterUserRoleId !== "1";
  const isUserActive = user?.active === true;

  // --- Load session from AsyncStorage on app start ---
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken) {
          setToken(storedToken);
        }

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
      await AsyncStorage.setItem("kode_otp", response.kodeId);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal kirim OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. Validasi OTP & cek user ---
  const validateOtp = async (nomor: string) => {
    try {
      setIsLoading(true);
      const response = await apiValidationCode({ nomor: nomor });

      const { token } = response;
      if (response.success) {
        setToken(token);
        await AsyncStorage.setItem("authToken", token);

        const responseUser = await apiConfig.get(
          `/mobile?token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataUser = responseUser.data.data;

        setUser(dataUser);
        await AsyncStorage.setItem("userData", JSON.stringify(dataUser));

        if (response.active) {
          if (response.roleId === "1") {
            return "/(application)/(user)/home";
          } else {
            return "/(application)/admin/dashboard";
          }
        } else {
          return "/(application)/(user)/waiting-room";
        }
      } else {
        Toast.show({
          type: "info",
          text1: "Anda belum terdaftar",
          text2: "Silahkan daftar terlebih dahulu",
        });
        return `/register?nomor=${nomor}`;
      }
    } catch (error: any) {
      console.log("Error validasi otp >>", (error as Error).message || error);
      throw new Error(
        error.response?.data?.message || "OTP salah atau user tidak ditemukan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. Ambil data user ---
  const userData = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await apiConfig.get(`/mobile?token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataUser = response.data.data;

      setUser(dataUser);
      await AsyncStorage.setItem("userData", JSON.stringify(dataUser));
      return dataUser;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Gagal mengambil data user"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. Register jika user belum ada ---
  const registerUser = async (userData: {
    username: string;
    nomor: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await apiRegister({ data: userData });

      const { token } = response;
      if (!response.success) {
        Toast.show({
          type: "info",
          text1: "Info",
          text2: response.message,
        });

        return;
      }

      setToken(token);
      await AsyncStorage.setItem("authToken", token);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Anda berhasil terdaftar",
      });
      router.replace("/(application)/(user)/waiting-room");
      return;
    } catch (error: any) {
      console.log("Error register", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 5. Logout ---
  const logout = async () => {
    try {
      setIsLoading(true);
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
      setIsLoading(false);

      Toast.show({
        type: "success",
        text1: "Logout berhasil",
        text2: "Anda berhasil keluar dari akun.",
      });
      router.replace("/");
    } catch (error) {
      console.log("Logout error (optional):", error);
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
          validateOtp,
          logout,
          registerUser,
          userData,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
