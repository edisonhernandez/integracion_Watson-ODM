$(document).ready(function () {
            $("#pdfInp").change(function () {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        showInCanvas(e.target.result);
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });

            function convertDataURIToBinary(dataURI) {
                var BASE64_MARKER = ';base64,';
                var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                var base64 = dataURI.substring(base64Index);
                var raw = window.atob(base64);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));

                for (i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                }
                return array;
            }

            function showInCanvas(url) {
                // See README for overview 
                'use strict';
                // Fetch the PDF document from the URL using promises 
                var pdfAsArray = convertDataURIToBinary(url);
                PDFJS.getDocument(pdfAsArray).then(function (pdf) {
                    // Using promise to fetch the page 
                    pdf.getPage(1).then(function (page) {
                        var scale = 1.5;
                        var viewport = page.getViewport(scale);
                        // Prepare canvas using PDF page dimensions 
                        var canvas = document.getElementById('the-canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        // Render PDF page into canvas context 
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                    });
                });
            }
        });

