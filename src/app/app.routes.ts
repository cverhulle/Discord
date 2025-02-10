import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'homepage', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)},
    {path: '**', redirectTo:'homepage'}
];

