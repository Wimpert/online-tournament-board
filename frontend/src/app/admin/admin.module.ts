import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentEditorComponent } from './tournament-editor/tournament-editor.component';
import { TournamentService } from './services/tournament.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [TournamentListComponent, TournamentEditorComponent],
  providers: [TournamentService]
})
export class AdminModule { }
