
function odm_consulta(texto,arrayPath,arraywatson,arraycategory,arraryunidadmedidad,contEdi,broker_Pts){



   // console.log(arraywatson)
   // console.log(tasa)
   // console.log(regla)

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


/*
        if(arraywatson[a].Watson.limite!=0){

            arraywatson[a].Watson.sumaasegurada=arraywatson[a].Watson.limite
            arraywatson[a].Watson.limite=0
            if(arraycategory[a]=="NumeLIM"){
                arraycategory[a]="NumUSD"
            }

        }
*/




        json.id=a+1;
        json.nombre=arrayPath[a]

        if(arraycategory[a]=="Texto"){

            json.texto=arraywatson[a].Watson.texto
        }
        if(arraycategory[a]=="Numero"){
            json.valor=arraywatson[a].Watson.tasa
        }
        if(arraycategory[a]=="NumeLIM"){
            //alert("entro")

            json.valor=arraywatson[a].Watson.limite
        }
        if(arraycategory[a]=="NumeDIA"){

            json.valor=arraywatson[a].Watson.dias
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





    //*** Validacion de NAN ***

    for(var w=0 ; w<=arra_envio_odm.length-1 ; w++){

       var Real_validacion = isNaN(arra_envio_odm[w].valor)

        if(Real_validacion==true){
            console.log("***** Alerta de Null*****")
            console.log(arra_envio_odm[w])
        }


    }



    var Respusta_odm=[];
    var Respuesta_watson_odm=[];


    console.log(arraywatson)
    console.log(arra_envio_odm)
        $.ajax({

            url: 'http://192.168.10.169:9080/DecisionService/rest/v1/SegEquinocIncendioRulesApp/1.0/SegEquinocIncendio',
            type: 'POST',
            data: JSON.stringify({
                    "listaEntidad": {
                        "listaEntidad":arra_envio_odm
                    }

            }),

            headers: 'application/json',
            contentType: 'application/json',


            success: function (response) {

              //  console.log(response)
                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                Respusta_odm=jsonParse['listaEntidad']['listaEntidad'];              //  Respuesta_tasa=jsonParse['Respuesta']['tasa'];



              //  console.log(Respusta_odm)
                for(var w=0;w<=Respusta_odm.length-1;w++){


                    var Tasa_A=arraywatson[w].Watson.tasa
                    var Suma_B=arraywatson[w].Watson.sumaasegurada


                    //onsole.log(Tasa_A)
                    //console.log(Suma_B)

                    var Prima=Tasa_A*Suma_B;
                   // console.log(Prima)

                    arraywatson[w].Watson.prima =Prima.toFixed(4); ;

                    if(Respusta_odm[w].resultado!="La entidad no se encuentra dada de alta en el motor de reglas") {
                        arraywatson[w].Watson.ODM = Respusta_odm[w].resultado;
                    }
                    else{
                        arraywatson[w].Watson.ODM = ""
                    }



                    if(arraywatson[w].Watson.path=="limite_remocion_escombros") {
                        if(contEdi==0){
                            arraywatson[w].Watson.ODM = "NO ES POSIBLE OTORGAR PORQUE NO HAY VALOR ASEGURADO EN ESTRUCTURA";
                        }

                    }

                    if(arraywatson[w].Watson.path=="tasa_remocion_escombros") {
                        if(contEdi==0){
                            arraywatson[w].Watson.ODM = "NO ES POSIBLE OTORGAR PORQUE NO HAY VALOR ASEGURADO EN ESTRUCTURA";
                        }

                    }

                    if(arraywatson[w].Watson.path=="clausulas_adicionales") {
                        if(arraywatson[w].Watson.texto=="Todo Riesgo") {
                            arraywatson[w].Watson.ODM = "Si se otorga ";
                        }

                    }

                    if(arraywatson[w].Watson.path=="deducible_vidrios_monto") {
                       var monto=arraywatson[w].Watson.sumaasegurada
                        var Rela_monto=parseFloat(monto)
                        if(Rela_monto>=80) {
                            arraywatson[w].Watson.ODM = "Es posible otorgar cobertura para rotura de vidrios";
                        }else {
                            arraywatson[w].Watson.ODM = "NO Es posible otorgar cobertura para rotura de vidrios. Revision suscriptor Tecnico"
                        }
                    }


                    if(arraywatson[w].Watson.path=="limite_deducible_terrorismo") {
                        var monto=arraywatson[w].Watson.sumaasegurada
                        var Rela_monto=parseFloat(monto)
                        if(Rela_monto>=5000) {
                            arraywatson[w].Watson.ODM = "El deducible solicitado  cumple con parametros de SESA";
                        }else{
                            arraywatson[w].Watson.ODM = "El deducible solicitado no cumple con parametros de SESA. Revision Suscriptor Tecnico";
                        }

                    }


                    if(arraywatson[w].Watson.path=="Limite_Anios_maquinaria_RM") {
                        arraywatson[w].Watson.dias=0
                    }


                    if(arraywatson[w].Watson.path=="valoracion_suma_asegurada_rm") {
                        arraywatson[w].Watson.dias=0
                    }

                    if(arraywatson[w].Watson.path=="suma_asegurada_RM_maquina") {
                        arraywatson[w].Watson.dias=0
                    }


                    if(arraywatson[w].Watson.path=="clausulas_adicionales") {


                        if(arraywatson[w].Watson.clausula=="NO SE OTORGA") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="NO SE OTORGA"

                        }
                        if(arraywatson[w].Watson.clausula=="REVISION SUSCRIPTOR TECNICO") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="REVISION SUSCRIPTOR TECNICO"

                        }
                        if(arraywatson[w].Watson.clausula=="No se otorga") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="No se otorga"

                        }


                        if(arraywatson[w].Watson.clausula=="REVISION TECNICA") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="REVISION TECNICA"

                        }

                        if(arraywatson[w].Watson.clausula=="   Revisión tecnica") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="REVISION TECNICA"

                        }

                        if(arraywatson[w].Watson.clausula=="revision tecnica") {
                            arraywatson[w].Watson.clausula=""
                            arraywatson[w].Watson.ODM="REVISION TECNICA"

                        }



                        if(arraywatson[w].Watson.NomClausula=="611") {
                            arraywatson[w].Watson.ODM="REVISION TECNICA"

                        }



                    }

                    if(arraywatson[w].Watson.path=="Limite_meses_calculo_lucro_RM") {
                        arraywatson[w].Watson.dias=0
                    }






                }


                General_Conjunto(texto,broker_Pts,arraywatson)

            }// end success function
        }); //end AJAX*!/


}


