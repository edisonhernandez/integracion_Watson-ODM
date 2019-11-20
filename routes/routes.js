var express = require("express");
var passport = require("passport");
var router = express.Router();




// Load jQuery with the simulated jsdom window.

router.get('/', function(req, res) {
    //res.redirect('/ui');
    res.redirect('/inicio');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


router.get('/inicio', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    res.render('inicio',{
        user: req.user,
        title: 'Express',
        urlIM: 'documentos/acta.pdf'
    });
});

router.get('http://localhost:5000/data/InsumosRelacionadosACancerDeMama.txt',function(req,res){
 console.log('cargo InsumosRelacionadosACancerDeMama.txt');
});

router.get('/data/insumosMama.txt',function(req,res){
 console.log('cargo insumosMama.txt');
});

router.get('/data/categoria.txt',function(req,res){
 console.log('cargo categoria.txt');
});


var prueba={}
var request = require("request");

//var jQuery = require("jquery");

var BuscarPath1=[
    "clausula_593",
    "clausula_644",
    "clausula_596",
    "clausula_660",
    "clausula_585",
    "clausula_554",
    "clausula_606",
    "clausula_643",
    "clausula_631",
    "clausula_589",
    "clausula_658",
    "clausula_588",
    "clausula_605",
    "clausula_622",
    "dano_malicioso_vandalismo",
    "clausula_572",
    "clausula_586",
    "clausula_592",
    "clausula_600",
    "clausula_671",
    "clausula_594",
    "clausula_601",
    "clausula_609",
    "clausula_669",
    "clausula_650",
    "clausula_651",
    "clausula_587",
    "clausula_560",
    "clausula_548",
    "clausula_602",
    "clausula_603",
    "clausula_552",
    "clausula_598",
    "clausula_656",
    "clausula_667",
    "clausula_563",
    "clausula_618",
    "clausula_555",
    "clausula_652",
    "clausula_581",
    "clausula_569",
    "clausula_625",
    "clausula_620",
    "clausula_597",
    "clausula_630",
    "clausula_673",
    "cobertura_extendida",
    "clausula_553",
    "terremoto",
    "causas_exclusiones_generales_incendio",
    "clausula_571",
    "danos_agua",
    "clausula_611",
    "clausula_649",
    "motin_huelga",
    "clausula_666",
    "clausula_556",
    "clausula_642",
    "clausula_646",
    "clausula_653",
    "clausula_562",
    "clausula_612",
    "clausula_629",
    "clausula_639",
    "explosion",
    "clausula_545",
    "incendio_rayo",
    "clausula_561",

]


function limpiarTexto(cadena){
    cadena=cadena.trim();
    // Definimos los caracteres que queremos eliminar
    var specialChars = "€_~<>°·«»§®ü¡^!@#$^%*()+=[]\/{}|:<>¿?";
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), ' ');
    }
    cadena=cadena.replace(/&/gi,"");
    cadena=cadena.replace(/  /gi,"");
  //  cadena=cadena.replace(/'/gi,"");
    return cadena;
};


