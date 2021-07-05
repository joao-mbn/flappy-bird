import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

  volumeOn: boolean;
  screen: HTMLDivElement;
  flappy: HTMLImageElement;
  screenHeight: number;
  screenWidth: number;
  screenLeft: number;
  screenTop: number;
  flappyHeight: number;
  flappyWidth: number;
  flappyLeft: number;
  flappyTopScreen: number;
  endBlockClass: string;
  barrierClass: string;
  blankSpaceClass: string;
  blankSpaceHeight: number;
  endBlockHeight: number;
  barrierWidth: number;
  frameUpdateRate: number;
  barrierDelocationStep: number;
  barrierCrossingTime: number;
  barrierCreationRate: number;
  gameOver: boolean;
  volumeSwitcher: () => void;
  createBarrierSet: () => void;
  destroyBarrierSet: () => void;
  moveBarrierSet: (barrierSet: HTMLDivElement) => void;
  flappyGravity: () => void;
  flappyJump: () => void;
  evaluatePosition: () => number[][];
  detectColision: () => void;
  playGame: () => void;


  constructor() {
    this.gameOver = false;
    this.frameUpdateRate = 17;
    this.barrierDelocationStep = 3;
    this.barrierCreationRate = 5000;
    this.blankSpaceHeight = 200;
    this.endBlockHeight = 10;
    this.barrierWidth = 30;
    this.endBlockClass = `height: ${this.endBlockHeight}px;
      width: ${this.barrierWidth * 1.15}px;
      background-color: rgb(30, 141, 30);
      box-sizing: border-box;
      border: 1px solid black;`;
    this.barrierClass = `width: ${this.barrierWidth}px;
      background-color: rgb(30, 141, 30);
      box-sizing: border-box;
      border: 1px solid black;
      border-top: 0px;
      border-bottom: 0px`;
    this.blankSpaceClass = `height: ${this.blankSpaceHeight}px; width: ${this.barrierWidth}px;`;
  }

  ngOnInit(): void {
    this.volumeOn = true;
    this.screen = document.querySelector('.gameScreen') as HTMLDivElement;
    this.flappy = document.querySelector('img') as HTMLImageElement;
    this.screenHeight = this.screen.getBoundingClientRect().height;
    this.screenWidth = this.screen.getBoundingClientRect().width;
    this.screenLeft = this.screen.getBoundingClientRect().left;
    this.screenTop = this.screen.getBoundingClientRect().top;
    this.flappyHeight = this.flappy.getBoundingClientRect().height;
    this.flappyWidth = this.flappy.getBoundingClientRect().width;
    this.flappyLeft = this.flappy.getBoundingClientRect().left;
    this.flappyTopScreen = this.flappy.getBoundingClientRect().top - this.screenTop;
    this.barrierCrossingTime = this.frameUpdateRate * this.screenWidth / this.barrierDelocationStep;

    this.volumeSwitcher = () => {
      /* mutes/turns on music interchangeably */
      if (this.volumeOn === true) {
        this.volumeOn = false;
      } else {
        this.volumeOn = true;
      }
    };

    this.createBarrierSet = () => {
      /* create a new set of barriers with a blank space in between */
      const newBarrierSet = document.createElement('div');
      newBarrierSet.style.position = 'absolute';
      newBarrierSet.style.display = 'flex';
      newBarrierSet.style.flexDirection = 'column';
      newBarrierSet.style.alignItems = 'center';
      newBarrierSet.style.width = '35px';
      newBarrierSet.style.height = '100%';
      newBarrierSet.style.left = `${this.screenWidth + 5}px`;
      const upperBarrierHeight = Math.trunc(
        Math.random() * (this.screenHeight
          - this.blankSpaceHeight
          - 2 * this.endBlockHeight
        )
      );
      const lowerBarrierHeight = this.screenHeight
        - upperBarrierHeight
        - this.blankSpaceHeight
        - 2 * this.endBlockHeight;
      newBarrierSet.innerHTML = `
        <div id="barrier" style="height:${upperBarrierHeight}px;${this.barrierClass}"></div>
        <div id="barrier" style="${this.endBlockClass}"></div>
        <div style="${this.blankSpaceClass}"></div>
        <div id="barrier" style="${this.endBlockClass}"></div>
        <div id="barrier" style="height:${lowerBarrierHeight}px;${this.barrierClass}"></div>
      `;
      this.screen.append(newBarrierSet);
      this.moveBarrierSet(newBarrierSet);
    };

    this.destroyBarrierSet = () => {
      this.screen.removeChild(this.screen.getElementsByTagName('div')[0]);
    };

    this.moveBarrierSet = (barrierSet: HTMLDivElement) => {
      /* move the barrier set from the right corner of the screen to the left one. */
      let BarrierSetLeftScreen = barrierSet.getBoundingClientRect().left - this.screenLeft;
      const movementFrequency = setInterval(() => {
        if (this.gameOver) {
          clearInterval(movementFrequency);
        }
        if (BarrierSetLeftScreen > -barrierSet.getBoundingClientRect().width) {
          BarrierSetLeftScreen -= 7;
          barrierSet.style.left = `${BarrierSetLeftScreen}px`;
        }
      }, this.frameUpdateRate);
    };

    this.flappyGravity = () => {
      /* set flappy's rate of fall */
      setInterval(() => {
        if (this.flappyTopScreen <= (this.screenHeight - this.flappyHeight)) {
          this.flappyTopScreen += this.barrierDelocationStep;
        }
        this.flappy.style.top = `${this.flappyTopScreen}px`;
      }, this.frameUpdateRate);
    };

    this.flappyJump = () => {
      /* makes Flappy jump upon spacekey press */
      document.addEventListener('keypress', (e: KeyboardEvent): void => {
        if (e.key === ' ') {
          this.flappyTopScreen -= 100;
          if (this.flappyTopScreen < 0) {
            this.flappyTopScreen = 0;
          }
          this.flappy.style.top = `${this.flappyTopScreen}px`;
        }
      });
    };

    this.evaluatePosition = () => {
      /* create an array of arrays with each internal array containing
      * absolute positions and height of each of the componentes of the barrier
      [top position, left position, height] */
      const barriers = document.querySelectorAll('#barrier');
      const barriersCoordinates: number[][] = [];
      barriers.forEach(barrier => {
        const barrierProperties = barrier.getBoundingClientRect();
        const barrierCoordinate = [barrierProperties.left, barrierProperties.height];
        barriersCoordinates.push(barrierCoordinate);
      });
      return barriersCoordinates;
    };

    this.detectColision = () => {
      /* detect if flappy is hitting any of the barriers */
      const barriersCoordinates = this.evaluatePosition();
      for (let i = 0; i < barriersCoordinates.length - 1; i += 4) {
        if (
          this.flappyWidth >= Math.abs(barriersCoordinates[i][0] - this.flappyLeft) &&
          this.flappyTopScreen <= barriersCoordinates[i][1] ||
          /* this.flappyWidth >= Math.abs(barriersCoordinates[i + 1][0] - this.flappyLeft) &&
          this.flappyTopScreen <= barriersCoordinates[i + 1][1] ||
          this.flappyWidth >= Math.abs(barriersCoordinates[i + 2][0] - this.flappyLeft) &&
          this.flappyTopScreen <= barriersCoordinates[i + 2][1] || */
          this.flappyWidth >= Math.abs(barriersCoordinates[i + 3][0] - this.flappyLeft) &&
          this.flappyTopScreen >= this.screenHeight - barriersCoordinates[i + 3][1]
        ) {
          this.gameOver = true;
        }
      }
    };

    this.playGame = () => {
      const CreateBarrierSet = setInterval(this.createBarrierSet, this.barrierCreationRate);
      const DestroyBarrierSet = setTimeout(
        () => setInterval(this.destroyBarrierSet, this.barrierCreationRate),
        this.barrierCrossingTime);
      this.flappyGravity();
      this.flappyJump();
      setInterval(this.detectColision, 100);
      if (this.gameOver) {
        clearInterval(CreateBarrierSet);
        clearInterval(DestroyBarrierSet);
      }
    };

  }

}
