/**
 * Created by SOA on 02/10/2017.
 */

var app = angular.module('myApp', []);

app.directive('datanType', function ($compile) {

    var testTemplate1 = '<h1>Test1</h1>';
    var testTemplate2 = '<h1>Test2</h1>';
    var testTemplate3 = '<h1>Test3</h1>';

    var getTemplate = function(contentType){
        var template = '';

        switch(contentType){
            case 'test1':
                template = testTemplate1;
                break;
            case 'test2':
                template = testTemplate2;
                break;
            case 'test3':
                template = testTemplate3;
                break;
        }

        return template;
    };

    var linker = function(scope, element, attrs){
        element.html(getTemplate(attrs.content));
        $compile(element.contents())(scope);

    };

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content:'='
        }
    };
});