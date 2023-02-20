// Sélectionner la grille et les cellules du jeu, ainsi que les éléments HTML pour le temps, les coups et le bouton "rejouer"
const grid = document.querySelector('.grid');
const cells = Array.from(grid.children);
const timer = document.querySelector('.timer');
const moves = document.querySelector('.moves');
const restartBtn = document.querySelector('.restart');



// Initialiser les variables pour suivre l'état du jeu, le joueur courant, le nombre de coups et le temps écoulé
let currentPlayer = 'X'; // Le joueur courant est X au début
let gameIsLive = true; // Le jeu est en cours au début
let moveCount = 0; // Le nombre de coups est 0 au début
let timeCount = 0; // Le temps écoulé est 0 au début
let timerInterval; // Une variable pour stocker l'ID de l'interval pour arrêter le minuteur

// Fonction pour démarrer le minuteur, qui met à jour l'élément HTML pour afficher le temps écoulé
const startTimer = () => {
  timerInterval = setInterval(() => {
    timeCount++;
    const minutes = Math.floor(timeCount / 60).toString().padStart(2, '0');
    const seconds = (timeCount % 60).toString().padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
  }, 1000); // Mettre à jour le temps toutes les 1000 ms (1 seconde)
};

// Fonction pour arrêter le minuteur
const stopTimer = () => {
  clearInterval(timerInterval);
};

// Fonction appelée lorsqu'un joueur a gagné, qui arrête le jeu et affiche une alerte pour annoncer le gagnant
const handleWin = () => {
  stopTimer(); // Arrêter le minuteur
  gameIsLive = false; // Le jeu est terminé
  alert(`Le joueur ${currentPlayer} a gagné !`); // Afficher une alerte pour annoncer le gagnant
};

// Fonction appelée lorsqu'il y a un match nul, qui arrête le jeu et affiche une alerte pour annoncer le résultat
const handleDraw = () => {
  stopTimer(); // Arrêter le minuteur
  gameIsLive = false; // Le jeu est terminé
  alert(`Match nul !`); // Afficher une alerte pour annoncer le résultat
};

// Fonction appelée lorsqu'un joueur clique sur une cellule du jeu, qui met à jour l'état du jeu et vérifie s'il y a un gagnant ou un match nul
const handleCellClick = (e) => {
  const cell = e.target; // Sélectionner la cellule cliquée
  const index = cells.indexOf(cell); // Trouver l'index de la cellule dans le tableau de cellules

  if (!gameIsLive || cell.textContent !== '') { // Si le jeu est terminé ou la cellule est déjà utilisée, ne rien faire
    return;
  }

  cell.textContent = currentPlayer; // Afficher le symbole du joueur courant dans la cellule
  moveCount++; // Incrémenter le nombre de coups
  moves.textContent = moveCount; // Mettre à jour l'élément HTML pour afficher le nombre de coups

  if (moveCount === 1) { // Si c'est le premier coup, lancer le minuteur
    startTimer();
  }

  // Liste des conditions de victoire, sous forme d'index de cellules
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Vérifier si l'un des joueurs a gagné, en comparant les index de cellules de chaque condition de victoire
  const isWinningMove = winningConditions.some((condition) => {
    return condition.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });

  // Si un joueur a gagné, appeler la fonction pour gérer la victoire
  if (isWinningMove) {
    handleWin();
    return;
  }

  // Si toutes les cellules sont remplies, appeler la fonction pour gérer le match nul
  if (moveCount === cells.length) {
    handleDraw();
    return;
  }

  // Si aucun joueur n'a gagné et le jeu n'est pas terminé, changer le joueur courant
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Fonction pour réinitialiser le jeu, qui efface les symboles des cellules, remet les variables à leur état initial et démarre un nouveau minuteur
const handleRestart = () => {
  cells.forEach((cell) => {
    cell.textContent = '';
  });

  currentPlayer = 'X';
  gameIsLive = true;
  moveCount = 0;
  timeCount = 0;
  moves.textContent = moveCount;
  timer.textContent = '00:00';
  stopTimer();
  startTimer();
};

// Ajouter un écouteur d'événement pour chaque cellule, qui appelle la fonction pour gérer le clic
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

// Ajouter un écouteur d'événement pour le bouton "rejouer", qui appelle la fonction pour réinitialiser le jeu
restartBtn.addEventListener('click', handleRestart,stopTimer());

