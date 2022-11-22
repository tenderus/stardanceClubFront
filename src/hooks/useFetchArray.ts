import {useEffect, useState} from "react";

const useFetchArray = <T,>(url: string, updateNeeded: boolean = false) => {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [updateNeeded]);

    return data;
};

export default useFetchArray;