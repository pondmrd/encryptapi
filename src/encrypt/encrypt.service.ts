import { Injectable } from "@nestjs/common";
import { EncryptedData } from "src/dto/EncryptedData";
import { PayloadData } from "src/dto/PayloadData";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config()

@Injectable({})
export class EncryptService {

    iv: Buffer = crypto.randomBytes(16)
    
    publicKeyPem = process.env.PUBLIC_KEY!
    privateKeyPem = process.env.PRIVATE_KEY!

    getApiDocs() {

        return this.publicKeyPem 
    }

    getEncryptData(payload: string): EncryptedData {
        const aesKey: Buffer = crypto.randomBytes(32)

        const data: EncryptedData = {
            data1: this.getData1(aesKey),
            data2: this.getData2(payload, aesKey)
        }
        return data
    }

    getDecryptData(encryptedData: EncryptedData): PayloadData {
        const aesKey = this.getAESKey(encryptedData)
        const payload = this.getPayload(aesKey, encryptedData.data2)

        const data: PayloadData = {
            payload: payload
        }
        return data;
    }


    getData2(payload: string, aesKey: Buffer): string {
        const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, this.iv)
        let aes_encrypted = cipher.update(payload, "utf8", "base64")
        aes_encrypted += cipher.final('base64')
        return aes_encrypted
    }

    getData1(aesKey: Buffer): string {
        const encryptedAesKeyWithPublic = crypto.publicEncrypt(
            {
                key: this.publicKeyPem,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256'
            },
            aesKey
        );

        return encryptedAesKeyWithPublic.toString("base64")
    }

    getAESKey(encryptedData: EncryptedData): Buffer {
        const decryptedAesKey = crypto.privateDecrypt(
            {
                key: this.privateKeyPem,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(encryptedData.data1, "base64")
        );

        return decryptedAesKey
    }

    getPayload(aesKey: Buffer, encryptedPayload: string): string {
        const decipher = crypto.createDecipheriv("aes-256-cbc", aesKey, this.iv);
        let decryptedPayload = decipher.update(encryptedPayload, "base64", "utf8");
        decryptedPayload += decipher.final("utf8");

        return decryptedPayload
    }
}