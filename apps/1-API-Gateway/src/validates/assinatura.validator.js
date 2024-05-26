import { BadRequestException } from '@nestjs/common';
import { NovoClienteDtoSchema } from './cliente-criar.dto';

export class NovoClienteValidatorPipe {
    transform(value, metadata) {
        const {error} = NovoClienteDtoSchema.validate(value);
        if (error) {
          const mensagens = error.details.map(d => d.message).join();
          throw new BadRequestException(mensagens);  
        }
        return value;
    } 
}