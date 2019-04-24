document.addEventListener('keypress', function(evt) {
  if (evt.key !== 'Enter') {
    return;
  }

  let element = evt.target;
  if (!element.classList.contains('focusNext')) {
    return;
  }
  let tabIndex = element.tabIndex + 1;
  var next = document.querySelector('[tabindex="'+tabIndex+'"]');
  if (next) {
    next.focus();
    event.preventDefault();
  }
});

function showMyImage(fileInput) {
var files = fileInput.files;
for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
        continue;
    }
    var container = fileInput.parentNode;
    container.file = file;
    var reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
            container.style.backgroundImage = `url(${e.target.result})`;
        };
    })(container);
    reader.readAsDataURL(file);
}
}

var modal = document.getElementById('myModal');
var btn = document.getElementById("contSign");
var span = document.getElementsByClassName("close")[0];
var canvas = document.getElementById('canvas');

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    minWidth: 3,
    maxWidth: 4,
    penColor: "rgb(33, 33, 33)"
});

/* btn.onclick =  */
function btn_click() {
     modal.style.display = "block";
    resizeCanvas();
}
 span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('imgSign').src = signaturePad.toDataURL();
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('imgSign').src = signaturePad.toDataURL();
    }
}

function resizeCanvas() {
    var w = modal.clientWidth;
    var h = modal.clientHeight;
    canvas.width = Math.ceil(w * 0.75);
    canvas.height = Math.ceil(h * 0.7);
    signaturePad.clear();
}

window.addEventListener("resize", resizeCanvas);

