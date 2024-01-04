function main() {
    var lblName = document.getElementById("name");
    var lblPass = document.getElementById("pass");
    var btnSubmit = document.getElementById("submit");

    btnSubmit.onclick = () => {
        fetch("/login", {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: lblName.value, pass: lblPass.value })
        }, (data) => { if (data === 'done') { window.location.href = "/main" }; });
    }
}

window.onload = main;