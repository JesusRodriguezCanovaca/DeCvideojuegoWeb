// Creant una nova escena.
let gameScene2 = new Phaser.Scene('Nivel2');
//definimos varias variables que utilizaremos más adelante
var score2 = 15; //variable que nos indica el número de huevos que hacen falta para pasar de nivel
var scoreText2; //variable que utilizaremos para mostrar el texto del puntaje en el juego
var totalScore2 = 0; //variable que nos indica el número de huevos que hacen falta para pasar de nivel
var totalScoreText2; //variable que nos indica el número de huevos que hacen falta para pasar de nivel
var player; //esta variable sera nuestro jugador más adelante
//var huevo; //esta variable será nuestro huevo más adelante
var gameOver = false;
var lluvia;
var emitter;
//var musica;
//var recoger;

gameScene2.preload = function() 
{
  //en la función preload cargamos todos los assets que utilizaremos más adelante.
  this.load.image('cielo', '../assets/images/sky.png');
  this.load.image('volcan', '../assets/images/volcan.png');
  this.load.spritesheet('rain', '../assets/images/rain.png', { frameWidth: 17, frameHeight: 17 });
  this.load.image('tiles', '../assets/tilesets/tileset.png');
  this.load.spritesheet('trex', '../assets/images/trex.png', { frameWidth: 132, frameHeight: 75 });
  this.load.spritesheet('dinovolador', '../assets/images/dinovolador.png', { frameWidth: 123, frameHeight: 65 });
  this.load.spritesheet('huevo1', '../assets/images/egg1.png', { frameWidth: 22, frameHeight: 26 });
  this.load.spritesheet('huevo2', '../assets/images/egg2.png', { frameWidth: 22, frameHeight: 26 });
  this.load.spritesheet('huevo3', '../assets/images/egg3.png', { frameWidth: 22, frameHeight: 26 });
  this.load.spritesheet('huevo4', '../assets/images/egg4.png', { frameWidth: 22, frameHeight: 26 });
  this.load.spritesheet('rock', '../assets/images/rock.png', { frameWidth: 41, frameHeight: 56 });
  this.load.tilemapTiledJSON('map2', '../assets/tilemaps/nivel2.json');
  this.load.audio('mainTheme', 'assets/media/MainTheme.mp3');
  this.load.audio('cogeHuevo', 'assets/media/CogeHuevo.mp3');
  this.load.image('fondoNivel2', '../assets/images/fondoNivel2.png');
  }
   
  gameScene2.create = function()
{
  //añadimos la imagen de fondo
  this.add.image(400, 300, 'fondoNivel2');

  lluvia = this.add.particles('rain');
  emitter = lluvia.createEmitter({
    x: 400,
    y: -400,
    alpha: 0.6,
    angle: { min: 180, max: 360 },
    speed: 400,
    gravityY: 350,
    lifespan: 4000,
    quantity: 2,
    scale: { start: 0.2, end: 0.7 },
    blendMode: 'ADD'
});

 
  //añadimos nuestro mapa creado en tiled con todo su contenido
  var map2 = this.make.tilemap({ key: 'map2' });
  var tileset = map2.addTilesetImage('tileset', 'tiles');
  var plataformas2 = map2.createStaticLayer('plataformas2', tileset, 0, 0);
  var fondos2 = map2.createStaticLayer('fondos2', tileset, 0, 0);
  var colisiones2 = map2.createStaticLayer('colisiones2', tileset, 0, 0);
  colisiones2.setCollisionByExclusion(-1, true);

  //creamos un texto que nos muestra el número de huevos restantes al iniciar la partida
  scoreText2 = this.add.text(16, 570, 'FALTAN ' + score2 + ' HUEVOS', { fontSize: '24px', fill: '#FFF' });
  totalScoreText2 = this.add.text(500, 570, 'HUEVOS RECOGIDOS ' + totalScore2, { fontSize: '24px', fill: '#FFF' });

  //Creamos la música de fondo
  //musica = this.add.audio('mainTheme');
  //musica.play();
  //recoger = this.sound.add('cogeHuevo');


  //Creamos un grupo de huevos
  huevosVerdes = this.physics.add.group({
    key: 'huevo1',
    
    repeat: 4,
    setXY: { x: 100, y: 20, stepX: 70 }
    
    });
     
    huevosVerdes.children.iterate(function (child) {
     
    child.setBounceY(0.1);

  });

  //Creamos un grupo de huevos
  huevosLilas = this.physics.add.group({
    key: 'huevo2',
    repeat: 4,
    setXY: { x: 425, y: 0, stepX: 70 }
  });
       
  huevosLilas.children.iterate(function (child) {
       
  child.setBounceY(0.1);   
  });

  //Creamos un grupo de huevos
  huevosAmarillos = this.physics.add.group({
    key: 'huevo3',
    repeat: 3,
    setXY: { x: 100, y: 200, stepX: 150 }
    });
         
    huevosAmarillos.children.iterate(function (child) {
         
    child.setBounceY(0.1);
         
    });

  //Creamos un grupo de huevos
  huevosDorados = this.physics.add.group({
    key: 'huevo4',
    repeat: 0,
    setXY: { x: 700, y: 300, stepX: 0 }
    });
           
    huevosDorados.children.iterate(function (child) {
           
    child.setBounceY(0.1);
           
    });


    trex = this.physics.add.sprite(715, 365, 'trex');
    
  //creamos la animación del trex caminando
  this.anims.create({
      key: 'caminarTrex',
      frames: this.anims.generateFrameNumbers('trex', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
  });
  trex.play('caminarTrex', true);
  trex.setSize(132,64);
  trex.body.offset.y = 8;

  var tween = this.tweens.add({
      targets: trex,
      x: 500,
      //ease: 'movimientoTrex',
      duration: 8000,
      flipX: true,
      yoyo: true,
      repeat: -1
  });

  dinovolador = this.physics.add.sprite(700, 200, 'dinovolador');
    
  //creamos la animación del trex caminando
  this.anims.create({
      key: 'volar',
      frames: this.anims.generateFrameNumbers('dinovolador', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
  dinovolador.play('volar', true);
  dinovolador.setSize(123,65);
  dinovolador.body.offset.y = 8;

  var tween2 = this.tweens.add({
      targets: dinovolador,
      x: 300,
      y: 100,
      duration: 8000,
      flipX: true,
      yoyo: true,
      repeat: -1
  });

  //Cargamos el spritesheet del personaje con todos sus movimientos
  player = this.physics.add.sprite(70, 312, 'rock');
  player.setSize(30,56);
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);


  this.anims.create({
    key: 'muerte',
    frames: this.anims.generateFrameNames('rock', {
    start: 13,
    end: 16,
    }),
    frameRate: 4,
    //repeat: -1
  });

  this.anims.create({
      key: 'izquierda',
      frames: this.anims.generateFrameNames('rock', {
      start: 0,
      end: 3,
      }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'parado',
      frames: [{ key: 'rock', frame: 4 }],
  });

  this.anims.create({
      key: 'derecha',
      frames: this.anims.generateFrameNames('rock', {
      start: 5,
      end: 8,
      }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'saltoEstatico',
      frames: [{ key: 'rock', frame: 17 }],
  });

  this.anims.create({
      key: 'saltoDerecha',
      frames: this.anims.generateFrameNumbers('rock', { start: 11, end: 12 }),
      frameRate: 30,
  });

  this.anims.create({
      key: 'saltoIzquierda',
      frames: this.anims.generateFrameNumbers('rock', { start: 10, end: 9 }),
      frameRate: 30,
  });

  this.anims.create({
      key: 'perder',
      frames: this.anims.generateFrameNames('rock', {
      start: 13,
      end: 16,
      }),
      frameRate: 10,
      repeat: 0
  });

  cursors = this.input.keyboard.createCursorKeys();

  //añadimos las físicas para que colisionen los diferentes elementos
  this.physics.add.collider(player, colisiones2); 
  this.physics.add.collider(trex, colisiones2);
  this.physics.add.collider(huevosVerdes, colisiones2)
  this.physics.add.collider(huevosLilas, colisiones2);
  this.physics.add.collider(huevosAmarillos, colisiones2)
  this.physics.add.collider(huevosDorados, colisiones2);
  //this.physics.add.collider(trex, colisiones);

  //añadimos para cuando nuestro personaje recoja los huevos
  this.physics.add.overlap(player, huevosVerdes, recogerHuevos2, null, this);
  this.physics.add.overlap(player, huevosLilas, recogerHuevos2, null, this);
  this.physics.add.overlap(player, huevosAmarillos, recogerHuevos2, null, this);
  this.physics.add.overlap(player, huevosDorados, recogerHuevos2, null, this);
  this.physics.add.collider(player, trex, trexKillPlayer, null, this);
}
  
gameScene2.update = function()
{

  if (gameOver)
  {
      return;
  }

  /*con las siguientes líneas de código capturamos las teclas de las flechas del cursor para hacer que
  nuestro perosonaje se mueva*/        
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
        if (player.body.onFloor()) {
          player.play('izquierda', true);
          }
  } else if (cursors.right.isDown) {
          player.setVelocityX(200);
          if (player.body.onFloor()) {
            player.play('derecha', true);
          }
    } else {
            // Si no pulsamos ninguna tecla rock se quedará quieto
            player.setVelocityX(0);

            //además en caso de disponer de una animación "idle" se reproduciría
            if (player.body.onFloor()) {
              player.play('parado', true);
            }
      }
        
        // COn la barra espaciadora o el cursor hacia arriba podemos saltar en estático
  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
          player.setVelocityY(-260);
          player.play('saltoEstatico', true);
        
        //si saltamos hacia la derecha el personaje cambiará de posición
        if ((cursors.space.isDown || cursors.up.isDown) && cursors.right.isDown && player.body.onFloor()) {
          player.setVelocityY(-260);
          player.play('saltoDerecha', true);

        }
        //si saltamos hacia la izquierda el personaje cambiará de posición
        if ((cursors.space.isDown || cursors.up.isDown) && cursors.left.isDown && player.body.onFloor()) {
          player.setVelocityY(-260);
          player.play('saltoIzquierda', true);
        } 
  }

  if (score2 == 0) {
    this.scene.start('Final');
  }
  
}

/*Funciones propias
he creado la función de recoger huevos que cuando el jugador toca uno de estos, el huevo desaparece y
resta un punto al contador de huevos restantes*/
function recogerHuevos2 (player, huevos)
{
  huevos.disableBody(true, true);
  
  //Se actualiza el marcador restando 1 por cada huevo recogido
  score2 -= 1;
  scoreText2.setText('FALTAN ' + score2 + ' HUEVOS');


  //recoger.play();
  //totalScore += 1;
  //totalScoreText.setText('HUEVOS RECOGIDOS ' + totalScore);

}

function trexKillPlayer2 (player, trex)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('muerte', true);
 
    this.time.addEvent({
      delay: 2000,
      callback: ()=>{
        this.scene.pause();

        this.scene.start('GameOver');
      },
    });

    gameOver = true;

   
}