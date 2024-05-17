// Get the canvas element.
const canvas = document.getElementById('pdf-canvas');

// Declare loading task
let loadingTask;

// See if there is base64 data
const pdfBase64 = canvas.getAttribute("data");
const pdfUrl = canvas.getAttribute("url");
if (!pdfBase64) {
	const pdfData = atob(pdfBase64);
	loadingTask = pdfjsLib.getDocument({data: pdfData});
}
else {
	// fallback url
	loadingTask = pdfjsLib.getDocument(pdfUrl);
}

// Set worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/build/pdf.worker.min.js'

// Load the PDF file using PDF.js.
loadingTask.promise.then(function (pdfDoc) {
	// Get the first page of the PDF file.
	pdfDoc.getPage(1)
		.then(function (page) {
			const viewport = page.getViewport({ scale: 1 });

			// Set the canvas dimensions to match the PDF page size.
			canvas.width = viewport.width;
			canvas.height = viewport.height;

			// Set the canvas rendering context.
			const ctx = canvas.getContext('2d');

			const renderContext = {
				canvasContext: ctx,
				viewport: viewport,
			};

			// Render the PDF page to the canvas.
			page.render(renderContext);
		})
		.then(function () {
			console.log('Rendering complete');
		});
});