let cases = document.getElementsByClassName("caseInput");
cases = orderSudoku(cases);
let res = document.getElementsByClassName("result")[0].querySelectorAll(".case");
res = orderSudoku(res);
let solution;

button = document.getElementsByClassName('reset')[0];
button.addEventListener("click", resetAll, false);
button = document.getElementsByClassName('next')[0];
button.addEventListener("click", nextRes, false);

/**
 * functions 
 */

function getRes(){
    let sudoku = readSudoku();
    solution = algoX(3, sudoku);
    let resolvedSudoku = solution.next();
    writeSudoku(resolvedSudoku.value);
}

function nextRes(){
    let resolvedSudoku = solution.next();
    if(!resolvedSudoku.done){
        writeSudoku(resolvedSudoku.value);
    }
    else{
        button.textContent = "No more solutions";
    }
}

function resetRes(){
    res.forEach(element => {
        element.textContent = "";
    });
    button.textContent = "Next solutions";
}

function resetAll(){
    resetRes();
    cases.forEach(element => {
        element.value = "";
    });
}

function orderSudoku(sud){
    let orderedSudoku = [];
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    orderedSudoku.push(sud[l + (k * 9) + (i * 3) + (j * 27)]);   
                }
            }
        }
        
    }
    return orderedSudoku;
}

function writeSudoku(sol){
    for (let i = 0; i < sol.length; i++) {
        for (let j = 0; j < sol[i].length; j++) {
            res[(i*sol.length)+j].textContent = sol[i][j];
        }
    }
}

function readSudoku(){
    let sudoku = [];
    let row = [];
    for (let i = 0; i < cases.length; i++) {
        if(i != 0 && i % 9 == 0){
            sudoku.push(row);
            row = [];
        }
        if(cases[i].value == ""){
            row.push(0);
        }
        else{
            row.push(parseInt(cases[i].value));
        }
    }
    sudoku.push(row);

    return sudoku;
}

function minX(X) {
    let minLength;
    let key;
    for (const [i,l] of Object.entries(X)) {
        if(!key || !l || minLength > l.size){  
            if(l){
                minLength = l.size;
            }
            key = i;
        }
    }
    
    return key;
}

function product(xStart, xEnd, yStart, yEnd) {

    let tab = [];
    for(let i = xStart; i < xEnd; i++){
        for (let j = yStart; j < yEnd; j++) {
            
            tab.push([i,j]);
        }
    }
    return tab;
}

function product3D(xStart, xEnd, yStart, yEnd, zStart, zEnd) {

    let tab = [];
    for(let i = xStart; i < xEnd; i++){
        for (let j = yStart; j < yEnd; j++) {
            for (let k = zStart; k < zEnd; k++) {
                tab.push([i,j,k]);
            }
        }
    }
    return tab;
}

function exact_cover(X, Y){
    let X2 = {};
    for(const row of Object.values(X)){
        X2[row] = new Set();
    }

    for(const [i,row] of Object.entries(Y)){
        for(const j of row){
            X2[j].add(i);
        }
    }
    return [X2, Y];
}

function select(X, Y, r){
    cols = [];
    for (const [other, j] of Object.entries(Y[r])) {
        for (const i of X[j]) {
            for (const k of Y[i]) { 
                let j2 = j[0] + "," + j[1][0] + "," + j[1][1];
                let k2 = k[0] + "," + k[1][0] + "," + k[1][1];
                if( k2 != j2){
                    X[k].delete(i);
                }
            }
        }
        let tempValue = X[j];
        delete X[j];
        cols.push(tempValue);
    }
    return cols;
}

function inverse(yr){
    let temp = [];
    for (let i = yr.length-1; i >= 0; i--) {
        temp.push(yr[i]);
    }
    return temp;
}

function deselect(X, Y, r, cols){
    let yInv = inverse(Y[r]);
    for (const [other, j] of Object.entries(yInv)) {
        X[j] = cols.pop();
        for (const i of X[j]){
            for (const k of Y[i]) {
                let j2 = j[0] + "," + j[1][0] + "," + j[1][1];
                let k2 = k[0] + "," + k[1][0] + "," + k[1][1];
                if(k2 != j2){
                    X[k].add(i);
                }
            }
        }
        
    }
}

function* solve(X, Y, solution){
    if(Object.entries(X).length == 0){
        yield solution;
    }
    else{
        let c = minX(X);
        for (const r of new Set(X[c])) {
            solution.push(r);
            let cols = select(X, Y, r);
            yield* solve(X, Y, solution);
            deselect(X, Y, r, cols);
            solution.pop();
        }
    }
}

function copyArray(Arr){
    let copy = []
    for(r of Arr){
        let temp = [];
        for(n of r){
            temp.push(n);
        }
        copy.push(temp);
    }

    return copy;
}

function* algoX(size, grid){
    let R = size;
    let C = size;
    let N = R * C;
    let X = [];
    product(0, N, 0, N).forEach(el =>{
        X.push(["rc", el]);
    });

    product(0, N, 1, N+1).forEach(el =>{
        X.push(["rn", el]);
    });

    product(0, N, 1, N+1).forEach(el =>{
        X.push(["cn", el]);
    });

    product(0, N, 1, N+1).forEach(el =>{
        X.push(["bn", el]);
    });

    let Y = {};
    let temp3dTab = product3D(0, N, 0, N, 1, N+1);

    for (let i = 0; i < temp3dTab.length; i++) {
        let r = temp3dTab[i][0];
        let c = temp3dTab[i][1];
        let n = temp3dTab[i][2];

        let b = Math.floor(r/R) * R + Math.floor(c/C);
        Y[[r, c, n]] = [
            ["rc", [r,c]],
            ["rn", [r,n]],
            ["cn", [c,n]],
            ["bn", [b,n]]
        ]
    }
    
    let temp = exact_cover(X, Y);
    X = temp[0];
    Y = temp[1];

    for (const [i, row] of grid.entries()) {
        for (const [j, n] of row.entries()) {
            if(n != 0){
                let tempName = i + "," + j + "," + n;
                select(X, Y, tempName);
            }
        }
    }
    let solution = solve(X, Y, []);
    let tempWait = solution.next();
    while(!tempWait.done){
        let endSol = copyArray(grid);
        for (const t of tempWait.value) {
            endSol[t[0]][t[2]] = t[4];
        }
        yield endSol;
        tempWait = solution.next();
    }
}