function Wex(texto) {


   var textolimpio =limpiarTexto(texto)


    //var textoA=texto.replace("%", "");

    var Array_Faceta = ["Tecni_Pestanas_01"];
    var Num_Faceta=Array_Faceta.length;
    var contFaceta=0


    var Respuesta_Wex_Path = [];
    var Respuesta_Wex = [];
    var Respuesta_Categoria = []
    var Respuesta_UnidadMedida = []


    var json_watson={
        "Watson":{
            "posicion":0,
            "path":"",
            "texto":"",
            "tasa":0,
            "sumaasegurada":0.0,
            "prima":0.0,
            "condicionWatson":"",
            "clausula":"",
            "NomClausula":"",
            "ODM":""

        }
    }




        var options = {
            method: 'POST',
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=Tecni_Pestanas_01&output=application/javascript&text=' + textolimpio + '',
            headers: {
                'content-type': 'application/json',
                'dataType': 'json'
            }
        };

        request(options, function (error, response, body) {
            contFaceta++;
           // console.log(body)
            if (error) return console.error('Failed: %s', error.message);
            var json=JSON.stringify(body); // stringify convierte un valor dado en javascript a una cadena  JSON
            var res2 = body.replace("callback(", "");
            var resTotal = res2.replace(")", "");

            var json = JSON.stringify(eval("(" + resTotal + ")")); // stringify convierte un valor dado en javascript a una cadena  JSON
            var jsonParse =JSON.parse(json);
            var textfacets=jsonParse['metadata']['textfacets'];

           //console.log(textfacets)
           if (textfacets) {

                var contWatson=0
                for (var i = 0; i <= textfacets.length - 1; i++) {

                    var path = textfacets[i]['path'][0];
                    var path2 = textfacets[i]['path'][1];




                    var variable1 = /tasa_remocion_escombros_resumen/.test(path2);
                    var variable2 = /tasa_arrendamiento_resumen/.test(path2);
                    var variable3 = /tasa_documentos_modelos_resumen/.test(path2);
                    var variable4 = /tasa_auto_explosion_resumen/.test(path2);
                    var variable5 = /tasa_refrigeracion_resumen/.test(path2);
                    var variable6 = /tasa_combustion_espontanea_resumen/.test(path2);
                    var variable7 = /tasa_frigorificos_resumen/.test(path2);
                    var variable8 = /tasa_vidrio_resumen/.test(path2);
                    var variable9 = /tasa_incendio_resumen/.test(path2);
                    var variable10 = /tasa_propiedad_empleados_resumen/.test(path2);
                    var variable11 = /tasa_clausula_electrica_resumen/.test(path2);

                    var variable12 = /Pestana_Direcciones/.test(path);

                    var variable13 = /clausulas_adicionales_resumen/.test(path2);

                    var variable14 = /deducible_terremoto_resumen/.test(path2);
                    var variable15 = /deducible_bienes_exposicion_resumen/.test(path2);
                    var variable16 = /deducible_sabotaje_terrorismo_resumen/.test(path2);
                    var variable17 = /deducible_combustion_espontanea_resumen/.test(path2);
                    var variable18 = /deducible_rotura_maquinaria_resumen/.test(path2);
                    var variable19 = /deducible_motin_huelga_resumen/.test(path2);
                    var variable20 = /deducible_derrame_contenidos_resumen/.test(path2);
                    var variable21 = /deducible_autoexplosion_resumen/.test(path2);
                    var variable22 = /deducible_otro_evento_resumen/.test(path2);
                    var variable23 = /deducible_incendio_explosion_resumen/.test(path2);
                    var variable24 = /deducible_vidrios_resumen/.test(path2);
                    var variable25 = /deducible_lluvia_resumen/.test(path2);
                    var variable26 = /deducible_arrendamiento_resumen/.test(path2);



                    //Tasas
                    if (path === "Pestana_Tasa") {

                        if (variable1 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_remocion_escombros"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_remocion_escombros")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_remocion_escombros"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_remocion_escombros")



                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable2 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_arrendamientos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_arrendamientos")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_arrendamientos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_arrendamientos")


                            Regla_Watson="";

                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable3 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_documentos_modelos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_documentos_modelos")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_documentos_modelos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson

                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_documentos_modelos")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "ODM":""

                                }
                            }



                        }

                        if (variable4 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_auto_explosion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_auto_explosion")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""
                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_auto_explosion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_auto_explosion")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable5 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_cobertura_refrigeracion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_cobertura_refrigeracion")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_refrigeracion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_refrigeracion")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable6 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_combustion_espontanea"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_combustion_espontanea")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_combustion_espontanea"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_combustion_espontanea")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "ODM":""

                                }
                            }
                        }

                        if (variable7 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="Limite_cobertura_frigorificos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("Limite_cobertura_frigorificos")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="Tasa_frigorificos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("Tasa_frigorificos")

                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }
                        }

                        if (variable8 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.path="tasa_vidrios"
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_vidrios")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable9 === true) {
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }


                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.path="tasa_incendio"
                            json_watson.Watson.condicionWatson=Regla_Watson

                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_incendio")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }



                        }

                        if (variable10 === true) {

                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            //    console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_propiedad_empleados"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_propiedad_empleados")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_propiedad_empleados"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_propiedad_empleados")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if (variable11 === true) {

                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            //    console.log(valor)
                            var splitValor=valor.split("||");

                            if(splitValor[1]=="valor del porcentaje no autorizado"){
                                var Regla_Watson=splitValor[1];
                                splitValor[1]="0%";
                            }

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");
                            var sumaReal=sumaRe.replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaReal)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_clausula_electrica"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_clausula_electrica")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="tasa_clausula_electrica"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=Regla_Watson


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("tasa_clausula_electrica")


                            Regla_Watson="";
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""
                                }
                            }

                        }

                    }

                    //Direcciones
                    if(variable12 === true){

                        contWatson++;

                        var valor = textfacets[i]['keyword'];
                        //console.log(valor)
                        var splitValor=valor.split("||");

                        var sumaRe=splitValor[1].replace(",", "");
                        var sumaReal=sumaRe.replace(",", "");

                        var Real_Suma = parseFloat(sumaReal)

                        var Condi_Wat=splitValor[2];

                        // Respuesta_Wex_Path.push(path2);
                        // Respuesta_Wex.push(valor);

                        json_watson.Watson.posicion=contWatson
                        json_watson.Watson.texto=splitValor[0]
                        json_watson.Watson.sumaasegurada=Real_Suma
                        json_watson.Watson.path="suma_asegurada_incendio"
                        json_watson.Watson.condicionWatson=Condi_Wat

                        //   json_watson.Watson.id.prima=


                        Respuesta_Wex.push(json_watson)
                        Respuesta_UnidadMedida.push("Dolares");
                        Respuesta_Categoria.push("NumUSD");
                        Respuesta_Wex_Path.push("suma_asegurada_incendio")


                        json_watson={
                            "Watson":{
                                "posicion":0,
                                "path":"",
                                "texto":"",
                                "tasa":0,
                                "sumaasegurada":0.0,
                                "prima":0.0,
                                "condicionWatson":"",
                                "clausula":"",
                                "NomClausula":"",
                                "ODM":""

                            }
                        }





                    }


                    //Condiciones
                    if (path === "Pestana_Condiciones") {

                        if(variable13 === true){
                            contWatson++
                            var valor = textfacets[i]['keyword'];
                            var splitValor=valor.split("||");

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="clausulas_adicionales"
                            json_watson.Watson.clausula=splitValor[1]
                            json_watson.Watson.NomClausula=splitValor[2]

                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("");
                            Respuesta_Categoria.push("");
                            Respuesta_Wex_Path.push("")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""
                                }
                            }

                        }


                    }

                    //Deducibles


                    if (path === "Pestana_Deducible") {

                        if(variable14 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_terremoto_monto"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_terremoto_monto")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_terremoto_porcentaje"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_terremoto_porcentaje")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if(variable15 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            // console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_bienes_exposicion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_bienes_exposicion")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable16 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];

                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(",", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="limite_deducible_terrorismo_sabotaje"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("limite_deducible_terrorismo_sabotaje")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_terrorismo_sabotaje"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_terrorismo_sabotaje")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if(variable17 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //  console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_combustion_espontanea"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_combustion_espontanea")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable18 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //  console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_rotura_maquinaria"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_rotura_maquinaria")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable19 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //  console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_motin_huelga"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_motin_huelga")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable20 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //  console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_derrame_contenidos"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_derrame_contenidos")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable21 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //  console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_autoexplosion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_autoexplosion")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable22 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            // console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_otro_evento"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_otro_evento")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable23 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_incendio_explosion"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_incendio_explosion")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                        if(variable24 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_vidrios_monto"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_vidrios_monto")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_vidrios_porcentaje"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_vidrios_porcentaje")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if(variable25 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            //console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_lluvia_monto"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("NumUSD");
                            Respuesta_Wex_Path.push("deducible_lluvia_monto")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }


                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_lluvia_porcentaje"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Porcentaje");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_lluvia_porcentaje")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }

                        }

                        if(variable26 === true){
                            contWatson++;

                            var valor = textfacets[i]['keyword'];
                            // console.log(valor)
                            var splitValor=valor.split("||");

                            var tasaReal=splitValor[1].replace("%", "");
                            var sumaRe=splitValor[2].replace(".", "");


                            var Real_Tasa = parseFloat(tasaReal)
                            var Real_Suma = parseFloat(sumaRe)

                            // Respuesta_Wex_Path.push(path2);
                            // Respuesta_Wex.push(valor);

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path="deducible_arrendamiento"
                            json_watson.Watson.tasa=Real_Tasa
                            json_watson.Watson.sumaasegurada=Real_Suma
                            json_watson.Watson.condicionWatson=splitValor[3]
                            //   json_watson.Watson.id.prima=


                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("Dolares");
                            Respuesta_Categoria.push("Numero");
                            Respuesta_Wex_Path.push("deducible_arrendamiento")


                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":""

                                }
                            }




                        }

                    }


                }


            }//end for



            if(contFaceta==Num_Faceta) {
                odm_consulta(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida);
                // console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);
            }


        });


}


