import { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie";

type AuthUserType = {
  message: string;
  user: User;
};
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
type AuthContextType = {
  authUser: AuthUserType | undefined;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  setAuthUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("authUser");

  const [authUser, setAuthUser] = useState<AuthUserType | undefined>(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
