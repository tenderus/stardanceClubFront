import {PagedRequest} from "../models/RequestFilters/PagedRequest";
import {useEffect, useState} from "react";
import axios from "axios";

const url : string = "https://localhost:7280/api/";



export const getFilteredData = (data : PagedRequest)=> {
    console.log(data);
    try {

        const responseData =  fetch(url + "lessons/paginated", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(responseData);
        return responseData;

    } catch (error:any) {
        throw error;
    }
};

export const getTeachers = () => {
    let responseData;
    const client = axios.create({
        baseURL: "https://localhost:7280/api/lessons/paginated"
    });
    try {
        client
            .post('', {
                pageIndex: 0,
                pageSize: 3,
                columnNameForSorting: "TeacherId",
                sortDirection: "ASC",
                requestFilters: {
                    logicalOperators: 0,
                    filters: [
                        {
                            path: "TeacherId",
                            value: "2",
                            expression: 0
                        }
                    ]
                }
            })
            .then((response) => {
                responseData = response.data});
        return responseData;
    }
    catch (error) {
        console.log(error);
    }
}
