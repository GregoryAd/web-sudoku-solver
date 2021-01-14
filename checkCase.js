cases[0].focus();

for (let i = 0; i < cases.length; i++) {
    cases[i].addEventListener("keydown", event => {

        if(event.keyCode >= 37 && event.keyCode <= 40){
            event.preventDefault();
            if (event.keyCode == 37) {
                if(i - 1 >= 0){
                    cases[i - 1].focus();
                }
                return;
            }
            if (event.keyCode == 38) {
                if(i - 8 > 0){
                    cases[i - 9].focus();
                }
                return;
            }
            if (event.keyCode == 39) {
                if(i + 1 <= cases.length - 1){
                    cases[i + 1].focus();
                }
                return;
            }
            if (event.keyCode == 40) {
                if(i + 8 < cases.length - 1){
                    cases[i + 9].focus();
                }
                return;
            }
        }
    });
}

for (let i = 0; i < cases.length; i++) {
    cases[i].addEventListener("input", event =>{
        if(!validPlace(event.data, i)){
            cases[i].value = null;
            return;
        }

        if(event.data == null){
            cases[i].value = null;
        }

        if(!cases[i].checkValidity()){
            cases[i].value = null;
            if(!isNaN(event.data)){
                cases[i].value = event.data;
            }
            else{
                return;
            }
        }
        getRes();
        if((i + 1) < cases.length && event.data != null){
            cases[i+1].focus();
        }
    });
    
}

function validPlace(value, i){

    //row

    for (let j = 0; j < 9; j++) {
        let pos = j + (Math.floor(i / 9)*9);
        if(i != pos){
            if(value == cases[pos].value){
                return false;
            }
        }
    }

    //col
    
    for (let j = 0; j < 9; j++) {
        let pos = (i % 9) + (9 * j);
        
        if(i != pos){
            if(value == cases[pos].value){
                return false;
            }
        }
    }

    //box
    
    let box = Math.floor((i % 9) / 3) + (Math.floor(i / 27) * 3);
    
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            let pos = (Math.floor(i / 27) * 27) + (3 * (box % 3)) + (j * 9) + k;
            if(i != pos){
                if(value == cases[pos].value){
                    return false;
                }
            }
        }
        
    }
    
    return true;
}