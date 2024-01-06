function main() {
    var lblName = document.getElementById("name");
    var lblPass = document.getElementById("pass");
    var btnRegister = document.getElementById("register");

    btnRegister.onclick = () => {
        fetch("/register", {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: lblName.value, pass: lblPass.value })
        }).then(r => r.json()).then(r=>{if(r.name===lblName.value)//if (data === 'done')
                          {window.location.href = "/main" }else{console.log('Usuario ya existente');
                                                                const text = document.createElement('UD');
                                                                text.innerText='Usuario ya existente'
                                                                document.body.appendChild(text)} })
                          //)));
    }
}

window.onload = main;