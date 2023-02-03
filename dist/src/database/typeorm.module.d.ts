import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
export declare class TypeOrmDynamicModule {
    static forRoot(config: any): DynamicModule;
    static createTypeOrmOptions(configService: ConfigService, config: any): TypeOrmModuleOptions;
    static forFeature(entities: EntityClassOrSchema[]): DynamicModule;
}
