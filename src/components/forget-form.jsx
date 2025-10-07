import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "../lib/axios";
import { toast } from "sonner"; // or whatever toast library you're using

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
import { Loader2 } from "lucide-react";

// Only email is required for forget password
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function ForgetForm({ className, ...props }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/auth/forgot", values);
      toast.success(response.data.message);
      form.reset(); // Reset the whole form, not just a single field
    } catch (error) {
      const message = error?.response?.data?.message || "Request failed";
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
          <h1 className="text-2xl font-bold">ลืมรหัสผ่าน</h1>
          <p className="text-muted-foreground text-sm text-balance">
            ป้อนอีเมลของคุณด้านล่างเพื่อส่งคำขอรีเซ็ตรหัสผ่านไปยังอีเมล
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                    {...field}
                  />
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
              <Loader2 className="animate-spin text-black mx-auto" size={20} />
            ) : (
              "ส่งคำขอ"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/signin" className="ml-2 underline underline-offset-4">
            กลับไปเข้าสู่ระบบ
          </Link>
        </div>
      </form>
    </Form>
  );
}
