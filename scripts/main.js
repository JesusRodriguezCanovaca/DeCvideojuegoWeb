//configuramos el archivo main
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'contenedor',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  //le decimos al archivo main las escenas que se deben cargar
  scene: [loadingScene, homeScene, gameScene, gameScene2, gameOverScene, endGameScene],
  title: 'Dinosaure Eggs Capture',
  backgroundColor: 'rgb(9, 46, 6)'
  };
   
let game = new Phaser.Game(config);