import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  musicName = 'Battlefield - Blind Guardian';
  musicPlayer: HTMLAudioElement;
  volumeSlider: HTMLInputElement;
  sliderValue: number;

  constructor() {

  }

  ngOnInit(): void {
    this.musicPlayer = document.getElementById('musicPlayer') as HTMLAudioElement;
    this.volumeSlider = document.getElementById('slider') as HTMLInputElement;
    this.sliderValue = parseInt(this.volumeSlider.value, 10);
  }

  adjustVolume(): void {
    this.sliderValue = parseInt(this.volumeSlider.value, 10);
    this.musicPlayer.volume = this.sliderValue / 100;
  }
}

