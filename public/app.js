
function Json() {

    var broker="ECUAPRIMAS"
    var texto="EE seccion iii 1000 10%"

    Wex(broker, texto)
 
}


function limpiarTexto(cadena){
    cadena=cadena.trim();
    // Definimos los caracteres que queremos eliminar
    //var specialChars = "€/!;,.:_~<>°ñ{}$%·«»§®ü¡^!@#^*()+=-[]\/|:<>¿?";
    var specialChars = "€/!~<>°ñ%·«»§®ü¡^!@#\/|:<>¿?";
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), ' ');
    }
   // cadena=cadena.replace(//gi," ");
   // cadena=cadena.replace(//gi," ");
    cadena=cadena.replace(/&quot/gi," ");
    cadena=cadena.replace(/&/gi," ");
    cadena=cadena.replace(/#/gi," ");
    return cadena;
}

function Validar_fecha(fecha) {

    var split=fecha.split("/");
    var fechaHoy = new Date();
    var annoActual = fechaHoy.getFullYear();
    var mesActual = fechaHoy.getMonth()+1;
    var diaActual = fechaHoy.getDate();


    var Dianac = split[0]
    var Mesnac = split[1]
    var Anonac = split[2]

    var Edad = annoActual-Anonac;

    if(mesActual<Mesnac){
        Edad--;
    }
    if(mesActual==Mesnac){
        if(Dianac<diaActual){
            Edad--;
        }

    }

    return Edad;

}


function Wex(broker_Pt,text){


    var Array_Faceta=["Pruebas"];

    var Num_Faceta=Array_Faceta.length;
    var contFaceta=0


    var Respuesta_Wex_Path = [];
    var Respuesta_Wex = [];
    var Respuesta_Categoria = []
    var Respuesta_UnidadMedida = []
    var cont=0


    var json_watson={
        "Watson":{
            "posicion":0,
            "path":"",
            "dias":0,
            "texto":"",
            "tasa":0,
            "sumaasegurada":0.0,
            "limite":0.0,
            "primaNeta":0.0,
            "prima":0.0,
            "condicionWatson":"",
            "clausula":"",
            "NomClausula":"",
            "ODM":"",
            "Direccion":"",
            "ITEM":"",
            "Fecha":""

        }
    }


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {

            //console.log(Array_Faceta[h])

        $.ajax({
            url: 'http://192.168.10.156:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;

                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];



                //<-- EQUIPO ELECTRONICO
                var path_perdida_EE=""



                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {

                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];




                        //<-- EQUIPO ELECTRONICO
                        if(path2=="ee_seccion_iii"){path_perdida_EE="Perdida_Datos_EE_Palabra_Clave"; }




                        //*********************************** Codigo *************************************





                        //<-- EQUIPO ELECTRONICO
                        if(path_perdida_EE != ""){

                            contWatson++

                            var valor = textfacets[i]['keyword'];
                            var splitValor=valor.split("||");
                            //  console.log(splitValor)

                            json_watson.Watson.posicion=contWatson
                            json_watson.Watson.texto=splitValor[0]
                            json_watson.Watson.path=path_perdida_EE
                            json_watson.Watson.tasa=splitValor[1]
                            json_watson.Watson.sumaasegurada=splitValor[2]

                            Respuesta_Wex.push(json_watson)
                            Respuesta_UnidadMedida.push("");
                            Respuesta_Categoria.push("Texto");
                            Respuesta_Wex_Path.push(path_perdida_EE)

                            path_perdida_EE=""
                            json_watson={
                                "Watson":{
                                    "posicion":0,
                                    "path":"",
                                    "dias":0,
                                    "texto":"",
                                    "tasa":0,
                                    "sumaasegurada":0.0,
                                    "limite":0.0,
                                    "primaNeta":0.0,
                                    "prima":0.0,
                                    "condicionWatson":"",
                                    "clausula":"",
                                    "NomClausula":"",
                                    "ODM":"",
                                    "Direccion":""

                                }
                            }

                        }


                    }


                }//end for


                if(contFaceta==Num_Faceta) {

                    odm_consulta(text,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,cont,broker_Pt);
                    // console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}