//Creamos una escena de carga
let loadingScene = new Phaser.Scene('Loading');
 
loadingScene.preload = function() {
 
 this.load.image('fondoGameOver', '../assets/images/fondoGameOver.png');
 this.load.image('fondoEndGame', '../assets/images/fondoEndGame.png');
 var progressBar = this.add.graphics();
 var progressBox = this.add.graphics();
 progressBox.fillStyle(0x024403, 0.8);
 progressBox.fillRect(240, 270, 320, 50);
  
 //añadimos el texto que nos parece encima de la barra
 var width = this.cameras.main.width;
 var height = this.cameras.main.height;
 var loadingText = this.make.text({
 x: width / 2,
 y: height / 2 - 50,
 text: 'Cargando...',
 style: {
 font: '20px monospace',
 fill: '#ffffff'
 }
 });
 
 //añadimos el porcentaje que aparecerá en la barra mientras esté cargando
 loadingText.setOrigin(0.5, 0.5);

 var percentText = this.make.text({
 x: width / 2,
 y: height / 2 - 5,
 text: '0%',
 style: {
 font: '18px monospace',
 fill: '#ffffff'
 }
 });
  
 percentText.setOrigin(0.5, 0.5);
  
 this.load.on('progress', function (value) {
 percentText.setText(parseInt(value * 100) + '%');
 progressBar.clear();
 progressBar.fillStyle(0xffffff, 1);
 progressBar.fillRect(250, 280, 300 * value, 30);
 });

 //cuando se llena del todo la barra esta desaparece
 this.load.on('complete', function () {
 progressBar.destroy();
 progressBox.destroy();
 loadingText.destroy();
 percentText.destroy();
 });

 //nos hace la carga de la imagen de fondo que se verá en la escena home
 this.load.image('fondoHome', '../assets/images/fondoHome.png');
 for (var i = 0; i < 600; i++) {
 this.load.image('fondoHome'+i, '../assets/images/fondoHome.png');
 }
};



//cuando termina de rellenarse la barra nos abre la siguiente escena, home
loadingScene.create = function(){

this.scene.start('Home');

};