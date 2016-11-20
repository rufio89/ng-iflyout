import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main-search', pathMatch: 'full'},
  {path: 'main-search', loadChildren: 'app/main-search/main-search.module'},
  {path: 'about', loadChildren: 'app/about/about.module'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class IflyoutRoutingModule { }
