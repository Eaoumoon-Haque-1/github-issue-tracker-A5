document.getElementById("btn-id").addEventListener("click",() =>{
    const userName = document.getElementById("username-id").value;
    const pass = document.getElementById("password-id").value;
    if(userName === "admin" && pass=== "admin123"){
        window.location.assign("home.html");
    }else alert("wrong name or pass!!!")
})