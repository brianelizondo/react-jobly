import { useState, useEffect } from "react";

const useLocalStorage = (key = "jobly", initialValue = false) => {
    if(window.localStorage.getItem(key)){
        initialValue = JSON.parse(window.localStorage.getItem(key));
    }
    const [localData, setLocalData] = useState(initialValue);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(localData));
    }, [key, localData]);

    return [localData, setLocalData];
}

export default useLocalStorage;