import Todo from './components/Todo';
import Home from './components/Home';

export const routes = [
    {path:'/',component:Home},
    {path:'/todos', name:'todos', component: Todo}
];