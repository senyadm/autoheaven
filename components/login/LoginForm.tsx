import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import Image from 'next/image'
import logo from '../../public/autoheven_logo.svg'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useAppStore} from '@/app/GlobalRedux/useStore' 
import { loginReducer } from '@/app/GlobalRedux/Features/carFiltersAndResultsSlice';
import axios from 'axios'
import { useState } from "react";
const formSchema = zod.object({
  email: zod.string(),
  password: zod.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  // acceptedTAC: zod.boolean(),
});

const LoginForm: React.FC = () => {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // acceptedTAC: false,
    },
  })
 const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

const [carBrands, dispatch] = useAppStore((state: any) => state.carFiltersAndResults.carBrands)



  function onSubmit(values: zod.infer<typeof formSchema>) {
const backendURL = "https://eca9-89-232-63-67.ngrok-free.app/api/token";

// dispatch(loginReducer({ username: values.email, password: values.password }))
//   .unwrap()
//   .then((response) => {
//     // Handle success
//     console.log("Logged in successfully:", response);
//   })
//   .catch((error) => {
//     // Handle error
//     console.error("Login failed:", error);
//   });


// axios.post(backendURL, {
//   'username': values.email,
//   'password': values.password,
// }, {
//   headers: {
//     'Content-Type': 'application/json',
//     'ngrok-skip-browser-warning': '1',
        
//   }
// })
//   .then(response => {
//    console.log("logged")
//   })
//   .catch(error => {
//     console.log(error)
//   });

async function logUserIn() {
  try {
    const requestBody = {
      id: 1,
      name: 'bobby hadz',
      salary: 100,
    };

    const response = await axios.post(
      backendURL,
      requestBody,
      {
        auth: {
          username: 'YOUR_USERNAME',
          password: 'YOUR_PASSWORD',
        },

        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err.message);
    console.log(err.response.status);
  }
}

logUserIn().then(data => {
  console.log(data);
});
  }

  return (
    <Form {...form}>
       
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col text-sm rounded-lg border py-12 px-52  bg-background">
       
        <div className="mx-auto mb-4 ">
          <Image
            src="/autoheven_logo.svg"
            height={30}
            width={64}
            alt=""
          />
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
                <Input placeholder="user@example.com"  
                
                {...field} 
                onChange={
                  (event)=>{
                    field.onChange(event.target.value);
                    setLogin(event.target.value);
                  }
                  }
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
                <Input placeholder="********" {...field} 
                
                onChange={
                  (event)=>{
                    field.onChange(event.target.value);
                    setPassword(event.target.value);
                  }
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit" className='bg-primary'>Login<ArrowRight width={16} height={16} className='ml-2'/></Button>
        <Button type="submit" className='bg-secondary text-secondary-foreground'>I&apos;m a dealer<ArrowRight width={16} height={16} className='ml-2'/></Button>
        <Link href='/' passHref>Forgot your password?</Link>
      </form>
    </Form>
  );
};

export default LoginForm;
