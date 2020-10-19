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

  constructor() {
    this.cards = this.createCards(16);
  }

  createCards(count: number): Card[] {
    const cards: Card[] = [];

    for (let i = 0; i < count; i++) {
      const card = new Card();
      card.id = i;
      cards.push(card);
    }

    return cards;
  }

  selectCard(id: number): void {

    if (this.gameOver) {
      return;
    }

    const selectedCard = this.cards.find((card) => (card.id === id));
    if (selectedCard.clicked) {
      this.message = 'This card was already clicked!';
      this.gameOver = true;
    }
    else {
      selectedCard.clicked = true;
    }

    // update score
    this.score = this.cards.filter(x => x.clicked).length;
    this.shuffle();

    if (this.score === this.cards.length) {
      this.message = 'You win!';
      this.gameOver = true;
    }
  }

  shuffle(): void {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  }

  reset(): void {
    this.score = 0;
    this.gameOver = false;
    this.message = '';

    this.shuffle();
    this.cards.forEach((card) => {
      card.clicked = false;
    });
  }

  getBackgroundPosition(id: number): string {
    const y = Math.floor(id / 5) * -202;
    const x = (id % 5) * -206;

    return x + 'px ' + y + 'px';
  }
}
