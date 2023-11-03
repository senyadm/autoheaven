"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/autoheven_logo.svg";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ArrowLeftIcon, EnterIcon } from "@radix-ui/react-icons";
import { MoveLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { Navbar } from "@/components/shared/header/Navbar";

const Login = () => {
  return (
    

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

  );
};

export default Login;
