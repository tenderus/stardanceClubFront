import {ClientReadDto} from "./ClientReadDto";
import {DanceTypeReadDto} from "./DanceTypeReadDto";

export interface TeacherReadDto {
    id: number,
    user: ClientReadDto,
    danceType: DanceTypeReadDto,
    age: number,
    yearsOfExperience: number,
    description: string
}