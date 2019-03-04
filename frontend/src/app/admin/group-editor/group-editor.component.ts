import { GROUP_UPDATE_EVENT, ADD_TEAM_EVENT, TEAM_UPDATE_EVENT, REMOVE_TEAM_EVENT, REMOVE_GROUP_EVENT, ADD_MATCH_EVENT } from './../constants';
import { Group } from './../../../models/group.model';
import { Component, Input, OnChanges, ElementRef } from '@angular/core';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.scss']
})
export class GroupEditorComponent implements OnChanges {

  @Input() group: Group;
  displayedColumns: string[] = [ 'name', 'points', 'matchesPlayed', 'matchesWon', 'matchesLost', 'goalsScored', 'goalsConcieved', 'remove'];


  constructor(private tournamentService: TournamentService, private element: ElementRef) { }

  ngOnChanges() {
    if (this.group) {
      this.group = {
      ... this.group, teams: [... this.group.teams].sort((a, b) => this.tournamentService.compareTeams(a, b))
    };
    }

  }

  groupNameChanged() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(GROUP_UPDATE_EVENT, {bubbles: true, detail: this.group}));
  }

  addTeamHandler() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(ADD_TEAM_EVENT, {bubbles: true, detail: this.group}));
  }

  addMatchHandler() {
    this.element.nativeElement.dispatchEvent(new CustomEvent(ADD_MATCH_EVENT, {bubbles: true, detail: this.group}));
  }

  teamNameChanged(team) {
    this.element.nativeElement.dispatchEvent(new CustomEvent(TEAM_UPDATE_EVENT, {bubbles: true, detail: team}));
  }

  removeTeam(teamId: number) {
    this.group = {... this.group, teams : [ ... this.group.teams.filter((team) => team.id !== teamId)]};
    this.element.nativeElement.dispatchEvent(new CustomEvent(REMOVE_TEAM_EVENT, {bubbles: true, detail: teamId}));
  }

  removeGroupHandler() {
      this.element.nativeElement.dispatchEvent(new CustomEvent(REMOVE_GROUP_EVENT, {bubbles: true, detail: this.group.id}));
  }


}
