//creamos la escena de pantalla inicial del juego
let endGameScene = new Phaser.Scene('Final');
 

endGameScene.create = function(){

//añadimos el fondo que se cargó en la escena de carga anterior i la convertimos en interactiva
let bg = this.add.sprite(0, 0, 'fondoEndGame').setInteractive();
bg.setOrigin(0, 0);

//añadimos texto
textoHasPerdido = this.add.text(200, 200, '¡FELICIDADES!', { fontSize: '50px', fill: '#FFF' });
textoHasPerdido = this.add.text(200, 250, 'HAS TERMINADO EL JUEGO', { fontSize: '30px', fill: '#FFF' });
let gameW = this.sys.game.config.width;
let gameH = this.sys.game.config.height;
let text = this.add.text(gameW/2, gameH/1.5, 'PULSA F5 PARA JUGAR DE NUEVO', {
font: '30px Arial',
fill: '#ffffff'
});

text.setOrigin(0.5, 0.5);
text.depth = 1;
 
//con esta función hacemos que al hacer clic en la pantalla con el ratón, nos abra la siguiente escena Game
/*bg.on('pointerdown', function(){
this.scene.start('Nivel1');
}, this);*/
};