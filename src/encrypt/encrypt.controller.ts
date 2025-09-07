import { Controller, Post, Get, Body } from "@nestjs/common";
import { EncryptService } from "./encrypt.service";
import type { EncryptedData } from "src/dto/EncryptedData";
import type { PayloadData } from "src/dto/PayloadData";


@Controller("")
export class EncryptController {
    constructor(private encryptService: EncryptService) { }

    @Get("api-docs")
    getApiDosc() {
        return this.encryptService.getApiDocs()
    }

    @Post("get-encrypt-data")
    getEncryptData(@Body() payloadData: PayloadData): EncryptedData {
        return this.encryptService.getEncryptData(payloadData.payload)
    }

    @Post("get-decrypt-data")
    getDecryptData(@Body() encryptedData: EncryptedData): PayloadData {
        return this.encryptService.getDecryptData(encryptedData)
    }
}