import { createContext } from "react";

export const TreeContext = createContext(
    {
        treeList: [],
        setTreeList: () => {}
    }
);

export const SingleTreeContext = createContext(
    {
        tree: null,
        setTree: () => {},
        replicas: [],
        setReplicas: () => {}
    }
);