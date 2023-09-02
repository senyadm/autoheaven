"use client"
import React from 'react'
import Image from 'next/image'
import logo from '../../public/autoheven_logo.svg'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { NavigationMenu, NavigationMenuLink } from '@/components/ui/Navbar'
import Link from 'next/link'
import { ArrowLeftIcon, EnterIcon } from '@radix-ui/react-icons'
import { MoveLeft } from 'lucide-react'

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  acceptedTAC: z.boolean(),
})

export const ProfileForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      acceptedTAC: false,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <h1 className="scroll-m-20 text-base font-semibold tracking-tight text-center my-6">
        Sign-up
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col text-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="ava.wright@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="ava.wright@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptedTAC"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Accept terms and condition                </FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-emerald-500'>Sign up</Button>
      </form>
    </Form>
  )
}


const Login = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavigationMenu className="flex items-center py-4 bg-white border-b text-sm">
        <div className="w-full mx-auto max-w-screen-xl px-4 flex items-center justify-between">

          <div className="flex items-center space-x-4 border rounded-lg py-2.5 px-4">

            <Link className="h-full flex items-center" href="/" passHref>
              <MoveLeft className='mr-2' size={16} />Back
            </Link>
          </div>
        </div>
      </NavigationMenu>
      <div className="flex justify-center items-center  h-full my-auto">
        <div className='flex flex-col justify-center p-8 rounded-lg border'>
          <div className="mx-auto">
            <Image src={logo} height={36} width={64} alt="" />
          </div>
          <ProfileForm />

        </div>
      </div>
    </div>

  );
}

export default Login