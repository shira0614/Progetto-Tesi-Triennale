import { createContext } from "react";

export const AlertContext = createContext({
    openSuccess: false,
    setOpenSuccess: () => {},
    openFail: false,
    setOpenFail: () => {}
})