let board = ["","","","","","","","",""];

let userScore = 0;
let aiScore = 0;

function drawBoard(){
    let b = document.getElementById("board");
    b.innerHTML = "";

    board.forEach((cell, i)=>{
        let div = document.createElement("div");
        div.className = "cell";
        div.innerText = cell;
        div.onclick = ()=>playerMove(i);
        b.appendChild(div);
    });
}

function checkWinner(b){
    let wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for(let w of wins){
        let [a,b1,c] = w;
        if(b[a] && b[a]===b[b1] && b[a]===b[c])
            return b[a];
    }
    return null;
}

function isFull(b){
    return b.every(x => x !== "");
}

function playerMove(i){
    if(board[i] !== "") return;

    board[i] = "X";

    if(checkWinner(board) === "X"){
        userScore++;
        updateScore();
        drawBoard();
        setTimeout(()=>{ alert("You Win! 🎉"); resetGame(); },100);
        return;
    }

    if(isFull(board)){
        drawBoard();
        setTimeout(()=>{ alert("Draw!"); resetGame(); },100);
        return;
    }

    aiMove();
    drawBoard();
}

function aiMove(){
    let best = -Infinity;
    let move;

    for(let i=0;i<9;i++){
        if(board[i] === ""){
            board[i] = "O";
            let score = minimax(board, false);
            board[i] = "";

            if(score > best){
                best = score;
                move = i;
            }
        }
    }

    board[move] = "O";

    if(checkWinner(board) === "O"){
        aiScore++;
        updateScore();
        drawBoard();
        setTimeout(()=>{ alert("AI Wins 🤖"); resetGame(); },100);
    }

    if(isFull(board)){
        setTimeout(()=>{ alert("Draw!"); resetGame(); },100);
    }
}

function minimax(b, isMax){
    let winner = checkWinner(b);

    if(winner === "O") return 1;
    if(winner === "X") return -1;
    if(isFull(b)) return 0;

    if(isMax){
        let best = -Infinity;
        for(let i=0;i<9;i++){
            if(b[i] === ""){
                b[i] = "O";
                best = Math.max(best, minimax(b,false));
                b[i] = "";
            }
        }
        return best;
    } else {
        let best = Infinity;
        for(let i=0;i<9;i++){
            if(b[i] === ""){
                b[i] = "X";
                best = Math.min(best, minimax(b,true));
                b[i] = "";
            }
        }
        return best;
    }
}

function resetGame(){
    board = ["","","","","","","","",""];
    drawBoard();
}

function updateScore(){
    document.getElementById("userScore").innerText = userScore;
    document.getElementById("aiScore").innerText = aiScore;
}

drawBoard();
updateScore();