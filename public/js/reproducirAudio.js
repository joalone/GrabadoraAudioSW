
window.onload = function() {
    var boton = document.getElementById("playcopy");    
    boton.onclick  = () => {
        console.log("Hasta aqui")
        var name = navigator.clipboard.readText().then(r => r.replace("/preparar", "")).then(r => r.replace("localhost:3000", "")).then((clipText) => {
            (fetch(clipText).then(r => 
                r.blob()
            ).then(r => {
                const audio= new Audio();
                const blobUrl = URL.createObjectURL(r);
                audio.src = blobUrl;
                audio.play();
                audio.addEventListener("ended", ()=> URL.revokeObjectURL(blobUrl));
            }))
        });
    }
}