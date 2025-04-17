"use client";
// import FormInput from "@/components/FormInput";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/use-auth";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import { Loader, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import AuthForm from "../AuthForm";
// import CountryPicker from "@/components/CountryPicker";
import Link from "next/link";
import { Apple, Google, Lock, X } from "@/components/svgs";
import FormInput from "@/components/FormInput";
import CountryPicker from "@/components/CountryPicker";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  // const { loginPayload, isLoading, setLogin, validateLogin, setLoading } =
  //   useAuth();
  // const [lastPath, setLastPath] = React.useState<string>("/");
  // const { toast } = useToast();
  // const route = useRouter();
  // React.useEffect(() => {
  //   const lastVisitedPath = localStorage.getItem("lastVisitedPath");
  //   setLastPath(lastVisitedPath || "/");
  // }, []);
  // const handleLogin = async (event: React.FormEvent) => {
  //   event.preventDefault(); // Prevent default form submission
  //   try {
  //     //   const response = await login();
  //     //   if (response) {
  //     if (true) {
  //       // toast({ title: response.message, variant: "default" });
  //       // toast({ title: "logged in", variant: "default" });
  //       setLoading(true);
  //       setTimeout(() => {
  //         if (lastPath !== "/") {
  //           setLoading(false);
  //           route.replace(lastPath);
  //         } else route.replace("/passenger/home");
  //       }, 1500);
  //     }
  //   } catch (err) {
  //     const error = err as Error;
  //     toast({ title: error.message, variant: "destructive" });
  //   }
  // };

  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");


  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "phoneNumber") {
      setPhoneNumber(value.replace(/^0/, ""));
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("https://jbuit.org/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+234${phoneNumber}`,
          password: password,
        }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }
      
      // ✅ Store in sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(data));
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        console.log(user.user?.id);
        sessionStorage.setItem("userId", user.user?.id || "");
        sessionStorage.setItem("email", user.user?.email || "");
        sessionStorage.setItem("imageUrl", user.user?.image_url || "");
        sessionStorage.setItem("fullName", user.user?.fullName || "");
        sessionStorage.setItem("phoneNumber", user.user?.phone || "");
      }      
      // ✅ Redirect
      router.push("/passenger/home");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  
  




  return (
    <AuthForm showCarousel>
      {/* <form className={cn("flex flex-col gap-6")} onSubmit={handleLogin}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xl md:text-3xl font-semibold capitalize">
            Welcome Back! 🤩
          </span>
          <p className="text-balance text-sm text-muted-foreground">
            Let’s get you back to your parcels
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <FormInput
              leading={
                <div className="w-16_ overflow-visible">
                  <CountryPicker />
                </div>
              }
              id="phone"
              type="phone"
              placeholder="080 **** ****"
              onChange={(e) => setLogin("phone", e.target.value)}
              value={loginPayload.phone}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto text-xs md:text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <FormInput
              leading={<Lock />}
              id="password"
              type="password"
              onChange={(e) => setLogin("password", e.target.value)}
              value={loginPayload.password}
            />
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!validateLogin()}>
            {isLoading && <Loader className="animate-spin" />}
            Login
          </Button>
        </div>
      </form> */}
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <span className="text-2xl md:text-3xl text-foreground font-semibold">
            Welcome Back! 🤩
          </span>
          <p className="text-sm md:text-base text-muted-foreground">
            Let&apos;s get you back to your parcels
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <FormInput
            label="Phone Number"
            wrapperClassName={() => "mt-2"}
            onChange={handleChange}
            className="py-6"
            name = "phoneNumber"
            placeholder="080 **** ****"
            leading={
              <div className="w-16 overflow-visible border-r pr-2">
                  +234
              </div>
            }
          />

          <FormInput
            label="Password"
            wrapperClassName={() => "mt-2"}
            onChange={handleChange}
            className="py-6"
            leading={<Lock />}
            type="password"
            name="password"
          />

          <Button
            type="submit"
            className="w-full h-12 text-sm md:text-base font-semibold mt-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <div className="flex items-center justify-center gap-2 mt-6">
            <p className="text-foreground/70 text-sm md:text-base">
              Forgot Password?
            </p>
            <Link href="reset">
              <p className="text-[#00ABFD] text-sm md:text-base">Reset It</p>
            </Link>
          </div>
        </form>

        <div className="flex flex-col gap-6 w-full mt-8">
    {/*   <div className="relative border-t border-background">
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-foreground/70 text-sm">
              OR
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {[Google, Apple, X].map((Icon, index) => (
              <button
                key={index}
                className="p-3 md:px-[30px] md:py-[10px] border border-foreground/30 rounded-lg hover:bg-gray-50">
                <Icon />
              </button>
            ))}
          </div>
*/}
          <p className="text-center text-foreground/70 font-semibold text-sm md:text-base">
            Don&apos;t have an account?{" "}
            <Link href="signup">
              <span className="text-[#00ABFD]">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </AuthForm>
  );
}
