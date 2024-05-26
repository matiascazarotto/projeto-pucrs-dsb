import { BadRequestException } from '@nestjs/common';
import { AplicativoCriarDtoSchema } from './aplicativo-criar.dto';

export class CriarAplicativoValidatorPipe {
    transform(value, metadata) {
        const {error} = AplicativoCriarDtoSchema.validate(value);
        if (error) {
          const mensagens = error.details.map(d => d.message).join();
          throw new BadRequestException(mensagens);  
        }
        return value;
    } 
}