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
import Link from "next/link";
import { useState } from "react";

export function RegistrationPage({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
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
          {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )}
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
