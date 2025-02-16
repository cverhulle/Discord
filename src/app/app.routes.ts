import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)},
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
    {path: '**', redirectTo:'homepage'}
];