function General_Conjunto(texto,broker_Pts,arraywatson) {
//console.log(arraywatson)

    var array_equipo_electronico=[]


    var cont_equipoelectronico=0


    var path_equipo_electronico=[
        "Perdida_Datos_EE_Palabra_Clave"

    ]


    //EQUIPO ELECTRONICO
    for(var i=0;i<=arraywatson.length-1;i++) {
        if( arraywatson[i]!=""){
            var path_buscar=arraywatson[i].Watson.path

            for (var j = 0; j <= path_equipo_electronico.length - 1; j++) {

                if (path_buscar == path_equipo_electronico[j]) {
                    //console.log(path_buscar)
                    // console.log(arraywatson[i].Watson.posicion)
                    cont_equipoelectronico++
                    arraywatson[i].Watson.posicion = cont_equipoelectronico
                    array_equipo_electronico.push(arraywatson[i])
                    arraywatson[i]=""
                }

            }
        }

    }





    var Real_watson=[]
    for(var a=0;a<=arraywatson.length-1;a++) {

        if( arraywatson[a]!=""){
            Real_watson.push(arraywatson[a])
        }
    }


    // console.log(Respuesta_watson)
    //console.log(array_LCRM)

    Wex_broker(texto,broker_Pts,Real_watson, array_equipo_electronico)


}
