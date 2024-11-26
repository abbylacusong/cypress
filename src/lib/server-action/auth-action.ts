"use server"

import * as z from "zod"
import { FormSchema } from "../types"
import { createClient } from "../utils/supabase/server"

export async function actionLoginUser({
    email,
    password
}: z.infer<typeof FormSchema>) {

    const supabase = await createClient()
    const {data , error} = await supabase.auth.signInWithPassword({
        email,
        password
    })


    return { data, error }
}

export async function actionSignupUser({}){

    
}