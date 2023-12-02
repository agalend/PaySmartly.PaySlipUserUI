import Calculator from './pages/calculator';
import Home from './pages/calculator';
import History from './pages/history';

const routes = [
  { path: '*', component: <Calculator />, exact: true },
  { path: '/calculator', component: <Calculator /> },
  { path: '/history', component: <History /> },
];

export default routes;