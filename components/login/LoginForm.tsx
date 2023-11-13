import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import logo from "../../public/autoheven_logo.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { loginReducer } from "@/app/GlobalRedux/Features/carFiltersAndResultsSlice";
import axios from "axios";
import { useState } from "react";
import { clientUsers } from "../../app/GlobalRedux/client";
import { useRouter } from "next/navigation";
const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: zod.infer<typeof formSchema>) {
    clientUsers
      .post(
        "/api/users/token",
        {
          username: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "1",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        const prevUrl = localStorage.getItem("originalUrl");
        if (prevUrl) {
          router.push(prevUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        form.resetField("password");
        form.setError("password", {
          type: "manual",
          message: "Password or email not found",
        });

        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col text-sm rounded-lg border py-12 px-52  bg-background"
      >
        <div className="mx-auto mb-4 ">
          <Image src="/autoheven_logo.svg" height={30} width={64} alt="" />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    setLogin(event.target.value);
                  }}
                />
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
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary">
          Login
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
        <Button
          type="submit"
          className="bg-secondary text-secondary-foreground"
        >
          I&apos;m a dealer
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
        <Link href="/" passHref>
          Forgot your password?
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
