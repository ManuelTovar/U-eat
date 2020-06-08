var datos;

function createRestaurant(tipo) {
    console.log(tipo);
    fetch('./data.json')
        .then(function (response) {
            return response.json();

        })
        .then(function (myJson) {
            createCard(tipo, myJson);
            selectedCategorie(tipo);
            datos = myJson;
        })
        .catch((error) => {
            console.log("Error! ", error)
        });

}

function createCard(tipo, json) {

    var divDondeva = document.getElementById("aqui");
    divDondeva.innerHTML = "";

    for (var i = 0; i < json.data.length; i++) {

        if (validateRestaurant(tipo, json.data[i].categorias)) {

            var rest = document.createElement("div");
            rest.setAttribute('class', "o-restaurant");
            rest.setAttribute('onclick', "modal(" + json.data[i].id + ",'" + tipo + "')");

            var restImg = document.createElement("img");
            restImg.setAttribute('src', json.data[i].urlImagen);
            restImg.setAttribute('alt', "Imagen restaurante " + json.data[i].nombre);

            var restCont = document.createElement("div");
            restCont.setAttribute('class', "o-description-container");

            var h3 = document.createElement("h3");
            var contenth3 = document.createTextNode(json.data[i].nombre);
            h3.appendChild(contenth3);

            var p1 = document.createElement("p");
            var contentp1 = document.createTextNode(json.data[i].tipo);
            p1.appendChild(contentp1);

            var p2 = document.createElement("p");
            var contentp2 = document.createTextNode(json.data[i].precio);
            p2.appendChild(contentp2);

            var p3 = document.createElement("p");
            var contentp3 = document.createTextNode(json.data[i].tiempo);
            p3.appendChild(contentp3);

            restCont.appendChild(h3);
            restCont.appendChild(p1);
            restCont.appendChild(p2);
            restCont.appendChild(p3);

            rest.appendChild(restImg);
            rest.appendChild(restCont);

            divDondeva.appendChild(rest);
        }
    }
}

