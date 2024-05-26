import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module';
import { popularDados, droparTabelas } from './popularBanco/popularDados';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';

async function bootstrap() {
  await droparTabelas();
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
      queue: 'servicocadastramento',
    },
  });
  //app.enableCors();
  //app.use(helmet());
  await app.listen(3001);
  await popularDados();
  console.log(`- - -                          - - -`)
  console.log(`- - -     SISTEMA INICIADO     - - -`)
  console.log(`- - -   SERVIÇO CADASTRAMENTO  - - -`)
  console.log(`- - -                          - - -`)
}
bootstrap();
