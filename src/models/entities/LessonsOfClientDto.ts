import {TeacherReadDto} from "./TeacherReadDto";
import {RoomReadDto} from "./RoomReadDto";

export interface LessonsOfClientDto {
    id: number,
    dateTime: Date,
    teacherReadDto: TeacherReadDto,
    roomReadDto: RoomReadDto,
    danceType: string
}