import {RoomReadDto} from "./RoomReadDto";
import {TeacherReadDto} from "./TeacherReadDto";
import {ClientReadDto} from "./ClientReadDto";
import {QueueReadDto} from "./QueueReadDto";
import {AbsenceReadDto} from "./AbsenceReadDto";


export interface Lesson {
    id: number,
    dateTime: Date,
    teacherReadDto: TeacherReadDto,
    roomReadDto: RoomReadDto,
    clients: ClientReadDto[],
    freePlaces: number,
    queues: QueueReadDto[],
    absences: AbsenceReadDto[]
}