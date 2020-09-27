var controllerOptions = {};
var x = window.innerWidth;
var y = window.innerHeight;
var rawXMin = 1000;
var rawXMax = 100;
var rawYMin = 1000;
var rawYMax = 100;
var rawZMax = 100;
var rawZmin = 1000;
//global variables to keep track of the current number of hands 
var previousNumHands = 0 ;
var currentNumHands = 0;
var oneFrameOfData = nj.zeros([5,4,6]);
//creates the black snap 
function RecordData(){
    if(currentNumHands===1 && previousNumHands === 2){
        background('#222222');
        console.log(oneFrameOfData.toString());
    }
}
function HandleBone(bone,thick,stroke,fingerIndex){
    //the distal end of the bone closest to the finger tip .nextJoint
    var x = bone.nextJoint[0];
    var y = bone.nextJoint[1];
    var z = bone.nextJoint[2];
    //return from TransformCoordinate is a array , access with [] set to the tip of the bone
    var xT = TransformCoordinates(x,y)[0];
    var yT = TransformCoordinates(x,y)[1];
    //console.log(xT,yT);
    
    //the proximal end of the bone closest to the torso 
    var x1 = bone.prevJoint[0];
    var y1 = bone.prevJoint[1];
    var z1 = bone.prevJoint[2]; 
     //return from TransformCoordinate is a array , access with [] set to the base of the bone
    var xB = TransformCoordinates(x1,y1)[0];
    var yB = TransformCoordinates(x1,y1)[1];
    var sum = (xT,xB,yT,yB,z,z1);
    //console.log(sum);
    //store the rresulting sum in the fingerIndexth element of OneFrameOfData
     //oneFrameOfData.set(fingerIndex.type,bone.type,sum);
     
    oneFrameOfData.set(fingerIndex.type,bone.type,0,x1);
    oneFrameOfData.set(fingerIndex.type,bone.type,1,y1);
    oneFrameOfData.set(fingerIndex.type,bone.type,2,z1);
    oneFrameOfData.set(fingerIndex.type,bone.type,3,x);
    oneFrameOfData.set(fingerIndex.type,bone.type,4,y);
    oneFrameOfData.set(fingerIndex.type,bone.type,5,z);
    
  
  
    
   
    
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
        for (var i = 0;i < fingers.length; i++){
            //console.log(fingers);
            var thick = strokeWeight(2);
             var finger = fingers[i];
             //console.log(finger);
             var bones = finger.bones;
             //console.log(bones);
            for (var x = 0; x <bones.length; x++){
                var bone = bones[x];
                //console.log(bone);
                if(bones[x].type === 0){
                    var thick = strokeWeight(10);
                    var bone = bones[x];
                    stroke('rgb(0,255,0)');
                    HandleBone(bone,thick,stroke,finger);
                }
                if(bones[x].type === 1){
                    var thick = strokeWeight(10);
                    var bone = bones[x];
                    stroke('rgb(0,255,0)');
                    HandleBone(bone,thick,stroke,finger);
                }
                if(bones[x].type === 2){
                    var thick = strokeWeight(5);
                    var bone = bones[x];
                    stroke(51);
                    HandleBone(bone,thick,stroke,finger);
                }
                HandleBone(bone,thick,stroke,finger);
                
         
            }
            
        }
    }
            
function Handleframe(frame){
	if(frame.hands.length===1 || frame.hands.length===2){    
                clear();
                currentNumHands = frame.hands.length;
                var hand = frame.hands[0];
                //console.log(hand);
		HandleHand(hand);
                RecordData();
                previousNumHands = currentNumHands;
	}
}

Leap.loop(controllerOptions, function(frame){
	
	Handleframe(frame);

});
