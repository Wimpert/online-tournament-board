import { filter } from 'rxjs/operators';
import { group } from '@angular/animations';
import { League } from './../../../models/league.model';
import { Group } from './../../../models/group.model';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { REMOVE_GROUP_EVENT } from '../constants';

@Component({
  selector: 'app-league-editor',
  templateUrl: './league-editor.component.html',
  styleUrls: ['./league-editor.component.scss']
})
export class LeagueEditorComponent {

  @Input() league: any;
  @Output() addTeamsToKnockRound: EventEmitter<League> = new EventEmitter<League>();
  @Output() addGroup: EventEmitter<League> = new EventEmitter<League>();

  @HostListener(REMOVE_GROUP_EVENT, ['$event'])
  onUnSelect(event: CustomEvent) {
    const groupId = event.detail;
    this.league = {... this.league, groups : [...this.league.groups.filter(group => group.id !== groupId)]};
  }

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

  addGroupHandler(event: MouseEvent) {
    event.stopPropagation();
    this.addGroup.emit(this.league);
  }



}
