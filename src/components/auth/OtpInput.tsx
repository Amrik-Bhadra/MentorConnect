import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { OtpInputProps } from "@/types/auth";

const OtpInput = ({ value, onChange }: OtpInputProps) => {
  return (
    <InputOTP maxLength={6} value={value} onChange={onChange}>
      <InputOTPGroup>
        <InputOTPSlot
          index={0}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
        <InputOTPSlot
          index={1}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
        <InputOTPSlot
          index={2}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
        <InputOTPSlot
          index={3}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
        <InputOTPSlot
          index={4}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
        <InputOTPSlot
          index={5}
          style={{ padding: "1.5rem", fontSize: "1.5rem" }}
        />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OtpInput;
