import { lazy } from "react";

const Login = lazy(() => import("./Login"));
const Profile = lazy(() => import("./Profile"));

export { Login, Profile };
