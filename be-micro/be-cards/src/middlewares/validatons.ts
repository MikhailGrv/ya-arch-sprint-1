import { Joi, celebrate } from 'celebrate';
import { Types } from 'mongoose';
// eslint-disable-next-line  no-useless-escape
const urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=.]+$/;

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message({ any: 'Невалидный id' });
    }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().pattern(urlRegExp)
      .message('Поле "avatar" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});



export {
  urlRegExp, validateCardBody, validateObjId,  
};
