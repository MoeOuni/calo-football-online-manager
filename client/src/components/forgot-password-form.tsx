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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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

    if (response?.data) {
      setIsAuthorized(true);
      setUser(response.data);
      navigate("/");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password ?</CardTitle>
          <CardDescription>
            Enter your email address below, and we’ll send you instructions to
            reset your password.
          </CardDescription>
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
            <p className="text-center text-sm ">
              Remembered your password?{" "}
              <Link
                className="underline-offset-4 hover:underline text-green-600 font-bold"
                to={"/login"}
              >
                Log in here.
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
