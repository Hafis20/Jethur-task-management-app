import { Routes } from '@angular/router';
import { TasksPage } from './pages/tasks/tasks';
import { TaskInfoPage } from './pages/task-info/task-info';

export const routes: Routes = [
    {
        path: 'tasks',
        component: TasksPage
    },
    {
        path:'tasks/:id',
        component:TaskInfoPage
    }
];
