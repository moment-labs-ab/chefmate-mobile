import { getCurrentUser } from "@/lib/auth-service";
import { User } from "@/models/user";
import { Dispatch, SetStateAction, createContext, useState, ReactNode, useContext, useEffect } from "react";


type GlobalContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
    isLoading: true,
    setIsLoading: () => { }
});

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

type GlobalProviderProps = {
    children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getCurrentUser();

                
                if (user) {
                    setIsLoggedIn(true);
                    setUser(user);
                    console.log("Context.tsx (50): USER:", user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error(error);
                return null;
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading
            }}>
            {children}
        </GlobalContext.Provider>

    )
}