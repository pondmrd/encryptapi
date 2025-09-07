import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import { EncryptService } from '../src/encrypt/encrypt.service';
import { EncryptController } from '../src/encrypt/encrypt.controller';
import { EncryptedDataDto } from '../src/encrypt/dto/encrypted-data.dto';
import { PayloadDataDto } from '../src/encrypt/dto/payload-data.dto';

describe('EncryptController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [EncryptController],
            providers: [EncryptService],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        await app.init();
    });

    it('/get-encrypt-data (POST) should return 400 if payload is empty', async () => {
        const payload: PayloadDataDto = { payload: "" };
        await request(app.getHttpServer())
            .post("/get-encrypt-data")
            .send(payload)
            .expect(400)
            .expect(res => {
                expect(res.body.message[0]).toBe("payload should not be empty")
            })
    });

    it('/get-decrypt-data (POST) should return 400 if data1 or data2 is empty', async () => {
        const encryptedData1: EncryptedDataDto = { data1: "", data2: "test" };
        const encryptedData2: EncryptedDataDto = { data1: "test", data2: "" };

        await request(app.getHttpServer())
            .post("/get-decrypt-data")
            .send(encryptedData1)
            .expect(400)
            .expect(res => {
                expect(res.body.message[0]).toBe("data1 should not be empty")
            })

        await request(app.getHttpServer())
            .post("/get-decrypt-data")
            .send(encryptedData2)
            .expect(400)
            .expect(res => {
                expect(res.body.message[0]).toBe("data2 should not be empty")
            })
    });

    it('/get-decrypt-data (POST) should decrypt payload back', async () => {
        const payload: PayloadDataDto = { payload: "Kinokuniya_Book_Store" };

        // 1. Encrypt 
        const encryptRes = await request(app.getHttpServer())
            .post("/get-encrypt-data")
            .send(payload)
            .expect(201);

        const encryptedData: EncryptedDataDto = encryptRes.body;

        // 2. Decrypt Back
        const decryptRes = await request(app.getHttpServer())
            .post("/get-decrypt-data")
            .send(encryptedData)
            .expect(201);

        expect(decryptRes.body).toEqual(payload);
    });

    afterAll(async () => {
        await app.close();
    });
});
