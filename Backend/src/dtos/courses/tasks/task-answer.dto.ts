import { IsString } from "class-validator";

export class TaskAnswerDTO {
    @IsString()
    answerText: string;
}