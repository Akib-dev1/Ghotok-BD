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

const Signup = () => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
        if (file) {
            // Handle file upload logic here
            console.log("Selected file:", file);
        }
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

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[#D33454]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="focus-visible:ring-[#D33454] border-gray-300"
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
                  required
                  className="focus-visible:ring-[#D33454] border-gray-300"
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
                  required
                  className="focus-visible:ring-[#D33454] border-gray-300"
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
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    Click to upload or drag your image here
                  </label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-[#D33454] hover:bg-[#b72b48] text-white border-none cursor-pointer"
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full text-[#D33454] border-[#D33454] hover:bg-[#E3D4B4] cursor-pointer"
          >
            Sign Up with Google
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Signup;
