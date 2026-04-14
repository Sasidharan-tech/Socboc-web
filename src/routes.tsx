import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Landing Page',
    path: '/',
    element: <LandingPage />
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />
  }
];

export default routes;
