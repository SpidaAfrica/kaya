// "use client";
export const dynamic = "force-dynamic";
// import FormInput from "@/components/FormInput";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/use-auth";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import { Loader, Lock, Mail, UserIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React from "react";
// import AuthForm from "../AuthForm";
// import Link from "next/link";

// export default function SignUpPage() {
//   const { registerPayload, isLoading, setRegister, validateLogin, setLoading } =
//     useAuth();
//   const [lastPath, setLastPath] = React.useState<string>("/");
//   const { toast } = useToast();
//   const route = useRouter();
//   React.useEffect(() => {
//     const lastVisitedPath = localStorage.getItem("lastVisitedPath");
//     setLastPath(lastVisitedPath || "/");
//   }, []);
//   const handleLogin = async (event: React.FormEvent) => {
//     event.preventDefault(); // Prevent default form submission
//     try {
//       //   const response = await login();
//       //   if (response) {
//       if (true) {
//         // toast({ title: response.message, variant: "default" });
//         // toast({ title: "logged in", variant: "default" });
//         setLoading(true);
//         setTimeout(() => {
//           if (lastPath !== "/") {
//             setLoading(false);
//             route.replace(lastPath);
//           } else route.replace("/passenger/home");
//         }, 1000);
//       }
//     } catch (err) {
//       const error = err as Error;
//       toast({ title: error.message, variant: "destructive" });
//     }
//   };

//   return (
//     <AuthForm>
//       <form className={cn("flex flex-col gap-6")} onSubmit={handleLogin}>
//         <div className="flex flex-col items-center gap-2 text-center">
//           <span className="text-xl md:text-3xl font-semibold capitalize">
//             {"Let's"} get personal!
//           </span>
//           <p className="text-sm text-muted-foreground">
//             Tell us your name, so we can address you properly
//           </p>
//         </div>
//         <div className="grid gap-6">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <FormInput
//               leading={<UserIcon />}
//               id="name"
//               type="name"
//               placeholder="st@example.com"
//               onChange={(e) => setRegister("name", e.target.value)}
//               value={registerPayload.name}
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <FormInput
//               leading={<Mail />}
//               id="email"
//               type="email"
//               placeholder="st@example.com"
//               onChange={(e) => setRegister("email", e.target.value)}
//               value={registerPayload.email}
//             />
//           </div>
//           <div className="grid gap-2">
//             <div className="flex items-center">
//               <Label htmlFor="password">Password</Label>
//               <a
//                 href="#"
//                 className="ml-auto text-xs md:text-sm underline-offset-4 hover:underline">
//                 Forgot your password?
//               </a>
//             </div>
//             <FormInput
//               leading={<Lock />}
//               id="password"
//               type="password"
//               onChange={(e) => setRegister("password", e.target.value)}
//               value={registerPayload.password}
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full cursor-pointer mt-8"
//             disabled={!validateLogin()}>
//             {isLoading && <Loader className="animate-spin" />}continue
//           </Button>
//         </div>
//         <p className="text-center text-sm text-muted-foreground mt-8">
//           Already have an account?
//           <Link href={"/auth/signin"} className="text-primary font-semibold">
//             Login
//           </Link>
//         </p>
//       </form>
//     </AuthForm>
//   );
// }

"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { DropDown, Nigeria } from "@/components/svgs";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "phoneNumber") {
      setPhoneNumber(value.replace(/^0/, ""));
  
    }
  };
  sessionStorage.setItem("phoneNumber", `+234${phoneNumber}`);

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const res = await fetch("https://jbuit.org/api/send-phone-otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+234${phoneNumber}`,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
  
      console.log("OTP sent successfully:", data);
      router.push("/auth/verify"); // Go to verification page
    } catch (error: any) {
      console.error("OTP send error:", error.message);
      alert(error.message); // You can use toast instead if available
    }
  };
  

  return (
    <AuthForm>
      <div className="mx-auto w-[336px] px-4 md:w-[400px] flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <h3 className="text-[#111827] text-2xl md:text-[32px] font-bold tracking-[-0.06em] leading-tight md:leading-[38.08px] text-center">
            Join the Apago community
          </h3>
          <p className="text-[#333232] text-balance text-center text-sm md:text-[16px] font-normal tracking-[-0.06em] leading-[24px] px-2">
            A verification code will be sent to your number to confirm and
            create your account.
          </p>
        </div>
        <form
          className="flex flex-col mt-8 md:mt-[46px] w-full items-center justify-center gap-2.5"
          onSubmit={handleSubmit}>
          <fieldset className="flex flex-col w-full gap-1.5">
            <label htmlFor="phoneNumber">
              <span className="text-[#0A0D14] text-sm md:text-[16px] font-normal tracking-[-0.06em] leading-[24px]">
                Phone Number
              </span>
            </label>
            <div className="border w-full md:w-[400px] border-[#D1D5DB] px-2 rounded-[8px] flex items-center justify-center gap-2.5">
              <div className="flex items-center justify-center gap-2.5">
                <Nigeria />
                <p className="text-[#0A0D14] text-[16px] font-normal tracking-[-0.06em] leading-[24px]">
                  +234
                </p>
                {/*<DropDown className="text-[#525866]" />*/}
              </div>
              <input
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                className="w-full  h-[48px] border-l border-[#D1D5DB]  outline-none px-2 py-2.5 text-[#0A0D14] text-[16px] font-normal tracking-[-0.06em] leading-[24px] placeholder:text-[#6B7280]"
              />
            </div>
          </fieldset>
          <fieldset className="mt-8 md:mt-[60px] w-full">
            <button className="bg-[#00ABFD] w-full md:w-[400px] text-white text-sm md:text-[16px] font-normal tracking-[-0.06em] leading-[24px] px-4 py-2.5 rounded-[8px]">
              Create an Account
            </button>
          </fieldset>
          <p className="text-[#0A0D14] text-sm md:text-[16px] font-semibold tracking-[-0.06em] leading-[24px]">
            Already have an account?{" "}
            <Link href="signin">
              <span className="text-[#00ABFD]">Log In</span>
            </Link>
          </p>
        </form>
      </div>
    </AuthForm>
  );
}
