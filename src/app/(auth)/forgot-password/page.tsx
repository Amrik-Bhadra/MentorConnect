"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required!");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address!");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail()) {
      return;
    }

    // dispatch(forgotPassword(email));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your registered email address to get reset link
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={email}
              required
            />
            {emailError && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>{emailError}</p>
            )}
          </Field>
          <Field>
            <Button type="submit">
              {status === "loading" ? "Sending..." : "Send Verification Link"}
            </Button>
            {/* {status === "failed" && error && (
              <p style={{ color: "red" }}>{error}</p>
            )} */}
          </Field>
        </FieldGroup>
      </form>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center items-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold mt-4">
              Link Sent Successfully
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              A password reset link has been sent to <br />
              {/* <strong className="text-foreground">{emailForOtp}</strong>. */}
              <br /> Please check your inbox.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full" onClick={() => setIsModalOpen(false)}>
                Back to Login
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPassword;