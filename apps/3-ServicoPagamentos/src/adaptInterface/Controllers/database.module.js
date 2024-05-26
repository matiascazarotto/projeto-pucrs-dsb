import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: configService => ({
                type: 'mysql',
                host: configService.getOrThrow('MYSQL_HOST'),
                port: configService.getOrThrow('MYSQL_PORT'),
                username: configService.getOrThrow('MYSQL_USERNAME'),
                password: configService.getOrThrow('MYSQL_PASSWORD'),
                database: configService.getOrThrow('MYSQL_DATABASE'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}