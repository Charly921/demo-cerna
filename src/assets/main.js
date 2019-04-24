document.addEventListener('keypress', function(evt) {

  // Si el evento NO es una tecla Enter
  if (evt.key !== 'Enter') {
    return;
  }

  let element = evt.target;

  // Si el evento NO fue lanzado por un elemento con class "focusNext"
  if (!element.classList.contains('focusNext')) {
    return;
  }

  // AQUI logica para encontrar el siguiente
  let tabIndex = element.tabIndex + 1;
  var next = document.querySelector('[tabindex="'+tabIndex+'"]');

  // Si encontramos un elemento
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
