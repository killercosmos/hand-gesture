var prediction1 = "";
var prediction2 = "";
Webcam.set({
    height:350,
    width:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("webcam");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id ='captured_image' src = '" +data_uri+"'></img>"
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QQrGW9a6m/model.json",modelLoaded());

function modelLoaded()
{
    console.log("model loaded")
}

function speak() {
    var synth = window.SpeechSynthesis;
    var speech_data1 = "The first prediction is " + prediction1;
    var speech_data2 = "The second prediction is" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speech_data1 + speech_data2);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById(captured_image);
    classifier.classify(img,got_resutl);
}

function gotresult(error,result) {
    if(error){
        console.error(error)
    }
    else{
        console.log(result);
        document.getElementById("emotion").innerHTML = result[0].label;
        document.getElementById("emotion_2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;

        if(result[0] == "victory sign"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(result[0] == "rock & roll"){
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if(result[0] == "thumbs up"){
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(result[1] == "victory sign"){
            document.getElementById("update_emoji_2").innerHTML = "&#9996;";
        }
        if(result[1] == "rock & roll"){
            document.getElementById("update_emoji_2").innerHTML =  "&#128546;";
        }
        if(result[1] == "thumbs up"){
            document.getElementById("update_emoji_2").innerHTML = "&#129304;";
        }
    }
}