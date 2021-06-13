prediction1 = '';
prediction2 = '';

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("camera1");

Webcam.attach('#camera1');

function snap(){
    Webcam.snap(function (data_uri) {
        document.getElementById("camera2").innerHTML = "<img id = 'taken' src="+data_uri+">"  
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
} 

function predict(){
    img = document.getElementById("taken");
    classifier.classify(img,gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first perdiction is " + prediction1;
    speak_data_2 = " and the second perdiction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}


function gotResult(error,results){
    if (error) {
        console.error(error);
    }
    else {
        console.log (results);
        document.getElementById("guess1").innerHTML = results[0].label;
        document.getElementById("guess2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "happy"){
            document.getElementById("guess1name").innerHTML = "&#128522;";
        }
        if (results[0].label == "sad"){
            document.getElementById("guess1name").innerHTML = "&#128532;";
        }
        if (results[0].label == "angry"){
            document.getElementById("guess1name").innerHTML = "&#128545;";
        }
        if (results[1].label == "happy"){
            document.getElementById("guess2name").innerHTML = "&#128522;";
        }
        if (results[1].label == "sad"){
            document.getElementById("guess2name").innerHTML = "&#128532;";
        }
        if (results[1].label == "angry"){
            document.getElementById("guess2name").innerHTML = "&#128545;";
        }
    }

}