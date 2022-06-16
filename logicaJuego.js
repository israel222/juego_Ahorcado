var iniciar=document.querySelector("#bt-iniciar");
var btAgregar=document.querySelector("#bt-agregar");
var btNuevoJuego=document.querySelector("#bt-nuevojuego");
var btDesistir=document.querySelector("#bt-desistir");
var btNuevaPalabra=document.querySelector("#bt-nuevaPalabra");
var btCancelar=document.querySelector("#bt-cancelar");
var palabras=["HTML","JAVASCRIPT", "ALURA", "CHALLENGE","ORACLE","CSS"];
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];//para mostrar las letras que van a ser tecleadas
var palabraCorrecta = "";
var palabraSecreta="";  
var errores=0;
function reestriccion(texto){
    var excluirNum=/\d/g;//var para identicar numumeros en el texto
    var excluirCarac=/\W/g;//var para identificar caracteres especiales en el texto
    if((texto.match(excluirNum))||(texto.match(excluirCarac))){
        alert("no puedes incluir numeros ni caracteres especiales");
        return false;
    }else{
        return true;
    }
}
function dibujarAhorcado(){
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin= "round";
    tablero.strokeStyle= "#0A3871";
    tablero.beginPath();
    switch(errores){
        case 1: tablero.moveTo(300,300);//base
                tablero.lineTo(550,300);
                break;
        case 2: tablero.moveTo(310,300);//palo
                tablero.lineTo(310,50);
                break;
        case 3: tablero.moveTo(310,50);//trabesaño
                tablero.lineTo(470,50);
                break;
        case 4: tablero.moveTo(470,50);//soga
                tablero.lineTo(470,100);
                break;
        case 5: tablero.arc(470,125,25,0,2*3.14);//cabeza
                break;
        case 6: tablero.moveTo(470,150);//cuerpo
                tablero.lineTo(470,250);
                break;
        case 7: tablero.moveTo(470,150);//brazo izquierdo
                tablero.lineTo(440,180);
                break;
        case 8: tablero.moveTo(470,150);//brazo derecho
                tablero.lineTo(500,180);
                break;
        case 9: tablero.moveTo(470,250);//pierna izquierda
                tablero.lineTo(440,280);
                break;
        case 10:tablero.moveTo(470,250);//pierna derecha
                tablero.lineTo(500,280);
                break;
    }
    tablero.stroke();//para dibujar las lineas
    tablero.closePath();//se cierra el camino
}
function dibujarLineas(){
    //propiedades del pincel
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin= "round";
    tablero.strokeStyle= "#0A3871";
    tablero.beginPath();
    var ancho=600/palabraSecreta.length;
    for(let i=0; i<palabraSecreta.length; i++){
        tablero.moveTo(300+(ancho*i),400);//para poder tener espacios entre cada linea
        tablero.lineTo(350+(ancho*i),400);
    }
    tablero.stroke();//para dibujar las lineas
    tablero.closePath();//se cierra el camino
}
function escribirLetraCorrecta(index){
    tablero.font = 'bold 56px Roboto';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle="#0A3871";
    var ancho=600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index],305+(ancho*index),390);
}
function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = 'bold 36px Roboto';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle="#0A3871";
    tablero.fillText(letra, 305+(40*(errorsLeft)),450);
}
function verificarLetraTecleada(key){
  if (letras.length < 3 || letras.indexOf(key)<0){
    letras.push(key);
    return false;
  }  else{
      letras.push(key);
      return true;
  }

}
function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}
function adicionarletraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<0){//si la letra no esta en la palabra secreta o es la primera letra
    errores += 1;
    }
}
function juego(){
    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase();
        if(!verificarLetraTecleada(e.key)){
            if(palabraSecreta.includes(letra)){
                console.log(letra);
                for (let i=0; i<=palabraSecreta.length; i++){
                    if(palabraSecreta[i]===letra){
                        escribirLetraCorrecta(i);
                        adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    }
                }
            }
            else{
                if(!verificarLetraTecleada(e.key))return
                adicionarletraIncorrecta(letra);
                escribirLetraIncorrecta(letra, errores);
            }
        }
        if(palabraCorrecta.length == palabraSecreta.length){
            tablero.font = 'bold 50px Roboto';
            tablero.fillStyle="#0A3871";
            tablero.fillText("felicidades, ganaste",520,200);
        }
        if(errores == 10){
            tablero.font = 'bold 50px Roboto';
            tablero.fillStyle="#FF0000";
            tablero.fillText("¡juego terminado!",550,200);
        }
        if(errores > 0){
            dibujarAhorcado();
        }
    };
      
}
function iniciarJuego(){
    document.getElementById("inicio").style.display="none";
    document.getElementById("agregar-palabra").style.display="none";
    document.getElementById("aparece-ahorcado").style.display="block";
    tablero.clearRect(0,0,960,500);//se borra todo juego previo 
    palabraSecreta=palabras[Math.floor(Math.random()*palabras.length)];
    dibujarLineas();
    juego();
    
}
function agregaPalabra(){
    document.getElementById("inicio").style.display="none";
    document.getElementById("agregar-palabra").style.display="block";
    document.querySelector("#add-palabra").focus();
}
function nuevoJuego(){
    tablero.clearRect(0,0,960,500);
    palabraSecreta=palabras[Math.floor(Math.random()*palabras.length)];
    letras = [];
    palabraCorrecta = "";
    errores=0;
   dibujarLineas();
   juego(); 
}
function nuevaPalabra(){
    var nuevoSecreto=document.querySelector("#add-palabra");
    if(nuevoSecreto.value != ""){
        if(reestriccion(nuevoSecreto.value)){
            document.getElementById("inicio").style.display="none";
            document.getElementById("agregar-palabra").style.display="none";
            document.getElementById("aparece-ahorcado").style.display="block";
            tablero.clearRect(0,0,960,500);//se borra todo juego previo 
            palabraSecreta=nuevoSecreto.value.toUpperCase();
            letras = [];
            palabraCorrecta = "";
            errores=0;
            dibujarLineas();
            juego();
        }else{
            nuevoSecreto.value="";
            nuevoSecreto.focus();
        }
    }else{
        alert("agregue una palabra de maximo 8 letras");
        nuevoSecreto.focus();
    }
}
function principal(){
    document.getElementById("aparece-ahorcado").style.display="none";
    document.getElementById("agregar-palabra").style.display="none";
    document.getElementById("inicio").style.display="block";
    letras = [];
    palabraCorrecta = "";
    errores=0;
}
document.getElementById("aparece-ahorcado").style.display="none";
document.getElementById("agregar-palabra").style.display="none";
iniciar.onclick=iniciarJuego;
btNuevoJuego.onclick=nuevoJuego;
btDesistir.onclick=principal;
btAgregar.onclick=agregaPalabra;
btCancelar.onclick=principal;
btNuevaPalabra.onclick=nuevaPalabra;

//alert(escojerPalabraSecreta().length);