function odm_consulta(texto,arrayPath,arraywatson,arraycategory,arraryunidadmedidad){


    var arra_envio_odm=[]

    var json={
        "id": 0,
        "nombre": "",
        "texto": "",
        "valor": 0,
        "unidadMedida": "string",
        "resultado": "string"
    }


    for(var a=0; a<=arrayPath.length-1; a++) {



        json.id=a+1;
        json.nombre=arrayPath[a]

        if(arraycategory[a]=="Texto"){

            json.texto=arraywatson[a]
        }
        if(arraycategory[a]=="Numero"){
            json.valor=arraywatson[a].Watson.tasa
        }
        if(arraycategory[a]=="NumUSD"){
            json.valor=arraywatson[a].Watson.sumaasegurada
        }
        if(arraryunidadmedidad[a]!="string"){
            json.unidadMedida=arraryunidadmedidad[a]
        }


        arra_envio_odm.push(json);

        json={
            "id": 0,
            "nombre": "",
            "texto": "",
            "valor": 0,
            "unidadMedida": "string",
            "resultado": "string"
        }

    }


    var Respusta_odm=[];
    var Respuesta_watson_odm=[];

//console.log(arra_envio_odm)
        var options = {
            method: 'POST',
            url: 'http://169.60.177.124:9080/DecisionService/rest/v1/SegEquinocIncendioRulesApp/3.0/SegEquinocIncendio/WADL',
            body: JSON.stringify({
                "listaEntidad": {
                    "listaEntidad":arra_envio_odm
                }
            }),
            headers: {'content-type': 'application/json'}

        };

        request(options, function (error, response, body) {
            // console.log(response)
             //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
            var json = JSON.stringify(eval("(" + body + ")")); // stringify convierte un valor dado en javascript a una cadena  JSON
            var jsonParse =JSON.parse(json);
            Respusta_odm=jsonParse['listaEntidad']['listaEntidad'];              //  Respuesta_tasa=jsonParse['Respuesta']['tasa'];

            for(var w=0;w<=Respusta_odm.length-1;w++){


                var Tasa_A=arraywatson[w].Watson.tasa
                var Suma_B=arraywatson[w].Watson.sumaasegurada

                var Prima=Tasa_A*Suma_B;

                arraywatson[w].Watson.prima =Prima.toFixed(); ;

                if(Respusta_odm[w].resultado!="La entidad no se encuentra dada de alta en el motor de reglas") {
                    arraywatson[w].Watson.ODM = Respusta_odm[w].resultado;
                }else{
                    arraywatson[w].Watson.ODM = ""
                }

            }

            // console.log(Respuesta_watson)

           // console.log(arraywatson,Respuesta_watson_odm,arrayPath)

            contruir_json(texto,arraywatson)

        });




}

