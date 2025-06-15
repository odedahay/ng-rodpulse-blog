import { Routes } from '@angular/router';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';
import { NotFoundComponent } from './features/post/pages/not-found/not-found.component';
import { RegisterComponent } from './features/user/pages/register/register.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { LogoutComponent } from './features/user/pages/logout/logout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ViewPostComponent } from './features/post/pages/view-post/view-post.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'blog/:slug',
        component: ViewPostComponent,
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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
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
