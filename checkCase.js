cases[0].focus();


for (let i = 0; i < cases.length; i++) {
    cases[i].addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
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
        if((event.currentTarget.textContent.length == 1  || isNaN(event.key))){
            event.preventDefault();
            return;
        }
      });

      cases[i].addEventListener("keyup", event => {
        if(!isNaN(event.key)){
            cases[i+1].focus();
        }
      });
}