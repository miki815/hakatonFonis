import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

interface Answer {
  text: string;
  isRight: boolean;
  position: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})





export class GameComponent implements OnInit, OnDestroy {
  playercolor: string="blueplayercolor";;
  player = 0;
  score = 0;
  lanes: { answers: Answer[] }[] = [
    { answers: [] },
    { answers: [] }
  ];
  lastFrameTime = Date.now();
  animationFrameId: number = 0;

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }

  startGame() {
    const tick = () => {
      const now = Date.now();
      const deltaTime = (now - this.lastFrameTime) / 1000; // time in seconds since the last frame
      this.lastFrameTime = now;

      this.generateAnswers();
      this.moveAnswers(deltaTime);
      this.checkCollision();

      this.animationFrameId = requestAnimationFrame(tick);
    };

    tick();
  }

  generateAnswers() {
    if (this.lanes[0].answers.length === 0 && this.lanes[1].answers.length === 0) {
      const rightAnswer = Math.random() < 0.5;
      this.lanes[0].answers.push({ text: rightAnswer ? 'Right' : 'Wrong', isRight: rightAnswer, position: 0 });
      this.lanes[1].answers.push({ text: !rightAnswer ? 'Right' : 'Wrong', isRight: !rightAnswer, position: 0 });
    }
  }

  moveAnswers(deltaTime: number) {
    this.lanes.forEach(lane => {
      lane.answers.forEach(answer => {
        answer.position += 0.025 * deltaTime * 60; // Adjust this factor to control speed
      });
      lane.answers = lane.answers.filter(answer => answer.position < 10);
    });
  }

  checkCollision() {
    this.lanes.forEach((lane, index) => {
      lane.answers.forEach(answer => {
        if (answer.position >= 9 && answer.position<9.025 && index === this.player) {
          if (answer.isRight) {
            this.score++;
            this.playercolor="greenplayercolor";
            
          } else {
            this.score--;
            this.playercolor="redplayercolor";
          }
        }
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.movePlayer(0);
    } else if (event.key === 'ArrowRight') {
      this.movePlayer(1);
    }
  }

  movePlayer(laneIndex: number) {
    this.player = laneIndex;
  }
}