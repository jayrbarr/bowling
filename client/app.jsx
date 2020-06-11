import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScoreEntry from './ScoreEntry.jsx';
 
class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     scores: [],
     score: 0,
     second: false,
   }
 }

 getScore() {
   let scores = this.state.scores;
   let ball = 0;
   let frame = 1;
   let second = false;
   let score = 0;
   while (scores[ball]) {
    if (second) {
      if (scores[ball] === '/') {
        if (scores[ball+1]) {
          const nextBall = scores[ball+1] === 'X' ? 10 : scores[ball+1] ;
          score = (frame === 10) ? score + 10 - scores[ball-1] : score + 10 - scores[ball-1] + nextBall;
        }
      } else {
        score += scores[ball];
      }
      second = false;
      frame = frame === 10 ? 10 : frame++;
    } else if (scores[ball] === 'X') {
      if (scores[ball+2]) {
        const firstBall = scores[ball+1] === 'X' ? 10 : scores[ball+1] ;
        const secondBall = scores[ball+2] === 'X'  ? 10 : scores[ball+2] === '/' ? 10 - firstBall : scores[ball+2] ;

        score = (frame === 10) ? score + 10 : score + 10 + firstBall + secondBall;
      }
      frame = frame === 10 ? 10 : frame++;
    } else {
      score += scores[ball];
      second = true;
    }
    ball++;
   }
   this.setState({
     score
   })
 }

 scoreEntered(e) {
   let score = parseInt(e.target.value, 10);
   let scores = this.state.scores;
   let last = scores[scores.length - 1];
   let second = this.state.second;
   if (second) {
    score = (score+last) === 10 ? '/' : score;
    second = false;
   } else if (score === 10) {
     score = 'X';
     second = false;
   } else second = true;
   scores.push(score);
   this.setState({
     scores,
     second
   }, this.getScore());
 }
 
 render() {
   return (
     <div>
       <h1>BOWLING!</h1>
       <ScoreEntry scoreEntered={(e)=>this.scoreEntered(e)} />
       <div>{this.state.scores}</div>
       <div>{this.state.score}</div>
     </div>
   )
 }
}
 
ReactDOM.render(<App />, document.getElementById('app'));
