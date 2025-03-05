import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  token: string;
  children: ReactNode;
}

export function ProtectedRoute({ token, children }: ProtectedRouteProps) {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};