let of;
let caseLaw = [];
let soundBack;
let baseURL = "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:6"
let activeCase ="";
let newCase=false;
let playRifTabla=false;
let playRifFlute=false;
let playRifConga=false;
let limitCase=100;
let input, button, msg;
let testString="First, according to Section 177 B(1) and (2)(b) of Part XA of the PDAA yellow, where, in particular, by ‘a final judgment of … the Court of Justice of the European Union’, it is held that a permission for a project for which an environmental impact assessment was required was unlawfully granted, the competent planning authority must give notice in writing directing the project manager to apply for substitute consent. Subsection (2)(c) of Section 177 B of Part XA of the PDAA states that the notice is to require the project manager to furnish a remedial environmental impact statement with the application.";
let messg="Happy New Year";
let banner="              ";
let voice, words;
let soundTabla=[];
let soundFlute=[];
let soundConga=[];
let rifTabla=[];
let rifFlute=[];
let rifConga=[];
let t =
    {
        name: "socl",
        shape: "text",
        colors: ["lightblue","MediumOrchid","LightSeaGreen"],
        lifetime: 600,
        angle: [0, 400],
        size: [8, 64],
        dxy: [0.2, 0.2],
        x: 0.45,
        y: 0.3,
        limit: limitCase
    };

$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});

let FreeSoundConga = function () {
		rifConga.shift();
}

let FreeSoundTabla = function () {
		rifTabla.shift();
}

let FreeSoundFlute = function () {
		rifFlute.shift();
}


function loadCase() {
  let claw=input.value();
  console.log(claw);
  activeCase=claw;
  newcase=false;
  redraw();
  $.get(
    baseURL+claw
    ,
    function (response) {
	   of = new Fountain(null, t);
	   response = response.replace(/<\/?[^>]+(>|$)/g, " ");	
	   response = response.replace(/&(.*?);/g, " ");
	   response = response.replace(/\\n/g, " ");
	   response = response.replace(/\s{2,20}/g, " ");	
	   voice.speak(response);

       console.log("> got it!");
	   caseLaw=response.split(" ");
	   caseLaw=caseLaw.slice(0,limitCase);
	   newCase=true;
	   playRifTabla=false;
	   playRifFlute=false;
       playRifConga=false;
	   //soundBack.play();
       //soundBack.setLoop(true);
 	   redraw();
	}
	) 
	.fail(function() {
	    console.log("> fail!")});
		failLoadCase();
	
}

playSequence = function (seq, sounds) {
		sounds[seq[0]].play(); 
}

function createRif(rif,lg,sounds) {
	for (let i=0; i<lg; i++) {
		maximum=sounds.length;
		rif.push(Math.floor(Math.random() * (maximum )));
	}
	console.log(rif);
}
function setsoundTabla() {
	soundTabla.forEach (function (sound) {
		  sound.onended(FreeSoundTabla);
		}
	)
}

function setsoundFlute() {
	soundFlute.forEach (function (sound) {
		  sound.onended(FreeSoundFlute);
		}
	)
}

function setsoundConga() {
	soundConga.forEach (function (sound) {
		  sound.onended(FreeSoundConga);
		}
	)
}

function preload() {
	
  soundTabla.push(loadSound("./OPMDrums/tabla-hi-na.wav"));
  soundTabla.push(loadSound("./OPMDrums/tabla-hi-tin.wav"));
  soundTabla.push(loadSound("./OPMDrums/tabla-hi-tuh.wav"));
  soundTabla.push(loadSound("./OPMDrums/tabla-lo-geh-gliss.wav"));
  soundTabla.push(loadSound("./OPMDrums/tabla-hi-tuut.wav"));
  soundTabla.push(loadSound("./OPMDrums/tabla-lick.wav"));
  setsoundTabla();
  
  soundConga.push(loadSound("./OPMDrums/conga-lick.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-muffled-1.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-muffled-2.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-open-1.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-open-2.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-slap-1.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-slap-2.wav"));
  soundConga.push(loadSound("./OPMDrums/conga-lick.wav"));
  setsoundConga();
  
  soundFlute.push(loadSound("./OPMFlutes/flute-alto-lick.wav"));
  //soundFlute.push(loadSound("./OPMFlutes/flute-alto-C.wav"));
  //soundFlute.push(loadSound("./OPMFlutes/flute-C-octave0.wav"));
  //soundFlute.push(loadSound("./OPMFlutes/flute-C-octave1.wav"));
  setsoundFlute();
  
  soundBack = loadSound('./Electro-loop-120-bpm.wav');
  soundGarbage = loadSound('./soundsmp3/garbage.mp3');
  soundPinson = loadSound('./soundsmp3/pinsondesarbres.mp3');
  voice = new p5.Speech(); // speech synthesis object
  words = new p5.Speech(); // speech synthesis object
  voice.setLang("en-GB");
  words.setLang("en-GB");
}

function message() {
       msg.html("Reading case "+activeCase);
       msg.show();
}
 

