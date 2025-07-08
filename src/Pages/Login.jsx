import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  return (
    <>
      <Card className="w-full max-w-sm shadow-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-[#D33454] text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="text-[#D33454] cursor-pointer hover:underline text-sm"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#D33454]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="focus-visible:ring-[#D33454] border-gray-300"
                  {...register("email")}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[#D33454]">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-[#D33454] hover:underline underline-offset-4"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="focus-visible:ring-[#D33454] border-gray-300"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUpper: (value) =>
                        /[A-Z]/.test(value) ||
                        "At least one uppercase letter required",
                      hasLower: (value) =>
                        /[a-z]/.test(value) ||
                        "At least one lowercase letter required",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) || "At least one number required",
                      hasSpecial: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "At least one special character required",
                    },
                  })}
                />
              </div>
            </div>
          </CardContent>

          {errors.password && <p className="text-red-500 text-center mt-4">{errors.password?.message}</p>}

          <CardFooter className="flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-[#D33454] hover:bg-[#b72b48] text-white border-none cursor-pointer"
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full text-[#D33454] border-[#D33454] hover:bg-[#E3D4B4] cursor-pointer"
            >
              <FaGoogle />Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Login;
