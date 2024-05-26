import Joi from 'joi';

export const PagamentoCriarDtoSchema = Joi.object({
    dia: Joi.number().min(1).max(31).required(),
    mes: Joi.number().min(1).max(12).required(),
    ano: Joi.number().min(2024).max(2100).required(),
    codAss: Joi.number().positive().required(),
    valorPago: Joi.number().precision(2).positive().required()  
}).options({
   abortEarly: false 
}) 