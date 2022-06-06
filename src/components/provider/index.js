import { useContext, useEffect, useState, createContext, useMemo } from "react";
const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(1280);
    const [height, setHeight] = useState(703);
    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, [])
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <viewportContext.Provider value={{ width, height }}>
            {children}
        </viewportContext.Provider>
    )
}
export const useViewport = () => {
    return useContext(viewportContext);
}

export default ViewportProvider;