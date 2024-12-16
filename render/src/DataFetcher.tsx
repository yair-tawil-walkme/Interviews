import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState<null | { total: number }>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/product`)
            const result = await response.json();
            setData(result);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Data count:</h1>
            {loading ? <p>Loading...</p> : <pre>{data && data.total}</pre>}
        </div>
    );
}

export default DataFetcher;