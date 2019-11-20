
function Wex_broker(text,broker_Pt,arrayWS,array_EquipoElectronico){

    if(broker_Pt=="ASERTEC"){
        arrayParticulares(array_EquipoElectronico)
        brokerAsertec(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="ECUAPRIMAS"){
        arrayParticulares(array_EquipoElectronico)
        brokerEcuaprimas(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="CIDESCOL"){
        arrayParticulares(array_EquipoElectronico)
        brokerCidescol(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="RAUL COKA"){
        arrayParticulares(array_EquipoElectronico)
        brokerRaulcoka(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="AON"){
        arrayParticulares(array_EquipoElectronico)
        brokerAon(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="MULTIAPOYO"){
        arrayParticulares(array_EquipoElectronico)
        brokerMultiapoyo(text,arrayWS,broker_Pt)

    }else if(broker_Pt=="EXPERTTYA"){
        arrayParticulares(array_EquipoElectronico)
        brokerExperttyya(text,arrayWS,broker_Pt)

    }
    else{

        orden_general(text,arrayWS,array_EquipoElectronico,broker_Pt)
    }

}


function brokerAsertec(texto,arrayWS,broker_Pta){


    //var textA=texto.split("Dirección Asegurada");

    var text=texto
   // console.log(texto)
   // console.log(arrayWS)


    var Array_Faceta=["Asertec"];

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
                "texto":"",
                "tasa":0,
                "sumaasegurada":0.0,
                "limite":0.0,
                "prima":0.0,
                "condicionWatson":"",
                "clausula":"",
                "NomClausula":"",
                "ODM":"",
                "Direccion":""

        }
    }


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=Asertec&output=application/javascript',
            type: 'POST',
            data: {"text": texto},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                //console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];
                // console.log(json);


               // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {

                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];

                    }


            }//end for



                if(contFaceta==Num_Faceta) {

                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                 //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerEcuaprimas(texto,arrayWS,broker_Pta){



    var text=texto
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["Ecuaprimas"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;

               // console.log(response);

                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];

              // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {
                      //  console.log(textfacets[i]['path'][1]);
                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];

                    }


                }//end for



                if(contFaceta==Num_Faceta) {
                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                    //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerCidescol(texto,arrayWS,broker_Pta){


    var textA=texto.split("Dirección Asegurada");

    var text=texto
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["Cidescol"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                // console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];



                // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {
                        //  console.log(textfacets[i]['path'][1]);
                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];

                    }


                }//end for



                if(contFaceta==Num_Faceta) {
                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                    //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerExperttyya(texto,arrayWS,broker_Pta){



    var text=texto
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["Experttya"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                // console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];



                // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {
                        //  console.log(textfacets[i]['path'][1]);
                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];


                    }


                }//end for



                if(contFaceta==Num_Faceta) {
                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                    //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerAon(texto,arrayWS,broker_Pta){


    var textA=texto.split("Dirección Asegurada");

    var text=texto
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["AON"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                // console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];



                // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {
                        //  console.log(textfacets[i]['path'][1]);
                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];


                    }


                }//end for



                if(contFaceta==Num_Faceta) {
                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                    //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerMultiapoyo(texto,arrayWS,broker_Pta){


    //var textA=texto.split("Dirección Asegurada");

    var text=texto
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["Multiapoyo"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                // console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];



                // console.log(json);
                if (textfacets) {

                    var contWatson=0
                    for (var i = 0; i <= textfacets.length - 1; i++) {
                        //  console.log(textfacets[i]['path'][1]);
                        var path = textfacets[i]['path'][0];
                        var path2 = textfacets[i]['path'][1];


                    }


                }//end for



                if(contFaceta==Num_Faceta) {
                    odm_consulta_broker(texto,Respuesta_Wex_Path,Respuesta_Wex,Respuesta_Categoria,Respuesta_UnidadMedida,arrayWS,broker_Pta);
                    //console.log(Respuesta_Wex_Path, Respuesta_Wex, Respuesta_Categoria, Respuesta_UnidadMedida);

                }



            }// end success function



        }); //end AJAX
    }


}

function brokerRaulcoka(texto,arrayWS,broker_Pta){


    var textA=texto.split("Dirección Asegurada");

    var text=textA[0]
    // console.log(textA)
    // console.log(arrayWS)


    var Array_Faceta=["R_Coka"];

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


    for(var h=0 ;h<=Array_Faceta.length-1;h++) {


        $.ajax({
            url: 'http://169.60.177.122:8393/api/v10/analysis/text?collection=' + Array_Faceta[h] + '&output=application/javascript',
            type: 'POST',
            data: {"text": text},
            contenType: "application/javascript",
            dataType: "jsonp",

            success: function (response) {

                contFaceta++;
                // console.log(response);
                var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                var textfacets = jsonParse['metadata']['textfacets'];




            }// end success function



        }); //end AJAX
    }


}

