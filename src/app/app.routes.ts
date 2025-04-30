import { Routes } from '@angular/router';

export const routes: Routes = [
    // Page d'accueil
    {path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)},

    // Page de login et création de compte
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},

    // Page pour consulter, modifier, supprimer son profil
    {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},

    // Page pour accéder aux chats privés
    {path: 'private-message', loadChildren: () => import('./private-message/private-message.module').then(m => m.PrivateMessageModule)},

    // Page pour accèder aux groupes de discussion (10 personnes max)
    {path: 'group-message', loadChildren: () => import('./group-message/group-message.module').then(m=> m.GroupMessageModule)},

    // Par défaut, on redirige vers la homepage
    {path: '**', redirectTo:'homepage'}
];

