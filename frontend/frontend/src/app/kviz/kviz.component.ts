import { Component, OnInit } from '@angular/core';
import { KvizService } from '../services/kviz.service';
import { Subscription, interval } from 'rxjs';
import { Question } from '../models/Question';
import { User } from '../models/users';

@Component({
  selector: 'app-kviz',
  templateUrl: './kviz.component.html',
  styleUrls: ['./kviz.component.css']
})
export class KvizComponent {

  constructor(private kvizService: KvizService) { }

  timer: number = 10;
  timerSubscription: Subscription;
  question: Question;
  questions: Question[];
  btnDisabled: boolean = false;
  positionTrue: number = -1;
  btnClass: Array<string> = new Array(4);
  isPreparing: boolean = false;
  questionCnt: number = 0;
  correctCnt: number = 0;
  message: string = "Find out how well you know the city you're traveling to!";
  city: string = "Belgrade";
  points: number = 0;
  user: User;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("token"));
    let qtype = sessionStorage.getItem("question_type");
    this.getAllQuestions(qtype);
  }

  getAllQuestions(qtype: string) {
    console.log("TEST")
    this.kvizService.getQuestion(qtype).subscribe((quest: Question[]) => {
      if (quest) {
        console.log(quest)
        this.questions = quest;
        this.startTimer();
        this.getQuestion();
      }
      else alert("Greska");
    })
  }

  getQuestion() {
    let index = this.generateRandomIndex(this.questions);
    this.question = this.questions[index];
    this.questions.splice(index, 1);
    this.trueAnswerPosition();
  }

  generateRandomIndex(questions: Question[]): number {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return randomIndex;
  }


  startTimer() {
    const source = interval(1000);
    this.timerSubscription = source.subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        if (this.isPreparing == true) this.getNewQuestion();
        else this.answerQuestion(0);
      }
    });
  }

  answerQuestion(answerId) {
    this.btnClass[this.positionTrue - 1] = "true-answer";
    this.btnDisabled = true;
    if (answerId == this.positionTrue) {
      this.correctCnt++;
      this.points += 3;
    }
    else if (answerId != 0) {
      this.btnClass[answerId - 1] = "wrong-answer";
      this.points -= 1;
    }
    if (this.questionCnt++ == 4) {
      this.message = "Igra je završena! Tačnih odgovora: " + this.correctCnt.toString();
      this.timer = 0;
      this.timerSubscription.unsubscribe();
      this.kvizService.saveScore(this.user.username, this.points);
    }
    else {
      this.timer = 3;
      this.isPreparing = true;
    }
  }

  trueAnswerPosition() {
    let pos = Math.floor(Math.random() * 3 + 1);
    let tmp = this.question.answer1;
    this.positionTrue = pos;
    if (pos == 1) return;
    else if (pos == 2) {
      this.question.answer1 = this.question.answer2;
      this.question.answer2 = tmp;
    }
    else if (pos == 3) {
      this.question.answer1 = this.question.answer3;
      this.question.answer3 = tmp;
    }
    else {
      this.question.answer1 = this.question.answer4;
      this.question.answer4 = tmp;
    }
  }

  getNewQuestion() {
    this.getQuestion();
    this.isPreparing = false;
    this.timer = 10;
    this.btnDisabled = false;
    for (let i = 0; i < 4; i++) this.btnClass[i] = '';
  }

}