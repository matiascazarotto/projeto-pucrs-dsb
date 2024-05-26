import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module';
import { Transport } from '@nestjs/microservices';
import { droparTabelas, popularDados} from './domain/popularBanco/popularDados';

async function bootstrap() {
  await droparTabelas();
  
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
      queue: 'servicoassinaturasvalidas',
    },
  });
  await app.listen(3003);
  await popularDados();
  console.log(`- - -                          - - -`)
  console.log(`- - -     SISTEMA INICIADO     - - -`)
  console.log(`- - -   SERVIÇO ASS. VÁLIDAS   - - -`)
  console.log(`- - -                          - - -`)
}
bootstrap();
