'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GoogleSignInButton from "../GoogleSignInButton";

const FormSchema = z.object({
    email: z.string().min(1,'Email is required').email('Invalid Email'),
    password: z.string().min(1,'Password is required').min(8,'Password must have more than 8 characters'),
  })

  const onSubmit = (values:z.infer<typeof FormSchema>) => {
    console.log(values);
  };
const SignInForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

    return  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel >Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your E-mail" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your Password" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
      <Button className="w-full mt-6" type="submit">
        Sign In
      </Button>
    </form>
    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px
        before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
    </div>
    <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
    <p className="text-center text-sm text-gray-600 mt-2">
        Don't have an account? please&nbsp;
        <Link className="text-blue-500 hover:underline" href='/sign-up'>Sign Up</Link>
    </p>
  </Form>;
};

export default SignInForm;