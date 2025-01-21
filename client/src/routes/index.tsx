import React, { lazy, memo, Suspense, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const MainLayout = lazy(() => import("@/layouts/main-layout"));

const Home = lazy(() => import("@/pages/home"));
const Market = lazy(() => import("@/pages/market"));
const Players = lazy(() => import("@/pages/players"));
const Teams = lazy(() => import("@/pages/teams"));
const TeamForm = lazy(() => import("@/pages/team-form"));
const TeamsList = lazy(() => import("@/pages/teams-list"));

const Login = lazy(() => import("@/pages/auth/login"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));

const Spin = () => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

const PublicRoutes = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100vh] items-center justify-center">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </Suspense>
  );
});

const ProtectedRoutes = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100vh] items-center justify-center">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="market" element={<Market />} />
          <Route path="players" element={<Players />} />
          <Route path="teams" element={<Teams />}>
            <Route index element={<TeamsList />} />
            <Route path="save" element={<TeamForm />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </Suspense>
  );
});

export { PublicRoutes, ProtectedRoutes };