function modal(id, categoria) {

    var categorias = datos.data[id].categorias;

    if (categoria == 'Todos') {

        //divM donde se va ubicar o crear el Modal
        var divM = document.getElementById("modal");

        //divModal ++ Class o-modal-window                 VENTANA TOTAL
        var divModal = document.createElement("div");
        divModal.setAttribute('class', "o-modal-window");

        //Nombre restaurante Seleccionado
        var h2 = document.createElement("h2");
        var contenth2 = document.createTextNode(datos.data[id].nombre);
        h2.appendChild(contenth2);

        //Boton Salir
        var btSalir = document.createElement("button");
        btSalir.setAttribute('class', "o-bt-exit");
        btSalir.setAttribute('onclick', "cleanModal()");
        var contentbt = document.createTextNode("X");
        btSalir.appendChild(contentbt)

        //divProductos ++ Class o-modal-products            VENTANA CONTENEDORA PRODUCTOS TOTAL
        var divProductos = document.createElement("div");
        divProductos.setAttribute('class', "o-modal-products");
        divProductos.appendChild(btSalir);

        divModal.appendChild(h2);
        divModal.appendChild(divProductos);

        //Aqui estoy asignandole a el divM todo el divModal
        divM.appendChild(divModal);

        for (var i = 0; i < categorias.length; i++) {

            //div CREADO
            var contProducto = document.createElement("div");
            contProducto.setAttribute('class', "o-container-products");

            //Nombre de Categoria
            var h4 = document.createElement("h4");
            var contenth4 = document.createTextNode(categorias[i].categoria);
            h4.appendChild(contenth4);
            divProductos.appendChild(h4);

            divProductos.appendChild(contProducto);

            for (var j = 0; j < categorias[i].productos.length; j++) {

                //Div de cada producto
                var productos = document.createElement("div");
                productos.setAttribute('class', "o-product");

                var p1 = document.createElement("p");
                var contentp1 = document.createTextNode(categorias[i].productos[j].nombreProducto);
                p1.appendChild(contentp1);

                var p2 = document.createElement("p");
                var contentp2 = document.createTextNode("Precio: " + categorias[i].productos[j].precioProducto);
                p2.appendChild(contentp2);

                var p3 = document.createElement("p");
                var contentp3 = document.createTextNode("Raking: " + categorias[i].productos[j].calificacionProducto);
                p3.appendChild(contentp3);

                //Div informacion producto
                var info = document.createElement("div");
                info.setAttribute('class', "o-product-info");
                info.appendChild(p1);
                info.appendChild(p2);
                info.appendChild(p3);

                //Imagen de cada producto
                var prodImg = document.createElement("img");
                prodImg.setAttribute('src', categorias[i].productos[j].imagenProducto);
                prodImg.setAttribute('alt', "Imagen de " + categorias[i].productos[j].nombreProducto);

                //Boton comprar de cada producto
                var btCompra = document.createElement("button");
                btCompra.setAttribute('onclick', "buy()");
                var btComprar = document.createTextNode("Comprar");
                btCompra.appendChild(btComprar);

                //Div imagen y producto
                var mult = document.createElement("div");
                mult.setAttribute('class', "o-product-mult");
                mult.appendChild(prodImg);
                mult.appendChild(btCompra);

                productos.appendChild(info);
                productos.appendChild(mult);

                contProducto.appendChild(productos);
            }
        }
    } else {

        var divM = document.getElementById("modal");

        //div modal
        var divModal = document.createElement("div");
        divModal.setAttribute('class', "o-modal-window");

        //Nombre restaurante
        var h2 = document.createElement("h2");
        var contenth2 = document.createTextNode(datos.data[id].nombre);
        h2.appendChild(contenth2);

        //div productos
        var divProductos = document.createElement("div");
        divProductos.setAttribute('class', "o-modal-products");

        //boton
        var btSalir = document.createElement("button");
        btSalir.setAttribute('class', "o-bt-exit");
        btSalir.setAttribute('onclick', "cleanModal()");
        var contentbt = document.createTextNode("X");
        btSalir.appendChild(contentbt)

        divProductos.appendChild(btSalir);

        divModal.appendChild(h2);
        divModal.appendChild(divProductos);

        divM.appendChild(divModal);

        for (var i = 0; i < categorias.length; i++) {

            if (categoria == categorias[i].categoria) {
                //div CREADO
                var contProducto = document.createElement("div");
                contProducto.setAttribute('class', "o-container-products");

                //Nombre de Categoria
                var h4 = document.createElement("h4");
                var contenth4 = document.createTextNode(categorias[i].categoria);
                h4.appendChild(contenth4);
                divProductos.appendChild(h4);

                divProductos.appendChild(contProducto);
            }

            if (categorias[i].categoria == categoria) {
                for (var j = 0; j < categorias[i].productos.length; j++) {

                    //card products
                    var productos = document.createElement("div");
                    productos.setAttribute('class', "o-product");

                    var p1 = document.createElement("p");
                    var contentp1 = document.createTextNode(categorias[i].productos[j].nombreProducto);
                    p1.appendChild(contentp1);

                    var p2 = document.createElement("p");
                    var contentp2 = document.createTextNode("Precio: " + categorias[i].productos[j].precioProducto);
                    p2.appendChild(contentp2);

                    var p3 = document.createElement("p");
                    var contentp3 = document.createTextNode("Raking: " + categorias[i].productos[j].calificacionProducto);
                    p3.appendChild(contentp3);

                    //Div informacion producto
                    var info = document.createElement("div");
                    info.setAttribute('class', "o-product-info");
                    info.appendChild(p1);
                    info.appendChild(p2);
                    info.appendChild(p3);

                    //Imagen de cada producto
                    var prodImg = document.createElement("img");
                    prodImg.setAttribute('src', categorias[i].productos[j].imagenProducto);
                    prodImg.setAttribute('alt', "Imagen de " + categorias[i].productos[j].nombreProducto);

                    //Boton comprar de cada producto
                    var btCompra = document.createElement("button");
                    btCompra.setAttribute('onclick', "buy()");
                    var btComprar = document.createTextNode("Comprar");
                    btCompra.appendChild(btComprar);

                    //Div imagen y producto
                    var mult = document.createElement("div");
                    mult.setAttribute('class', "o-product-mult");
                    mult.appendChild(prodImg);
                    mult.appendChild(btCompra);

                    productos.appendChild(info);
                    productos.appendChild(mult);

                    contProducto.appendChild(productos);
                }
                break;
            }
        }
    }
}

function validateRestaurant(tipo, categorias) {

    if (tipo == 'Todos') {
        return true;
    } else {
        for (var i = 0; i < categorias.length; i++) {
            if (categorias[i].categoria == tipo) {
                return true;
            }
        }
        return false;
    }
}

function selectedCategorie(tipo) {

    var catRest = document.getElementById("title-restaurants");
    catRest.innerHTML = "";

    if (tipo) {
        //Categoria
        var h2 = document.createElement("h2");
        var contenth2 = document.createTextNode("Restaurantes en tu zona según la categoría: " + tipo);
        h2.appendChild(contenth2);
        catRest.appendChild(h2);

    }
}

function cleanModal() {
    var divDondeva = document.getElementById("modal");
    divDondeva.innerHTML = "";

}

function buy() {
    alert("Compra realizada satisfactoriamente");
}

function Message(){
    alert("Página bajo construcción");
}