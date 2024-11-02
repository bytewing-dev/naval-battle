const readline = require('readline-sync'); //Variable permettant d'importer les méthodes readline-sync

export function displayMatrix(matrix: string[][]): void {
  for (let i: number = 0; i < matrix.length; i += 1) {
    console.log(`${matrix[i].join(' ')}`);
  }
}

export function shipsSetup(shipNumber: number, playerName: string, regexPos: RegExp, matrixDef: string[][]): void {
  while (shipNumber > 0) {
    console.log('');
    displayMatrix(matrixDef);
    console.log('');
    let shipPos = readline.question(`${playerName}, où voulez-vous placer votre bateau ? -> `);
    if (regexPos.test(shipPos)) {
      let shipCol = shipPos[0].toLowerCase().charCodeAt(0) - 96;
      let shipRow = shipPos[1];
      if (matrixDef[shipRow][shipCol] !== 'B') {
        matrixDef[shipRow][shipCol] = 'B';
        shipNumber -= 1;
        console.log('');
        displayMatrix(matrixDef);
        console.log(`\nIl vous reste ${shipNumber} bateau(x) à placer.\n`);
      } else {
        console.log('Vous avez déjà placé un bateau à cet emplacement, veuillez choisir un autre emplacement.');
      }
    } else {
      console.log('');
      console.log('La position du bateau doit se situer sur la grille de jeu.');
      console.log('Vous devez donc sélectionner une case selon sa colonne (A-H) et sa ligne (1-8).');
    }
  }
}

export function gameSetup(goodExec: string, shipNumber: number, regexPos: RegExp, matrixDefP1: string[][], matrixDefP2: string[][]) {
  if (goodExec !== '--number' || shipNumber <= 0) {
    console.log('Le programme s\'exécute de la façon suivante : node main.js --number <nombre de bateaux en chiffre>')
    process.exit(0);
  } else {
    const player1 = readline.question('Quel est le nom du joueur 1 ? ');
    shipsSetup(shipNumber, player1, regexPos, matrixDefP1);
    const player2 = readline.question('Quel est le nom du joueur 2 ? ');
    shipsSetup(shipNumber, player2, regexPos, matrixDefP2);
    return [player1, player2];
  }
}

export function attack(matrixAtk: string[][], matrixDef: string[][], playerName: string, regexPos: RegExp): boolean {
  let shoot: boolean = false;
  let hit: boolean = false;
  while (shoot !== true) {
    console.log(`C'est au tour de ${playerName}.`);
    console.log('');
    displayMatrix(matrixAtk);
    console.log('');
    let attackPos = readline.question(`${playerName}, où voulez-vous attaquer ? -> `);
    if (regexPos.test(attackPos)) {
      let attackCol = attackPos[0].toLowerCase().charCodeAt(0) - 96;
      let attackRow = attackPos[1]
        if (matrixDef[attackRow][attackCol] === 'B') {
          console.log('BOOM ! Vous avez touché un bateau ennemi.\n');
          matrixAtk[attackRow][attackCol] = 'X';
          matrixDef[attackRow][attackCol] = 'X';
          shoot = true;
          hit = true;
        } else if (matrixDef[attackRow][attackCol] === '.') {
          console.log('Plouf ! Vous avez manqué votre tir...\n');
          matrixAtk[attackRow][attackCol] = 'O';
          matrixDef[attackRow][attackCol] = 'O';
          shoot = true;
        } else {
          console.log('Vous avez déjà attaqué cet emplacement, veuillez choisir un autre emplacement.\n');
        }
    } else {
      console.log('La position du tir doit se situer sur la grille de jeu.');
      console.log('Vous devez donc sélectionner une case selon sa colonne (A-H) et sa ligne (1-8).\n');
    }
  }
  return hit;
}

export function checkVictory(matrixDef: string[][]): boolean {
  for (let row = 1; row < matrixDef.length; row += 1) {
    if (matrixDef[row].includes('B')) {
      return false;
    }
  }
  return true;
}

export function replay(): boolean {
  const replay: boolean = readline.keyInYN('Souhaitez-vous rejouer une partie ? (Oui = y / Non = n)');
  if (replay === false) {
    console.log('D\'accord, à bientôt !');
    return false
  } else {
    console.log('C\'est reparti !\n');
    let shipNumber: number = 0;
    while (shipNumber <= 0) {
      shipNumber = readline.question('Avec combien de bateaux souhaitez-vous rejouer ?');
      console.log('');
      console.log('Vous devez sélectionner un nombre de bateaux supérieur à 0.');
    }
    let victory: boolean = false;
    let matrixDefP1: string[][] = [ 
      [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    let matrixAtkP1: string[][] = [
      [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    let matrixDefP2: string[][] = [
      [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    let matrixAtkP2: string[][] = [
      [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      ['1', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['2', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['3', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['4', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['5', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['6', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    return true
  }
}

export function gameOn(player1Name: string, player2Name: string, goodExec: string, shipNumber: number, regexPos: RegExp, matrixDefP1: string[][], matrixDefP2: string[][], victory: boolean, matrixAtkP2: string[][], matrixAtkP1: string[][]): void {
    [player1Name, player2Name] = gameSetup(goodExec, shipNumber, regexPos, matrixDefP1, matrixDefP2);
    while (victory !== true) {
      let result = attack(matrixAtkP2, matrixDefP2, player1Name, regexPos);
      if (result === true) {
        console.log(`${player1Name} a réussi son tir !\n`);
      } else {
        console.log(`${player1Name} a raté son tir...\n`)
      }
      if (checkVictory(matrixDefP2)) {
        console.log(`Bravo ! ${player1Name} a détruit tous les bateaux de ${player2Name} et a donc gagné la bataille navale !\n`);
        victory = true;
        break
      }
      result = attack(matrixAtkP1, matrixDefP1, player2Name, regexPos);
      if (result) {
        console.log(`${player2Name} a réussi son tir !\n`);
      } else {
        console.log(`${player2Name} a raté son tir...\n`)
      }
      if (checkVictory(matrixDefP1)) {
        console.log(`Bravo ! ${player2Name} a détruit tous les bateaux de ${player1Name} et a donc gagné la bataille navale !\n`);
        victory = true;
        break
      }
    }
    if (replay()) {
    gameOn(player1Name, player2Name, goodExec, shipNumber, regexPos, matrixDefP1, matrixDefP2, victory, matrixAtkP2, matrixAtkP1);
    }
  }
  