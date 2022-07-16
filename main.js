song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
music_status1 = "";
music_status2 = "";
score_rightWrist = 0;

function preload() {
    song1 = loadSound("Raabta.mp3");
    song2 = loadSound("sweetheart.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function modelLoaded() {
    console.log("POSENET MODEL HAS LOADED!!!!! YESSSSSSSSSSS")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    music_status1 = song1.isPlaying();
    music_status2 = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        // This if statement will come inside the main if 
        if (music_status1 == false) {
            song1.play()
            document.getElementById("song").innerHTML = "Playing - Raabta"
        }
    }
    if (score_rightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        // This if statement will come inside the main if 
        if (music_status2 == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Sweetheart"
        }
    }
}