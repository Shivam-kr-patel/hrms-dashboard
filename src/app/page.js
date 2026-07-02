"use client";

// import { useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setError("");

//     const result = await signIn("credentials", {
//       email: data.email,
//       password: data.password,
//       redirect: false, // we handle redirect manually so we can show errors
//     });

//     if (result?.error) {
//       setError("Invalid email or password");
//       return;
//     }

//     router.push("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-white mb-6 text-center">
//           HRMS Admin Login
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
//               placeholder="admin@hrms.com"
//             />
//             {errors.email && (
//               <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
//               placeholder="••••••••"
//             />
//             {errors.password && (
//               <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {error && <p className="text-red-400 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium disabled:opacity-50"
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}