"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/modules/shared/hooks/use-toast";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupValues) {
    setIsLoading(true);
    // TODO: Implement actual signup logic
    console.log("Signup:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
    setIsLoading(false);
    toast({
      title: "Account created successfully",
      description: "Welcome to TechGear!",
    });
    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your details to sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="Enter your name"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MailIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </motion.div>
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
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            className="pl-10 py-6 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Log in
              </Link>
            </div>
            <div className="text-sm text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
