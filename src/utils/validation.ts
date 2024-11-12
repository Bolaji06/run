import { z } from "zod";

const emailSchema = z.string({ required_error: 'email is required'}).email({ message: 'enter valid email'})
const passwordSchema = z.string({required_error: 'password is required' }).min(4, { message: 'must be minimum of 4 characters'});
const textSchema = z.string({ required_error: 'input is required' }).min(4, { message: 'must contain at least 4 characters'});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerSchema = z.object({
    email: emailSchema,
    username: textSchema,
    password: passwordSchema
})

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>