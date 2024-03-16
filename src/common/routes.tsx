import React from "react";
import { Login, SignUp, ForgotPassword, ResetPassword, SendOtp, AdminDashboard, Profile } from "../pages";

interface IRoutesTypes {
    path: string;
    private: boolean;
    navigate?: string;
    component: React.FC;
}

export const routes: IRoutesTypes[] = [
  {
    path: "/",
    component: Login,
    navigate: '/admin-dashboard',
    private: false 
  },
  {
    path: "/signup",
    component: SignUp,
    navigate: '/admin-dashboard',
    private: false
  },
  {
    path: "/forgot-password",
    navigate: '/admin-dashboard',
    component: ForgotPassword,
    private: false
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    navigate: '/admin-dashboard',
    private: false
  },
  {
    path: "/verify-otp",
    component: SendOtp,
    navigate: '/admin-dashboard',
    private: false
  },
  {
    path: "/admin-dashboard",
    component: AdminDashboard,
    private: true 
  },
  {
    path: "/profile",
    component: Profile,
    private: true
  },
];
