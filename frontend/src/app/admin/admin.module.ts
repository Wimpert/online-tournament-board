import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatCardModule, MatTableModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminRoutingModule } from './admin-routing.module';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentEditorComponent } from './tournament-editor/tournament-editor.component';
import { TournamentService } from './services/tournament.service';
import { LeagueEditorComponent } from './league-editor/league-editor.component';
import { FormsModule } from '@angular/forms';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { MatchEditorComponent } from './match-editor/match-editor.component';
import { QuickMatchEditorComponent } from './quick-match-editor/quick-match-editor.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule
  ],
  declarations: [TournamentListComponent, TournamentEditorComponent, LeagueEditorComponent,
     GroupEditorComponent, TeamEditorComponent, MatchEditorComponent, QuickMatchEditorComponent],
  providers: [TournamentService]
})
export class AdminModule { }
