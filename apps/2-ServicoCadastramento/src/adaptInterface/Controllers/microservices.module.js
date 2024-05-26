import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register(
            {
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://vstiswhk:uRKSTtuzbnZu6i1HLoMvi1cax1S4zhHl@jackal.rmq.cloudamqp.com/vstiswhk'],
                    queue: 'servicocadastramento',
                },
            }
        ),
    ],
})
export class MsModule { }
