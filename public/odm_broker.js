

 

function odm_consulta_broker(texto,arrayPath,arraywatsonBroker,arraycategory,arraryunidadmedidad,arrayWS,broker_PtaSo){


   // console.log(tasa)
   // console.log(regla)

    var arra_envio_odm=[]

    var json={
        "id": 0,
        "nombre": "",
        "texto": "string",
        "valor": 0,
        "unidadMedida": "string",
        "resultado": "string"
    }


    for(var a=0; a<=arrayPath.length-1; a++) {


     /*   if(arraywatsonBroker[a].Watson.limite!=0){
            arraywatsonBroker[a].Watson.sumaasegurada=arraywatsonBroker[a].Watson.limite
            arraywatsonBroker[a].Watson.limite=0

            if(arraycategory[a]=="NumUSD"){
                arraycategory[a]="NumSuma"
            }

        }
*/

        json.id=a+1;
        json.nombre=arrayPath[a]
      //  console.log(arrayPath[a])

        if(arraycategory[a]=="Texto"){

            json.texto=arraywatsonBroker[a].Watson.texto
        }
        if(arraycategory[a]=="Numero"){
            json.valor=arraywatsonBroker[a].Watson.tasa
        }

        if(arraycategory[a]=="NumeroTasa"){
            json.valor=arraywatsonBroker[a].Watson.tasa
        }

        if(arraycategory[a]=="NumUSD"){

                json.valor = arraywatsonBroker[a].Watson.limite

        }
        if(arraycategory[a]=="NumSuma"){

            json.valor = arraywatsonBroker[a].Watson.sumaasegurada

        }


        if(arraryunidadmedidad[a]!="string"){
            json.unidadMedida=arraryunidadmedidad[a]
        }


        arra_envio_odm.push(json);

        json={
            "id": 0,
            "nombre": "",
            "texto": "string",
            "valor": 0,
            "unidadMedida": "string",
            "resultado": "string"
        }

    }

  //console.log(arraywatsonBroker)
  //console.log(arra_envio_odm)

    var Respusta_odm=[];
    var Respuesta_watson_odm=[];




    var Validacion = NaN;

    for(var w=0 ; w<=arra_envio_odm.length-1 ; w++){
        var Nombre=arra_envio_odm[w].nombre
        var Valor=arra_envio_odm[w].valor


        var Real_validacion = isNaN(arra_envio_odm[w].valor)


        if(Real_validacion==true){
            console.log("***** Alerta de Null*****")
            console.log(arra_envio_odm[w])
            console.log(arraywatsonBroker[w])
        }


    }
        $.ajax({
            url: 'http://169.60.177.124:9080/DecisionService/rest/v1/SegEquinocBrokersRulesApp/1.0/SegEquinocBrokers',
            type: 'POST',
            data: JSON.stringify({
                "broker": {
                    "id": 1,
                    "nombre":broker_PtaSo
                },
                    "listaEntidad": {
                        "listaEntidad":arra_envio_odm
                    }

            }),

            headers: 'application/json',
            contentType: 'application/json',

            success: function (response) {

              // console.log(response)
                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                Respusta_odm=jsonParse['listaEntidad']['listaEntidad'];              //  Respuesta_tasa=jsonParse['Respuesta']['tasa'];

                for(var w=0;w<=Respusta_odm.length-1;w++){


                    var Tasa_A=arraywatsonBroker[w].Watson.tasa
                    var Suma_B=arraywatsonBroker[w].Watson.sumaasegurada


                    //onsole.log(Tasa_A)
                    //console.log(Suma_B)

                    var Prima=Tasa_A*Suma_B;
                   // console.log(Prima)

                    arraywatsonBroker[w].Watson.prima =Prima.toFixed(4); ;

                    if(Respusta_odm[w].resultado!="La entidad no se encuentra dada de alta en el motor de reglas") {
                        arraywatsonBroker[w].Watson.ODM = Respusta_odm[w].resultado;
                    }
                    else{
                        arraywatsonBroker[w].Watson.ODM = ""
                    }




                }

                 // console.log(Respuesta_watson)

                //console.log(arraywatson)

                Broker_conjunto(texto,arrayWS,arraywatsonBroker,broker_PtaSo)

            }// end success function
        }); //end AJAX*!/

}


function Broker_conjunto(texto,arrayWS,arraywatsonBroker,broker_PtaSo) {




        if (broker_PtaSo == "ASERTEC") {


           // console.log(entro)




            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]




            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }







            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker,array_EquipoElectronico,broker_PtaSo)


        }else

        if (broker_PtaSo == "AON") {


            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]



            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }





            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker, array_EquipoElectronico,broker_PtaSo)



        }else

        if (broker_PtaSo == "EXPERTTYA") {




            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]


            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }







            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker, array_EquipoElectronico,broker_PtaSo)


        }else

        if (broker_PtaSo == "ECUAPRIMAS") {


            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]


            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }




            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker,array_EquipoElectronico,broker_PtaSo)



        }else

        if (broker_PtaSo == "CIDESCOL") {





            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]


            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }




            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker, array_EquipoElectronico,broker_PtaSo)



        }else

        if (broker_PtaSo == "MULTIAPOYO") {





            var array_EquipoElectronico = []
            var cont_EquipoElectronico = 0
            var path_EquipoElectronico  = [""]



            //EE
            for(var i=0;i<=arraywatsonBroker.length-1;i++) {

                if( arraywatsonBroker[i]!=""){
                    var path_buscar=arraywatsonBroker[i].Watson.path

                    for (var j = 0; j <= path_EquipoElectronico.length - 1; j++) {

                        if (path_buscar == path_EquipoElectronico[j]) {
                            cont_EquipoElectronico++
                            arraywatsonBroker[i].Watson.posicion = cont_EquipoElectronico
                            array_EquipoElectronico.push(arraywatsonBroker[i])
                            arraywatsonBroker[i]=""
                        }

                    }
                }

            }




            var Real_arraywatsonBroker = []
            for (var a = 0; a <= arraywatsonBroker.length - 1; a++) {

                if (arraywatsonBroker[a] != "") {
                    Real_arraywatsonBroker.push(arraywatsonBroker[a])
                }
            }

            orden_broker(texto, arrayWS, Real_arraywatsonBroker,array_EquipoElectronico,broker_PtaSo)



        }

        else{



            var array_EquipoElectronico=[]

            //console.log(arrayWS)
            //console.log(Real_arraywatsonBroker)
            orden_broker(texto, arrayWS, arraywatsonBroker,array_EquipoElectronico,broker_PtaSo)

        }


}


