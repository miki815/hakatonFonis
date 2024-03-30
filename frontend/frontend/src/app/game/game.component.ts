import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game_words } from '../models/Game_words';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { KvizService } from '../services/kviz.service';
import { User } from '../models/users';

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
  constructor(private gameService: GameService, private router: Router, private kvizService: KvizService) {}

  game_word: Game_words;
  playercolor: string = "blueplayercolor";
  player = 0;
  score = 0;
  speed_multiplier = 0.025;
  lanes: { answers: Answer[] }[] = [
    { answers: [] },
    { answers: [] }
  ];
  lastFrameTime = Date.now();
  animationFrameId: number = 0;

  timer: number = 20;
  timerSubscription: Subscription;
  isPreparing: boolean = false;
  gameOver: boolean = false;

  counter: number=0;

  hit : [];
  user: User;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("token"));
    this.bringWords();
    this.startTimer();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.stopGame();
  }

  bringWords() {
    this.gameService.bringWords().subscribe((word: Game_words) => {
      if (word) {
        this.game_word = word;
        this.startGame();
        
      } else {
        alert("Greška");
      }
    });
  }

  goToHomepage() {
    this.router.navigate(['../homepage']);
  }

  restartGame() {
    this.gameOver = false;
    this.score = 0;
    this.timer = 20;
    this.playercolor = "blueplayercolor";
    this.player = 0;
    this.lanes = [{ answers: [] }, { answers: [] }];
    this.startTimer();
    this.bringWords();
  }

  startGame() {
    if (!this.gameOver) {
      const tick = () => {
        const now = Date.now();
        const deltaTime = (now - this.lastFrameTime) / 1000;
        this.lastFrameTime = now;

        if (this.lanes[0].answers.length === 0 && this.lanes[1].answers.length === 0) {
          this.generateAnswers();
        }

        this.moveAnswers(deltaTime);
        this.checkCollision();
        this.animationFrameId = requestAnimationFrame(tick);
      };
      tick();
    }
  }

  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timer = 0;
        this.timerSubscription.unsubscribe();
        this.endGame();
      }
    });
  }
  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  endGame() {
    this.gameOver = true;
    this.kvizService.saveScore2(this.user.username, this.score).subscribe((res) => {
      if (res) {
        console.log('Score saved')
        this.timerSubscription.unsubscribe();
      }
    });
    /*this.gameService.saveScore(this.username, this.score).subscribe(()=>{
  
    } ); */
    cancelAnimationFrame(this.animationFrameId);

  }

  generateAnswers() {
    const rightAnswer = Math.random() < 0.5;
    this.playercolor = "blueplayercolor";
    this.lanes[0].answers.push({ text: rightAnswer ? this.game_word.right : this.game_word.wrong, isRight: rightAnswer, position: 0 });
    this.lanes[1].answers.push({ text: !rightAnswer ? this.game_word.right : this.game_word.wrong, isRight: !rightAnswer, position: 0 });
  }

  moveAnswers(deltaTime: number) {
    this.lanes.forEach(lane => {
      lane.answers.forEach(answer => {
        answer.position += this.speed_multiplier * deltaTime * 60;
      });
      lane.answers = lane.answers.filter(answer => answer.position < 10);
    });
  }

  checkCollision() {
    if (!this.gameOver) {
      this.lanes.forEach((lane, index) => {
        lane.answers = lane.answers.filter(answer => {
          if (answer.position >= 9 && answer.position < 9.1 && index === this.player) {
            if (answer.isRight) {
              this.score++;
              /*this.hit.push() // */
              this.playercolor = "greenplayercolor";
              this.bringWords();
            } else {
              this.score--;
              this.playercolor = "redplayercolor";
              this.bringWords();
            }

            if(this.score/5-1>this.counter){
              this.timer+=15;
              this.counter+=1;
            }
            return false;
          }
          return true;
        });
      });
    }
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