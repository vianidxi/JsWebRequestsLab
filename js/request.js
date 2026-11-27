var data ={}
var xhr = new XMLHttpRequest();
var requestUrl = "https://fakestoreapi.com/products";
tbody= document.getElementById("tableBodyData");
btnRemove=document.getElementById("btnRemove");
btnLoad=document.getElementById("btnLoad");
btnSearch=document.getElementById("btnSearch");
input=document.getElementById("inputSearch");

btnRemove.addEventListener("click",function(e){
    tbody.innerHTML = "";
});

// genera una fila <tr> con los datos de un producto
function genTr(json) {
    tr = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    td4 = document.createElement("td");
    td5 = document.createElement("td");

    td1.innerText = json.id;
    td2.innerText = json.title;
    td3.innerText = json.price;
    td4.innerText = json.description;
    td5.innerText = json.category;
    tr.append(td1, td2, td3, td4, td5);
    return tr;
}

// llena la tabla con un arreglo de productos
function fillTable(array) {
    tbody.innerHTML = "";
    array.forEach(element => {
        tbody.append(genTr(element));
    });
}

//consumir api
function getData(url){
    xhr.open("GET", requestUrl, true); 
    xhr.onload = function(url){
        console.log(xhr.responseText);
        // Handle data
        array = JSON.parse(xhr.responseText);
        data.json=array;
        array.forEach(element => {
            console.log(element);
        });
        fillTable(array);
    };
    xhr.send();
}

// Load Data: se asocia el evento sin modificar el HTML
btnLoad.addEventListener("click", function(e){
    getData();
});

// Search: filtra por título y muestra solo las coincidencias
btnSearch.addEventListener("click", function(e){
    e.preventDefault();
    if (!data.json) {
        return;
    }
    filtered = data.json.filter(function(e) {
        return e.title.includes(input.value);
    });
    console.log(filtered);
    fillTable(filtered);
});

getData();
