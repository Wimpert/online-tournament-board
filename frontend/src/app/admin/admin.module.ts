import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentEditorComponent } from './tournament-editor/tournament-editor.component';
import { TournamentService } from './services/tournament.service';
import { LeagueComponent } from './league/league.component';
import { LeagueEditorComponent } from './league-editor/league-editor.component';
import { FormsModule } from '@angular/forms';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { MatchEditorComponent } from './match-editor/match-editor.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [TournamentListComponent, TournamentEditorComponent, LeagueComponent, LeagueEditorComponent, GroupEditorComponent, TeamEditorComponent, MatchEditorComponent],
  providers: [TournamentService]
})
export class AdminModule { }
