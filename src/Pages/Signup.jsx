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
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "@/Contexts/AuthProvidor";
import toast from "react-hot-toast";

const Signup = () => {
  const { emailRegister, updateUser, setError, error, authorizeWithGoogle } =
    use(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleGoogleLogin = () => {
    authorizeWithGoogle()
      .then((result) => {
        toast.success("Sign up successful");
        setError(null);
        const userData = {
          displayName: result.user.displayName,
          email: result.user.email,
          role: "normal",
          createdAt: new Date().toISOString(),
        };
        axios.post("http://localhost:5000/users", userData);
        navigate(state ? state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const imageFile = data.photo[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);
    const imgData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbbApiKey}`,
      imageData
    );
    const imageURL = imgData.data.data.url;
    emailRegister(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL: imageURL })
          .then(() => {
            toast.success("Sign up successful");
            setError(null);
            const userData = {
              displayName: name,
              email: email,
              role: "normal",
              createdAt: new Date().toISOString(),
            };
            axios.post("http://localhost:5000/users", userData);
            reset();
            navigate(state ? state : "/");
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <>
      <Card className="w-full max-w-md shadow-xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-[#D33454] text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-full">
            Enter your details below to create your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="text-[#D33454] cursor-pointer hover:underline text-sm"
            >
              <Link to="/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[#D33454]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="focus-visible:ring-[#D33454] border-gray-300"
                  {...register("name", { required: "Name is required" })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#D33454]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="focus-visible:ring-[#D33454] border-gray-300"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-[#D33454]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
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

              <div className="grid gap-2">
                <Label htmlFor="photo" className="text-[#D33454]">
                  Profile Image
                </Label>
                <div className="w-full border border-dashed border-[#D33454] rounded-md p-4 flex flex-col items-center justify-center text-center text-sm text-[#D33454] cursor-pointer hover:bg-[#fef1f3] transition">
                  <Input
                    id="photo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("photo", {
                      required: "Profile image is required",
                    })}
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    Click to upload or drag your image here
                  </label>
                </div>
              </div>
            </div>
          </CardContent>

          {errors.password && (
            <p className="text-red-500 text-center mt-2">
              {errors.password.message}
            </p>
          )}

          {errors.photo && (
            <p className="text-red-500 text-center mt-2">
              {errors.photo.message}
            </p>
          )}

          {errors.email && (
            <p className="text-red-500 text-center mt-2">
              {errors.email.message}
            </p>
          )}

          {errors.name && (
            <p className="text-red-500 text-center mt-2">
              {errors.name.message}
            </p>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <CardFooter className="flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-[#D33454] hover:bg-[#b72b48] text-white border-none cursor-pointer"
            >
              Sign Up
            </Button>
            <Button
              onClick={handleGoogleLogin}
              type="button"
              variant="outline"
              className="w-full text-[#D33454] border-[#D33454] hover:bg-[#E3D4B4] cursor-pointer"
            >
              <FaGoogle />
              Sign Up with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Signup;
