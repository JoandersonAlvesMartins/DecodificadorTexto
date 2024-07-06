
function decodificarTexto() {
  let text = document.getElementById("texto").value;
  let titleMessage = document.getElementById("titulo-mensage");
  let paragraph = document.getElementById("paragrafo");
  let doll = document.getElementById("boneco");

  let decodificandoTexto = text
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");

  if (text.length !== 0) {
    document.getElementById("texto").value = decodificandoTexto;
    titleMessage.textContent = "Texto descriptografado com éxito";
    paragraph.textContent = "";
    doll.src = "../../public/img's/decodificada.jpg";
  } else {
    doll.src = "../../public/img's/fechadura.png";
    titleMessage.textContent = "No message found";
    paragraph.textContent = "Enter the text you want to encrypt or decrypt";
    swal("Ooops!", "You must enter some text", "warning");
  }
}