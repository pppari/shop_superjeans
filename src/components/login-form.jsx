import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("/api/auth/login", values);
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success("เข้าสู่ระบบสำเร็จ ระบบกำลังพาคุณกลับไปหน้าหลัก")
      router.push("/");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      form.setError("root", { message });
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
          <h1 className="text-2xl font-bold">เข้าสู่ระบบบัญชีของคุณ</h1>
          <p className="text-muted-foreground text-sm text-balance">
            ป้อนอีเมลของคุณด้านล่างเพื่อเข้าสู่ระบบบัญชีของคุณ
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
                  <Input placeholder="m@example.com" type="email" {...field} />
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
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
            {form.formState.isSubmitting ? <Loader2 className="animate-spin text-black mx-auto" size={48} /> : "เข้าสู่ระบบ"}
          </Button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            กลับหน้าหลัก
          </Link>
        </div>

        <div className="text-center text-sm">
          ยังไม่มีบัญชีใช่ไหม?
          <Link href="/signup" className="ml-2 underline underline-offset-4">
            สมัครสมาชิก
          </Link>
        </div>
      </form>
    </Form>
  );
}
