import { useCallback } from "react";

export const useDeleteRow = (setRows) => {
    const handleDeleteRows = useCallback((ids) => {
        setRows((prev) => prev.filter((row) => !ids.includes(row.id)))
    }, [setRows]);


    return handleDeleteRows;
}