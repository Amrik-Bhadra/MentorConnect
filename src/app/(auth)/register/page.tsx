"use client";

import { PasswordField } from "@/components/auth/PasswordField";
import TermsCondition from "@/components/auth/TermsCondition";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignupDataProps } from "@/types/auth";
import { SignupErrorProps } from "@/types/error";
import Link from "next/link";
import { useState } from "react";
import { UserRoles } from "@/types/auth";
import { SelectComponent } from "@/components/common/SelectComponent";
import { roleList } from "@/constants/auth.constants";

function RegistrationPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [signupData, setSignupData] = useState<SignupDataProps>({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [signupError, setSignupError] = useState<SignupErrorProps>({
    nameError: null,
    emailError: null,
    roleError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // input validation function
  const validate = () => {
    const { name, role, email, password, confirmPassword } = signupData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError: boolean = false;
    const errors: SignupErrorProps = {
      nameError: null,
      roleError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    };

    if (!name) {
      errors.nameError = "Name is required";
      hasError = true;
    } else {
      errors.nameError = null;
    }

    if (!role) {
      errors.roleError = "Role is required";
      hasError = true;
    } else {
      errors.roleError = null;
    }

    // email validation
    if (!email) {
      errors.emailError = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(email)) {
      errors.emailError = "Please enter a valid email address";
      hasError = true;
    } else {
      errors.emailError = null;
    }

    // password validation
    if (!password) {
      errors.passwordError = "Password is required";
      hasError = true;
    } else {
      errors.passwordError = null;
    }

    // confirm password validation
    if (!confirmPassword) {
      errors.confirmPasswordError = "Confirm password is required";
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPasswordError =
        "Confirm password and password does not match";
      hasError = true;
    } else {
      errors.confirmPasswordError = null;
    }

    setSignupError(errors);
    return !hasError;
  };

  const handleBlur = () => {
    validate();
  };

  const handleRoleChange = (value: string) => {
    setSignupData({ ...signupData, role: value as UserRoles });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Your Fullname"
            value={signupData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {signupError.nameError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {signupError.nameError}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            value={signupData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {signupError.emailError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {signupError.emailError}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Role</FieldLabel>
          <SelectComponent
            onChange={handleRoleChange}
            value={signupData.role}
            itemList={roleList}
            placeholder="Select Role"
          />
          {signupError.roleError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {signupError.roleError}
            </p>
          )}
        </Field>
        <PasswordField
          label="Password"
          id="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={signupError.passwordError}
        />
        <PasswordField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={signupError.confirmPasswordError}
        />

        <TermsCondition />

        <Field>
          <Button type="submit">
            {status === "loading" ? "Creating Account..." : "Create Account"}
          </Button>
          {/* {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )} */}
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default RegistrationPage;
