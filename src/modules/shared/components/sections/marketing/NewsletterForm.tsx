'use client';

import { useState, useRef, useEffect } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    try {
      // Mock API call to subscribe the email
      console.log(`Subscribing email: ${data.email}`);
      // Replace with actual API call to your backend
      // await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: data.email }),
      // });

      setIsSubscribed(true);
      reset();
    } catch (error) {
      console.error("Failed to subscribe:", error);
      alert("Failed to subscribe. Please try again later.");
    }
  };

  useEffect(() => {
    if (!isSubscribed && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isSubscribed]);

  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-bold text-[#213555] mb-4">
        Stay Updated with Our Newsletter
      </h3>
      <p className="text-gray-600 mb-6">
        Subscribe to get the latest tech news and exclusive offers delivered to your inbox.
      </p>
      {isSubscribed ? (
        <div>
          <p className="text-[#4F709C] font-medium mb-4">
            Thank you for subscribing! Check your inbox for updates.
          </p>
          <Button
            onClick={() => setIsSubscribed(false)}
            className="bg-[#4F709C]/10 text-[#4F709C] hover:bg-[#4F709C] hover:text-white transition-all duration-300"
          >
            Subscribe Again
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
        >
          <div className="relative w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              ref={(e) => {
                emailInputRef.current = e;
                register("email").ref(e);
              }}
              className={`border-[#4F709C]/20 focus:border-[#4F709C] focus:ring-[#4F709C] text-[#213555] ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#4F709C] text-white hover:bg-[#213555] transition-all duration-300"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  );
}