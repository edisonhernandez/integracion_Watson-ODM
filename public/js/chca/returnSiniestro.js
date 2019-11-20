/**
 * Created by SOA on 03/10/2017.
 */


function siniestro(urlIM,urlCG,urlCM) {
        //console.log(urlIM);
    return  '<div id="empresa1">'+
            ' <div class="row2">' +
            '  <div class="container" class="clear">' +
            '   <!-- content body -->' +
            '   <h1 align="center" id="hotelMixhu">Siniestro # </h1>' +
            '   <section>' +
            '    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">' +
            '     <!-- article 1 -->' +
            '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article1">' +
            '      <article>' +
            '        <div class="" >' +
            '          <h2 id="actaConst">Informe Médico</h2>' +
            '         <div id="portapdf" >' +
            '                <object data="'+ urlIM +'" height="100%" width="100%" type="application/pdf"></object>' +
            '          </div>' +
            '          <footer>' +
            '               <a onclick="returnPDFIM();" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
            '          </footer>' +
            '          <h2 id="actaConst">Comanda Médica</h2>' +
            '          <div id="portapdf">' +
            '               <object data="'+ urlCM +'" height="100%" width="100%" type="application/pdf" ></object>' +
            '          </div>' +
            '          <footer>' +
            '               <a onclick="returnPDFCM()" id="descripcion" class="descripActaHotel"><h5>Descripción  &raquo; </h5></a>' +
            '          </footer>' +
            '        </div>' +
            '      </article>' +
            '     </div>' +
            '     <!-- article 2 -->' +
            '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article2">'+
            '      <article>' +
            '       <div class="" >' +
            '        <h2 id="poder">Condiciones Generales</h2>' +
            '        <div id="portapdf" >' +
            '           <object data="'+ urlCG +'" type="application/pdf" height="100%" width="100%"></object>' +
            '        </div>' +
            '        <footer>' +
            '           <a onclick="returnPDFCG()" class="descripPoderHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
            '        </footer>' +
            /*'        <h2 id="identificaciones">Endosos</h2>'+
            '        <div id="portapdf">' +
            '           <object data="'+ urlE+'" type="application/pdf" height="100%" width="100%"></object>'+
            '        </div>'+
            '        <footer>' +
            '           <a href="/analizaIneHotel" class="descripIneHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
            '        </footer>' +*/
            '       </div>'+
            '      </article>'+
            '     </div>'+
        /*'     <!-- article 3 -->' +
            '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article2">'+
            '      <article>' +
            '       <div class="" >' +
            '        <h2 id="poder">Comanda Médica</h2>' +
            '        <div id="portapdf" >' +
            '           <object data="'+ urlCM +'" type="application/pdf" height="100%" width="100%"></object>' +
            '        </div>' +
            '        <footer>' +
            '           <a onclick="returnPDFCM()" class="descripPoderHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
            '        </footer>' +
            /!*'        <h2 id="identificaciones">Endosos</h2>'+
            '        <div id="portapdf">' +
            '           <object data="'+ urlE+'" type="application/pdf" height="100%" width="100%"></object>'+
            '        </div>'+
            '        <footer>' +
            '           <a href="/analizaIneHotel" class="descripIneHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
            '        </footer>' +*!/
            '       </div>'+
            '      </article>'+
            '     </div>'+*/
            '    </div>' +
            '   </section>' +
            '  </div>' +
            ' </div>' +
            '</div>';

};








function siniestro2(urlIM,urlCG) {
    //console.log(urlIM);
    return  '<div id="empresa1">'+
        ' <div class="row2">' +
        '  <div class="container" class="clear">' +
        '   <!-- content body -->' +
        '   <h1 align="center" id="hotelMixhu">Siniestro # </h1>' +
        '   <section>' +
        '    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">' +
        '     <!-- article 1 -->' +
        '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article1">' +
        '      <article>' +
        '        <div class="" >' +
        '          <h2 id="actaConst">Informe Médico</h2>' +
        '         <div id="portapdf" >' +
        '                <object data="'+ urlIM +'" height="100%" width="100%" type="application/pdf"></object>' +
        '          </div>' +
        '          <footer>' +
        '               <a onclick="returnPDFIM2();" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
        '          </footer>' +
        /*'          <h2 id="actaConst">Comanda Médica</h2>' +
        '          <div id="portapdf">' +
        '               <object data="'+ urlCM +'" height="100%" width="100%" type="application/pdf" ></object>' +
        '          </div>' +
        '          <footer>' +
        '               <a onclick="returnPDFCM()" id="descripcion" class="descripActaHotel"><h5>Descripción  &raquo; </h5></a>' +
        '          </footer>' +*/
        '        </div>' +
        '      </article>' +
        '     </div>' +
        '     <!-- article 2 -->' +
        '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article2">'+
        '      <article>' +
        '       <div class="" >' +
        '        <h2 id="poder">Condiciones Generales</h2>' +
        '        <div id="portapdf" >' +
        '           <object data="'+ urlCG +'" type="application/pdf" height="100%" width="100%"></object>' +
        '        </div>' +
        '        <footer>' +
        '           <a onclick="returnPDFCG()" class="descripPoderHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
        '        </footer>' +
        /*'        <h2 id="identificaciones">Endosos</h2>'+
         '        <div id="portapdf">' +
         '           <object data="'+ urlE+'" type="application/pdf" height="100%" width="100%"></object>'+
         '        </div>'+
         '        <footer>' +
         '           <a href="/analizaIneHotel" class="descripIneHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
         '        </footer>' +*/
        '       </div>'+
        '      </article>'+
        '     </div>'+
        /*'     <!-- article 3 -->' +
         '     <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 " id="article2">'+
         '      <article>' +
         '       <div class="" >' +
         '        <h2 id="poder">Comanda Médica</h2>' +
         '        <div id="portapdf" >' +
         '           <object data="'+ urlCM +'" type="application/pdf" height="100%" width="100%"></object>' +
         '        </div>' +
         '        <footer>' +
         '           <a onclick="returnPDFCM()" class="descripPoderHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
         '        </footer>' +
         /!*'        <h2 id="identificaciones">Endosos</h2>'+
         '        <div id="portapdf">' +
         '           <object data="'+ urlE+'" type="application/pdf" height="100%" width="100%"></object>'+
         '        </div>'+
         '        <footer>' +
         '           <a href="/analizaIneHotel" class="descripIneHotel" id="descripcion"><h5>Descripción &raquo;</h5></a>' +
         '        </footer>' +*!/
         '       </div>'+
         '      </article>'+
         '     </div>'+*/
        '    </div>' +
        '   </section>' +
        '  </div>' +
        ' </div>' +
        '</div>';

};