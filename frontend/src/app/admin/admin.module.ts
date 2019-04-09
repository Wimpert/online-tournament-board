import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatCardModule, MatTableModule, MatExpansionModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
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
import { RoundEditorComponent } from './round-editor/round-editor.component';
import { ObjectPickerComponent } from './object-picker/object-picker.component';
import { PrintComponent } from './print/print.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  declarations: [TournamentListComponent, TournamentEditorComponent, LeagueEditorComponent,
     GroupEditorComponent, TeamEditorComponent, MatchEditorComponent, QuickMatchEditorComponent, RoundEditorComponent, ObjectPickerComponent, PrintComponent],
  providers: [TournamentService]
})
export class AdminModule { }
