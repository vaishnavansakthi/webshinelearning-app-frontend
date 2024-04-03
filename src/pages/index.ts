import React from "react";

const ForgotPassword = React.lazy(() => import("./ForgotPassword/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./ResetPassword/ResetPassword"));
const SignUp = React.lazy(() => import("./SignUp/SignUp"));
const Login = React.lazy(() => import("./login/Login"));
const SendOtp = React.lazy(() => import("./SendOtp/SendOtp"));
const AdminDashboard = React.lazy(() => import("./AdminDashboard/AdminDashboard"));
const Profile = React.lazy(() => import("./Profile/Profile"));
const NotFound = React.lazy(() => import("./NotFound/NotFound"));
const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Attendance = React.lazy(() => import("./Attendance/Attendance"));
const Task = React.lazy(() => import("./Task/Task"));
const StudyPlan = React.lazy(() => import("./StudyPlan/StudyPlan"));
const UserAttendance = React.lazy(() => import("./UserAttendance/UserAttendance"));
const UserTasks = React.lazy(() => import("./UserTasks/UserTasks"));
const ManageUser = React.lazy(() => import("./ManageUser/ManageUser"));
const Leaderboard = React.lazy(() => import("./Leaderboard/Leaderboard"));
const UserLeaderboard = React.lazy(() => import("./UserLeaderboard/UserLeaderboard"));


export {
  ForgotPassword,
  ResetPassword,
  SignUp,
  Login,
  SendOtp,
  AdminDashboard,
  Profile,
  NotFound,
  Dashboard,
  Attendance,
  Task,
  StudyPlan,
  UserAttendance,
  UserTasks,
  ManageUser,
  Leaderboard,
  UserLeaderboard
}
