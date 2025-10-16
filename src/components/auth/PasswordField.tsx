"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import Link from "next/link";

// Helper component for each validation rule
const ValidationRule = ({
  text,
  isValid,
}: {
  text: string;
  isValid: boolean;
}) => (
  <li className={`text-sm ${isValid ? "text-green-600" : "text-gray-500"}`}>
    {isValid ? "✓" : "•"} {text}
  </li>
);

// The main password field component
interface PasswordFieldProps {
  label: string;
  value: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required: boolean;
  error: string | null;
  isForgetPasswordRequired?: boolean;
}

export function PasswordField({
  label,
  value,
  id,
  name,
  onChange,
  onBlur,
  required,
  error,
  isForgetPasswordRequired
}: PasswordFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasLower: false,
    hasUpper: false,
    hasDigit: false,
    hasSpecial: false,
  });
  const [strength, setStrength] = useState(0); // 0: none, 1: poor, 2: medium, 3: strong

  useEffect(() => {
    const password = String(value || "");
    const newValidations = {
      minLength: password.length >= 8,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setValidations(newValidations);

    const score = Object.values(newValidations).filter(Boolean).length;
    if (score <= 2) setStrength(1); // Poor
    else if (score <= 4) setStrength(2); // Medium
    else if (score === 5) setStrength(3); // Strong
    else setStrength(0);
  }, [value]);

  const strengthColors = [
    "bg-gray-200",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
  ];
  const strengthLabels = ["N/A", "Poor", "Medium", "Strong"];
  const handleInternalBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(e);
  };

  return (
    <Field className="relative">
      <div className="flex justify-between">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {isForgetPasswordRequired && (
          <Link
            href="/forgot-password"
            className="ml-auto text-sm underline-offset-4 hover:underline text-gray-400"
          >
            Forgot your password?
          </Link>
        )}
      </div>
      <Input
        type="password"
        value={value}
        id={id}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInternalBlur}
        onChange={onChange}
        required={required}
      />

      {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}

      {/* --- The Validation "Popup" Box --- */}
      {isFocused && (
        <div className="absolute left-full top-0 ml-4 p-4 w-64 bg-white border rounded-lg shadow-lg z-10">
          <p className="text-sm font-semibold mb-2 text-[#333]">
            Password Strength: {strengthLabels[strength]}
          </p>
          <div className="flex gap-1 h-2 mb-4">
            <div
              className={`flex-1 rounded ${
                strength >= 1 ? strengthColors[strength] : strengthColors[0]
              }`}
            ></div>
            <div
              className={`flex-1 rounded ${
                strength >= 2 ? strengthColors[strength] : strengthColors[0]
              }`}
            ></div>
            <div
              className={`flex-1 rounded ${
                strength >= 3 ? strengthColors[strength] : strengthColors[0]
              }`}
            ></div>
          </div>
          <ul className="space-y-1">
            <ValidationRule
              text="At least 8 characters long"
              isValid={validations.minLength}
            />
            <ValidationRule
              text="One lowercase letter (a-z)"
              isValid={validations.hasLower}
            />
            <ValidationRule
              text="One uppercase letter (A-Z)"
              isValid={validations.hasUpper}
            />
            <ValidationRule
              text="One number (0-9)"
              isValid={validations.hasDigit}
            />
            <ValidationRule
              text="One special character (!@#...)"
              isValid={validations.hasSpecial}
            />
          </ul>
        </div>
      )}
    </Field>
  );
}