var Texto=""
var Watson = [];
var WatsonPath=[];
var ODM_Resultado=[];

var watsonBD=[];
var odmBD=[]

function contruir_json(texto,watsonResul,odmResul,pathWatson){


    Texto=texto
    Watson = watsonResul
  //  WatsonPath=pathWatson
  //  ODM_Resultado=odmResul

   /* var StringWatson=""

    for(var i=0; i<=watsonResul.length-1; i++){
        StringWatson=watsonResul[i]
        watsonBD.push(StringWatson);
    }

     watsonBD.push("Tasa -"+tasa_watson);
       watsonBD.push("SumaAsegurada -"+tasa_reglas);

     //console.log(watsonBD)
    odmBD=odmResul
    odmBD.push("Tasa -"+Result_Tasa_ODM);
    odmBD.push("SumaAsegurada -"+tasaReglaODM);

    insertBD();
*/
}


router.post('/expediente',function (req, res) {
    //console.log(req)

    var Texto_Enviado = req.body.texto;


   // console.log(Texto_Enviado)
    Wex(Texto_Enviado)

   // insertODBC();


    setTimeout(function () {

        console.log(Watson)
        res.json({

            "texto":Texto,
            "Result_incendio":Watson
    })


        Texto=""
        Watson = []
        WatsonPath=[];
        ODM_Resultado=[];



    }.bind(this), 2500);


});


