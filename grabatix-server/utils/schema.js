const Joi = require("@hapi/joi");
const moment = require("moment");

const currentYear = moment().year();

const CardSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string()
    .creditCard()
    .required(),
  expMonth: Joi.string()
    .pattern(/^(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))$/)
    .required(),
  expYear: Joi.number()
    .min(currentYear)
    .max(currentYear + 99)
    .required(),
  cvc: Joi.string()
    .pattern(/^[0-9]{3,4}$/)
    .required(),
  address: Joi.object({
    postalCode: Joi.string().max(10),
    region: Joi.string().max(30),
    country: Joi.string().pattern(/^[A-z]{2}$/),
    streetAddress: Joi.string().max(30)
  })
    .or("postalCode", "region")
    .optional()
});

const ChargeSchema = Joi.object({
  currency: Joi.string()
    .pattern(/^[A-z]{3}$/)
    .required(),
  amount: Joi.number()
    .precision(2)
    .positive()
    .min(0.0)
    .max(99999.99)
    .required(),
  context: Joi.object({
    mobile: Joi.boolean().required(),
    isEcommerce: Joi.boolean().required(),
    tax: Joi.number()
      .precision(2)
      .positive()
      .min(0.0)
      .max(99999.99),
    deviceInfo: Joi.object({
      id: Joi.string(),
      macAddress: Joi.string().max(50),
      encrypted: Joi.boolean(),
      ipAddress: Joi.string()
        .ip()
        .max(40),
      latitude: Joi.number().max(20),
      longitude: Joi.number().max(20),
      phoneNumber: Joi.string().max(20),
      type: Joi.string().max(200)
    }).optional(),
    recurring: Joi.boolean()
  }).required(),
  token: Joi.string().token(),
  card: CardSchema
}).xor("token", "card");

const UserSchema = Joi.object({
  username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),

  password: Joi.string().pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,20}$/
  ),

  repeat_password: Joi.ref("password"),

  access_token: [Joi.string(), Joi.number()]
})
  .xor("password", "access_token")
  .with("repeat_password", "password");

module.exports = {
  CardSchema,
  ChargeSchema,
  UserSchema
};
