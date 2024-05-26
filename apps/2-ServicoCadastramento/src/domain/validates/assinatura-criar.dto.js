import Joi from 'joi';

export const AssinaturaCriarDtoSchema = Joi.object({
    codCli: Joi.number().positive().required(),
    codApp: Joi.number().positive().required()
}).options({
   abortEarly: false 
}) 