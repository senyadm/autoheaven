import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { Locale } from "@/src/app/i18n.config";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

const LoginPage = ({
  params,
}: {
  params: { lang: Locale };
}) => {
  return (
    <section className="flex justify-center items-center  h-full w-full">
      <Tabs defaultValue="account" className="w-full max-w-[700px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <LoginForm lang={params?.lang || "en"} />
        </TabsContent>
        <TabsContent value="password">
          <RegisterForm lang={params?.lang || "en"} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default LoginPage;
