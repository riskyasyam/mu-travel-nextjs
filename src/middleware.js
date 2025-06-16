import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Hanya jalankan middleware untuk path yang diawali dengan /dashboard
  matcher: ['/dashboard/:path*'], 
};