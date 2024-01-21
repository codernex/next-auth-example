"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import FormError from "./form-error";
import { useState, useTransition } from "react";
import FormSuccess from "./form-success";

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm: React.FC<any> = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isTransition, startTransition] = useTransition();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<LoginSchema> = async (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };
  return (
    <CardWrapper
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      headerLabel="Welcome Back"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onsubmit)}>
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
