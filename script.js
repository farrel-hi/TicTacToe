let role = 1; //0 = Not Fill; 1 = Cross; 2 = Round
let array = [0,0,0,0,0,0,0,0,0];
let statusReminder = document.getElementById("status");
let crossCondition = new Array ();
let roundCondition = new Array ();
let xScore =0;
let oScore =0;

function gameStart(valClick){
    let block = document.getElementById("block"+valClick);
    console.log(role);
    array[valClick] = role;
    if(role==1){
        block.innerHTML = "X";
        statusReminder.innerHTML = "O Turn";
        crossCondition.push(valClick);
        checkWin(crossCondition,role,statusReminder);
        role =2;
    }
    else{
        block.innerHTML = "O";
        statusReminder.innerHTML = "X Turn";
        roundCondition.push(valClick);
        checkWin(roundCondition,role,statusReminder);
        role =1;
    }
    block.disabled = true;
    checkDraw();
    console.log(array);
    
}

function checkDraw(){
    let btnBlocked = 0;
    for(let i=0;i<array.length;i++){
        if (document.getElementById("block"+i).disabled == true){
            btnBlocked++;
        }
    }
    if(btnBlocked == 9 && (statusReminder.innerHTML == "O Turn" || statusReminder.innerHTML == "X Turn")){
        statusReminder.innerHTML = "DRAW";
    }
    console.log("btnblocked:"+btnBlocked);
}

function checkWin(givenArray,givenStatus,statusElement){
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
   

    for(let i=0;i<winningConditions.length;i++){        
        let singleCondition = winningConditions[i]; //format singleCondition: [x,x,x]
        let winStatus = 0; //variable use to check the winning status of cross/round; if the value is 3 then their win

        for(let x=0;x<singleCondition.length;x++){
            let winningValue = singleCondition[x];

            for (let y=0;y<givenArray.length;y++){
                if(givenArray[y]==winningValue){
                    winStatus++;
                }
            }

        }

        if(winStatus==3 && givenStatus ==1){
            statusElement.innerHTML = "X WIN";
            xScore++;
            document.getElementById("x-score").innerHTML = xScore;
            stopGame();
            break;
        }
        else if(winStatus==3 && givenStatus==2){
            statusElement.innerHTML = "O WIN";
            oScore++;
            document.getElementById("o-score").innerHTML = oScore;
            stopGame();
            break;
        }
    }
}

function stopGame(){
    for(let i=0;i<array.length;i++){
        let btn = document.getElementById("block"+i);
        if (btn.disabled == false){
            btn.disabled = true;
        }
    }
}

function restartGame(){
    array = [0,0,0,0,0,0,0,0,0];
    role = 1;
    statusReminder.innerHTML = "X Turn";
    crossCondition = new Array ();
    roundCondition = new Array ();
    for(let i=0;i<array.length;i++){
        let btn = document.getElementById("block"+i);
        btn.innerHTML = "";
        if (btn.disabled == true){
            btn.disabled = false;
        }
    }
}

