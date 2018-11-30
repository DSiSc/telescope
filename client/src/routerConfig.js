// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import Dashboard from './pages/Dashboard';
import Blocks from './pages/Blocks';
import Chains from './pages/Chains';
import Contracts from './pages/Contracts';
import Transactions from './pages/Transactions';
import Nodes from './pages/Nodes';

const routerConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/nodes',
    name: 'Nodes',
    component: Nodes,
  },
  {
    path: '/blocks',
    name: 'Blocks',
    component: Blocks,
  },
  {
    path: '/chains',
    name: 'Chains',
    component: Chains,
  },
  {
    path: '/contracts',
    name: 'Contracts',
    component: Contracts,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    name: 'Dashboard',
  },
];

export default routerConfig;
