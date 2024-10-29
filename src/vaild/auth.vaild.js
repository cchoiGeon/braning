import Joi from "joi";

// User 관련 Joi 스키마 정의
export const signupSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'username이 필요합니다.'
    }),
    nickname:Joi.string().required().messages({
        'any.required': 'nickname이 필요합니다.'
    }),
    birth:Joi.number().required().messages({
        'any.required': 'birth이 필요합니다.'
    }),
    gender:Joi.number().required().messages({
        'any.required': 'gender이 필요합니다.'
    }),
    fcm: Joi.string().optional() // 선택적인 필드로 설정
});

export const nicknameSchema = Joi.object({
    nickname: Joi.string().required().messages({
        'any.required': 'nickname이 필요합니다.'
    }),
});

export const signinSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'username이 필요합니다.'
    }),
    fcm: Joi.string().optional() // 선택적인 필드로 설정
})

export const updateUserSchema = Joi.object({
    nickname: Joi.string().required().messages({
        'any.required': 'nickname이 필요합니다.'
    }),
    fcm: Joi.string().optional() // 선택적인 필드로 설정
})