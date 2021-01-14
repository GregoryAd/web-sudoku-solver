let divGrid = document.getElementsByClassName("grid");

let table = generateTable();
divGrid[0].appendChild(table);
table.setAttribute("class", "board");
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
addInput(table);
table = generateTable();
divGrid[1].appendChild(table);
table.setAttribute("class", "result");
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");


function generateSmallRow(){
    
    let tr = document.createElement("tr");

    for (let i = 0; i < 3; i++) {
        let td = document.createElement("td");
        td.setAttribute("class", "case");
        tr.appendChild(td);
    }
    return tr;
}

function generateSmallTable(){
    let tbody = document.createElement("tbody");
    
    for (let i = 0; i < 3; i++) {
        let row = generateSmallRow();
        tbody.appendChild(row);
    }
    let table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.appendChild(tbody);
    let td = document.createElement("td");
    td.appendChild(table);

    return td;
}

function generateTableRow() {
    
    let tr = document.createElement("tr");

    for (let i = 0; i < 3; i++) {
        let rowTable = generateSmallTable();
        tr.appendChild(rowTable);
    }

    return tr;
}

function generateTable(){
    let tbody = document.createElement("tbody");

    for (let i = 0; i < 3; i++) {
        let tableRow = generateTableRow();
        tbody.appendChild(tableRow);
    }

    let table = document.createElement("table");
    table.appendChild(tbody);

    return table;
}

function addInput(table){
    let cases = table.getElementsByClassName("case");
    
    for(let element of cases){
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "9");
        input.setAttribute("step", "1");
        input.setAttribute("inputmode", "numeric");
        input.setAttribute("type", "number");
        input.setAttribute("class", "caseInput");
        element.appendChild(input);
    }
}
