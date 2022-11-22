// import { useState, useEffect } from "react";
// import {Lesson} from "../models/entities/Lesson";
// import {TeacherReadDto} from "../models/entities/TeacherReadDto";
//
// const useFetch = (url: string, updateNeeded: boolean = false) => {
//     const [data, setData] = useState<Lesson[] | TeacherReadDto>([]);
//
//     useEffect(() => {
//         fetch(url)
//             .then((res) => res.json())
//             .then((data) => setData(data));
//     }, [updateNeeded]);
//
//     return data;
// };
//
// export default useFetch;



import { useState, useEffect } from "react";

const useFetch = <T,>(url: string, updateNeeded: boolean = false) => {
    const [data, setData] = useState<T>({} as T);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [updateNeeded]);

    return data;
};

export default useFetch;
