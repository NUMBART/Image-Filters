var image;
var grayImage;
var blurImage;
var vintageImage;
var redImage;
var redImageTwo;
var secretImage;
var rainbowImage;
var canvas;

function checkImage(image){
  if(image == null || !image.complete())
    return false;
  else
    return true;
}

function clearCanvas(){
  var context = canvas.getContext("2d");
  context.clearRect(0,0,image.width,image.height);
}

function loadImage(){
  image = new SimpleImage(document.getElementById("loadButton"));
  grayImage = new SimpleImage(document.getElementById("loadButton"));
  rainbowImage = new SimpleImage(document.getElementById("loadButton"));
  redImage = new SimpleImage(document.getElementById("loadButton"));
  redImageTwo = new SimpleImage(document.getElementById("loadButton"));
  vintageImage = new SimpleImage(document.getElementById("loadButton"));
  secretImage = new SimpleImage(document.getElementById("loadButton"));
  blurImage = new SimpleImage(document.getElementById("loadButton"));
  canvas = document.getElementById("canvas");
  image.drawTo(canvas);
}



function vintage(){
  if(checkImage(vintageImage)){
    clearCanvas();
    vintageFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function vintageFilter(){
  for(var pixel of vintageImage.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg*1.4 < 255){
      pixel.setRed(avg*1.4);
      pixel.setGreen(avg*1.05);
      pixel.setBlue(avg);
    }
    else{
      pixel.setRed(255);
      if(avg*1.05 < 255){
        pixel.setGreen(avg*1.05);
        pixel.setBlue(avg);
      }
      else{
        pixel.setGreen(255);
        pixel.setBlue(avg);
      }
        
    }
  }
  vintageImage.drawTo(canvas);
}



function grayscale(){
  if(checkImage(grayImage)){
    clearCanvas();
    grayFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function grayFilter(){
  for(var pixel of grayImage.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas);
}



function redimage(){
  if(checkImage(redImage)){
    clearCanvas();
    redFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function redFilter(){
  for(var pixel of redImage.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(avg < 128){
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else{
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
  }
  redImage.drawTo(canvas);
}



function redimageTwo(){
  if(checkImage(redImageTwo)){
    clearCanvas();
    redFilterTwo();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function redFilterTwo(){
  for(var pixel of redImageTwo.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(0);
    pixel.setBlue(0);
  }
  redImageTwo.drawTo(canvas);
}



function rainbowimage(){
  if(checkImage(rainbowImage)){
    clearCanvas();
    rainbowFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function calcColor(avg, hueColor){
  var color;
  if(avg < 128)
    color = hueColor/127.5*avg;
  else
    color = (2 - hueColor/127.5)*avg + 2*hueColor - 255;
  return color;
}
function rainbowFilter(){
  var h = rainbowImage.getHeight();
  for(var pixel of rainbowImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if(y < h/7){
      pixel.setRed(calcColor(avg, 255));
      pixel.setGreen(calcColor(avg, 0));
      pixel.setBlue(calcColor(avg, 0));
    }
    else if(y < 2*h/7){
      pixel.setRed(calcColor(avg, 255));
      pixel.setGreen(calcColor(avg, 127));
      pixel.setBlue(calcColor(avg, 0));  
    }
    else if(y < 3*h/7){
      pixel.setRed(calcColor(avg, 255));
      pixel.setGreen(calcColor(avg, 255));
      pixel.setBlue(calcColor(avg, 0));  
    }
    else if(y < 4*h/7){
      pixel.setRed(calcColor(avg, 0));
      pixel.setGreen(calcColor(avg, 255));
      pixel.setBlue(calcColor(avg, 0));  
    }
    else if(y < 5*h/7){
      pixel.setRed(calcColor(avg, 0));
      pixel.setGreen(calcColor(avg, 0));
      pixel.setBlue(calcColor(avg, 255));
    }
    else if(y < 6*h/7){
      pixel.setRed(calcColor(avg, 75));
      pixel.setGreen(calcColor(avg, 0));
      pixel.setBlue(calcColor(avg, 130));  
    }    
    else if(y <= h){
      pixel.setRed(calcColor(avg, 148));
      pixel.setGreen(calcColor(avg, 0));
      pixel.setBlue(calcColor(avg, 211));
    }
  }
  rainbowImage.drawTo(canvas);
}



function secret(){
  if(checkImage(secretImage)){
    clearCanvas();
    secretFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function secretFilter(){
  for(var pixel of secretImage.values()){
    pixel.setRed(pixel.getRed() - (pixel.getRed()%20));
    pixel.setGreen(pixel.getGreen() - (pixel.getGreen()%20));
    pixel.setBlue(pixel.getBlue() - (pixel.getBlue()%20));
  }
  secretImage.drawTo(canvas);
}



function blurimage(){
  if(checkImage(blurImage)){
    clearCanvas();
    blurFilter();
  }
  else{
    alert("Image has not been loaded.");
    return;
  }
}
function blurFilter(){
  for(var pixel of blurImage.values()){
    if(Math.random() > 0.5){
      var newx = pixel.getX() + Math.round(Math.random()*10 - 5);
      var newy = pixel.getY() + Math.round(Math.random()*10 - 5);
      if(newx > 0 && newy > 0 && newy < blurImage.getHeight()-1 && newx < blurImage.getWidth()-1){
         pixel.setAllFrom(image.getPixel(newx,newy));
      }
    }
  }
  blurImage.drawTo(canvas);
}

function resetImage(){
  image.drawTo(canvas);
  grayImage = new SimpleImage(image);
  redImage = new SimpleImage(image);
  vintageImage = new SimpleImage(image);
  secretImage = new SimpleImage(image);
  redImageTwo = new SimpleImage(image);
  rainbowImage = new SimpleImage(image);
  blurImage = new SimpleImage(image);
}