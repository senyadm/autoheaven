"use client"
import React from 'react'
import Image from 'next/image'
import logo from '../../public/autoheven_logo.svg'
import { Button } from "@/components/ui/button"


import { NavigationMenu, NavigationMenuLink } from '@/components/ui/Navbar'
import Link from 'next/link'
import { ArrowLeftIcon, EnterIcon } from '@radix-ui/react-icons'
import { MoveLeft } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from '@/components/login/LoginForm'
import RegisterForm from '@/components/login/RegisterForm'
import { Navbar } from '@/components/Navbar'

const Login = () => {
  return (
    <div className='h-screen flex flex-col  bg-topography-light'>
      <Navbar></Navbar>
      {/* <div className="flex justify-center items-center  h-full my-auto">
        <div className='flex flex-col justify-center p-8 rounded-lg border'>
          <div className="mx-auto">
            <Image src={logo} height={36} width={64} alt="" />
          </div>
          <ProfileForm />

        </div>
      </div> */}
   
<section className="flex justify-center items-center  h-full w-full">
    <Tabs defaultValue="account" className="w-full  max-w-[700px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <LoginForm />
      </TabsContent>
      <TabsContent value="password">
        <RegisterForm />
      </TabsContent>
    </Tabs>
</section>

    </div>

  );
}

export default Login