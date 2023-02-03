import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({})
export class TypeOrmDynamicModule {
  static forRoot(config: any): DynamicModule {
    return {
      module: TypeOrmDynamicModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return TypeOrmDynamicModule.createTypeOrmOptions(
              configService,
              config,
            );
          },
        }),
      ],
    };
  }

  static createTypeOrmOptions(
    configService: ConfigService,
    config: any,
  ): TypeOrmModuleOptions {
    return {
      type: config.type || 'postgres',
      host: config.host || configService.get<string>('POSTGRES_HOST'),
      port: config.port || configService.get<number>('POSTGRES_PORT'),
      username: config.username || configService.get<string>('POSTGRES_USER'),
      password:
        config.password || configService.get<string>('POSTGRES_PASSWORD'),
      database: config.database || configService.get<string>('POSTGRES_DB'),
      autoLoadEntities: true,
      connectTimeoutMS: 2000,
      entities: config.entities || [],
      synchronize: config.synchronize || false,
    };
  }

  static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: TypeOrmDynamicModule,
      imports: [TypeOrmModule.forFeature(entities)],
    };
  }
}
