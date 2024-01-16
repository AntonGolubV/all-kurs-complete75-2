async function getSmartphoneByBrand(brand) {
    const response = await fetch(`/get/Smartphone/ByBrand?brand=${brand}`);
    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
    alert("error");
}
function getValueOfInput(arr) {
    let newArr = [];
    if (arr.length == 8) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].checked) {
                newArr.push(arr[i].value);
            }
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].value);
        }
    }
    return newArr;
}

async function getSmartphoneByParam() {
    let price = document.querySelectorAll(".price_input");
    let brand = document.querySelectorAll(".inp");
    let storage = document.querySelectorAll(".storage_input");
    let ram = document.querySelectorAll(".ram_input");
    let camera = document.querySelectorAll(".camera_input");
    let hz = document.querySelectorAll(".hz_input");

    const data = {
        price: getValueOfInput(price),
        brand: getValueOfInput(brand),
        storage: getValueOfInput(storage),
        ram: getValueOfInput(ram),
        camera: getValueOfInput(camera),
        hz: getValueOfInput(hz),
    };

    const response = await fetch("/get/Smartphone/ByParam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
}
async function getSmartphoneBySubname(){
    let subname = document.querySelector('.input_search').value;
    const response = await fetch(`/get/Smartphone/BySubname?sub=${subname}`);
    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
    alert("error");
}

async function sortSmartphoneByPrice(){
    const response = await fetch(`/get/Smartphone/BySortPrice`);
    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
    alert("error");
}

async function postFavSmart(id){
    const response = await fetch(`/get/Smartphone/ById?id=${id}`);
     if (response.ok) {
        return;
    } 
    alert('Error');
}
async function getFavSmart(){
    const response = await fetch(`/get/Smartphone/ByFav`);
    if (response.ok) {
        const responseObj = await response.text();
        console.log(responseObj);
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    } 
    alert('Error');
}
async function deleteFavSmart(id){
    const response = await fetch(`/get/Smartphone/deleteById?id=${id}`, {
        method: "DELETE",
      });
    if (response.ok) {
        return;
    } 
    alert('Error');
}
