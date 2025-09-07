import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EncryptedDataDto {

    @ApiProperty({ example: "data1 From /get-encrypt-data",  required: true })
    @IsNotEmpty()
    data1: string;

    @ApiProperty({ example: "data2 From /get-encrypt-data",  required: true })
    @IsNotEmpty()
    data2: string;
}