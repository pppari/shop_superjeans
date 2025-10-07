"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";

const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm({ className, ...props }) {
  const token = getToken();
  const userId = token ? jwtDecode(token).id : null;
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {

      const response = await axios.put(`/api/auth/change-password/${userId}`, {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      toast.success(response.data.message || "เปลี่ยนรหัสผ่านสำเร็จ");
      router.push("/signout");
    } catch (error) {
      const message = error?.response?.data?.message || "การเปลี่ยนรหัสผ่านล้มเหลว";
      toast.error(message);
      form.setError("root", { type: "manual", message });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">เปลี่ยนรหัสผ่าน</h1>
          <p className="text-muted-foreground text-sm">
            กรุณากรอกรหัสผ่านเดิมและรหัสผ่านใหม่เพื่อเปลี่ยนรหัสผ่าน
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รหัสผ่านเดิม</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="กรอกรหัสผ่านเดิม"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รหัสผ่านใหม่</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="กรอกรหัสผ่านใหม่"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                <FormLabel>ยืนยันรหัสผ่านใหม่</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : (
              "บันทึกรหัสผ่านใหม่"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/" className="underline underline-offset-4 hover:text-primary">
            กลับหน้าหลัก
          </Link>
        </div>
      </form>
    </Form>
  );
}