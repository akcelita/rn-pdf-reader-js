
export const bundle = `(()=>{var e,t=document.getElementById("pdf-canvas"),n=t.getAttribute("data"),i=t.getAttribute("url");if(n)e=pdfjsLib.getDocument(i);else{var o=atob(n);e=pdfjsLib.getDocument({data:o})}pdfjsLib.GlobalWorkerOptions.workerSrc="//cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.worker.min.js",e.promise.then((function(e){e.getPage(1).then((function(e){var n=e.getViewport({scale:1});t.width=n.width,t.height=n.height;var i={canvasContext:t.getContext("2d"),viewport:n};e.render(i)})).then((function(){console.log("Rendering complete")}))}))})();`;
export const viewerHtmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=@{maximum_scale}.0, user-scalable=@{user_scalable}" />
    <script src="//cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/web/pdf_viewer.min.js"></script>
    <script type="application/javascript">
      try {
        window.CUSTOM_STYLE = JSON.parse('@{custom_style}');
      } catch (error) {
        window.CUSTOM_STYLE = {}
      }
      try {
        window.WITH_SCROLL = JSON.parse('@{with_scroll}');
      } catch (error) {
        window.WITH_SCROLL = {}
      }
    </script>
  </head>
  <body>
    <canvas id="pdf-canvas" data="@{base64}" url="https://pdfobject.com/pdf/sample.pdf"></canvas>
    <script src="bundle.js"></script>
  </body>
</html>
`;
export const viewerHtml = (base64, customStyle, withScroll = false, withPinchZoom = false, maximumPinchZoomScale = 5) => {
  return viewerHtmlTemplate
    .replace('@{maximum_scale}', String(maximumPinchZoomScale))
    .replace('@{user_scalable}', withPinchZoom ? 'yes' : 'no')
    .replace('@{custom_style}', JSON.stringify(
      customStyle ?? {},
    ))
    .replace('@{with_scroll}', JSON.stringify(withScroll))
    .replace('@{base64}', base64)
  ;
};
