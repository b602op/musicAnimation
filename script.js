var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

audio = document.getElementById("audio");
audio.crossOrigin="anonymous";

window.onclick = function(){
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
    console.log(context, "1");
    analyser = context.createAnalyser();
    console.log(analyser, "2" );
    src = context.createMediaElementSource(audio);
    console.log(src, "3");
    src.connect(analyser);
    console.log(src.connect(analyser), "4");
    analyser.connect(context.destination);
    console.log(analyser.connect(context.destination), "5");
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[40])+"px";
    logo.width =  (array[40])+"px";
}