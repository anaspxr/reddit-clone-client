import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import axios, { axiosErrorCatch } from "@/lib/axios";

export default function OtpVerify({
  email,
  setStep,
}: {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendTime, setResendTime] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sending) {
      setTimeout(() => {
        setSending(false);
      }, 3000);
    }

    if (!sending) {
      // Start countdown when sending is true
      const interval = setInterval(() => {
        setResendTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setSending(false); // Stop sending once timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [sending]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 6) return;
    // Allow only numeric characters
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("/auth/register/verify", { otp: value, email });
      setStep(3);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        title="Back to Sign In options"
        variant="ghost"
        onClick={() => setStep(1)}
        className="absolute top-4 left-4 ">
        <ArrowLeft />
      </Button>
      <form onSubmit={handleContinue} className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Verify</h1>
          <p className="text-gray-700 text-sm">
            {sending
              ? "Sending OTP..."
              : "A OTP has been sent to your email address. Please enter the OTP to verify your email address."}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold" htmlFor="otp">
            Enter OTP
          </Label>
          <Input
            className="h-16 px-8"
            style={{
              fontSize: "1.5rem",
              letterSpacing: "1.5rem",
            }}
            autoFocus
            id="otp"
            name="otp"
            type="text"
            value={value}
            onChange={handleChange}
          />
          {error && <p className="text-sm ml-4 text-red-500">{error}</p>}
        </div>

        {!sending && resendTime > 0 && (
          <p className="text-sm text-gray-500">Resend OTP in {resendTime}s</p>
        )}
        {resendTime === 0 && !sending && (
          <p
            onClick={() => {
              setSending(true);
              setResendTime(30);
            }}
            className="text-sm text-blue-500 cursor-pointer">
            Resend OTP
          </p>
        )}

        <Button
          disabled={sending || loading || value.length < 6}
          className="bg-main hover:bg-main py-4 hover:opacity-80 w-full h-12 font-semibold">
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </>
  );
}
