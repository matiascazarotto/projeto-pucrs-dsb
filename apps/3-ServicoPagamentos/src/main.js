import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module';
import { Transport } from '@nestjs/microservices';
import { PagamentoRepositoryORM } from './adaptInterface/Persistence/Repositories/PagamentoORM.repository';

async function bootstrap() {
  //DROPAR TABELA PAGAMENTO
  const tables = await NestFactory.createApplicationContext(AppModule);
  const pagamentoRepository = tables.get(PagamentoRepositoryORM);
  await pagamentoRepository.dropTable();

  
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
      queue: 'servicopagamentos',
    },
  });
  await app.listen(3002);
  console.log(`- - -                          - - -`)
  console.log(`- - -     SISTEMA INICIADO     - - -`)
  console.log(`- - -    SERVIÇO PAGAMENTOS    - - -`)
  console.log(`- - -                          - - -`)
}
bootstrap();
