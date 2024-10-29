import Joi from "joi";

// User 관련 Joi 스키마 정의
export const gameCodeSchema = Joi.object({
    gameCode: Joi.number().required().messages({
        'any.required': 'gameCode를 다시 설정해주세요.'
    })
});

export const saveGameDataSchema = Joi.object({
    score: Joi.number().required().messages({
        'any.required': 'username이 필요합니다.'
    }),
    elapsed:Joi.number().required().messages({
        'any.required': 'nickname이 필요합니다.'
    }),
    correct:Joi.number().required().messages({
        'any.required': 'birth이 필요합니다.'
    }),
    incorrect:Joi.number().required().messages({
        'any.required': 'gender이 필요합니다.'
    }),
});
