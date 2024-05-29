import { createContext } from "react";

export const TreeContext = createContext(
    {
        treeList: [],
        setTreeList: () => {}
    }
);
