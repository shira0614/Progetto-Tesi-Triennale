import { createContext } from "react";

export const RoleContext = createContext({
    userRole: null,
    setUserRole: () => {}
})