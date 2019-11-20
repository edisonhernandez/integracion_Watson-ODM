//*****************************************************************************************
// IMPRIMIR COMANDA
 //*****************************************************************************************/

function insumosFace(arrayInsumos){
    //console.log(arrayInsumos);
}


function insumos() {
    $("#Searching_Modal").modal('show');


    var tabla = "<table id='tabla' class='table table-hover tabla' style='text-align:center; background-color: white; color: black; '>";

    tabla +="<tr><div style='height: 3em; color:black; background-color:#fcdec0'>Diagnóstico:<strong><output  style='display:inline-block; color:black'; id='diagnostico'></div></strong></output></tr>";
    tabla +="<tr><div style='height: 3em; color:black; background-color:#d7ecf4'>Total de insumos relacionados:<strong><output style=' display:inline-block; color:black'; id='relacion'></div></strong></output></tr>";
    tabla +="<tr><div style='height: 3em; color:black; background-color:#fbc36e'>Total de insumos sin relación:<strong><output style=' display:inline-block; color:black'; id='sinRelacion'></div></strong></output></tr>";
    tabla +="<tr class='active'>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>#</th>";
    tabla +="<th class='col-lg-2' style='background-color:#f1f1f1; text-align: center;'>Insumos</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Categoria</th>";
// tabla +="<th class='col-lg-12' style='background-color:#f1f1f1; text-align: center;'>InsumosTxt</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Relacionado con Diagnóstico</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Precio Medio</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Relación con media Histórica</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Convenio</th>";
    tabla +="<th class='col-lg-1' style='background-color:#f1f1f1; text-align: center;'>Opinión de Watson</th>";
// tabla +="<th class='col-lg-12' style='background-color:#f1f1f1; text-align: center;'>Precio en Comanda</th>";
    tabla +="</tr>";



//!***************************Ajax Facetas Insumos *********************************************
    arrayInsumos=[];
    var hostWatson="http://proyectosoa.sytes.net:8393/api/v10/";
    var coleccion = ["VitaMedica_Angeles_1"];
    var episodio=["4707865"];
    var numPaciente=["1000971318"];
    var faceta=["$.insumos.registro"];
    var insumosFacetas=[];

    var totalSinRelacion=0;

    $.ajax({
        //url: hostWatson+'search?collection='+coleccion[0]+'&query=((*:*) AND (keyword::/"Número de Paciente"/"'+numPaciente+'")) AND (keyword::/"Número de Episodio"/"'+episodio+'")&facet={"namespace":"keyword","id":"'+faceta+'","count":10000}&output=application/javascript',
        url:hostWatson+'search?collection='+coleccion[0]+'&query=(((*:*) AND (keyword::/"Número de Paciente"/"'+numPaciente+'")) AND (keyword::/"Número de Episodio"/"'+episodio+'")) AND (keyword::/"Total"/"251,552.04")&facet={"namespace":"keyword","id":"'+faceta+'","count":10000}&output=application/javascript',
        type:'POST',
        //data:{"text":text},
        contenType:"application/javascript",
        dataType : "jsonp",
        success: function(response){
            var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
            var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
            var ibmsc_facetValue= jsonParse['es_apiResponse']['ibmsc_facet']['ibmsc_facetValue'];
            //console.log(ibmsc_facetValue);
            //console.log(textfacets.length);
            if(ibmsc_facetValue){
                //var arrayInsumos=[];
                 importeinsumo=[];
                //var k=0;
                for(var i=0; i<=ibmsc_facetValue.length-1; i++){
                    var label=ibmsc_facetValue[i]['label'];
                    var labelSplit=label.split("||");
                    var impinsumo=labelSplit[4];
                    var insumos=labelSplit[0];
                    arrayInsumos.push(insumos);
                    var importeSC=impinsumo.replace(",", "");
                    importeinsumo.push(importeSC);
                    //arrayInsumos.sort();
               //     console.log(impinsumo)
                }//end for

            }//end if
            else{
                alert("No existe el nodo ['es_apiResponse']['ibmsc_facet']['ibmsc_facetValue'] en el json");
            }

            //console.log(arrayInsumos.length); //230 insumos
            //console.log("total de insumos en la facetas= "+arrayInsumos.length); //149 insumos

// !***************************End Facetas Insumos *********************************************

//!***************************Ajax TXT Insumos *********************************************
            $.ajax({
                url: '/data/reporte_insumos.txt',
                type: 'GET',
                dataType: 'text',
                crossDomain : true,
                contentType: "text/plain; charset=UTF-8",
                encoding: "UTF-8",
                success: function (data) {

                    insumosTxt=data.split('\n');

                  //  insumosTxt.sort();
                    //console.log(insumosCancerTxt.length); //217 insumos



//!***************************End Txt Insumos y categoris TXT*********************************************

                       resultCategoria=[];
                       resimporteinsumo=[];
                       totalrelacionado=0;
                       totalmediahistorica=[];
                       nombremediahistorica=[];
                       preciomediohistorico=[];
                       opinionwatson=[];
                       convenio=[];

                        // console.log(data);
                        resulInsumos=[];
                        for(var a=0;a<=insumosTxt.length-1;a++){
                            var p =insumosTxt[a].toString();
                            var par= p.split(";");
                            resulInsumos[a]=par[0];
                        }

                    txtCategoria=[];
                    for(a=0;a<=insumosTxt.length-1;a++){
                        var p2 =insumosTxt[a].toString();
                        var parts2= p2.split("||");
                        var parts3= parts2[0].split(";");
                        //console.log(parts3[1]);
                        txtCategoria[a]=parts3[1];
                       //console.log(parts3[1]);

                    }




//!***************************Ajax repeticiones *********************************************

                    $.ajax({
                        url: '/data/mediaInsumosAngeles.txt',
                        type: 'GET',
                        dataType: 'text',
                        crossDomain : true,
                        contentType: "text/plain; charset=UTF-8",
                        encoding: "UTF-8",
                        success: function(response) {
                            //var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                            //var jsonParse =JSON.parse(json,null,4);
                            preciomedi=response.split('\n');

                           //console.log(preciomedi);
                           for(a=0;a<=preciomedi.length-1;a++){
                                var p =preciomedi[a].toString();
                                var parts= p.split(" $");
                               nombremediahistorica[a]=parts[0];
                               var parts2= parts[1].split("||");
                               preciomediohistorico[a]=parts2[1];
                               //console.log(preciomediohistorico[a]);
                            }
                            console.log(preciomediohistorico);





                      /*      var result= jsonParse["es_apiResponse"]["es_result"];
                            var searchRep;
                            var resummary=0;
                            //var sumary = result[s]["es_summary"];
                            for(var s=0; s<result.length; s++){
                                var sumary = result[s]["es_summary"];
                                if(sumary.length==1) {
                                    var sumary = sumary[0];
                                    //console.log("SUMARY MAS POSICION: "+sumar);

                                        searchRep=/OFHighlightTerm4/.test(sumary);
                                    if(searchRep===true){ resummary++;}
                                }
                                else{
                                    //var sumary = sumary;
                                    searchRep=/OFHighlightTerm4/.test(sumary);
                                //    console.log("SUMARY 1 POSICION: "+sumary);
                                    if(searchRep===true){ resummary++;}
                                }

                            }*/
                     //  console.log(resummary);





                            function mayor(lista) {
                                var mayor = lista[0];
                                for (i = 1; i < lista.length; i++) {
                                    if (lista[i] > mayor)
                                        mayor = lista[i];
                                }// END DEL FOR
                                return mayor;
                            }; //  function mayor(lista)


                            for (var i = 0; i <= arrayInsumos.length - 1; i++) {
                                for (var j = 0; j <= arrayInsumos.length - 1; j++) {
                                    if (i != j) {
                                        if (arrayInsumos[i] == arrayInsumos[j]) {
                                            // eliminamos su valor
                                           arrayInsumos[i] = "";
                                            importeinsumo[i]="";
                                            arrayInsumos[i] = $.grep(arrayInsumos[i], function (n) {
                                               return (n);
                                            });

                                        }
                                    }
                                }
                            }



                            var msg = "";
                             arrayResultados = [];
                            var contador;
                            var encontrado = -1;
                             arrayResul = [];

                            //console.log(arrayInsumos);
                            var arrayMama = arrayInsumos;//los insumos vienen de las facetas
                            //var arrayTxt=insumosTxt; //los insumos del TXT que van a buscar o de cancer de mama
                            var arrayTxt = resulInsumos; //los insumos del TXT que van a buscar o de cancer de mama
                            //console.log(arrayMama);
                            //console.log(arrayInsumosTxt.length);
                            insumosPagar=[];
                            insumosNopagar=[];
                            //var count=0;
                            insumosFace(arrayInsumos);
                            //console.log(arrayInsumos);
                            for (var i = 0; i < arrayMama.length; i++) {
                                for (var j = 0; j < arrayTxt.length; j++) {
                                    if (arrayMama[i] == arrayTxt[j]) {
                                        // eliminamos su valor
                                        arrayResul[i] = "Relacionado";
                                        insumosPagar[i]=arrayMama[i];
                                        resultCategoria[i] = txtCategoria[j]
                                        resimporteinsumo[i] =importeinsumo[i]
                                    }
                                }
                            }

                            for (var i = 0; i < arrayResul.length; i++) {
                                if (arrayResul[i] == undefined) {
                                    arrayResul[i] = "Sin Relación";
                                }
                            }
                            arrayCategoriasTxt=resultCategoria;

                            Instrumental=[];
                            Laboratorio=[];
                            General=[];
                            MaterialCuración=[];
                            EquipoMédico=[];
                            Medicamentos=[];
                            CuadroBásico=[];
                            Hospitalización=[];


//Deficion de Categorias
                            for (var i = 0; i < resultCategoria.length; i++) {
                                if(resultCategoria[i]=="Instrumental "){Instrumental[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Laboratorio "){Laboratorio[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="General "){General[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Material de Curación "){MaterialCuración[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Equipo Médico "){EquipoMédico[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Medicamentos "){Medicamentos[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Cuadro Básico "){CuadroBásico[i]=arrayInsumos[i];}
                                if(resultCategoria[i]=="Hospitalización "){Hospitalización[i]=arrayInsumos[i];}

                            }
                           // console.log(resultCategoria);


//
//Inicio de operaciones de Media Historica*************************************

                            porcentaje5=[];
                            prueba=[];

                              var total=0;
                            for (var i = 0; i < arrayMama.length; i++) {
                                for (var j = 0; j < nombremediahistorica.length; j++) {
                                    if (arrayMama[i] == nombremediahistorica[j]) {

                                        if(resimporteinsumo[i]==null){
                                            resimporteinsumo[i]=0;
                                        }
                                        total = parseFloat(resimporteinsumo[i]);
                                        totalrelacionado += total;

                                        prueba[i]=parseFloat(resimporteinsumo[i]);
                                        porcentaje5[i]=prueba[i]*.05
                                        // eliminamos su valor
                                        var preciofaceta=parseFloat(resimporteinsumo[i]);
                                        var totalmedia =parseFloat(preciomediohistorico[j]);
                                        var thistorica=preciofaceta-totalmedia;//Colocar los insumos de la lista vale
                                        totalmediahistorica[i]=thistorica.toFixed(2)
                                       //console.log(resimporteinsumo[i]);
                                       //console.log(preciomediohistorico[j]);
                                       //console.log(nombremediahistorica[j]);
                                        if(porcentaje5[i]>totalmediahistorica[i]){
                                            opinionwatson[i]="Pagar"
                                            insumosPagar[i]=nombremediahistorica[j];
                                        }else{
                                            opinionwatson[i]="No Pagar"
                                            insumosNopagar[i]=nombremediahistorica[j];
                                        }


                                        if(totalmediahistorica[i]==0){
                                            convenio[i]="SI"
                                        }else{
                                            convenio[i]="NO"
                                        }


                                    }
                                }
                            }
                         //   console.log(totalmediahistorica)

//Fin de operaciones de Media Historica*************************************








                          // convenio = []







                            var arrayMayor = [arrayInsumos.length, resulInsumos.length, arrayResul.length];
                            var mayor = mayor(arrayMayor);

                            var contador = 0;
                            //!***************************End TXT Categoria *********************************************
                            //****************************************Imprimir Tabla********************************************************************
                            pagarConvenio=[];
                            pagarNoconvenio=[];
                            console.log(arrayInsumos);
                            for (var j = 0; j < mayor; j++) {

                                //if(convenio[j]==undefined){convenio[j]="SI";}
                               // if(opinionwatson[j] ==undefined){opinionwatson[j]="Pagar";}
                                //if(convenio[j]==undefined){ pagarConvenio[j]=arrayInsumos[j]}
                                if(convenio[j]=="SI"){ pagarConvenio[j]=arrayInsumos[j]}
                                if(convenio[j]=="NO"){ pagarNoconvenio[j]=arrayInsumos[j]}



                                tabla += "<tr>";
                                if (arrayMama[j]) {

                                    if (arrayInsumos[j] == "") {
                                    }
                                    else {

                                      if(arrayResul[j] == "Relacionado"){

                                        contador++;
                                        tabla += "<td >" + [contador] + "</td>";
                                        tabla += "<td>" + arrayInsumos[j] + "</td>";



                                        if (resultCategoria[j] == undefined) {
                                            resultCategoria[j] = "Sin Informacion"
                                            //document.body.style.backgroundColor = "red";
                                            tabla += "<td>" + resultCategoria[j] + "</td>";
                                        }
                                        else {
                                            tabla += "<td>" + resultCategoria[j] + "</td>";
                                        }
                                         arrayResultados.push(msg);



                                        if (arrayResul[j] == "Relacionado") {
                                            //document.body.style.backgroundColor = "red";
                                            
                                            /*if(arrayInsumos[j]=="CUARTO PRIVADO CON BANO Y TELEFONO"){
                                                //tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                                arrayResul[j]="Sin relación"

                                                //var replace = resimporteinsumo[j].replace("0", "",1);
                                                var replace = parseFloat(resimporteinsumo[j])
                                                totalSinRelacion+=replace   
                                                //console.log(totalSinRelacion);

                                                tabla += "<td class='danger'>" + arrayResul[j] + "</td>";
                                            }*/
                                            // else{
                                            //     tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                            // }

                                            if(arrayInsumos[j]=="BIOMETRIA HEMATICA COMPLETA"){
                                                //tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                                arrayResul[j]="Sin relación"

                                                //var replace = resimporteinsumo[j].replace("0", "",1);
                                                var replace = parseFloat(resimporteinsumo[j])
                                                totalSinRelacion+=replace   
                                                //console.log(totalSinRelacion);

                                                tabla += "<td class='danger'>" + arrayResul[j] + "</td>";
                                            }


                                            else if(arrayInsumos[j]=="MICRO CLAVE C/EXT.MICRO 56CM 2V 4031211"){
                                                //tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                                arrayResul[j]="Sin relación"

                                                //var replace = resimporteinsumo[j].replace("0", "",1);
                                                var replace = parseFloat(resimporteinsumo[j])
                                                totalSinRelacion+=replace   
                                                //console.log(totalSinRelacion);

                                                tabla += "<td class='danger'>" + arrayResul[j] + "</td>";
                                            }

                                             else if(arrayInsumos[j]=="INSTRUMENTAL PARA CIRUGIA ESPECIALIDAD"){
                                                //tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                                arrayResul[j]="Sin relación"

                                                //var replace = resimporteinsumo[j].replace("0", "",1);
                                                var replace = parseFloat(resimporteinsumo[j])
                                                totalSinRelacion+=replace   
                                                //console.log(totalSinRelacion);

                                                tabla += "<td class='danger'>" + arrayResul[j] + "</td>";
                                            }



                                            else{
                                                tabla += "<td class='success'>" + arrayResul[j] + "</td>";    
                                            }
                                            
                                            
                                        }
                                        /*else {
                                            arrayResul[i] = "Sin Relación";
                                            tabla += "<td class='danger'>" + arrayResul[j] + "</td>";
                                        }*/

                                        tabla += "<td>" + resimporteinsumo[j] + "</td>";

                                        if(totalmediahistorica[j]==undefined) {
                                         totalmediahistorica[j]=0;
                                         tabla += "<td>" + totalmediahistorica[j] + "</td>";
                                        }else
                                               {
                                                   tabla += "<td>" + totalmediahistorica[j] + "</td>";
                                               }



                                                tabla += "<td>" + convenio[j] + "</td>";



                                            if (opinionwatson[j] == "Pagar") {
                                                //document.body.style.backgroundColor = "red";
                                                tabla += "<td class='success'>" + opinionwatson[j] + "</td>";
                                          }
                                           if(opinionwatson[j] == "No Pagar") {
                                            tabla += "<td class='danger'>" + opinionwatson[j] + "</td>";
                                          }

                                       }else
                                            {}

                                    }


                                }

                                tabla += "</tr>";
                            }// end del for






                            var div = document.createElement('div');
                            div.id = "resultadosTabla1";
                            div.className="col-lg-9"
                            document.getElementById("returnSinies").appendChild(div);
                            document.getElementById("resultadosTabla1").innerHTML = tabla;
                            document.getElementById.innerHTML=div;
                            // document.getElementById("resultadosTabla1").innerHTML = tabla2;



                            $('#diagnostico').val("C50-Neoplasia maligna de mama").trigger('output');
                            $('#relacion').val("$ "+totalrelacionado.toFixed(2)+" MxN").trigger('output');
                            //$('#sinRelacion').val("$ 0 MxN").trigger('output');
                            $('#sinRelacion').val("$ "+totalSinRelacion).trigger('output');




                            if ($("#tabla").height() > 249) {
                                document.getElementById("returnSinies").style.overflowY = "scroll";
                                document.getElementById("returnSinies").style.height = "600px";

                            }

                            $("#Searching_Modal").modal('hide');

//!***************************End Imprimir Tabla *********************************************

                        },
                        error: function (err, xhr, status) {
                            $("#Searching_Modal").modal('hide');
                            console.log(JSON.stringify(err));
                            //alert('Ups, Algo Paso');
                        }
                    }); //END AJAX repeticiones
//****************************************End Ajax TXT Insumos***************************************************************
                    }, //End success TXT Insumos
                    error: function (err, xhr, status) {
                        $("#Searching_Modal").modal('hide');
                        console.log(JSON.stringify(err));
                        //alert('Ups, Algo Paso');
                    }
                }); //END AJAX TXT Insumos

//****************************************End Ajax facetas Insumos***************************************************************
        },// end success facetas Insumos
        error: function (err, xhr, status) {
            $("#Searching_Modal").modal('hide');
            console.log(JSON.stringify(err));
            //alert('Ups, Algo Paso');

        }
    }); //end AJAX Facetas Insumos

};//end function