/**
 * Created by SOA on 09/10/2017.
 */

hostWatson="http://proyectosoa.sytes.net:8393/api/v10/";
function coberturaEncontrada(){
    //console.log(codePrin);
    var codeCie10= codePrin
    var colecciones = ["AXA_Codigo_a_Cobertura"]


    for(var p=0; p<=colecciones.length-1; p++){
        $.ajax({
            url: hostWatson+'analysis/text?collection='+colecciones[p]+'&output=application/javascript',
            type:'POST',
            data:{"text":codeCie10},
            contenType:"application/javascript",
            dataType : "jsonp",


            success: function(response){
                var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
                var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
                //console.log(jsonParse);
                var textfacets=jsonParse['metadata']['textfacets'];

                //console.log(textfacets.length);
                if(textfacets){
                    var arrayResultados=[];
                    var k=0;
                    for(var i=0; i<=textfacets.length-1; i++){
                        var cobertura=textfacets[i]['path'][0];
                        var diagCobertura=textfacets[i]['keyword'];
                        if(cobertura && diagCobertura){
                            arrayResultados.push(diagCobertura, cobertura);
                            //console.log(diagCobertura,cobertura);
                            k++;
                            searchInflexion=/mama/.test(diagCobertura);
                            console.log(searchInflexion);

                            if(searchInflexion==true){
                                console.log("la palabra mama en la cadena");
                                //var codeProduct= 'CNSF–S0048-0210-2013';
                                var nameProduct= 'CNSF–S0048-0204-2015';
                                var CondiGral= 'Salud 15';
                                //console.log("nombre de producto: "+nameProduct,'\nCondicion Gral: '+CondiGral);
                            }
                            condiciones_grales(nameProduct,diagCobertura);
                        }//end if
                        else{
                            alert("sin Cobertura");
                        }
                    }//end for

                }//end if
                else{
                    alert("No se encontro el nodo ['metadata']['textfacets'] en el JSON");
                }


            },// end success function
            error: function (err, xhr, status) {
                $("#Searching_Modal").modal('hide');
                console.log(JSON.stringify(err));
                //alert('Ups, Algo Paso');

            }
        }); //end AJAX
    }//end for colecciones



}
