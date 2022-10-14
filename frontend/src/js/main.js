const url = "http://127.0.0.1:3000/"

let arrayUsers = [];
let popup = document.getElementById("popup");
let popupActive = false;
let wrap = document.getElementById("wrap");
let popupClose = document.getElementById("popup-close");
let input = document.getElementById("my-input");


popupClose.addEventListener("click",function () {
    changePopup(0);
})
popup.addEventListener("click",(event) => {
    if(event.target === popup){
        changePopup(0);
    }
})

input.addEventListener("input",(event) => {
    fetch(url + "?term=" + event.target.value)
        .then(res => {return res.json()})
        .then(data => updateUsers(data))
})

fetch(url)
    .then(res => {return res.json()})
    .then(data => get(data))

function updateUsers(res){
    if(arrayUsers.length > 0) {
        for (let i = 0; i < arrayUsers.length; i++) {
            document.getElementById(i).remove();
        }
        arrayUsers = [];
        get(res)
    } else {
        arrayUsers = [];
        get(res);
    }
    console.log(res);
}
function get(res){
    res.map((r,index) => {
        arrayUsers[index] = r;
        wrap.append(generateCart(r,index));
    })


}
function generateCart(info,index){
    let block = document.createElement("div");
    block.className = "cart";
    block.id = index;
    block.addEventListener("click",function (){
        changePopup(index);
    })

    let cartName = document.createElement("div");
    cartName.className = "cart-name";

    let cartInfo = document.createElement("div");
    cartInfo.className = "cart-info"

    let cartPhone = document.createElement("div");
    cartPhone.className = "cart-phone";

    let cartEmail = document.createElement("div");
    cartEmail.className = "cart-email";

    cartName.innerHTML = "<p>" + info.name + "</p>";
    cartPhone.innerHTML = "<i class=\"fa fa-phone\" aria-hidden=\"true\"></i><p>" + info.phone + "</p>";
    cartEmail.innerHTML = "<i class=\"fa fa-envelope\" aria-hidden=\"true\"></i><p>" + info.email + "</p>";

    cartInfo.prepend(cartPhone);
    cartInfo.append(cartEmail);

    block.prepend(cartName);
    block.append(cartInfo);

    return block;
}
function changePopup(index){
    if(!popupActive){
        popup.className = "wrap-popup";

        const myUser = arrayUsers[index];

        let nameField = document.getElementById("name-field");
        let phoneField = document.getElementById("phone-field");
        let emailField = document.getElementById("email-field");
        let dateField = document.getElementById("date-field");
        let authorityField = document.getElementById("authority-field");
        let subdField = document.getElementById("subd-field");

        nameField.innerHTML = myUser.name;
        phoneField.innerHTML = myUser.phone;
        emailField.innerHTML = myUser.email;
        dateField.innerHTML = myUser.hire_date;
        authorityField.innerHTML = myUser.position_name;
        subdField.innerHTML = myUser.department;

        popupActive = true;
    } else {
        popup.className = "wrap-popup popup-hide";
        popupActive = false;
    }
}

