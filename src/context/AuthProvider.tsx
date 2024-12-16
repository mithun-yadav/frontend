import { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie";

type AuthUserType = object;
type AuthContextType = {
  authUser: AuthUserType | undefined;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: {},
  setAuthUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("Messanger");
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
