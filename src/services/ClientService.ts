const BASE_URL : string = "https://localhost:7280/api/";

interface addClientToLessonProps{
    clientId? : number,
    lessonId? : number
}

export const addClientToLesson = (data : addClientToLessonProps, token: string)=>{
    console.log(JSON.stringify(data));
    try {
        const response =  fetch(BASE_URL + "lessons/clientsLessons", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData =  response;
        console.log(responseData);
        return responseData;

    } catch (error:any) {
        throw error;
    }
};

export const addClientToQueue = (data : addClientToLessonProps, token: string)=>{
    console.log(JSON.stringify(data));
    try {
        const response =  fetch(BASE_URL + "queues/clientsQueues", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData =  response;
        console.log(responseData);
        return responseData;

    } catch (error:any) {
        throw error;
    }
};


export const deleteClientFromLesson = (data : addClientToLessonProps, token: string)=> {
    console.log(JSON.stringify(data));
    try {
        const response = fetch(BASE_URL + "lessons/clientLesson", {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = response;
        console.log(responseData);
        return responseData;

    } catch (error: any) {
        throw error;
    }
};

    export const checkClientIsAtLesson =  (data : addClientToLessonProps)=>{
        console.log(JSON.stringify(data));
        try {
            const response = fetch(BASE_URL + "lessons/clientIsAtLesson", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseData =  response;
            return responseData;

        } catch (error:any) {
            throw error;
        }
    };


export const checkClientIsInQueue =  (data : addClientToLessonProps)=>{
    console.log(JSON.stringify(data));
    try {
        const response = fetch(BASE_URL + "queues/clientIsInQueue", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData =  response;
        return responseData;

    } catch (error:any) {
        throw error;
    }
};


export const getNumberOfQueueOrder =  (data : addClientToLessonProps)=>{
    console.log(JSON.stringify(data));
    try {
        const response = fetch(BASE_URL + "queues/clientQueueOrder", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData =  response;
        return responseData;

    } catch (error:any) {
        throw error;
    }
};

export const deleteClientFromQueue = (data : addClientToLessonProps, token: string)=> {
    console.log(JSON.stringify(data));
    try {
        const response = fetch(BASE_URL + "queues/clientsQueue", {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = response;
        console.log(responseData);
        return responseData;

    } catch (error: any) {
        throw error;
    }
};


export const markClientAsAbsent = async (data : addClientToLessonProps, token : string)=>{
    console.log(JSON.stringify(data));
    try {
        const response = await fetch(BASE_URL + "absences", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData =  response;
        console.log(responseData);
        return responseData;

    } catch (error:any) {
        throw error;
    }
};