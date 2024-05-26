import Joi from 'joi';

export const AplicativoCriarDtoSchema = Joi.object({
    nome: Joi.string().required(),
    custoMensal: Joi.number().precision(2).positive().required()
}).options({
   abortEarly: false 
}) 