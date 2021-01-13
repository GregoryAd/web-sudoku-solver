cases[0].focus();

for (let i = 0; i < cases.length; i++) {
    cases[i].addEventListener("keydown", event => {

        if(event.keyCode >= 37 && event.keyCode <= 40){
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
        if(event.keyCode == 8){
            cases[i].textContent = "";
            return;
        }
        if(cases[i].textContent.length == 1){
            
            event.preventDefault();
        }
      });

      cases[i].addEventListener("keyup", event => {
        if(isNaN(cases[i].textContent) || !validPlace(cases[i].textContent, i) || cases[i].textContent == 0){
            cases[i].textContent = "";
        }

        for(let k = 0; k < cases.length; k++) {
            if(!validPlace(cases[k].textContent, k)) {
                cases[k].textContent = "";
            }
            else{
                if(!(event.keyCode >= 37 && event.keyCode <= 40))
                getRes();
            }
            
        }

        if(!isNaN(cases[i].textContent) && (i + 1) < cases.length && cases[i].textContent.length == 1 && (event.keyCode < 37 || event.keyCode > 40)){
            cases[i+1].focus();
        }
      });
}

function validPlace(value, i){

    //row

    for (let j = 0; j < 9; j++) {
        let pos = j + (Math.floor(i / 9)*9);
        if(i != pos){
            if(value == cases[pos].textContent){
                return false;
            }
        }
    }

    //col
    
    for (let j = 0; j < 9; j++) {
        let pos = (i % 9) + (9 * j);
        
        if(i != pos){
            if(value == cases[pos].textContent){
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
                if(value == cases[pos].textContent){
                    return false;
                }
            }
        }
        
    }
    
    return true;
}