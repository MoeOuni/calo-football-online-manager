import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ILogin } from "@/lib/interfaces";
import { useLogin } from "@/api/auth";
import { useAuth } from "@/providers/authentication-provider";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_STATUS_CODES } from "@/lib/contants";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export function LoginForm() {
  const { setUser, setIsAuthorized } = useAuth();
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const form = useForm<ILogin>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function handleSubmit(data: ILogin) {
    const response = await loginMutation.mutateAsync(data);

    if (response?.data?.status === API_STATUS_CODES.SUCCESS) {
      setIsAuthorized(true);
      setUser(response?.data?.data);
      navigate("/");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login to your account to proceed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loginMutation.isPending} />
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
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to={"/forgot-password"}
                          className="ml-auto text-sm underline-offset-4 hover:underline font-bold text-green-600"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loginMutation.isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full"
                  type="submit"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
