import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const TitleChange = () => {
    const location = useLocation();
    useEffect(() => {
        switch(location.pathname) {
            case "/": 
            case "/home":
                document.title = "Discover the top streamed music and songs online on SoundCloud";
                break;
            case "/copyright":
                document.title = "Learn About Copyright on Souncloud";
                break;
            case "/feed":
                document.title = "Your feed on SoundCloud";
                break
        }
    }, [location.pathname]);
    return null;
    
};