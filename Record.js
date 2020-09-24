var controllerOptions = {};
var x = window.innerWidth;
var y = window.innerHeight;
var rawXMin = 1000;
var rawXMax = 100;
var rawYMin = 1000;
var rawYMax = 100;
//global variables to keep track of the current umber of hands 
var previousNumHands = 0 ;
var currentNumHands = 0;
function HandleBone(bone,thick,stroke){
    //the distal end of the bone closest to the finger tip .nextJoint
    var x = bone.nextJoint[0];
    var y = bone.nextJoint[1];
    //return from TransformCoordinate is a array , access with [] set to the tip of the bone
    var xT = TransformCoordinates(x,y)[0];
    var yT = TransformCoordinates(x,y)[1];
    //console.log(xT,yT);
    //var z = bone.nextJoint[2];
    //the proximal end of the bone closest to the torso 
    var x1 = bone.prevJoint[0];
    var y1 = bone.prevJoint[1];
     //return from TransformCoordinate is a array , access with [] set to the base of the bone
    var xB = TransformCoordinates(x1,y1)[0];
    var yB = TransformCoordinates(x1,y1)[1];
    //var z1 = bone.prevJoint[2]; 
    //call line p5 method 
    thick;
    stroke;
    //create a hand variable and and draw only green if only one hand is detected 
    if (previousNumHands === 1){
         line(xT,yT,xB,yB);
    }
    else{
        stroke('red');
        line(xT,yT,xB,yB);
    }
}
function TransformCoordinates(x,y){
        if (x <rawXMin){
		rawXMin = x;
	}
	if (x > rawXMax){
                rawXMax = x;
        }
	if (y <rawYMin){
                rawYMin = y;
        }
	if (y > rawYMax){
                rawYMax = y;
        }
        //apply same scaling  
        var oldRangeX = (rawXMax-rawXMin);
	var newRangeX=(window.innerWidth-0);
	x =(((x - rawXMin) * newRangeX) /oldRangeX) + rawXMin;
        var oldRangeY = (rawYMax-rawYMin);
        var newRangeY=(window.innnerHeight-0);
        var newY =(((y - rawYMin) * newRangeY) /oldRangeY) + rawYMin;
	newY =(y-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0;
        y = window.innerHeight-newY;
        
    return [x,y];
}
function HandleHand(hand){
	var fingers = hand.fingers;
        //console.log(fingers);
        for (var i = 0;i < fingers.length; i++){
            var thick = strokeWeight(2);
            var finger = fingers[i];
            var bones = finger.bones;
            for (var x = 0; x <bones.length; x++){
                var bone = bones[x];
                if(bones[x].type === 0){
                    var thick = strokeWeight(10);
                    var bone = bones[x];
                    stroke('rgb(0,255,0)');
                    HandleBone(bone,thick,stroke);
                }
                if(bones[x].type === 1){
                    var thick = strokeWeight(10);
                    var bone = bones[x];
                    stroke('rgb(0,255,0)');
                    HandleBone(bone,thick,stroke);
                }
                if(bones[x].type === 2){
                    var thick = strokeWeight(5);
                    var bone = bones[x];
                    stroke(51);
                    HandleBone(bone,thick,stroke);
                }
                HandleBone(bone,thick,stroke);
         
            }
        }
    }
            
function Handleframe(frame){
	if(frame.hands.length===1 || frame.hands.length===2){
                clear();
                currentNumHands = frame.hands.length;
                console.log(currentNumHands);
                var hand = frame.hands[0];
                //console.log(hand);
		HandleHand(hand);
                previousNumHands = currentNumHands;
                //console.log(previousNumHands);
	}
}

Leap.loop(controllerOptions, function(frame){
	
	Handleframe(frame);

});
