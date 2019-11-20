/*****************************************************************************************
DIAGNOSTICOS
*****************************************************************************************/



function cie10() {
    alert("alertCie10");
	//$("#Searching_Modal").modal('show');
    var text1=document.getElementById("datos").innerText;
    var text=(limpiarTexto(text1)).trim();
    /*
    if(text1.length == undefined || text1.trim().length===0){
 		window.alert("Proporcione Texto para Codificar, Intente nuevamente..!");
	    return (window.location.assign('inicio.html'));
	}//end del if text1
	*/
	//console.log(text);

	var tabla = "<table class='table-bordered table table-striped' style='width:60%; background-color: white; '>";
    	tabla +="<tr>";
    	tabla +="<th class='col-lg-2' style='background-color:#FF8000; text-align: center; color:white;'>Codigo</th>";
    	tabla +="<th class='col-lg-12' style='background-color:#FF8000; text-align: center; color:white;'>Diagnosticos</th>";
    	tabla +="</tr>";

	var colecciones = ["CIE10_A00_B99",
	    		   	   "CIE10_C00_D49",
		 			   "CIE10_D50_D89",
		 		   	   "CIE10_E00_E90",
		 		   	   "CIE10_F00_F99",
		               "CIE10_G00_G99",
		 		   	   "CIE10_H00_H59",
		  	   		   "CIE10_H60_H95",
		 		   	   "CIE10_I00_I99",
		 		   	   "CIE10_J00_J99",
		 		   	   "CIE10_K00_K93",
		 		   	   "CIE10_L00_L99",
		 		   	   "CIE10_M00_M99",
		 		   	   "CIE10_N00_N99",
		 		   	   "CIE10_O00_O99",
		 		   	   "CIE10_P00_P96",
		 		   	   "CIE10_Q00_Q99",
		 		   	   "CIE10_S00_S99",
		 		   	   "CIE10_T00_T88",
		 		   	   "CIE10_Z00_Z99"];


    for(var p=0; p<=colecciones.length-1; p++){
		$.ajax({
	  		url: 'http://proyectosoa.sytes.net:8393/api/v10/analysis/text?collection='+colecciones[p]+'&output=application/javascript',
	  		type:'POST',
	  		data:{"text":text},
	  		contenType:"application/javascript",
	  		dataType : "jsonp",


	  		success: function(response){
		     	var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
			 	var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
			 	var textfacets=jsonParse['metadata']['textfacets'];

			 	//console.log(textfacets.length);
			 	if(textfacets){
					var arrayResultados=[];
				 	var k=0;
				 	for(var i=0; i<=textfacets.length-1; i++){
				  		var path=textfacets[i]['path'][0];
				   		// var beginSinto=textfacets[i]["begin"];
				   		// console.log(beginSinto);
				   		var searchDiag=/cie10_codigo/.test(path);
				    	//console.log(searchCodeSinto);
				   		if(searchDiag===true){
				    		var diagnosticos=textfacets[i]['keyword'];
				    		arrayResultados.push(diagnosticos);
				    		k++;
				   		}//end if
                 	}//end for
			 	}//end if

			 	if(textfacets){
					var arrayResultados1=[];
				 	var k=0;
				 	for(var i=0; i<=textfacets.length-1; i++){
				  		var path=textfacets[i]['path'][0];
				  		var searchDiag1=/cie10_diagnostico/.test(path);
				    	//console.log(searchCodeSinto);
				   		if(searchDiag1===true){
				    		var diagnosticos=textfacets[i]['keyword'];
				    		arrayResultados1.push(diagnosticos);
				    		k++;
				   		}//end if
			     	}//end for
			   	}//end if
			 	var arrayMayor=[arrayResultados.length];
			 	function mayor(lista){
        	  		var mayor = lista[0];
               		for(i=1;i<lista.length;i++){
        	  			if(lista[i] > mayor)
              				mayor=lista[i];
        	 		}// END DEL FOR
        	  		return mayor;
    		 	}; //  function mayor(lista)

     			var mayor=mayor(arrayMayor)

     			for(var j = 0; j<mayor; j++){
        			tabla += "<tr>";
        				if(arrayResultados[0]){
            		 		tabla += "<td >" +arrayResultados[j]+"</td>";
		             		tabla += "<td >"+arrayResultados1[j]+"</td>";
                     		tabla += "</tr>";
        				}
        	 			tabla += "</tr>";
        		}// end del for

    			document.getElementById("resultadosTabla1").innerHTML=tabla;

    			$('table tr td').click( function() {
			  		var celda = $(this);
			  		$( this ).css( "color", '#FF8000' );
			  		hiliter((celda.html()), document.getElementById('datos'));
			  		window.scrollTo(0, 0);
			  		//$(datos).scrollTop(0,0);
            	});//$('table tr td').click( function()

				function hiliter(word, element) {
			    	var rgxp1 = new RegExp("\\b" + word + "\\b" , 'gi');
			    	$('#datos').find('span').each(function () {
			    		$(this).replaceWith(function () {
	                		return $(this).text();
	                	});//this
			   	 	});//
			    	var repl1 = '<span class="myClass1">' + word + '</span>';
                	console.log (repl1);
	            	element.innerHTML = element.innerHTML.replace(rgxp1, repl1);
		      	}//element

            }// end success function
		}); //end AJAX
      }//end for colecciones



/*****************************************************************************************
PROCEDIMIENTOS  "CIE10_PCS"
*****************************************************************************************/

    var text1=document.getElementById("datos").innerText;
    var text=(limpiarTexto(text1)).trim();

	var tabla2 = "<table class='table-bordered table table-striped' style='width:60%; background-color: white; '>";
    	tabla2 +="<tr>";
    	tabla2 +="<th class='col-lg-2' style='background-color:#5cb85c; text-align: center; color:white;'>Codigo</th>";
    	tabla2 +="<th class='col-lg-12' style='background-color:#5cb85c; text-align: center; color:white;'>Procedimientos</th>";
    	tabla2 +="</tr>";

     var colecciones = ["CIE10_PCS"];

	for(var p=0; p<=colecciones.length-1; p++){
		$.ajax({
	  		url: 'http://proyectosoa.sytes.net:8393/api/v10/analysis/text?collection='+colecciones[p]+'&output=application/javascript',
	  		type:'POST',
	  		data:{"text":text},
	  		contenType:"application/javascript",
	  		dataType : "jsonp",

	  		success: function(response){
				 //console.log("Recibes: ", response);
				 var json=JSON.stringify(response,null,2); // stringify convierte un valor dado en javascript a una cadena  JSON
				 var jsonParse =JSON.parse(json,null,4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
				 //console.log(json);
				 //console.log(jsonParse);
				 //$("<pre>").text(response).appendTo("body");
				 //$("<pre>#resultadosPre").text(json).appendTo("resultadosPre");
				 //$("<pre>").text(json).appendTo("div#resultados");
				 //console.log(jsonParse.metadata.textfacets[0].keyword);
				 //console.log(jsonParse['metadata']['textfacets']);
				 var textfacets=jsonParse['metadata']['textfacets'];
				 //console.log(textfacets.length);
				 if(textfacets){
					 var arrayResultados=[];
					 var k=0;
					 for(var i=0; i<=textfacets.length-1; i++){
					  var path=textfacets[i]['path'][0];
					   // var beginSinto=textfacets[i]["begin"];
					   // console.log(beginSinto);
					   var searchDiag=/cie10_codigo/.test(path);
						//console.log(searchCodeSinto);
					   if(searchDiag===true){
						var diagnosticos=textfacets[i]['keyword'];
						arrayResultados.push(diagnosticos);
						k++;
					   }//end if
					 }//end for
				 }//end if

				 if(textfacets){
					 var arrayResultados2=[];
					 var k=0;
					 for(var i=0; i<=textfacets.length-1; i++){
					  var path=textfacets[i]['path'][0];
					  var searchDiag2=/cie10_procedimiento/.test(path);
						//console.log(searchCodeSinto);
					   if(searchDiag2===true){
						var diagnosticos=textfacets[i]['keyword'];
						arrayResultados2.push(diagnosticos);
						k++;
					   }//end if
					 }//end for
				   }//end if


				 var arrayMayor=[arrayResultados.length];
				 //console.log(arrayResultados);
				 function mayor(lista){
				  var mayor = lista[0];
					for(i=1;i<lista.length;i++){
						if(lista[i] > mayor)
						mayor=lista[i];
					}
				  return mayor;
				 };

				var mayor=mayor(arrayMayor)
				//console.log(mayor);

				// var tabla = "<table class='table table-bordered table table-striped' style='background-color: white; table-layout:fixed;'>";
				for(var j = 0; j<mayor; j++){
					tabla2 += "<tr>";
					if(arrayResultados[j]){
						 tabla2 += "<td >" +arrayResultados[j]+"</td>";
						 tabla2 += "<td >"+arrayResultados2[j]+"</td>";
					}
					tabla2 += "</tr>";
				}
				document.getElementById("resultadosTabla2").innerHTML=tabla2;
				$('table tr td').click( function() {
				  var celda2 = $(this);
				$( this ).css( "color", "#5cb85c" );
				  hiliter((celda2.html()), document.getElementById('datos'));
				 window.scrollTo(0, 0);
				//$(datos).scrollTop(0,0);
				});

				function hiliter(word, element) {
					var rgxp2 = new RegExp("\\b" + word + "\\b" , 'gi');
					$('#datos').find('span').each(function () {
						$(this).replaceWith(function () {
						 return $(this).text();
						});//this
					});// txtarea

					var repl2 = '<span class="myClass2">' + word + '</span>';
					console.log (repl2);
					element.innerHTML = element.innerHTML.replace(rgxp2, repl2);
					}//element

            }// end del function
	  }); //end AJAX
    }//end for colecciones





/***********************************************************************************************************
SINTOMAS "CIE10_R00_R99"
************************************************************************************************************/

//$("#Searching_Modal").modal('show');

    var text1=document.getElementById("datos").innerText;
    var text=(limpiarTexto(text1)).trim();

	var tabla3 = "<table class='table-bordered table table-striped' style='width:60%; background-color: white; '>";
    	tabla3 +="<tr>";
    	tabla3 +="<th class='col-lg-2' style='background-color:#5bc0de; text-align: center; color:white;'>Codigo</th>";
    	tabla3 +="<th class='col-lg-12' style='background-color:#5bc0de; text-align: center; color:white;'>Sintomas</th>";
    	tabla3 +="</tr>";

	 var colecciones = ["CIE10_R00_R99"];

	for(var p=0; p<=colecciones.length-1; p++) {
		$.ajax({
			url: 'http://proyectosoa.sytes.net:8393/api/v10/analysis/text?collection=' + colecciones[p] + '&output=application/javascript',
			type: 'POST',
			data: {"text": text},
			contenType: "application/javascript",
			dataType: "jsonp",

			success: function (response) {
				//console.log("Recibes: ", response);
				var json = JSON.stringify(response, null, 2); // stringify convierte un valor dado en javascript a una cadena  JSON
				var jsonParse = JSON.parse(json, null, 4); //JSONParse analiza una cadena de texto para convertirla a JSON (un objeto JavaScript)
				//console.log(json);
				//console.log(jsonParse);
				//$("<pre>").text(response).appendTo("body");
				//$("<pre>#resultadosPre").text(json).appendTo("resultadosPre");
				//$("<pre>").text(json).appendTo("div#resultados");
				//console.log(jsonParse.metadata.textfacets[0].keyword);
				//console.log(jsonParse['metadata']['textfacets']);
				var textfacets = jsonParse['metadata']['textfacets'];
				//console.log(textfacets.length);
				if (textfacets) {
					var arrayResultados = [];
					var k = 0;
					for (var i = 0; i <= textfacets.length - 1; i++) {
						var path = textfacets[i]['path'][0];
						// var beginSinto=textfacets[i]["begin"];
						// console.log(beginSinto);
						var searchDiag = /cie10_codigo/.test(path);
						//console.log(searchCodeSinto);
						if (searchDiag === true) {
							var diagnosticos = textfacets[i]['keyword'];
							arrayResultados.push(diagnosticos);
							k++;
						}//end if
					}//end for
				}//end if

				if (textfacets) {
					var arrayResultados3 = [];
					var k = 0;
					for (var i = 0; i <= textfacets.length - 1; i++) {
						var path = textfacets[i]['path'][0];
						var searchDiag3 = /cie10_diagnostico/.test(path);
						//console.log(searchCodeSinto);
						if (searchDiag3 === true) {
							var diagnosticos = textfacets[i]['keyword'];
							arrayResultados3.push(diagnosticos);
							k++;
						}//end if
					}//end for
				}//end if


				var arrayMayor = [arrayResultados.length];
				//console.log(arrayResultados);
				function mayor(lista) {
					var mayor = lista[0];
					for (i = 1; i < lista.length; i++) {
						if (lista[i] > mayor)
							mayor = lista[i];
					}
					return mayor;
				}; // function mayor
				var mayor = mayor(arrayMayor)

				for (var j = 0; j < mayor; j++) {
					tabla3 += "<tr>";
					if (arrayResultados[j]) {
						tabla3 += "<td>" + arrayResultados[j] + "</td>";
						tabla3 += "<td>" + arrayResultados3[j] + "</td>";
					}
					tabla3 += "</tr>";
				}
				document.getElementById("resultadosTabla3").innerHTML = tabla3;
				$("#Searching_Modal").modal('hide');


				$('table tr td').click(function () {
					var celda3 = $(this);
					$(this).css("color", "#5bc0de");
					hiliter((celda3.html()), document.getElementById('datos'));
					window.scrollTo(0, 0);
					//$(datos).scrollTop(0, 0);
				});

				function hiliter(word, element) {
					var rgxp3 = new RegExp("\\b" + word + "\\b", 'gi');
					$('#datos').find('span').each(function () {
						$(this).replaceWith(function () {
							return $(this).text();
						});//this
					});// txtarea

					var repl3 = '<span class="myClass3">' + word + '</span>';
					console.log(repl3);
					element.innerHTML = element.innerHTML.replace(rgxp3, repl3);
				}//element
			}// end del function
		}); //end AJAX
	}
};//end function