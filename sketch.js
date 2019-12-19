var of;
var caseLaw = []
let baseURL = "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:6"
let activeCase ="";
let newCase=false;
let input, button;




var claw = $('#csl').val();


$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});


function loadFile() {
  claw=input.value();
  console.log(claw);
  newcase=false;
  redraw();
  $.get(
    baseURL+claw
,
    function (response) {
        response = response.replace(/<\/?[^>]+(>|$)/g, "");
        console.log("> ", response);
	   caseLaw=response.split(' ');
	   newCase=true;
 	   redraw();
	});  
}



function ftext(fountain, particle) {
 stroke(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  //noFill();
  if (caseLaw[particle.id]>10) {
  		textSize(particle.partSize*2);
  } else {
  		textSize(particle.partSize/2);
  }
  text(caseLaw[particle.id], particle.location.x, particle.location.y);
}


function setup() {
    createCanvas(800, 400);
    input = createInput('');
    button = createButton('submit');
    button.mousePressed(loadFile);
    var t =
    {
        name: "test",
        shape: "text",
        colors: ["blue",[0,255,127,127],[0,255,64,32]],
        lifetime: 600,
        angle: [240, 300],
        size: [8, 64],
        dxy: [0.1, 0.1],
        x: 0.5,
        y: 0.3
    };
    Fountain_display("text", ftext); //set draw function based on shape name
    of = new Fountain(null, t);
}

function draw() {
if (newCase){
  background(51);
  of.Draw();
  of.Create();
  of.Step();
  noStroke();
  fill(255);
  textSize(16);
  text(of.length, width/2, 20);
  stroke(0);
  }
}

