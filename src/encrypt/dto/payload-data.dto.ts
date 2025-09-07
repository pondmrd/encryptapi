import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class PayloadDataDto {

    @ApiProperty({ example: "Kinokuniya", required: true })
    @IsNotEmpty()
    payload: string;
}