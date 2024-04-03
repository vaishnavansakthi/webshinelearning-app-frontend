import React from "react"
import {
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword,
  SendOtp,
  Profile,
  Attendance,
  Task,
  StudyPlan,
  UserAttendance,
  UserTasks,
  ManageUser,
  Leaderboard,
  UserLeaderboard,
} from "../pages"

interface IRoutesTypes {
  path: string
  private: boolean
  navigate?: string
  component: React.FC
}

export const routes: IRoutesTypes[] = [
  {
    path: "/",
    component: Login,
    navigate: "/dashboard",
    private: false,
  },
  {
    path: "/signup",
    component: SignUp,
    navigate: "/dashboard",
    private: false,
  },
  {
    path: "/forgot-password",
    navigate: "/dashboard",
    component: ForgotPassword,
    private: false,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    navigate: "/dashboard",
    private: false,
  },
  {
    path: "/verify-otp",
    component: SendOtp,
    navigate: "/dashboard",
    private: false,
  },
  {
    path: "/profile",
    component: Profile,
    private: true,
  },
  {
    path: "/attendance",
    component: Attendance,
    private: true,
  },
  {
    path: "/tasks",
    component: Task,
    private: true,
  },
  {
    path: "/studyplan",
    component: StudyPlan,
    private: true,
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
    private: true,
  },
  {
    path: "/manageuser",
    component: ManageUser,
    private: true,
  },
  {
    path: "/userattendance",
    component: UserAttendance,
    private: true,
  },
  {
    path: "/usertasks",
    component: UserTasks,
    private: true,
  },
  {
    path: "/userleaderboard",
    component: UserLeaderboard,
    private: false,
  },
]
