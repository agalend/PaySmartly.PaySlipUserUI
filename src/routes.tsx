import Calculation from './pages/calculation';
import Home from './pages/calculation';
import History from './pages/history';

const routes = [
  { path: '*', component: <Calculation />, exact: true },
  { path: '/calculator', component: <Calculation /> },
  { path: '/history', component: <History /> },
];

export default routes;