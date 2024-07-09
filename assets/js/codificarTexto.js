function codificarTexto() {
  let text = document.getElementById("texto").value;

  let messageTitle = document.getElementById("titulo-mensage");
  let messageParagraph = document.getElementById("paragrafo");
  let dollImage = document.getElementById("boneco");

  let codificandoTexto = text
    .replace(/e/gi, "enter")
    .replace(/i/gi, "imes")
    .replace(/a/gi, "ai")
    .replace(/o/gi, "ober")
    .replace(/u/gi, "ufat");

  if (text.length !== 0) {
    document.getElementById("texto").value = codificandoTexto;

    messageTitle.textContent = "Texto criptografado com éxito";
    messageParagraph.textContent = "";
    dollImage.src = "../../public/img's/codificada.jpg";
  } else {
    dollImage.src = "../../public/img's/boneco.png";
    messageTitle.textContent = "Nenhuma mensagem encontrada";
    messageParagraph.textContent = "Inserir um texto para codificar ou decodificar";

    swal("Ooops!", "Deves inserir um texto", "warning");
  }
}

