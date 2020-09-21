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
        }
        if((event.currentTarget.textContent.length == 1  || isNaN(event.key)) || !validPlace(event.key, i)){
            event.preventDefault();
            return;
        }
      });

      cases[i].addEventListener("keyup", event => {
        alert(event.code);
        alert(event.which);
        if(!isNaN(event.key) && (i + 1) < cases.length && event.currentTarget.textContent.length == 1){
            cases[i+1].focus();
        }
      });
}

function validPlace(value, i){

    //row

    for (let j = 0; j < 9; j++) {
        if(i != j){
            if(value == cases[j + (Math.floor(i / 9)*9)].textContent){
                return false;
            }
        }
    }

    //col

    for (let j = 0; j < 9; j++) {
        if(i != j){
            if(value == cases[(i % 9) + (9 * j)].textContent){
                return false;
            }
        }
    }

    //box
    
    let box = Math.floor((i % 9) / 3) + (Math.floor(i/27) * 3);
    
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if(i != j){
                if(value == cases[(Math.floor(i / 27) * 27) + (3 * (box % 3)) + (j * 9) + k].textContent){
                    return false;
                }
            }
        }
        
    }
    
    return true;
}