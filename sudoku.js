let cases = document.querySelectorAll('table.board > tbody > tr > td > table > tbody > tr > td');


function solve(){
    let sudoku = [];

    cases.forEach(el =>{
        sudoku.push(el.textContent);
    });
    
    console.log("case number : %d", sudoku.length);

}


let button = document.getElementsByClassName('start')[0];

button.addEventListener("click", solve, false);

