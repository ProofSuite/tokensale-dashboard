import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstants} from './utility/constants/routes';
import {PageNotFoundComponent} from "./utility/page-not-found/page-not-found.component";
import {LandingComponent} from "./user-auth/landing/landing.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
  },
  {
    path: RouteConstants.NOTFOUND,
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: RouteConstants.NOTFOUND,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
