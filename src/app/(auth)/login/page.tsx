'use client'
import { createClient } from '@/lib/utils/supabase/client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import { Form } from '@/components/ui/form'

const LoginPage = () => {
    const supabase = createClient()
    const router = useRouter()
    const [ submitError , SetSubmitError ] = useState('') 
 
    const form = useForm<z.infer<typeof FormSchema>>({
        mode : 'onChange',
        resolver : zodResolver(FormSchema),
        defaultValues : { email: "" , password : "" }
    })

    const isLoading = form.formState.isSubmitting
    const onSubmit:SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {

    }

    return <Form></Form>
}

export default LoginPage