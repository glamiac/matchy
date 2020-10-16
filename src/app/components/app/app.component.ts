import { Component } from '@angular/core';
import { Card } from 'src/app/model/card';
import { Colors } from 'src/app/model/colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matchy';
  score = 0;
  message = '';
  gameOver = false;


  cards: Card[];
  colors: string[];

  constructor() {
    this.colors = Object.values(Colors);
    this.cards = this.createCards(16);
  }

  createCards(count: number): Card[] {
    const cards: Card[] = [];

    for (let i = 0; i < count; i++) {
      const card = new Card();
      card.id = i;
      card.color = this.colors[i];
      cards.push(card);
    }

    return cards;
  }

  selectCard(id: number): void {

    if (this.cards[id].clicked) {
      this.message = 'This card was already clicked!';
      this.gameOver = true;
    }
    else {
      this.cards[id].clicked = true;
      this.message = 'Nice job!';
    }

    // update score
    this.score = this.cards.filter(x => x.clicked).length;
  }

  reset(): void {
    this.score = 0;
    this.gameOver = false;
    this.message = '';

    this.cards.forEach((card) => {
      card.clicked = false;
    });
  }
}
