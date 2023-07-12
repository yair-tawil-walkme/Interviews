export const searchByNameOrEmail = (search, rows) => {
    return rows.filter(({ email, name }) => {
        return email.toLowerCase().includes(search.toLowerCase()) ||
            name.toLowerCase().includes(search.toLowerCase())
    }
    )
}