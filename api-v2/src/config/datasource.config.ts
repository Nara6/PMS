/* eslint-disable prettier/prettier */
// typeorm-config.service.ts
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
// import 'reflect-metadata';

const path = `${__dirname}/../../.env`;
dotenv.config({ path: path });
export function getConfig() {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // sid: process.env.DATABASE_NAME, // or service name if using service name instead of SID
    synchronize: false, // Set to true only for development (auto-creates tables on every app launch)
    logging: true, // Set to true to log database queries and errors
    logger: 'advanced-console', // Use an advanced console logger
    logQueries: true, // Log SQL queries
    migrationsRun: true,
    migrationsTransactionMode: "each",
    autoLoadEntities: true,
    // entities: [UsersTitle], // Specify the path to your entities
    // migrations: [__dirname + '/../migrations/*'], // Specify the path to your migrations
    entities: [__dirname + '/../entity/**/*.entity.ts'], // Specify the path to your entities (if any)
    migrations: [__dirname + '/../../migration/**/*.ts'], // Specify the path to your migrations (if any)
    //   subscribers: [__dirname + '/**/subscriber/*{.ts,.js}'], // Specify the path to your subscribers (if any)
    //   cli: {
    //     entitiesDir: 'src', // Specify the directory where entities are located
    //     migrationsDir: 'src/migration', // Specify the directory where migrations are located (if any)
    //     subscribersDir: 'src/subscriber', // Specify the directory where subscribers are located (if any)
    //   },
  } as DataSourceOptions;
}
