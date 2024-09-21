import { authApi } from "@/services/auth.service.api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type Token = string | null;

type AuthContextType = {
  token: Token;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<Token>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMTViN3YzcTAwMDBjN3liNW12aDJoNXgiLCJpYXQiOjE3MjY5MTIwNTAsImV4cCI6MTcyNjkxMjk1MH0._4KGdp4BYijBM7-EU76rUMD6y_rtpjRygvjMBgI1zY4"
  );

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setToken(data.token);
        console.log(data);
      } catch (error) {
        console.error(`User is not logged in: \n${error}`);
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = authApi.interceptors.request.use((config) => {
      config.headers.Authorization =
        config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;

      return config;
    });

    return () => {
      authApi.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = authApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        console.log(error.response);

        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await fetch("/api/refresh", {
              method: "POST",
            });

            if (response.ok) {
              const data = await response.json();
              setToken(data.token);

              originalRequest.headers.Authorisation = `Bearer ${data.token}`;
              originalRequest._retry = true;

              return authApi(originalRequest);
            }
          } catch (error) {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      authApi.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
