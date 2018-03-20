function inicio() {
    var path = window.location.toString();
    rellenarBC(generateBC(path, " / "));
}

function generateBCPath(cadena, separador) {
    cadena = cadena + ""
    var ruta = "";
    var arrayRuta = cadena.split("/");
    console.log("Array ruta vale" + arrayRuta);
    var lon = arrayRuta.length;
    console.log("Lon ruta vale" + arrayRuta.length)
    if (lon > 3) {
        ruta = ruta + "<a href=\"/\">HOME</a>" + separador;
        for (i = 3; i < lon; i++) {
            if (i < (lon - 1)) {
                console.log("i vale " + i);
                console.log("Array ruta en el if vale" + arrayRuta);
                var cad = filtrarCadena(arrayRuta[i]);
                ruta = ruta + "<a href=\"/" + arrayRuta[i] + "/\">" + cad + "</a>" + separador;
            } else {
                console.log("Pasa por else, i vale " + i)
                var cad = filtrarCadena(arrayRuta[i])
                ruta = ruta + "<span class=\"active\">" + cad + "</span>";
            }
        }
    } else {
        ruta = ruta + "<span class=\"active\">HOME</span>";
    }
    return ruta;
}

function filtrarCadena(cadena) {
    // eliminar el tipo de archivo (.html por ejemplo)
    cadena = cadena.toString().split("?");
    cadena = cadena[0].toString().split("#");
    cadena = cadena[0].toString().split(".");
    cadena = cadena[0].toString();
    cadena = eliminarPalabras(cadena);
    cadena = cadena.toUpperCase();
    if (cadena.length > 30) {
        cadena = acronimo(cadena);
    } else {
        cadena = cadena.replace(/-/g, " ");
    }
    return cadena;
}

function generateBC(cadena, separador) {
    cadena = cadena.replace("http://", "");
    cadena = cadena.replace("https://", "");
    cadena = cadena.replace("/index.html", "");
    cadena = cadena.replace("/index.htm", "");
    var ruta = "";
    console.log("Ruta vale: " + cadena);
    arrayRuta = cadena.split("/");
    console.log("Array vale: " + arrayRuta);
    if (comprobarCaracter(cadena, "/")) {
        ruta = ruta + "<a href=\"/\">HOME</a>" + separador;
        for (i = 1; i < arrayRuta.length; i++) {
            var cad = arrayRuta[i].toString().split("?")[0].toString().split("#")[0].toString().split(".")[0].toString();
            var exp = arrayRuta[i].toString().split("?")[0].toString().split("#")[0].toString().split(".")[0].toString();
            cad = crearRuta(i, arrayRuta).toString();
            if (exp.length > 30) {
                exp = eliminarPalabras(exp);
                exp = acronimo(exp);
            } else {
                exp = exp.replace(/-/g, " ");
            }
            console.log("Cad antes del if vale: "+cad);
            if (i < (arrayRuta.length - 1)) {
                if (arrayRuta[i + 1].toString().split(".")[0] != "index") {
                    console.log("Cad en el if vale: "+cad.toLowerCase());
                    ruta = ruta + "<a href=\"/" + cad.toLowerCase() + "/\">" + exp.toUpperCase() + "</a>" + separador;
                } else {
                    ruta = ruta + "<span class=\"active\">" + exp.toUpperCase() + "</span>";
                    break;
                }
            } else {
                ruta = ruta + "<span class=\"active\">" + exp.toUpperCase() + "</span>";
            }
        }
    } else {
        ruta = ruta + "<span class=\"active\">HOME</span>";
    }
    return ruta;
}

function eliminarPalabras(cadena) {
    var cad = cadena.split("-");
    var arrayExp = ["the", "of", "in", "from", "by", "with", "and", "or", "for", "to", "at", "a"];
    var cadFinal = "";
    var bol = false;
    console.log("Cadena vale: " + cad);
    if (comprobarCaracter(cadena, "-")) {
        for (var i = 0; i < cad.length; i++) {
            for (var j = 0; j < arrayExp.length; j++) {
                if (arrayExp[j] == cad[i]) {
                    bol = true;
                    console.log("Se elimina " + arrayExp[j]);
                    break;
                }
            }
            if (bol) {
                bol = false;
            } else {
                if (cadFinal.length > 0) {
                    cadFinal = cadFinal + "-" + cad[i];
                } else {
                    cadFinal = cad[i];
                }
            }
        }
    } else {
        cadFinal = cad;
    }
    console.log("Cad final vale: " + cadFinal);
    return cadFinal;
}

function acronimo(cadena) {
    var cad = cadena.split("-");
    console.log("cad vale " + cad);
    var cadenaFinal = "";
    var lon = cad.length;
    console.log("Lon vale " + lon);
    for (var i = 0; i < lon; i++) {
        var pal = cad[i].toString();
        if (pal.length > 1 && i > 0) {
            cadenaFinal = cadenaFinal + pal.substring(0, 1);
        } else {
            cadenaFinal = pal.substring(0, 1);
        }
        console.log("i vale: " + i);
    }
    console.log("Cadena final vale: " + cadenaFinal);
    return cadenaFinal;
}

function comprobarCaracter(cadena, caracter) {
    var bol = false;
    for (var i = 0; i < cadena.length; i++) {
        if (cadena[i] == caracter && i < (cadena.length - 1)) {
            bol = true;
            break;
        }
    }
    console.log("Comprobar caracter devuelve " + bol);
    return bol;
}

function crearRuta(indice, rutas) {
    var ruta = "";
    console.log("indice vale: "+indice);
    if (indice > 1) {
        for (var i = 1; i <= indice; i++) {
            if (i <= (indice - 1)) {
                ruta = ruta + rutas[i].toString().split("?")[0].toString().split("#")[0].toString().split(".") + "\/";
            } else {
                ruta = ruta + rutas[i].toString().split("?")[0].toString().split("#")[0].toString().split(".");
            }
        }
    } else {
        ruta = arrayRuta[indice].toString().split("?")[0].toString().split("#")[0].toString().split(".")[0].toString();
    }
    console.log("ruta vale: "+ruta);
    return ruta;
}

function rellenarBC(cadena) {
    var miga = document.getElementById("breadcrumb");
    var parrafo = document.createElement("p");
    parrafo.innerHTML = cadena;
    miga.appendChild(parrafo);
}
