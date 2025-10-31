import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";

// Lazy load all page components
const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const Patients = lazy(() => import("@/components/pages/Patients"));
const PatientDetail = lazy(() => import("@/components/pages/PatientDetail"));
const Appointments = lazy(() => import("@/components/pages/Appointments"));
const Departments = lazy(() => import("@/components/pages/Departments"));
const Reports = lazy(() => import("@/components/pages/Reports"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

// Production-ready loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary-50">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p className="text-primary-700 font-medium">Loading...</p>
    </div>
  </div>
);

// Wrapper component for Suspense
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>
  },
  {
    path: "dashboard",
    element: <SuspenseWrapper><Dashboard /></SuspenseWrapper>
  },
  {
    path: "patients",
    element: <SuspenseWrapper><Patients /></SuspenseWrapper>
  },
  {
    path: "patients/:id",
    element: <SuspenseWrapper><PatientDetail /></SuspenseWrapper>
  },
  {
    path: "appointments",
    element: <SuspenseWrapper><Appointments /></SuspenseWrapper>
  },
  {
    path: "departments",
    element: <SuspenseWrapper><Departments /></SuspenseWrapper>
  },
  {
    path: "reports",
    element: <SuspenseWrapper><Reports /></SuspenseWrapper>
  },
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>
  }
];

// Router configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
];

export const router = createBrowserRouter(routes);