import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import logo from '../../public/autoheven_logo.svg'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'


const formSchema = zod.object({
  email: zod.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: zod.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  acceptedTAC: zod.boolean(),
})

const LoginForm: React.FC  = () => {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      acceptedTAC: false,
    },
  })

  function onSubmit(values: zod.infer<typeof formSchema>) {

    console.log(values)
  }

  return (
    <Form {...form}>
       
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col text-sm rounded-lg border py-12 px-52  bg-background">
        {/* <div className='flex'>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="ava.wright@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="ava.wright@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        </div> */}
        <div className="mx-auto mb-4 ">
            <Image src={logo} height={30} width={64} alt="" />
          </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
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
                <Input placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
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
        /> */}
        <Button type="submit" className='bg-primary'>Login<ArrowRight width={16} height={16} className='ml-2'/></Button>
        <Button type="submit" className='bg-secondary text-secondary-foreground'>I'm a dealer<ArrowRight width={16} height={16} className='ml-2'/></Button>
        <Link href='/' passHref>Forgot your password?</Link>
      </form>
    </Form>
  )
}

export default LoginForm