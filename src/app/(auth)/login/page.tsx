"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { LoginDataProps } from "@/types/auth";
import { LoginErrorProps } from "@/types/error";
import { PasswordField } from "@/components/auth/PasswordField";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { loginUser } from "@/store/slices/auth.slice";

function LoginPage({ className, ...props }: React.ComponentProps<"form">) {
  const [loginData, setLoginData] = useState<LoginDataProps>({
    email: "",
    password: "",
  });
  const [dataError, setDataError] = useState<LoginErrorProps>({
    emailError: null,
    passwordError: null,
  });

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);


  // function to validate
  const validateEmail = () => {
    const { email } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError: boolean = false;

    if (!email) {
      setDataError({ ...dataError, emailError: "Email is required" });
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setDataError({
        ...dataError,
        emailError: "Please enter a valid email address",
      });
      hasError = true;
    } else {
      setDataError({ ...dataError, emailError: null });
    }

    return !hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateEmail();
    if (isValid) {
      dispatch(loginUser(loginData));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
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
            value={loginData.email}
            required
          />
          {dataError.emailError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {dataError.emailError}
            </p>
          )}
        </Field>
        <PasswordField
          label="Password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={dataError.passwordError}
          isForgetPasswordRequired={true}
        />
        <Field>
          <Button type="submit">
            {status === "loading" ? "Signing In..." : "Login"}
          </Button>
          {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )}
        </Field>
        {/* <FieldSeparator>Or continue with</FieldSeparator> */}
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Register
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default LoginPage;
