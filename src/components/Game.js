import React from 'react';

import bishopB from '../images/bishopB.png';
import bishopW from '../images/bishopW.png';
import kingB from '../images/kingB.png';
import kingW from '../images/kingW.png';
import knightB from '../images/knightB.png';
import knightW from '../images/knightW.png';
import pawnW from '../images/pawnW.png';
import pawnB from '../images/pawnB.png';
import queenB from '../images/queenB.png';
import queenW from '../images/queenW.png';
import rookB from '../images/rookB.png';
import rookW from '../images/rookW.png';

let sources = {
  bishopB,
  bishopW,
  kingB,
  kingW,
  knightB,
  knightW,
  pawnB,
  pawnW,
  queenB,
  queenW,
  rookB,
  rookW
}

class Chess extends React.Component {
  constructor(props){
    super(props);
    this.messageIndex = {
      pieces: {
        bishopB: 'löpare',
        bishopW: 'löpare',
        kingB: 'kung',
        kingW: 'kung',
        knightB: 'springare',
        knightW: 'springare',
        pawnB: 'bonde',
        pawnW: 'bonde',
        queenB: 'drottning',
        queenW: 'drottning',
        rookB: 'torn',
        rookW: 'torn'
      },
      color: {
        bishopB: 'svart',
        bishopW: 'vit',
        kingB: 'svart',
        kingW: 'vit',
        knightB: 'svart',
        knightW: 'vit',
        pawnB: 'svart',
        pawnW: 'vit',
        queenB: 'svart',
        queenW: 'vit',
        rookB: 'svart',
        rookW: 'vit'
      },
      x: {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f',
        6: 'g',
        7: 'h'
      }
    }
    
    this.piecesIndex = {
      bishopB: 'bishopB',
      bishopW: 'bishopW',
      kingB: 'kingB',
      kingW: 'kingW',
      knightB: 'knightB',
      knightW: 'knightW',
      pawnB: 'pawnB',
      pawnW: 'pawnW',
      queenB: 'queenB',
      queenW: 'queenW',
      rookB: 'rookB',
      rookW: 'rookW'
    }
    this.props = props;
    this.boardLength = 500;
  }

  componentDidMount(){
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = this.boardLength;
    this.canvas.width = this.boardLength;
    this.canvas.style.height = this.boardLength + 'px';
    this.canvas.style.width = this.boardLength + 'px';
    this.loadImages(sources);
  }

  paintBoard(){
    let sideLength = this.boardLength / 8;
    for(let i=0;i<8*sideLength;i+=sideLength){
      for(let j=0;j<8*sideLength;j+=sideLength){
        this.ctx.fillStyle = ((i + j) / sideLength % 2 === 0) ? '#ffffff' : '#000000';
        this.ctx.fillRect(j, i, sideLength, sideLength);
      }
    }
    this.paintCheckAndMatt();
    this.paintPossibleMoves();
    this.paintPieces();
  }

  paintCheckAndMatt(){
    if(this.props.matt){
      this.ctx.fillStyle = '#ff0000';
    } else {
      this.ctx.fillStyle = '#ffaaaa';
    }
    let sideLength = this.boardLength / 8;
    if(this.props.checkingPieces){
      this.props.checkingPieces.forEach(piece => {
        this.ctx.fillRect(piece.x * sideLength, piece.y * sideLength, sideLength, sideLength);
      });
    }
    if(this.props.checkedKing){
      this.ctx.fillRect(this.props.checkedKing.x * sideLength, this.props.checkedKing.y * sideLength, sideLength, sideLength);
    }
  }

  paintPossibleMoves(){
    let sideLength = this.boardLength / 8;
    if(this.props.selectedPiece){
      if(this.props.selectedPiece.moves.length > 0){
        this.props.selectedPiece.moves.forEach(move => {
          this.ctx.fillStyle = '#aaaaff';
          this.ctx.fillRect(move.x * sideLength, move.y * sideLength, sideLength, sideLength);
        });
        this.ctx.fillStyle = '#aaffaa';
        this.ctx.fillRect(this.props.selectedPiece.x * sideLength, this.props.selectedPiece.y * sideLength, sideLength, sideLength);
      } else {
        this.ctx.fillStyle = '#ffaaaa';
        this.ctx.fillRect(this.props.selectedPiece.x * sideLength, this.props.selectedPiece.y * sideLength, sideLength, sideLength);
      }
    }
  }

  paintPieces(){
    if(this.props.pieces){
      this.props.pieces.forEach(piece => {
        let side = this.boardLength / 8 * .8;
        let x = (piece.x + .5) * this.boardLength / 8 - side / 2;
        let y = (piece.y + .5) * this.boardLength / 8 - side / 2;
        this.ctx.drawImage(this.images[piece.type], x, y, side, side);
      });
    }
    if(this.props.pawnCrossing){
      this.paintPawnCrossing();
    }
    if(this.props.matt){
      this.ctx.fillStyle = '#00000077';
      this.ctx.fillRect(0, 0, this.boardLength, this.boardLength);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '36px Verdana';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("Klicka för att start om", this.boardLength / 2, this.boardLength / 2);
    }
  }

  paintPawnCrossing(){
    let {x, y} = this.props.pawnCrossing;
    let side = this.boardLength / 8 * .8;
    let xCoordinations = (x + .5) * this.boardLength / 8 - side / 2;
    let yCoordinations = (y + .5) * this.boardLength / 8 - side / 2;
    let piecesIndex = this.piecesIndex;
    this.ctx.fillStyle = '#00000077';
    this.ctx.fillRect(0, 0, this.boardLength, this.boardLength);
    if(y === 7){
      this.ctx.drawImage(this.images[piecesIndex.queenB], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y - 1 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.rookB], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y - 2 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.knightB], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y - 3 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.bishopB], xCoordinations, yCoordinations, side, side);
    } else {
      this.ctx.drawImage(this.images[piecesIndex.queenW], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y + 1 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.rookW], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y + 2 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.knightW], xCoordinations, yCoordinations, side, side);
      yCoordinations = (y + 3 + .5) * this.boardLength / 8 - side / 2;
      this.ctx.drawImage(this.images[piecesIndex.bishopW], xCoordinations, yCoordinations, side, side);
    }
  }

  loadImages(sources){
    let images = {};
    let loadedImages = 0, numImages = 0;
    for(let src in sources){
      numImages++;
    }
    for(let src in sources){
      images[src] = new Image();
      images[src].onload = () => {
        if(++loadedImages === numImages){
          this.images = images;
          this.paintBoard();
        }
      }
      images[src].src = sources[src];
    }
  }

  render(){
    if(this.ctx && this.images){
      this.paintBoard();
    }
    return (
      <div style={{height: this.boardLength}}>
        <canvas onClick={this.props.handleClick} id="game-canvas" ></canvas>
      </div>
    );
  }
}

export default Chess;
