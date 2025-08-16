import React, { use } from "react";
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
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "@/Contexts/AuthProvidor";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { authorizeWithGoogle, error, setError, emailLogin } = use(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    emailLogin(email, password)
      .then(() => {
        toast.success("Login successful");
        setError(null);
        navigate(state ? state : "/");
        reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    authorizeWithGoogle()
      .then((result) => {
        toast.success("Login successful");
        setError(null);
        const userData = {
          displayName: result.user.displayName,
          email: result.user.email,
          role: "normal",
          isPremium: false,
          createdAt: new Date().toISOString(),
        };
        axios.post(
          "https://b11a12-server-side-akib-dev1.vercel.app/users",
          userData
        );
        navigate(state ? state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <>
      <Card className="w-full max-w-sm shadow-xl border border-gray-200 bg-white dark:bg-[#1F1F1F] dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#D33454] dark:text-[#FF5C7A] text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground dark:text-gray-300">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="text-[#D33454] dark:text-[#FF5C7A] cursor-pointer hover:underline text-sm"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-[#D33454] dark:text-[#FF5C7A]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="focus-visible:ring-[#D33454] dark:focus-visible:ring-[#FF5C7A] border-gray-300 dark:border-gray-600 dark:bg-[#2A2A2A] dark:text-gray-200"
                  {...register("email")}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-[#D33454] dark:text-[#FF5C7A]"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-[#D33454] dark:text-[#FF5C7A] hover:underline underline-offset-4"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="focus-visible:ring-[#D33454] dark:focus-visible:ring-[#FF5C7A] border-gray-300 dark:border-gray-600 dark:bg-[#2A2A2A] dark:text-gray-200"
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

          {errors.password && (
            <p className="text-red-500 dark:text-red-400 text-center mt-4">
              {errors.password?.message}
            </p>
          )}

          {error && (
            <p className="text-red-500 dark:text-red-400 text-center mt-4">
              {error}
            </p>
          )}

          <CardFooter className="flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#b72b48] dark:hover:bg-[#D33454] text-white border-none cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={handleGoogleLogin}
              type="button"
              variant="outline"
              className="w-full text-[#D33454] dark:text-[#FF5C7A] border-[#D33454] dark:border-[#FF5C7A] hover:bg-[#E3D4B4] dark:hover:bg-[#2A2A2A] cursor-pointer flex items-center justify-center gap-2"
            >
              <FaGoogle />
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Login;