function insertODBC() {


    var ibmdb = require('ibm_db');

    ibmdb.open("DATABASE=softconsulting;HOSTNAME=169.62.165.151;UID=root;PWD=BY8enKb8;PORT=1525;PROTOCOL=SSL", function (err,conn) {
        if (err) return console.log(err);

        conn.query('select * from resulprueba', function (err, data) {
            if (err) console.log(err);
            else console.log(data);

            conn.close(function () {
                console.log('done');
            });
        });
    });


}




function insertBD(){
    //res.redirect('/ui');
    //res.redirect('/login');
    var mysql = require('mysql');
    var utf8 = require('utf8');

    var con = mysql.createConnection({
        port: 25513,
        host: "sl-us-south-1-portal.11.dblayer.com",
        user: "admin",
        password: "IVJTBIVHSGOXOWGU",
        database: 'BD-Cie10'
    });

    function exitHandler(options, err) {
        connection.end();
        if (options.cleanup)
            console.log('clean');
        if (err)
            console.log(err.stack);
        if (options.exit)
            process.exit();
    }


    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected! 2");

       // console.log(watsonBD)
        var Insertwatson={};
        var Insertwatson=watsonBD;

        var odm ={};
        odm=odmBD;

        var queryInsert = 'INSERT INTO Prueba(watson,odm)values("'+Insertwatson+'","'+odm+'")';
        // var queryInsert = 'INSERT INTO Click values("20","prueba","1")';
        con.query(queryInsert, function (err, rows, fields) {
            if (err) throw err;
            console.log("insertado correctamente");
            watsonBD=[];
            odmBD=[]
            //selectTable(Click,id_Click,descripcion,id_texto)
        });


        process.on('exit', exitHandler.bind(null, {cleanup: true})); //END Conexion BD

    });


}


//************************************* Fin Funcion del Texto********************




module.exports = router;