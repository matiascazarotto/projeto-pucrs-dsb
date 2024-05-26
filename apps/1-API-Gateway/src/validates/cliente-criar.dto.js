import Joi from 'joi';

export const NovoClienteDtoSchema = Joi.object({
    email: Joi.string().required(),
    nome: Joi.string().required()
}).options({
   abortEarly: false 
}) 