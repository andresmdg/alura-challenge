var regexSpaces = /^[\s]+$/gm;
var regexLetters = /^[a-z0-9\s]+$/gm;
var area = document.getElementById('txt');
var encodeButton = document.getElementById('encode');
var decodeButton = document.getElementById('decode');

async function encode(msg) {
  let keywords = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  for (let key in keywords) {
    msg = await msg.replaceAll(key, keywords[key]);
  }

  return msg;

}

async function decode(msg) {

  let keywords = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };

  for (let key in keywords) {
    msg = await msg.replaceAll(keywords[key], key);
  }

  return msg;

}

function showContent() {

  let avatar = document.getElementById('avatar');
  let subtitle = document.getElementById('subtitle');
  let content = document.getElementById('output-txt')
  let noContent = document.getElementById('no-content');

  if (noContent.classList.contains('d-none') !== false) return;

  subtitle.classList.add('d-none');
  noContent.classList.add('d-none');

  if (screen.width >= 1024) {
    avatar.classList.add('d-none');
  }

  content.classList.remove('d-none');

}

function hiddenContent() {

  let avatar = document.getElementById('avatar');
  let subtitle = document.getElementById('subtitle');
  let content = document.getElementById('output-txt')
  let noContent = document.getElementById('no-content');

  if (noContent.classList.contains('d-none') == false) return;

  subtitle.classList.remove('d-none');
  noContent.classList.remove('d-none');

  if (screen.width >= 1024) {
    avatar.classList.remove('d-none');
  }

  content.classList.add('d-none');

}

area.addEventListener('input', (e) => {

  if (e.target.value !== '' && screen.width < 1024) {
    e.target.style.height = (e.target.scrollHeight) + 'px';
    e.target.style.textAlign = 'center';
  } else if (e.target.value == '' && screen.width < 1024) {
    e.target.style.height = null;
    e.target.style.textAlign = null;
  }

  if (e.target.value == '' || regexLetters.test(e.target.value) == false || regexSpaces.test(e.target.value) !== false) {
    let output = document.getElementById('output-txt');
    encodeButton.disabled = true;
    decodeButton.disabled = true;
    output.innerHTML = '';
    hiddenContent();
  } else if (e.target.value !== '' && regexLetters.test(e.target.value) == false && regexSpaces.test(e.target.value) == false ) {
    encodeButton.disabled = false;
    decodeButton.disabled = false;
    showContent();
  }
});

encodeButton.addEventListener('click', async () => {

  let input = document.getElementById('txt');
  let output = document.getElementById('output-txt');


  if (regexLetters.test(input.value) !== false) {

    let encoded = await encode(input.value);

    return output.innerHTML = encoded;

  } else {
    return showContent();
  }

});

decodeButton.addEventListener('click', async () => {

  let input = document.getElementById('txt');
  let output = document.getElementById('output-txt');

  if (regexLetters.test(input.value) !== false) {

    let decoded = await decode(input.value);

    return output.innerHTML = decoded;

  } else {
    return showContent();
  }

});