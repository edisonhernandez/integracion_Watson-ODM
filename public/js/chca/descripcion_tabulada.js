/**
 * Created by SOA on 09/10/2017.
 */




function descripcionTabulada(){
    //console.log(codePrin);

    //for(var p=0; p<=colecciones.length-1; p++){
        $.ajax({
            url:'http://proyectosoa.sytes.net:8393/api/v10/search/facet?collection=AXA_Codigo_a_Descripcion&facet=%7B%22namespace%22:%22keyword%22,%22id%22:%22$.descripcion%22%7D&output=application/javascript&query=(*:*)%20AND%20(keyword::/%22codigo%22/%22'+codePrin+'%22)',
            //url:'http://proyectosoa.sytes.net:8393/api/v10/analysis/text?collection=AXA_Codigo_a_Descripcion&output=application/javascript',
            type:'POST',
            data:{"text":codePrin},
            contenType:"application/javascript",
            dataType : "jsonp",


            success: function(response){
                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                //console.log(jsonParse);
                var ibmsc_facetValue = jsonParse['es_apiResponse']['ibmsc_facet']['ibmsc_facetValue'];

                //console.log(textfacets.length);
                if(ibmsc_facetValue){
                    var arrayResultados=[];
                    var k=0;
                     descripTabulada=ibmsc_facetValue['label'];

                    console.log(descripTabulada);
                    /*for(var i=0; i<=textfacets.length-1; i++){
                        var cobertura=textfacets[i]['path'];
                        if(cobertura.length==1){
                             descripTabulada=textfacets[i]['keyword'];
                            console.log(descripTabulada);
                        }
                        else{
                            alert("path tiene mas posiciones");
                        }
                    }//end for*/

                }//end if
                /*else{
                    alert("No se encontro el nodo ['metadata']['textfacets'] en el JSON");
                }*/


            },// end success function
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');

            }
        }); //end AJAX
   // }//end for colecciones


}