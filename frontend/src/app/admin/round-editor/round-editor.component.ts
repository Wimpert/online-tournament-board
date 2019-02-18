import { Component, OnInit, Input } from '@angular/core';
import { Round } from '../../../models/round.model';

@Component({
  selector: 'app-round-editor',
  templateUrl: './round-editor.component.html',
  styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit {

  @Input()
  round: Round;

  constructor() { }

  ngOnInit() {
  }

}
