//creamos la escena de pantalla inicial del juego
let homeScene = new Phaser.Scene('Home');
 

homeScene.create = function(){

//añadimos el fondo que se cargó en la escena de carga anterior i la convertimos en interactiva
let bg = this.add.sprite(0, 0, 'fondoHome').setInteractive();
bg.setOrigin(0, 0);

//añadimos texto
let gameW = this.sys.game.config.width;
let gameH = this.sys.game.config.height;
let text = this.add.text(gameW/2, gameH/1.5, 'CLIC PARA JUGAR', {
font: '30px Arial',
fill: '#ffffff'
});

text.setOrigin(0.5, 0.5);
text.depth = 1;
 
//con esta función hacemos que al hacer clic en la pantalla con el ratón, nos abra la siguiente escena Game
bg.on('pointerdown', function(){
this.scene.start('Nivel1');
}, this);
};