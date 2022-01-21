statusofobjectdetection = "";
objects = [];
function preload() {
    sound = loadSound("mixkit-facility-alarm-sound-999.wav");
    sound1 = loadSound("mixkit-game-show-suspense-waiting-667.wav");
}
function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(290, 135);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting objects...";
}
function modelLoaded() {
    console.log("Model Loaded! Starting detection...");
    statusofobjectdetection = true;
  
}
function gotResults(error, results) {
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(video, 0, 0, 600, 450);
    if(statusofobjectdetection != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status :  Object Detected!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("objamount").innerHTML = objects.length;
            if (objects[i].label != "person") {
               if (sound.isPlaying()) {
                   return;
               }
               sound1.stop(); 
               sound.play(); 
            }
            else{
                if (sound1.isPlaying()) {
                    return;
                }
                sound.stop();
                sound1.play();
            }
        }
    }
}