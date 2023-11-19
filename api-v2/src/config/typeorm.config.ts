/* eslint-disable prettier/prettier */
// typeorm-config.service.ts
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  
  createTypeOrmOptions(): TypeOrmModuleOptions {

    return {
      type: 'postgres',
      host: String(process.env.DATABASE_HOST),
      port: parseInt(process.env.DATABASE_PORT),
      username: String(process.env.DATABASE_USERNAME),
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      useUTC: true,
      // serviceName:process.env.DATABASE_NAME,
      // sid: String(process.env.DATABASE_NAME), // or service name if using service name instead of SID
      synchronize: false, // Set to true only for development (auto-creates tables on every app launch)
      logging: false, // Set to true to log database queries and errors
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Specify the path to your entities
      // migrations: [__dirname + '/**/migration/*{.ts,.js}'], // Specify the path to your migrations (if any)
      //   subscribers: [__dirname + '/**/subscriber/*{.ts,.js}'], // Specify the path to your subscribers (if any)
      //   cli: {
      //     entitiesDir: 'src', // Specify the directory where entities are located
      //     migrationsDir: 'src/migration', // Specify the directory where migrations are located (if any)
      //     subscribersDir: 'src/subscriber', // Specify the directory where subscribers are located (if any)
      //   },
    };
  }
}
