import { League } from './../../../models/league.model';
import { Group } from './../../../models/group.model';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-league-editor',
  templateUrl: './league-editor.component.html',
  styleUrls: ['./league-editor.component.scss']
})
export class LeagueEditorComponent {

  @Input() league: any;
  @Output() addTeamsToKnockRound: EventEmitter<League> = new EventEmitter<League>();

  constructor(private element: ElementRef) { }


  leagueChanged(event) {
    this.league.name = event;
    this.element.nativeElement.dispatchEvent(new CustomEvent('tour-changed', {bubbles: true}));
  }


  track(item: {id: number}) {
    return item.id;
  }

  addToNextRound() {
    this.addTeamsToKnockRound.emit(this.league);
  }



}
