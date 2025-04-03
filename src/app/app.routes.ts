import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)},
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
    {path: 'private-message', loadChildren: () => import('./private-message/private-message.module').then(m => m.PrivateMessageModule)},
    {path: 'group-message', loadChildren: () => import('./group-message/group-message.module').then(m=> m.GroupMessageModule)},
    {path: '**', redirectTo:'homepage'}
];

