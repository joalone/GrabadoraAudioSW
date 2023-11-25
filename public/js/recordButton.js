function recordFn(){
    console.log('Record');
}

var min = 5;
var seg = 0;

var intContador = setInterval(() => {  
    if(seg==0) min--;
    seg = (seg + 59) % 60;
    // Cambiar texto
    if (min<=0 && seg<=0) {
        min=0;
        seg=0;
        clearInterval(intContador);
        // Cambiar texto
    }
}, 1000);





export { recordFn };