/**
 * Created by SOA on 06/10/2017.
 */

$(document).ready(function() {
    jQuery.fn.extend({
        resaltar: function(busqueda, claseCSSbusqueda){
            var regex = new RegExp("(<[^>]*>)|("+ busqueda.replace(/([ -.*+?^${}()|[\]\/\\])/g,"\\$1") +')', 'ig');
            var nuevoHtml=this.html(this.html().replace(regex, function(a, b, c){
                return (a.charAt(0) == "<") ? a : "<span class=\""+ claseCSSbusqueda +"\">" + c + "</span>";
            }));
            return nuevoHtml;}
    }); // end del jquery
});//end del document

function hiliter(word, element) {
    var rgxp = new RegExp("\\b" + word + "\\b" , 'gi');
    $('#datos').find('span').each(function () {
        $(this).replaceWith(function () {
            return $(this).text();
        });//this
    });// txtarea

    var repl = '<span class="myClass1">' + word + '</span>';
    element.innerHTML = element.innerHTML.replace(rgxp, repl);

    var repl = '<span class="myClass2">' + word + '</span>';
    element.innerHTML = element.innerHTML.replace(rgxp, repl2);

    var repl = '<span class="myClass3">' + word + '</span>';
    element.innerHTML = element.innerHTML.replace(rgxp, repl);
}// end del function hiliter