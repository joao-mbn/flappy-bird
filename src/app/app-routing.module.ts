import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaComponent } from './tela/tela.component';
import { MenuComponent } from './menu/menu.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: 'home', component: TelaComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'play', component: PlayComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
