import { z } from "zod";

export const FormSchema = z.object({
    email : z.string().describe("Email").min(1 , "Email required").email("Invalid Email"),
    password : z.string().describe("Password").min(1, "Password is required")
})


export const SignupFormSchema = z.object({
    email : z.string().describe('Email').min(1 ,'Email Required').email('Invalid Email'),
    password : z.string().describe('Password').min(6," Password must contain 6 characters"),
    confirmPassword : z.string().describe('Confirm Password').min(6," Password must contain 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {message : "Password don't match.", path : ['confirmPassword']} )
