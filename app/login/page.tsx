"use client";
import React, { useEffect } from "react";
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
import { useRouter } from "next/navigation";
import useLoginRedirect from "../../hooks/useLoginRedirect";
import { getToken, validateToken } from "../../utils/auth";

const Login = () => {
  const router = useRouter();
  const accessToken = getToken();
  const redirectToLogin = useLoginRedirect();
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (accessToken) {
        const isValid = await validateToken();
        if (isValid) {
          console.log("valid token");
          router.push("/");
        } else {
          setIsAuthenticated(false);
        }
      }
    };
    checkAuthentication();
  }, [accessToken, redirectToLogin, router]);
  if (isAuthenticated) {
    return <></>;
  } else {
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
  }
};

export default Login;
