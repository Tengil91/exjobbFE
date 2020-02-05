import React, { useEffect, useRef } from 'react';

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

export default (props) => {
  let messageIndex = {
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
  let boardLength = props.boardLength;
  let gameState = props.gameState;

  let canvas = useRef(null);

  useEffect(() => {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.height = boardLength;
    canvas.width = boardLength;
    canvas.style.height = boardLength + 'px';
    canvas.style.width = boardLength + 'px';
    canvas.addEventListener('click', handleClick);
    loadImages(sources);
  });

  return (
    <div style={{height: boardLength}}>
      <canvas
        id="game-canvas"
        ref={canvas}
        onClick={props.handleClick}
      ></canvas>
    </div>
  );
}

export let paintBoard = (gameState) => {
  let sideLength = boardLength / 8;
  for(let i=0;i<8*sideLength;i+=sideLength){
    for(let j=0;j<8*sideLength;j+=sideLength){
      ctx.fillStyle = ((i + j) / sideLength % 2 === 0) ? '#ffffff' : '#000000';
      ctx.fillRect(j, i, sideLength, sideLength);
    }
  }
  paintCheckAndMatt();
  paintPossibleMoves();
  paintPieces();
}

export let paintCheckAndMatt = () => {
  if(game.matt){
    ctx.fillStyle = '#ff0000';
  } else {
    ctx.fillStyle = '#ffaaaa';
  }
  let sideLength = boardLength / 8;
  game.checkingPieces.forEach(piece => {
    ctx.fillRect(piece.x * sideLength, piece.y * sideLength, sideLength, sideLength);
  });
  if(game.checkedKing){
    ctx.fillRect(game.checkedKing.x * sideLength, game.checkedKing.y * sideLength, sideLength, sideLength);
  }
}

export let paintPossibleMoves = () => {
  let sideLength = boardLength / 8;
  if(game.selectedPiece){
    if(game.selectedPiece.moves.length > 0){
      game.selectedPiece.moves.forEach(move => {
        ctx.fillStyle = '#aaaaff';
        ctx.fillRect(move.x * sideLength, move.y * sideLength, sideLength, sideLength);
      });
      ctx.fillStyle = '#aaffaa';
      ctx.fillRect(game.selectedPiece.x * sideLength, game.selectedPiece.y * sideLength, sideLength, sideLength);
    } else {
      ctx.fillStyle = '#ffaaaa';
      ctx.fillRect(game.selectedPiece.x * sideLength, game.selectedPiece.y * sideLength, sideLength, sideLength);
    }
  }
}

export let paintPieces = () => {
  game.pieces.forEach(piece => {
    let side = boardLength / 8 * .8;
    let x = (piece.x + .5) * boardLength / 8 - side / 2;
    let y = (piece.y + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piece.type], x, y, side, side);
  });
  if(game.pawnCrossing){
    paintPawnCrossing();
  }
  if(game.matt){
    ctx.fillStyle = '#00000077';
    ctx.fillRect(0, 0, boardLength, boardLength);
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px Verdana';
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.fillText("Klicka för att start om", boardLength / 2, boardLength / 2);
  }
}

export let paintPawnCrossing = () => {
  let {x, y} = game.pawnCrossing;
  let side = boardLength / 8 * .8;
  let xCoordinations = (x + .5) * boardLength / 8 - side / 2;
  let yCoordinations = (y + .5) * boardLength / 8 - side / 2;
  let piecesIndex = game.piecesIndex;
  ctx.fillStyle = '#00000077';
  ctx.fillRect(0, 0, boardLength, boardLength);
  if(y === 7){
    ctx.drawImage(images[piecesIndex.queenB], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y - 1 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.rookB], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y - 2 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.knightB], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y - 3 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.bishopB], xCoordinations, yCoordinations, side, side);
  } else {
    ctx.drawImage(images[piecesIndex.queenW], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y + 1 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.rookW], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y + 2 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.knightW], xCoordinations, yCoordinations, side, side);
    yCoordinations = (y + 3 + .5) * boardLength / 8 - side / 2;
    ctx.drawImage(images[piecesIndex.bishopW], xCoordinations, yCoordinations, side, side);
  }
}

export let loadImages = (sources) => {
  let images = {};
  let loadedImages = 0, numImages = 0;
  for(let src in sources){
    numImages++;
  }
  for(let src in sources){
    images[src] = new Image();
    images[src].onload = () => {
      if(++loadedImages === numImages){
        images = images;
        paintBoard();
      }
    }
    images[src].src = sources[src];
  }
}

