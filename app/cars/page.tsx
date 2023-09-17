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
import Footer from '@/components/Footer'
import CarSearchResults from '@/components/cars/CarSearchResults'


const Cars = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar></Navbar>
   
<main className="flex justify-center items-center  h-full w-full">
    <CarSearchResults />
</main>
    <Footer></Footer>
    </div>

  );
}

export default Cars