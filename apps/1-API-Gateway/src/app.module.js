import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Admins } from './auth/admins';
import { AuthUsuario } from './auth/ServicoAutenticacao';
import { JwtStrategy } from './auth/jwt.strategy';
import { jwtConstantes } from './auth/constantes';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/local.strategy';
import { EurekaModule } from '../node_modules/nestjs-eureka/dist/eureka.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstantes.secret,
      signOptions: { expiresIn: '600s' },
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
      },
      {
        name: 'servicopagamentos',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
          queue: 'servicopagamentos',
        },
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AuthUsuario, Admins, LocalStrategy],
})
export class AppModule { }
