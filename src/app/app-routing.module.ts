import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index', loadChildren: () => import('./pages/index/index.module')
      .then(m => m.IndexModule)
  },
  {
    path: 'menu', loadChildren: () => import('./pages/menu/menu.module')
      .then(m => m.MenuModule), canActivate: [AuthGuard]
  },
  {
    path: 'my-addresses', loadChildren: () => import('./pages/my-addresses/my-addresses.module')
      .then(m => m.MyAddressesModule), canActivate: [AuthGuard]
  },
  {
    path: 'my-orders', loadChildren: () => import('./pages/my-orders/my-orders.module')
      .then(m => m.MyOrdersModule), canActivate: [AuthGuard]
  },
  {
    path: 'my-profile', loadChildren: () => import('./pages/my-profile/my-profile.module')
      .then(m => m.MyProfileModule), canActivate: [AuthGuard]
  },
  {
    path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module')
      .then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
