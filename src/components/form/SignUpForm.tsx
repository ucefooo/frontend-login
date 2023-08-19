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

const FormSchema = z
.object({
    username: z.string().min(1,'Username is required').max(30),
    email: z.string().min(1,'Email is required').email('Invalid Email'),
    password: z.string().min(1,'Password is required').min(8,'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1,'Password confirmation is required').min(8,'Password must have more than 8 characters'),
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})


  const onSubmit = (values:z.infer<typeof FormSchema>) => {
    console.log(values);
  };
const SignUpForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
      })

    return  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel >Username</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Re-Enter your Password</FormLabel>
                    <FormControl>
                    <Input placeholder="Re-Enter your Password" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
      <Button className="w-full mt-6" type="submit">
        Sign Up
      </Button>
    </form>
    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px
        before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
    </div>
    <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
    <p className="text-center text-sm text-gray-600 mt-2">
        Don't have an account? please&nbsp;
        <Link className="text-blue-500 hover:underline" href='/sign-in'>Sign In</Link>
    </p>
  </Form>;
};

export default SignUpForm;