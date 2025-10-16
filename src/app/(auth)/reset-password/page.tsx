"use client";

import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { ResetPasswordProps } from "@/types/auth";
import { ResetPasswordErrorProps } from "@/types/error";
import { useState } from "react";

function ResetPassword({ className, ...props }: React.ComponentProps<"form">) {
  const [resetPasswordData, setResetPasswordData] =
    useState<ResetPasswordProps>({
      password: "",
      confirmPassword: "",
    });
  const [resetPasswordError, setResetPasswordError] =
    useState<ResetPasswordErrorProps>({
      passwordError: null,
      confirmPasswordError: null,
    });

  // input validation function
  const validate = () => {
    const { password, confirmPassword } = resetPasswordData;
    let hasError: boolean = false;

    const errors: ResetPasswordErrorProps = {
      passwordError: null,
      confirmPasswordError: null,
    };

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

    setResetPasswordError(errors);
    return !hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    validate();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    // const formData: ResetPasswordData = {
    //   email,
    //   token,
    //   newPassword: resetPasswordData.password,
    // };

    // dispatch(resetPassword(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Create a new password for your account
          </p>
        </div>
        <PasswordField
          label="New Password"
          id="password"
          name="password"
          value={resetPasswordData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={resetPasswordError.passwordError}
        />
        <PasswordField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={resetPasswordData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={resetPasswordError.confirmPasswordError}
        />

        <Field>
          <Button type="submit">
            {status === "loading" ? "Reseting..." : "Reset Password"}
          </Button>
          {/* {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )} */}
        </Field>
      </FieldGroup>
    </form>
  );
}

export default ResetPassword;