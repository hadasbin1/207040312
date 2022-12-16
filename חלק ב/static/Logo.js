var imageSources = [src="../static/Logo1.png",src="../static/Logo2.png",src="../static/Logo3.png",src="../static/Logo4.png"]

var index = 0;
setInterval (function(){
  if (index === imageSources.length) {
    index = 0;
  }
  document.getElementById("image").src = imageSources[index];
  index++;
} , 500);
