import { BadRequestException } from '@nestjs/common';
import { AssinaturaCriarDtoSchema } from './assinatura-criar.dto';

export class CriarAssinaturaValidatorPipe {
    transform(value, metadata) {
        const {error} = AssinaturaCriarDtoSchema.validate(value);
        if (error) {
          const mensagens = error.details.map(d => d.message).join();
          throw new BadRequestException(mensagens);  
        }
        return value;
    } 
}