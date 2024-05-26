import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, GeneralController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AssinaturaRepositoryORM } from '../Persistence/Repositories/AssinaturaORM.repository';
import { IAssinaturaModelRepository } from '../../domain/repositories/AssinaturaModel.repository';
import { ServicoAssinaturasValidas } from '../../domain/services/ServicoAssinaturasValidas';
import { AssinaturasPorCodigo } from '../../aplication/AssinaturasPorCod';
import { Assinatura } from '../Persistence/Entities/Assinatura.entity';
import { AttBancoLocal } from '../../aplication/AtualizaBancoLocal';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from '../../domain/services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: 'servicocadastramento',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
          queue: 'servicocadastramento',
        },
      }
    ]),
    DatabaseModule,
    TypeOrmModule.forFeature([Assinatura]),
  ],
  controllers: [AppController, GeneralController],
  providers: [AssinaturaRepositoryORM, IAssinaturaModelRepository,
    ServicoAssinaturasValidas, AssinaturasPorCodigo, AttBancoLocal, AppService]
})

export class AppModule {
}
