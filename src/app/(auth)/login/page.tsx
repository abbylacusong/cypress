'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import Logo from '../../../../public/cypresslogo.svg'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader'
import { actionLoginUser } from '@/lib/server-action/auth-action'

const LoginPage = () => {
    const router = useRouter()
    const [ submitError , setSubmitError ] = useState('') 
 
    const form = useForm<z.infer<typeof FormSchema>>({
        mode : 'onSubmit',
        resolver : zodResolver(FormSchema),
        defaultValues : { email: "" , password : "" }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit:SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {

        const {error} = await actionLoginUser(formData)    
        if(error){
            form.reset()
            setSubmitError(error.message)
            return
        }
        router.replace('/dashboard')
    }

    return ( 
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'            
            >
                <Link href="/" className='w-full flex justify-start items-center'>
                    <Image src={Logo} alt="cypress Logo" width={50} height={50} />
                    <span className='font-semibold dark:text-white text-4xl first-letter:ml-2'>cypress.</span>
                </Link>
                <FormDescription className='text-foreground/60'>
                    An all-In-One Collaboration and Productivity
                </FormDescription>
                <FormField 
                    control={form.control}
                    name="email"
                    disabled={isLoading}

                    render={( {field} ) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field}  />
                            </FormControl>
                            {form.formState.errors.email && (
                                <FormMessage>{form.formState.errors.email.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="password"
                    disabled={isLoading}
                    render={( {field} ) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            {form.formState.errors.password && (
                                <FormMessage>{form.formState.errors.password.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />  
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button type="submit" className='w-full p-6' size="lg" disabled={isLoading}>
                    {isLoading?  <Loader /> : 'Login'  }
                </Button>    
                <span className='self-container'>
                    Don't have an Account?
                    <Link href="/signup" className='text-primary'>Sign Up</Link>
                </span>       
            </form>
   
        </Form>
     )
}

export default LoginPage

