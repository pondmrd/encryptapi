<p align="center">
  <a href="" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456


## Description

This project is about encryption and decryption data (For Question #13)

## Project setup

Please make sure that you have already installed Node.Js. If not, please download [link to download nodejs](https://nodejs.org/en/download/)

#### NodeJS and NPM Requirements
- Node.js >= 20.16.0
- npm >=10.2.5

```bash
$ npm install
```

## Compile and run the project

If you want to visit Swagger page
```bash
$ npm run start:dev
```

then, visit http://localhost:3000/api-docs
## Run tests

```bash
$ npm run test:e2e
```

### Note
I provide 3 testcases. 
1. To test when payload is empty.
2. To test when data1 or data2 is empty.
3. To compare payload after encrypting and decrypting.

All cases should be passed correctly.
