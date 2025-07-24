import {z} from "zod";
const passwordValidation = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$');


export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation,{
        message: "Password must contain 1 lowercase character, 1 uppercase character, 1 alpha, 1 number, 1 special and be 6-10 characters"
    })

}) 

export type RegisterSchema = z.infer<typeof registerSchema>