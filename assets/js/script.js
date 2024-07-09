const html = document.querySelector("html");
const textArea = document.querySelector(".js-textarea");
const buttonToggle = document.querySelector(".js-btn-toggle");
const buttonEncrypt = document.querySelector(".js-encrypt");
const buttonDescrypt = document.querySelector(".js-descrypt");
const display = document.querySelector(".js-display-text");
const buttonCopy = document.querySelector(".js-btn-copy");
const image = document.querySelector(".aside__image").cloneNode(true);
const message = document.querySelector(".aside__message").cloneNode(true);
const checkbox = document.querySelector(".js-checkbox");
const buttonFullScreen = document.querySelector(".js-btn-fullscreen");

textArea.focus();
initTheme();

function toggleTheme() {
    html.classList.toggle("dark");

    if(checkbox.checked) {
        saveTheme("light");
        console.log("light")

    } else {
        saveTheme("dark");
        console.log("dark")

    }
}

function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function initTheme() {
    const theme = localStorage.getItem("theme");

    if(theme == "light") {
        checkbox.checked = false;
        html.classList.remove("dark");
        
    } else {
        checkbox.checked = true;
        html.classList.add("dark");
    }
}

function pasteElement() {
    display.textContent = "";
    display.classList.remove("is-show-text");
    display.appendChild(image);
    display.appendChild(message);

}

function displayText(text) {
    display.classList.add("is-show-text");
    display.textContent = text;
}

function checkLowerCase() {

    const regex = /^([a-z\s])+$/;
    const lowerCase = regex.test(textArea.value);

    if(lowerCase) {
        encryptText();
        
    } else {
        alert("Por favor, digite apenas letras minúsculas e sem acento.");
    }
}

function encrypt(match) {
    const keysOfEncrypt = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat",
    }

    return keysOfEncrypt[match];
}

function scrollPage(ycoord) {
    window.scroll({top: ycoord, behavior: "smooth"});
}

function encryptText() {
    const text = textArea.value;

    if(text != "") {

        const encrypted = text.replace(/[aeiou]/g, encrypt);
        displayText(encrypted);
        scrollPage(html.scrollHeight);

    }

}

function descrypt(match) {
    const keysOfDescrypt = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u",
    }
    
    return keysOfDescrypt[match];
}

function descryptText() {
    const text = textArea.value;

    if(text != "") {

        const descrypted = text.replace(/ai|enter|imes|ober|ufat/g, descrypt); 
        displayText(descrypted);
        scrollPage(html.scrollHeight);
    }
}

function copyText() {
    const image = document.querySelector(".aside__image");

    if(!display.contains(image)) {

        navigator.clipboard.writeText(display.textContent).then(() => {
            alert("Texto cópiado para a área de transferência");
            pasteElement();
            pasteText();
            scrollPage(html.scrollHeight - html.scrollHeight);

        })
    
    }

}

function pasteText() {
    
    try {
        textArea.focus();
        textArea.value = "";
        navigator.clipboard.readText().then((clipText) => {
            textArea.value = clipText;
        })

    } catch {
        
        alert("Erro: seu navegador não é compativel com a função de colar ou você não deu as permissões necessárias, use o atalho CRTL+V para colocar o texto cópiado");
    }    

}

let fullScreen = false;

function openAndCloseFullScreen(){
    const html = document.querySelector("html");
    const img = document.querySelector(".js-img-fullscreen");

    if(fullScreen) {
        document.exitFullscreen();
        img.src = "public/img's/icon-svg's/full-screen.svg"
        fullScreen = false;

    } else {
        html.requestFullscreen();
        img.src = "public/img's/icon-svg's/full-screen-exit.svg"
        fullScreen = true;
    }
}

buttonToggle.addEventListener("click", toggleTheme);
buttonEncrypt.addEventListener("click", checkLowerCase);
buttonDescrypt.addEventListener("click", descryptText);
buttonCopy.addEventListener("click", copyText);
buttonFullScreen.addEventListener("click", openAndCloseFullScreen);

function translatePage() {
  const select = document.getElementById('language-selector');
  const language = select.value;

  const elementsToTranslate = document.querySelectorAll('#main-content p, #main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5, #main-content h6');

  elementsToTranslate.forEach(element => {
      const text = element.innerText;
      translateText(text, language)
          .then(translatedText => {
              element.innerText = translatedText;
          })
          .catch(error => console.error('Erro ao traduzir elemento:', error));
  });
}

async function translateText(text, targetLanguage) {
  const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Obtenha sua chave de API do Google Translate
  const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const data = {
      q: text,
      target: targetLanguage
  };

  try {
      const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Erro ao traduzir texto');
      }

      const translatedData = await response.json();
      return translatedData.data.translations[0].translatedText;
  } catch (error) {
      console.error('Erro ao traduzir texto:', error);
      return text; // Retorna o texto original em caso de erro
  }
}
