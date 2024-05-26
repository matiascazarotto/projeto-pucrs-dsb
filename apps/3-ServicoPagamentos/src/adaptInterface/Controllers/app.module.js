import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, GeneralController } from './app.controller';
import { Pagamento } from '../Persistence/Entities/Pagamento.entity';
import { ServicoPagamento } from '../../domain/services/ServicoPagamentos';
import { PagamentoRepositoryORM } from '../Persistence/Repositories/PagamentoORM.repository';
import { IPagamentoModelRepository } from '../../domain/repositories/PagamentoModel.repository';
import { RegistrarPagamento } from '../../aplication/RegistrarPagamento';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
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
      },
      {
        name: 'servicoassinaturasvalidas',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
          queue: 'servicoassinaturasvalidas',
        },
      }
    ]),
    DatabaseModule,
    TypeOrmModule.forFeature([Pagamento]),
  ],
  controllers: [AppController, GeneralController],
  providers: [PagamentoRepositoryORM, IPagamentoModelRepository, ServicoPagamento, RegistrarPagamento, AppService]
})

export class AppModule {
}
