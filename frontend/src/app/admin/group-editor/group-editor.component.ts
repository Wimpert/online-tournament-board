import { Group } from './../../../models/group.model';
import { Component, Input, OnChanges } from '@angular/core';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnChanges {

  @Input() group: Group;
  displayedColumns: string[] = [ 'name', 'points', 'matchesPlayed', 'matchesWon', 'matchesLost', 'goalsScored', 'goalsConcieved'];

  constructor(private tournamentService: TournamentService) { }

  ngOnChanges() {
    if (this.group) {
      this.group = {
      ... this.group, teams: [... this.group.teams].sort((a, b) => this.tournamentService.compareTeams(a, b))
    };
    }

  }


}
