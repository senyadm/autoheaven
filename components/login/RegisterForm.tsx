"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Badge } from "../ui/badge";
import { clientUsers } from "../../app/GlobalRedux/client";

clientUsers.get("/api/users").then((response) => {
  console.log("GET request successful:", response.data);
});

const formSchema = zod.object({
  firstname: zod.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  lastname: zod.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  phone: zod
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
      message: "Invalid phone number. Please enter a valid phone number.",
    }),
  email: zod
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email(),
  password: zod
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    // .refine((password) => /[A-Z]/.test(password), {
    //   message: "Password must contain at least one uppercase letter", // Capital letters
    // })
    .refine(
      (password) => /[!@#$%^&*()_+[\]{};':"\\|,.<>?/\\-]/.test(password),
      {
        message:
          "Password must contain at least one symbol (!@#$%^&*()_+[]{};:'\"\\|,.<>?/-)",
      }
    ),
  acceptedTAC: zod.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

interface LoginFormProps {
  lang: string;
}

const RegisterForm: React.FC<LoginFormProps> = ({ lang }) => {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      acceptedTAC: false,
    },
  });
  console.log("clientUsers", clientUsers);
  function onSubmit(values: zod.infer<typeof formSchema>) {
    const { firstname, lastname, email, password, phone } = values;
    const requestBody = {
      username: email,
      email: email,
      is_active: true,
      user_info: {
        name: firstname,
        surname: lastname,
        country: "string",
        city: "string",
        address: "string",
        phone,
      },
      password: password,
    };
    clientUsers
      .post("/api/users/register", requestBody)
      .then((response) => {
        // Handle success, e.g., response.data contains the response data
        console.log("POST request successful:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("POST request failed:", error);
      });

    // The rest of your form submission logic
    // {
    //   "username": "string",
    //   "email": "string",
    //   "is_active": true,
    //   "user_info": {
    //     "name": "string",
    //     "surname": "string",
    //     "country": "string",
    //     "city": "string",
    //     "address": "string"
    //   },
    //   "password": "string"
    // }
  }
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [canRegister, setCanRegister] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    console.log("new pass", newPassword);
    setPassword(newPassword);
    const [isLong, hasLetters, hasSymbols] = [
      newPassword.length >= 8,
      /[a-zA-Z]/g.test(newPassword),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword),
    ];
    setPasswordStrength([isLong, hasLetters, hasSymbols]);
    setCanRegister(isLong && hasLetters && hasSymbols);
    console.log(passwordStrength, " ", canRegister);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col text-sm rounded-lg border py-12 px-12 md:px-32 bg-background"
      >
        <div className="mx-auto mb-4 w-16 h-[30px] relative">
          <Image
            src={"/img/logo/AutoHeaven.svg"}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="flex  space-x-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
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
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
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
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    handlePasswordChange(event);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2 text-primary-foreground">
          {["More than 8 characters", "Letters", "Symbols"].map(
            (text, index) => (
              <Badge
                key={index}
                variant={passwordStrength[index] ? "default" : "outline"}
                className={`${
                  passwordStrength[index]
                    ? "bg-green-500 text-primary-foreground"
                    : "bg-background text-primary"
                }  border rounded-lg`}
              >
                {text}
                <div className="bg-green-500 bg-background text-primary-foreground"></div>
              </Badge>
            )
          )}
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
              <FormLabel>Accept terms and conditions</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary" disabled={!canRegister}>
          Register
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
        <Button
          type="submit"
          className="bg-secondary text-secondary-foreground"
        >
          I&apos;m a dealer
          <ArrowRight width={16} height={16} className="ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
