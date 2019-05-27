var audio, context, analyser, src, array, logo, elemLogo;

logo = document.getElementById("logo").style;
elemLogo = document.getElementById("logo");

audio = document.getElementById("audio");
audio.crossOrigin="anonymous";

window.onclick = function(){
    elemLogo.classList.toggle('extra');
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[80])+"px";
    logo.width =  (array[40])+"px";
    logo.backgroundColor =  "#DDF"+(array[40]);
    logo.borderRadius =  (array[0])+"%";
    logo.boxShadow = "0px 0px 135px 59px rgba("+array[10]+","+array[50]+","+array[500]+",1)";
}