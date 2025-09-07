import { Controller, Post, Get, Body } from "@nestjs/common";
import { EncryptService } from "./encrypt.service";
import { EncryptedDataDto } from "./dto/encrypted-data.dto";
import { PayloadDataDto } from "./dto/payload-data.dto";


@Controller("")
export class EncryptController {
    constructor(private encryptService: EncryptService) { }

    @Post("get-encrypt-data")
    getEncryptData(@Body() payloadData: PayloadDataDto): EncryptedDataDto {
        return this.encryptService.getEncryptData(payloadData.payload)
    }

    @Post("get-decrypt-data")
    getDecryptData(@Body() encryptedData: EncryptedDataDto): PayloadDataDto {
        return this.encryptService.getDecryptData(encryptedData)
    }
}