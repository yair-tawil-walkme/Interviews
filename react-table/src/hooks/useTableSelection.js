import { useEffect, useState } from "react";

export const useTableSelection = (rows) => {
    const [selections, setSelections] = useState([]);

    const handleSelectItem = (id) => {
        setSelections((prev) => prev.includes(id) ? prev.filter(item => item !== id): [...prev, id]);
    }

    const handleSelectAll = (ids) => {
        setSelections((prev) => {
            if (JSON.stringify(prev.sort()) === JSON.stringify(ids.sort())) {
                return [];
            }
            console.log(ids);
            return ids;
        });
    }

    useEffect(() => {
        setSelections(prev => {
            if (prev.length) {
                return prev.filter((selection) => rows.some((row) => row.id === selection))
            }
            return prev
        })
    }, [rows])

    return {
        selections,
        handleSelectItem,
        handleSelectAll
    }
}