"use client";
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
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientUsers } from "../../app/GlobalRedux/client";
import { useRouter } from "next/navigation";
import {
  getOriginalUrl,
  saveToken,
} from "@/utils/auth";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/GlobalRedux/profile/userSlice";
import { useEffect, useState } from "react";
import { AuthTranslations } from "@/types";
import { getlocales } from "@/app/actions";
import { Locale } from "@/i18n.config";
import qs from 'qs';


const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

interface LoginFormProps {
  lang: Locale;
}

const LoginForm: React.FC<LoginFormProps> = ({ lang }) => {

  const [dict, setDict] = useState<AuthTranslations | null>(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const { auth } = await getlocales(lang)
        setDict(auth)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!dict) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])
  
  const dispatch = useDispatch();
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
      "/api/users/token/",
      new URLSearchParams({
        username: values.email,
        password: values.password,
      }),
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      saveToken(response.data.access_token);
      dispatch(setUser(response.data));
      const prevUrl = getOriginalUrl();
      if (prevUrl) {
        router.push(prevUrl);
      } else {
        router.push(`/${lang}`);
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
              {dict?.emailLabel || 'Username'} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  {...field}
                  type="email"
                  onChange={(event) => {
                    field.onChange(event.target.value);
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
              {dict?.passwordLabel || 'Password'} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  type="password"
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
        {dict?.loginButton || 'Login'}
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
        <Button
          type="submit"
          className="bg-secondary text-secondary-foreground"
        >
          {dict?.dealerButton || `I'm a dealer`}
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
        <Link href="/" passHref>
        {dict?.forgotPasswordLink || 'Forgot your password?'}
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