function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
}

function happy() {
     textAlign(CENTER);
     textSize(windowHeight/5);
     noStroke();
     fill("PapayaWhip");
     text(banner,width/2,height*0.6);
}

function failLoadCase() {
	 redraw();
     msg.html("Cannot find case "+activeCase+" in Eurlex database, try another number! ");
     msg.show();
}

function twenty() {
     textAlign(CENTER);
     console.log("2020");
     textSize(windowHeight*0.7);
     strokeWeight(5);
     stroke("AliceBlue");
     noFill();
     text("2020",width/2,height*0.8);
}

function setParticle(part) {
  let index=0;
  switch (caseLaw[part.id][0]) {
  case 'h' : 
     fill("PapayaWhip");
     index = 0;
     banner = banner.substr(0, index) + 'H' + banner.substr(index + 1);
	 if (part.sound == 0) {playRifTabla=true;}
	 part.sound=1;
	 break;
  case'a':
     fill("PapayaWhip");
     index = 1;
     banner = banner.substr(0, index) + 'a' + banner.substr(index + 1);
     index = 12;
     banner = banner.substr(0, index) + 'a' + banner.substr(index + 1);

     break;
  case'p' :
     fill("PapayaWhip");
     index = 2;
     banner = banner.substr(0, index) + 'pp' + banner.substr(index + 2);
	 if (part.sound == 0) {playRifFlute=true;}
	 part.sound=1;
     break;
  case 'y' :
     fill("PapayaWhip");
     index = 4;
     banner = banner.substr(0, index) + 'y' + banner.substr(index + 1);
     index = 10;
     banner = banner.substr(0, index) + 'Y' + banner.substr(index + 1);
     break;
  case 'n' :
     fill("PapayaWhip");
     index = 6;
     banner = banner.substr(0, index) + 'N' + banner.substr(index + 1);
     break;
  case 'w' :
     fill("PapayaWhip");
     index = 8;
     banner = banner.substr(0, index) + 'w' + banner.substr(index + 1);
	 if (part.sound == 0) {playRifConga=true;}
	 part.sound=1;
     break;
  case 'r':
     fill("PapayaWhip");
     index = 13;
     banner = banner.substr(0, index) + 'r' + banner.substr(index + 1);
     break;
  case 'e' :
     fill("PapayaWhip"); 
     index = 7;
     banner = banner.substr(0, index) + 'e' + banner.substr(index + 1);
     index = 11;
     banner = banner.substr(0, index) + 'e' + banner.substr(index + 1);
     break;
  default: 
  } 

}


function ftext(fountain, particle) {
  noStroke();
  fill(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  //noFill();
  if (caseLaw[particle.id].length > 20) {
  		textSize(particle.partSize*2);
  } else {
  		textSize(particle.partSize/2);
  }
  if (particle.set == 0) {
	setParticle(particle);
    particle.set=1;	
  }
  text(caseLaw[particle.id], particle.location.x, particle.location.y);
}

function setup() {

    blendMode(LIGHTEST);
    createCanvas(windowWidth, windowHeight);
	background(128);
    input = createInput("").attribute('placeholder', ' For replay, enter ECJ case-law number here e.g. 2003CJ0001');;
    input.position(100,20);
    input.class("input");
    input.size(550,30);
    button = createButton('submit');
    button.position(input.width+120,20);
    button.mousePressed(loadCase);
    button.class("button");
    msg = createP("Test");
    msg.position(100,height-100);
    msg.class("msg");
    msg.hide();
    Fountain_display("text", ftext); //set draw function based on shape name
    
}


function draw() {
	 if (newCase){
	  background(128);
	  input.hide();
	  button.hide();
	  message();
	  happy();
	  if (rifTabla.length>0) {
		 playSequence(rifTabla,soundTabla);
	  }
	  if (playRifTabla && (rifTabla.length == 0)){
		 console.log("createrifTabla");
		 createRif(rifTabla,Math.floor(Math.random() * (20)+10),soundTabla);
		 playRifTabla=false; }
	  if (rifConga.length>0) {
		 playSequence(rifConga,soundConga);
	  }
	  if (playRifConga && (rifConga.length == 0)){
		 console.log("createrifConga");
		 createRif(rifConga,Math.floor(Math.random() * (10)+2),soundConga);
		 playRifConga=false; }
	  if (rifFlute.length>0) {
		 playSequence(rifFlute,soundFlute);
	  }
	  if (playRifFlute && (rifFlute.length == 200)){
		 console.log("createrifFlute");
		 createRif(rifFlute,Math.floor(Math.random() * (1)+1),soundFlute);
		 playRifFlute=false; }
	   of.Draw();
	   of.Create();
	   of.Step();
	   if (of.done) {
		     background(128);
		     voice.cancel();
			 banner=messg;
			 happy();
			 twenty();
			 input.value("");
			 input.show();
			 button.show();
			 msg.hide();
			 newCase= false;
		  }
	  }
}

