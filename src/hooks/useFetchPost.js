import { useEffect, useState } from "react";

export function useFetchPost(url, initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!url) return;
        let ignore = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                console.log("Posting to URL:", url);
                const res = await fetch(url, {
                    method: 'POST'
                });
                if (!res.ok) throw new Error(`the server answered ${res.status}`);
                const body = await res.json();
                if (!ignore) setData(body);
            } catch (err) {
                console.error(err);
                if (!ignore) setError(err.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        load();

        return () => {
            ignore = true;
        };
    }, [url]);

    return { data, loading, error };
}
