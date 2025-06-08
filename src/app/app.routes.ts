import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';
import { NotFoundComponent } from './features/post/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'create-post',
        component: CreatePostComponent
    },
    {
        path: 'edit-post/:slug',
        component: EditPostComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }

];
