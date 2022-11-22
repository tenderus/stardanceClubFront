const BASE_URL : string = "https://localhost:7280/api/";

interface addClientToLessonProps{
    clientId? : number,
    lessonId? : number
}

export const addClientToLesson = (data : addClientToLessonProps)=>{
    console.log(JSON.stringify(data));
    try {
        const response =  fetch(BASE_URL + "lessons/clientsLessons", {
            method: 'POST',
            headers: {
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