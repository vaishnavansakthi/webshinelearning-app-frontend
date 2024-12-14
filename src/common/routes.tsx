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
  TaskTracker,
  UserMemes,
  Home,
  Dashboard,
  UserBooking,
  Booking,
  UserSession,
} from "../pages"
import { decryptData } from "../utils/security"
import Videos from "../pages/Videos/Videos"
import UserVideos from "../pages/UserVideos/UserVideos"

interface IRoutesTypes {
  path: string
  private: boolean
  navigate?: string
  component: React.FC,
  roles?:  string[],
}

const myToken = decryptData("userData", null)

export const routes: IRoutesTypes[] = [
  {
    path: "/",
    component: Home,
    navigate: "/dashboard",
    private: myToken !== null ? true : false,
  },
  {
    path: "/login",
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
    path: "/booking",
    component: Booking,
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
    roles: ["user"],
  },
  {
    path: "/tasks",
    component: Task,
    private: true,
    roles: ["user"],
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
    roles: ["user"],
  },
  {
    path: "/tasktracker",
    component: TaskTracker,
    private: true,
  },
  {
    path: "/manageuser",
    component: ManageUser,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/userattendance",
    component: UserAttendance,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/usertasks",
    component: UserTasks,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/userleaderboard",
    component: UserLeaderboard,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/userMemes",
    component: UserMemes,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/memes",
    component: UserMemes,
    private: true,
    roles: ["user"],
  },
  {
    path: "/videos",
    component: Videos,
    private: true,
    roles: ["user"],
  },
  {
    path: "/userbooking",
    component: UserBooking,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/usersession",
    component: UserSession,
    private: true,
    roles: ["admin"],
  },
  {
    path: "/uservideos",
    component: UserVideos,
    private: true,
    roles: ["admin"],
  },
]
