import { useMemo, useState, useCallback } from "react";
import { searchByNameOrEmail } from "../utils/searchByNameOrEmail";
import { sortByProperty } from "../utils/sortByProperty";

export const useTableFilters = (rows) => {
    const [filtersData, setFiltersData] = useState({
        order: "asc",
        orderBy: "name",
        search: "",
    });

    const { order, orderBy, search } = filtersData

    const filteredRows = useMemo(() => 
        sortByProperty(search ? searchByNameOrEmail(search, rows) : rows, { order, orderBy }),
        [order, orderBy, search, rows]
    )


    const handleSearch = useCallback((e) => {
        setFiltersData((prev) => ({
            ...prev,
            search: e.target.value
        }));
    }, []);

    const handleSort = useCallback((property) => {
        setFiltersData((prev) => {
            const isPropertyTheSame = prev.orderBy === property;
            const currentOrder = prev.order === "asc" ? "desc" : "asc";
      
            return {
                ...prev,
                orderBy: property,
                order: !isPropertyTheSame ? "asc" : currentOrder
            }
        })
    }, []);

    return {
        filteredRows,
        filtersData,
        handleSearch,
        handleSort
    }
}