import React, { useState } from 'react'
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
import { Badge } from '../ui/badge'


const formSchema = zod.object({
  email: zod.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: zod.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  acceptedTAC: zod.boolean(),
})

const RegisterForm: React.FC  = () => {
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
  const [password, setPassword] = useState<string>("");
const [passwordStrength, setPasswordStrength] = useState<boolean[]>([false, false, false]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  const newPassword = event.target.value;
    console.log("new pass", newPassword)
  setPassword(newPassword);
  const [isLong, hasLetters, hasSymbols] = [newPassword.length >= 8, /[a-zA-Z]/g.test(newPassword), /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword)] 
  setPasswordStrength([isLong, hasLetters, hasSymbols]);
};

  return (
    <Form {...form}>
       
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col text-sm rounded-lg border py-12 px-32 bg-background">
         <div className="mx-auto mb-4 w-16 h-[30px] relative">
            <Image src={logo} alt="" fill className='object-contain'/>
          </div>
        <div className='flex  space-x-4'>
          <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input placeholder="********" {...field} 
                onChange={
                  (event)=>{
                    field.onChange(event.target.value);
                    handlePasswordChange(event);
                  }
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-x-2 text-primary'>
            {
      ["More than 8 characters", "Letters", "Symbols"].map((text, index) => (
        <Badge
          key={index}
          variant={passwordStrength[index] ? "default" : "outline"}
          className={`bg-${passwordStrength[index] ? "green-500" : "background"} text-primary border rounded-lg`}
        >
          {text}
        </Badge>
      ))
    }
        </div>
        <FormField
          control={form.control}
          name="acceptedTAC"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
                <FormLabel>
                  Accept terms and conditions</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-primary'>Register<ArrowRight width={16} height={16} className='ml-2'/></Button>
        <Button type="submit" className='bg-secondary text-secondary-foreground'>I'm a dealer<ArrowRight width={16} height={16} className='ml-2'/></Button>
      </form>
    </Form>
  )
}

export default RegisterForm