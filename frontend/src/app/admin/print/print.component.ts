import { Match } from './../../../models/match.model';
import { Component, OnInit, Input } from '@angular/core';


declare var jsPDF: any;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  from: number;
  to: number;

  width =  98;
  heigth =  90;
  margin = 5;
  normalFontSize = 10;
  smallFontSize = 7;

  @Input() allMatches: Match[];

  constructor() { }

  ngOnInit() {
  }



  getMatchesToPrint(): any[] {

  return this.allMatches.filter((match: Match) => match.matchNr >= this.from && match.matchNr <= this.to);

  }



  download(): void {

      const forPrinting = this.getMatchesToPrint();
      const doc = new jsPDF();
      doc.setLineWidth(0.1);
      doc.setFontSize(this.normalFontSize);

      let row = 1;
      let col = 1;
      let indexOnPage = 0 ;
      forPrinting.forEach((match) => {
          if (indexOnPage == 6) {
              //add page
              indexOnPage = 0;
              row = 1 ;
              col = 1;
              doc.addPage();
          }
          if (indexOnPage != 0 && indexOnPage % 2 == 1) {
              col++;
          } else  if (indexOnPage != 0 && indexOnPage % 2 == 0) {
              row++;
              col = 1;
          }

          const x = col * this.margin + (col - 1) * this.width;
          const y = row * this.margin + (row - 1) * this.heigth;
          this.drawGameSheet(doc, x, y, match);
          indexOnPage++;
      });


      doc.save('blad.pdf');
  }

  drawGameSheet(doc, x, y, match: Match): void {

        doc.rect(x, y, this.width, this.heigth);

        let textHeigth = y + 6;
        const textMargin = 2;
        doc.setFontSize(this.normalFontSize);
        doc.line((x + 15), y, (x + 15), (y + 10));
        doc.text('' + match.matchNr, (x + textMargin), textHeigth);

        doc.line((x + 30), y, (x + 30), (y + 10));
        doc.text(this.getFormattedTime(match), (x + textMargin + 15), textHeigth);

        doc.line((x + 85), y, (x + 85), (y + 10));
        doc.text(match.referee ?  match.referee.name : '', (x + textMargin + 35), textHeigth);
        doc.text('T' + match.terrain, (x + textMargin + 85), textHeigth);
        doc.line(x, (y + 10), (x + this.width), (y + 10));

        //Next row:
        textHeigth =  y + 18;
        doc.setFontSize(this.normalFontSize);
        doc.line((x + 40), (y + 10), (x + 40), (y + 25));
        doc.text(match.homeTeam ? match.homeTeam.name : '', (x + textMargin), textHeigth);
        doc.line((x + 58), (y + 10), (x + 58), (y + 25));
        doc.setFontSize(this.smallFontSize);
        doc.text('eindstand:', (x + textMargin + 40), textHeigth - 5);
        doc.setFontSize(this.normalFontSize);
        doc.text(match.outTeam ? match.outTeam.name : '', (x + textMargin + 58), textHeigth);
        doc.line(x, (y + 25), (x + this.width), (y + 25));

        //Next row:
        textHeigth = y + 30;
        doc.setFontSize(this.smallFontSize);
        doc.text('Goals Thuisploeg:', (x + textMargin), textHeigth);
        doc.line((x + 25), (y + 25), (x + 25), (y + 40));
        doc.text('Corners Thuisploeg:', (x + textMargin + 25), textHeigth);
        doc.line((x + 49), (y + 25), (x + 49), (y + 40));
        doc.text('Goals Uitploeg:', (x + textMargin + 49), textHeigth);
        doc.line((x + 73), (y + 25), (x + 73), (y + 40));
        doc.text('Corners Uitploeg:', (x + textMargin + 73), textHeigth);
        doc.line(x, (y + 40), (x + this.width), (y + 40));

        //Next row:
        textHeigth = y + 45;
        doc.text('Opmerkingen / Kaarten', (x + textMargin), textHeigth );
        doc.line(x, (y + 70), (x + this.width), (y + 70));

        //Next row:
        textHeigth = y + 75;
        doc.text('Handtekening thuisploeg:', (x + textMargin), textHeigth );
        doc.line((x + 49), (y + 70), (x + 49), (y + 90));
        doc.text('Handtekening uitploeg:', (x + textMargin + 49), textHeigth );
        doc.setFontSize(this.normalFontSize);
        /*
        doc.rect(x,y, this.width/2 , 90 );
        doc.rect(x+this.width/2,y, this.width/2 , 90 );*/

    }


    getFormattedTime(match: Match): string {
      return `${match.hour.toString().padStart(2, '0')}:${match.minutes.toString().padStart(2, '0')}`;

    }

}
