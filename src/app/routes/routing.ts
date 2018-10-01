import { Routes, RouterModule } from '@angular/router';
import { HolaMundoComponent } from '../hola-mundo/hola-mundo.component';

const appRoutes: Routes = [
    { path: '', component: HolaMundoComponent },
    // { path: 'home', component: HomeComponent },
    // { path: 'room/:id', component: RoomComponent },
    // { path: 'home', component: HomeComponent, canActivate: [RouteActivatorService] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
