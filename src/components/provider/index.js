import { useContext, useEffect, useState, createContext } from "react";
const orderWidth = 1080;

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
    const [typePC,setType]=useState(true);
    useEffect(()=>{
        setType(window.innerWidth>orderWidth);
    },[]);
    const handleWindowResize = () => {
        setType(window.innerWidth>orderWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <viewportContext.Provider value={{ typePC }}>
            {children}
        </viewportContext.Provider>
    )
}
export const useViewport = () => {
    return useContext(viewportContext);
}

export default ViewportProvider;