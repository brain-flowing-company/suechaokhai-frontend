"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password should have at least 8 characters")
    .max(20, "password should be no longer than 20 characters")
    .refine(
      (value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value),
      "password should contain at least 1 alphabet and 1 number"
    ),
  confirmPassword: z
    .string()
    .min(8, "password should have at least 8 characters")
    .max(20, "password should be no longer than 20 characters")
    .refine(
      (value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value),
      "password should contain at least 1 alphabet and 1 number"
    ),
});

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Password not match",
        description: "Please re-enter your password",
      });
      form.reset(
        {
          email: values.email,
          password: "",
          confirmPassword: "",
        },
        { keepValues: false, keepErrors: false }
      );
      setIsLoading(false);
      return;
    }
    await sleep(5000);
    toast({
      title: "Register successfully",
      description: "You can now login to your account",
    });
    form.reset(
      {
        email: "",
        password: "",
        confirmPassword: "",
      },
      { keepValues: false, keepErrors: false }
    );
    setIsLoading(false);
  }
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: #b8b8b8;
        }

        #__next {
          height: 100%;
        }
      `}</style>
      <div className="h-screen w-screen bg-[#b8b8b8]">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <Image
                src="/img/login-register/comp-icon.svg"
                alt="test"
                width={80}
                height={80}
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email : </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email here"
                            {...field}
                            disabled={isLoading}
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
                        <FormLabel>Password : </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password here"
                            type="password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password : </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Re-enter your password here"
                            type="password"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className=" w-full bg-ci-blue font-bold text-white hover:bg-blue-500"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      "Register"
                    ) : (
                      <Image
                        src=" /img/loading.svg"
                        alt="test"
                        width={20}
                        height={20}
                        className=" animate-spin"
                      />
                    )}
                  </Button>
                  <p className="text-center text-sm leading-6 text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className=" font-bold pl-3 text-bg-blue-600 transition duration-150 ease-in-out hover:text-blue-400 sm:pl-4 lg:pl-5"
                    >
                      Login
                    </a>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
