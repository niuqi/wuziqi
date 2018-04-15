var panel = document.getElementById("panel");
var ctx = panel.getContext("2d");
var isme = true;
var over = false;
var allArray = getArray();
var pieceArray = allArray.pieceArray;
var winCount = allArray.count;console.log(winCount)
var winArray = allArray.winArray;console.log(winArray)
var myWinArray = allArray.myWinArray;
var computerWinArray = allArray.computerWinArray;
drawLine();
panel.onclick = play;

function getArray(){
    var count = 0;
    var pieceArray = [];//包含所有棋子位置
    var winArray = [];//包含所有赢法
    var myWinArray = [];//包含我方所有赢法，用来统计在gaiyingfa
    var computerWinArray = [];//包含对方所有赢法
    for(var x = 0;x<15;x++){
        pieceArray[x] = [];
        for(var y = 0;y<15;y++){
            pieceArray[x][y] = 0;
        }
    }
    // 创建二维数组，用来包含所有赢法
    for(var x = 0;x<15;x++){
        winArray[x] = [];  
        for(var y = 0;y<15;y++){
            winArray[x][y] = [];
        }
    }
    // 竖线赢法
    for(var x = 0;x<15;x++){
        for(var y = 0;y<11;y++){
            for(var k = 0;k<5;k++){
                winArray[x][y+k].push(count);
            }
            count++;
        }
    } 
    // 横线赢法
    for(var x = 0;x<15;x++){
        for(var y = 0;y<11;y++){
            for(var k = 0;k<5;k++){
                winArray[y+k][x].push(count);
            }
            count++;
        }
    }   
    // 斜线赢法
    for(var x = 0;x<11;x++){
        for(var y = 0;y<11;y++){
            for(var k = 0;k<5;k++){
                winArray[x+k][y+k].push(count);
            }
            count++;
        }
    } 
    // 反斜线赢法
    for(var x = 0;x<11;x++){
        for(var y = 14;y>3;y--){
            for(var k = 0;k<5;k++){
                winArray[x+k][y-k].push(count);
            }
            count++;
        }
    } 
    for(var k = 0;k<count;k++){
        myWinArray[k] = 0;
        computerWinArray[k] = 0;
    } 
    console.log(count)
    return {
        pieceArray:pieceArray,
        count:count,
        winArray:winArray,
        myWinArray:myWinArray,
        computerWinArray:computerWinArray
    };
}
function drawLine(){
    ctx.strokeStyle = "#555";
    ctx.fillStyle = "#ddd";
    ctx.textAlign="center";
    ctx.font = "100px 微软雅黑";
    ctx.fillText("牛小牛",250,280);
    for(var i=0; i<15; i++){
        ctx.moveTo(20+i*40,20);
        ctx.lineTo(20+i*40,580);
        ctx.stroke();
        ctx.moveTo(20,20+i*40);
        ctx.lineTo(580,20+i*40);
        ctx.stroke();
    }
}
function drawPiece(x,y){ 
    var rgradient = ctx.createRadialGradient(20+x*40+2,20+y*40-2,15,20+x*40+2,20+y*40-2,0);
    if(isme){
        rgradient.addColorStop(0,"#0a0a0a");
        rgradient.addColorStop(1,"#636766");
    }else{
        rgradient.addColorStop(0,"#d1d1d1");
        rgradient.addColorStop(1,"#f9f9f9");
    }
    ctx.beginPath();
    ctx.arc(20+x*40,20+y*40,15,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = rgradient;
    ctx.fill();
}
function play(e){
    if(over && !isme) return;
    var x = e.offsetX;
    var y = e.offsetY;
    x = Math.floor(x/40);
    y = Math.floor(y/40);
    if(pieceArray[x][y] == 0){
        drawPiece(x,y,isme);
        pieceArray[x][y] = 1;
        for(var k=0;k<winArray[x][y].length;k++){
            myWinArray[winArray[x][y][k]]++;
            computerWinArray[winArray[x][y][k]]==6;
            if(myWinArray[winArray[x][y][k]] == 5){
                alert("你赢了");
                 over = true;
                 break;
            }    
        }
        // 计算机出棋子
        if(!over){
            isme = !isme;
            computerPlay();
        }
    }
    
}
function computerPlay(){
    var myScore = [];
    var computerScore = [];
    var x2 = 0,y2 = 0,maxScore = 0;
    for(var x = 0;x<15;x++){
        myScore[x] = [];
        computerScore[x] = [];
        for(var y = 0;y<15;y++){
            myScore[x][y] = 0;
            computerScore[x][y] = 0;
        }
    }
    for(var x = 0;x<15;x++){
        for(var y = 0;y<15;y++){
            if(pieceArray[x][y] == 0){
                for(var k=0;k<winArray[x][y].length;k++){
                    var thisWin = winArray[x][y][k];
                    if(myWinArray[thisWin] == 1){
                        myScore[x][y] += 10;
                    }else if(myWinArray[thisWin] == 2){
                        myScore[x][y] += 100;
                    }else if(myWinArray[thisWin] == 3){
                        myScore[x][y] += 1000;
                    }else if(myWinArray[thisWin] == 4){
                        myScore[x][y] += 10000;
                    }
                    if(computerWinArray[thisWin] == 1){
                        computerScore[x][y] += 15;
                    }else if(computerWinArray[thisWin] == 2){
                        computerScore[x][y] += 150;
                    }else if(computerWinArray[thisWin] == 3){
                        computerScore[x][y] += 1500;
                    }else if(computerWinArray[thisWin] == 4){
                        computerScore[x][y] += 20000;
                    }
                    if(myScore[x][y]>maxScore){
                        maxScore = myScore[x][y];
                        x2 = x;
                        y2 = y;
                    }else if(myScore[x][y] == maxScore){
                        if(computerScore[x][y]>computerScore[x2][y2]){
                            x2 = x;
                            y2 = y;
                        }
                    }
                    if(computerScore[x][y]>maxScore){
                        maxScore = computerScore[x][y];
                        x2 = x;
                        y2 = y;
                    }else if(computerScore[x][y] == maxScore){
                        if(myScore[x][y]>myScore[x2][y2]){
                            x2 = x;
                            y2 = y;
                        }
                    }   
                }
            }
           
        }
    }

    drawPiece(x2,y2,isme);
    pieceArray[x2][y2] = 2;
    for(var k=0;k<winArray[x2][y2].length;k++){
        computerWinArray[winArray[x2][y2][k]]++;
        if(computerWinArray[winArray[x2][y2][k]] == 5){
            alert("你输了");
             over = true;
             break;
        }    
    }
     // 计算机出棋子
     if(!over){
        isme = !isme;
    }
}
