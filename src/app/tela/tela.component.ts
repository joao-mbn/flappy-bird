import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss'],
  styles: [
    `.ifNotClicked{
    box-shadow: 2px 2px rgb(139, 139, 16);
    top: calc(50% - 40px);
    left: calc(50% - 100px);
    }`,
    `.ifClicked{
    box-shadow: -2px -2px rgb(139, 139, 16);
    top: calc(50% - 42px);
    left: calc(50% - 102px);
    }`,
  ],
})

export class TelaComponent {

  playButtonClass = 'ifNotClicked';
  menuButtonClass = 'ifNotClicked';

  onClickPlay(): void{
    this.playButtonClass = this.playButtonClass === 'ifNotClicked' ? 'ifClicked' : 'ifNotClicked';
  }
  onClickMenu(): void{
    this.menuButtonClass = this.menuButtonClass === 'ifNotClicked' ? 'ifClicked' : 'ifNotClicked';
  }
}
