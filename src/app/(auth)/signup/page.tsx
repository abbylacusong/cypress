'use client'

import { Button } from '@/components/ui/button'
import { Form, FormDescription, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import Logo from '../../../../public/cypresslogo.svg'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Loader from '@/components/ui/Loader'
import { Input } from '@/components/ui/input'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MailCheck } from 'lucide-react'

const SignupFormSchema = z.object({
    email : z.string().describe('Email').email({message : 'Invalid Email'}),
    password : z.string().describe('Password').min(6," Password must contain 6 characters"),
    confirmPassword : z.string().describe('Confirm Password').min(6," Password must contain 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {message : "Password don't match.", path : ['confirmPassword']} )

const Signup = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [submitError , setSubmitError] = useState('')
    const [confirmation , setConfirmation] = useState(false)

    const codeExchangeError = useMemo(() => {
        if(!searchParams) return ''
        return searchParams.get('error_description')
    },[searchParams])

    const ConfirmationAndErrorStyles = useMemo(
        () => 
            clsx('bg-primary', {
                'bg-red-500/100' : codeExchangeError,
                'border-red-500/50' : codeExchangeError,
                'text-red-700' : codeExchangeError
            }),
        []
    )

    const form = useForm<z.infer<typeof SignupFormSchema>>({
       mode : "onChange",
       resolver : zodResolver(SignupFormSchema),
       defaultValues : {email : "" , password : "" , confirmPassword : ""}

    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = () => {}

    const signupHandler = () => {}

  return (
    <Form {...form}>
        <form         
            onChange={() => {
            if (submitError) setSubmitError('')
            }}
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


            {!confirmation && !codeExchangeError && 
                <>
                    <FormField 
                        control={form.control}
                        name="email"
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} disabled={isLoading} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} disabled={isLoading} />
                                </FormControl>
                            </FormItem>
                        )}
                    /> 
                    <FormField 
                        control={form.control}
                        name="confirmPassword"
                        render={( {field} ) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} disabled={isLoading} />
                                </FormControl>
                            </FormItem>
                        )}
                    />                     
                    <Button type="button" className='w-full p-6'  disabled = {isLoading}>{!isLoading? "Create account" : <Loader />}</Button>
                </> 
            } 
            {submitError && <FormMessage>{submitError}</FormMessage>}  
            <span className='self-container'>
                Already have an Account?{' '}
                <Link href="/login" className='text-primary'>Login</Link>
            </span>   
            {(confirmation || codeExchangeError) && <>
                <Alert variant={'destructive'} className={ConfirmationAndErrorStyles}>
                    {!codeExchangeError && <MailCheck className='h-4 w-4' />}
                    <AlertTitle>
                        {codeExchangeError ? "Invalid Link" :"Check your Email."}
                    </AlertTitle>
                    <AlertDescription>
                        {codeExchangeError || 'An Email confirmation has been sent.'}
                    </AlertDescription>
                </Alert>
            </>}
        </form>
    </Form>
  )
}

export default Signup