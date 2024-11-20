import { z } from "zod";

export const FormSchema = z.object({
    email : z.string().describe("Email").email("Invalid Email"),
    password : z.string().describe("Passowrd").min(1, "Password is required")
})


