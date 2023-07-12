export const sortByProperty = (rows, { order, orderBy }) => [...rows].sort((item1, item2) => {
    const property1 = String(item1[orderBy]).toLowerCase();
    const property2 = String(item2[orderBy]).toLowerCase();

    return order === "asc" ? property1.localeCompare(property2) : property2.localeCompare(property1)
    }
);
