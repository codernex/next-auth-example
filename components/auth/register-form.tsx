"use client";
import { register } from "@/actions/login";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper";
import FormError from "./form-error";
import FormSuccess from "./form-success";

type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC<any> = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isTransition, startTransition] = useTransition();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onsubmit: SubmitHandler<RegisterSchema> = async (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };
  return (
    <CardWrapper
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      headerLabel="Welcome Back"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="name"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="email"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="password"
            control={form.control}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isTransition} className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
