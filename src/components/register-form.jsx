"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const registerSchema = z
  .object({
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีความยาว 8 ตัวอักษรขึ้นไป" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }) {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [accept, setAccept] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
      });

      setShowSuccessModal(true);
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      form.setError("root", { message });
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/signin");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">สร้างบัญชีใหม่</h1>
            <p className="text-muted-foreground text-sm text-balance">
              ป้อนอีเมลของคุณด้านล่างเพื่อสร้างบัญชีใหม่
            </p>
          </div>

          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={accept}
                onCheckedChange={(checked) => setAccept(!!checked)}
              />

              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none flex peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span>ยอมรับ</span>
                <Link href="/privacy" target="_blank" className="ml-1 text-blue-500 hover:underline">
                  ข้อกำหนดและเงื่อนไข
                </Link>
              </label>
            </div>

            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !accept}
            >
              {form.formState.isSubmitting ? (
                <Loader2
                  className="animate-spin text-black mx-auto"
                  size={48}
                />
              ) : (
                "ลงทะเบียน"
              )}
            </Button>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              กลับหน้าหลัก
            </Link>
          </div>

          <div className="text-center text-sm">
            มีบัญชีอยู่แล้วใช่ไหม?{" "}
            <Link href="/signin" className="underline underline-offset-4">
              เข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </Form>

      {/* Success Modal */}
      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex gap-2 items-center">
                <CheckCircle color="green" />
                <p>สมัครสมาชิกสำเร็จ</p>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีของคุณก่อนเข้าใช้งาน
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleContinue}>
              เข้าสู่ระบบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
