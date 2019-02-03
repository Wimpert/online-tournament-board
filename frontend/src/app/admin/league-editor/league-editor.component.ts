import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-league-editor',
  templateUrl: './league-editor.component.html',
  styleUrls: ['./league-editor.component.scss']
})
export class LeagueEditorComponent {

  @Input() league : any;

  constructor(private element : ElementRef) { }


  leagueChanged(event){
    this.league.name = event;
    this.element.nativeElement.dispatch(new CustomEvent('tour-changed', {bubbles: true}))
  }

}
