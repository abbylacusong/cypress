'use client'

import { Button } from '@/components/ui/button'
import { Form, FormDescription, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Logo from '../../../../public/cypresslogo.svg'
import Link from 'next/link'
import Image from 'next/image'
import Loader from '@/components/ui/Loader'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MailCheck } from 'lucide-react'
import { SignupFormSchema } from '../../../lib/types'
import { actionSignUpUser } from '@/lib/server-action/auth-action'

const Signup = () => {
    const [submitError , setSubmitError] = useState('')
    const [confirmation , setConfirmation] = useState(false)


    const form = useForm<z.infer<typeof SignupFormSchema>>({
       mode : "onChange",
       resolver : zodResolver(SignupFormSchema),
       defaultValues : {email : "" , password : "" , confirmPassword : ""}

    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async ({ 
        email, 
        password 
    }: z.infer<typeof SignupFormSchema>) => {
        const { error } = await actionSignUpUser({ email, password });
        if (error) {
          setSubmitError(error.message)
          form.reset()
          return
        }
        setConfirmation(true);
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


            {!confirmation && 
                <>
                    <FormField 
                        control={form.control}
                        name="email"
                        disabled={isLoading}
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} onChange={ (e) => { field.onChange(e); if (submitError) setSubmitError('') }} />
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
                                    <Input type="password" placeholder="Password" {...field}  onChange={ (e) => { field.onChange(e); if (submitError) setSubmitError('') }} />
                                </FormControl>
                                {form.formState.errors.password && (
                                    <FormMessage>{form.formState.errors.password.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    /> 
                    <FormField 
                        control={form.control}
                        name="confirmPassword"
                        disabled={isLoading} 
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} onChange={ (e) => { field.onChange(e); if (submitError) setSubmitError('') }}/>
                                </FormControl>
                                {form.formState.errors.confirmPassword && (
                                    <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />                     
                    <Button type="submit" className='w-full p-6'  disabled = {isLoading}>{!isLoading? "Create account" : <Loader />}</Button>
                </> 
            } 
            {submitError && <FormMessage>{submitError}</FormMessage>}  
            <span className='self-container'>
                Already have an Account?{' '}
                <Link href="/login" className='text-primary gap-1 hover:underline'>Login</Link>
            </span>   
            {(confirmation ) && <>
                <Alert variant={'default'}>
                    {<MailCheck className='h-4 w-4' />}
                    <AlertTitle>
                        Check your Email.
                    </AlertTitle>
                    <AlertDescription>
                        An Email confirmation has been sent.
                    </AlertDescription>
                </Alert>
            </>}
        </form>
    </Form>
  )
}

export default Signup