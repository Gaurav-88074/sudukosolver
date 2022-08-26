
const onClickHandler = (event)=>{
    // console.log(event.target.children[1]);
    if(event.target.children[1]){
        event.target.children[1].textContent = "";
        event.target.children[0].classList.add('openBoxScale');
    }
    
    for (let i = 0; i < 9; i++) {
        let temp =document.createElement('div');
        temp.addEventListener('click',(e)=>{
            event.target.children[0].innerHTML = "";
            event.target.children[0].classList.remove('openBoxScale');
            // event.target.children[0].classList.remove('openBox');
            // event.target.children[0].innerHTML = ""
            // event.target.textContent = "5";
            // console.log(event.target);

            console.log(e.target.textContent);
            event.target.children[1].textContent = e.target.textContent;
        })
        temp.className = "num";
        temp.innerText = `${i+1}`;
        
        if( event.target.children[0]){
            event.target.children[0].appendChild(temp)
        }
    }
    
}
const getInnerDiv = ()=>{
    let res = document.createElement('div') ;
    res.className = 'openBox';
    
    return res;
}
const getDataDiv = ()=>{
    let res = document.createElement('div') ;
    res.className = 'dataDiv';
    res.textContent = '.';
    return res;
}
const getDiv =(i,j) => {
    let res = document.createElement('div');
    res.className = 'box';
    res.addEventListener('click',onClickHandler);
    // res.innerText = `${i}${j}`;
    res.id = `${i}${j}`;
    // res.innerText = `-`;
    res.appendChild(getInnerDiv());
    res.appendChild(getDataDiv());
    return res;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const execute = async (matrix)=>{
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(document.getElementById(`${i}${j}`).children[1].textContent=='.'){
                document.getElementById(`${i}${j}`).children[1].classList.add("dataDiv2")
            }
            document.getElementById(`${i}${j}`).children[1].textContent = matrix[i][j];
            await sleep(10);
        }
    }
}
window.onload=function(){
    // console.log(getDiv());
    var container = document.querySelector('.bro') ;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            container.insertAdjacentElement('beforebegin',getDiv(i,j));
        }
    }
    document.querySelector(".button").addEventListener('click',()=>{
        matrix = new Array(9);
        for (let i = 0; i < 9; i++) {
            matrix[i] = new Array(9);
            matrix[i].fill(0);
        }
        // console.log(matrix);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                // console.log(matrix[i]);
                matrix[i][j] = document.getElementById(`${i}${j}`).textContent;
            }
        }
        solveSudoku(matrix);
        execute(matrix)
        // console.log(matrix);
        
    })
}

//------------------------------
var solveSudoku = function(board) {
    //     loop over each row
        for(let i=0; i<board.length ; i++){
            
            //     loop over each col
            for(let j=0; j<board[0].length; j++){
                
    //            check if block is empty
                if(board[i][j] === '.'){
                    
    //                 if yes fill it by finding a valid number
                    for(let k=1; k<=9 ; k++){
                        
                        const num = k.toString()
    //                     check for valid num
                        if(isNumValid(i,j,num,board)){
    //                      update sudoku
                            
                            board[i][j] = num
                            
    //                         now check if the updated sudoku is valid ? by checking this sudoku using recursion. 
    //                         if yes return true 
    //                         if no, backtrack changes and try filling it with a different number.
                            
                            if(solveSudoku(board) === true){
                                return true
                            }else{
    //                             backtrack
                                board[i][j] = '.'
                            }
                            
                        }
                    }
    //                 if no valid num is found return false
                    return false
                }
                
                
            }
        }
    //     Sudoku is completely filled hence return true
                    return true
    
    };
    
//Helper function
function isNumValid(row, col, num, board){
    for(let i=0 ; i<9 ; i++){
        
        if(board[row][i] === num) return false
        
        if(board[i][col] === num) return false
        
        const currentMatrixRow = Math.floor(row/3)        
        const currentMatrixCol = Math.floor(col/3)

        const currentRow =  3 * currentMatrixRow + Math.floor(i/3)        
        const currentCol = 3 * currentMatrixCol + i%3 
    
        
        if(board[currentRow][currentCol] === num ) return false
        
    }
            return true

}


