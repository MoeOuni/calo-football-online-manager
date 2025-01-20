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

import { IForgotPwd } from "@/lib/interfaces";
import { useForgotPwd } from "@/api/auth";
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
import { toast } from "sonner";

const LoginFormSchema = z.object({
  email: z.string().email(),
});

export function ForgotPasswordForm() {
  const forgotPwdMutation = useForgotPwd();
  const navigate = useNavigate();

  const form = useForm<IForgotPwd>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  async function handleSubmit(data: IForgotPwd) {
    const response = await forgotPwdMutation.mutateAsync(data);

    if (response?.status === API_STATUS_CODES.SUCCESS) {
      navigate("/login");
      toast.success(response.message);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6")} >
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
                        <Input
                          {...field}
                          disabled={forgotPwdMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full"
                  type="submit"
                  disabled={forgotPwdMutation.isPending}
                >
                  {forgotPwdMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send Reset Link
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
