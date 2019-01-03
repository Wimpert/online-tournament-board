import { TournamentEditorComponent } from './tournament-editor/tournament-editor.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'list',
    component: TournamentListComponent
  },
  {
    path: 'edit/:id',
    component: TournamentEditorComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
