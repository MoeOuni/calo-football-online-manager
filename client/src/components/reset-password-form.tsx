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

import { IResetPwd } from "@/lib/interfaces";
import { useResetPwd } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_STATUS_CODES } from "@/lib/contants";
import { toast } from "sonner";

const LoginFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@ $ ! % * ? &)"
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export function ResetPasswordForm() {
  const restPwdMutation = useResetPwd();
  const navigate = useNavigate();

  //   Todo create a query hook to check to token validation

  const form = useForm<IResetPwd>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
  });

  async function handleSubmit(data: IResetPwd) {
    const response = await restPwdMutation.mutateAsync(data);

    if (response?.status === API_STATUS_CODES.SUCCESS) {
      navigate("/login");
      toast.success(response.message);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account. Make sure it's
            strong and secure.
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={restPwdMutation.isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={restPwdMutation.isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Password must be 8-32 characters long and include at
                        least one uppercase letter, one lowercase letter, one
                        number, and one special character (@ $ ! % * ? &).
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full"
                  type="submit"
                  disabled={restPwdMutation.isPending}
                >
                  {restPwdMutation.isPending && (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  )}
                  Reset
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
