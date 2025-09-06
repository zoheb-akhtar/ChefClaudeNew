import React, { useEffect, useState } from 'react'

export default function useLocalStorage(initialValue, localStorageKey) {

    const [items, setItems] = useState(initialValue);

    useEffect(() => {
        const items = localStorage.getItem(localStorageKey)
        if (items) {
            setItems(JSON.parse(items))
        }
    }, [localStorageKey])


    function clear() {
        if(localStorage.getItem(localStorageKey)) {
            localStorage.removeItem(localStorageKey);
        }

        setItems(initialValue)
    }

     return [items, setItems, clear]
}
