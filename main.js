img = "";
status = "";
object = [];

function keyboard(){
    window.location = "keyboard.html";
}

function monitor(){
    window.location = "monitor.html";
}

function Mouse(){
    window.location = "mouse.html";
}

function TV(){
    window.location = "TV.html";
}

function Clock(){
    window.location = "clock.html";
}


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    image("Clock.JPG")
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting object"; 
}

function modelLoaded(){
    console.log("coco SSD model loaded");
    status = true;
}   

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            document.getElementById("number_objects").innerHTML = "number object detected are: " + object.length;
            fill(r,g,b);
            noFill();
            textSize(20);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%" , object[i].x, object[i].y);
            stroke(r,g,b);
            rect(object[i].x, object[i].y , object[i].width, object[i].height);
        }
    }
    
}

