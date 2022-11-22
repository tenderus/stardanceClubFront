import {LessonsOfClientDto} from "./LessonsOfClientDto";

export interface ClientReadDto {
    id: number,
    name: string,
    surname: string,
    phone: string,
    login: string,
    password: string,
    role: string,
    lessonsOfClientDtos: LessonsOfClientDto[]
}