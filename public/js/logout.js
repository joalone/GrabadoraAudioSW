function main() {
    var btnSubmit = document.getElementById("logout");

    btnSubmit.onclick = () => {
        fetch("/login", {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ name: 'null'})
        }).then(r=>{window.location.href = "/logout"  })
    }
}

window.onload = main;