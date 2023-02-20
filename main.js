const saturate = document.getElementById("saturate");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");

const upload = document.getElementById("upload");
const download = document.getElementById("download");
const img = document.getElementById("img");

const reset = document.querySelector('span');
const imgBox = document.querySelector('.img-box');

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

function resetValue() {
  img.style.filter = `none`;
  saturate.value = `100`;
  contrast.value = `100`;
  brightness.value = `100`;
  sepia.value = `0`;
  grayscale.value = `0`;
  blur.value = `0`;
  hueRotate.value = `0`;
}

window.onload = function() {
  download.style.display = `none`;
  reset.style.display = `none`;
  imgBox.style.display = `none`;
}

upload.onchange = function() {
  resetValue();
  download.style.display = `block`;
  reset.style.display = `block`;
  imgBox.style.display = `block`;
  const file = new FileReader();
  file.readAsDataURL(upload.files[0]);

  file.onload = function () {
    img.src = file.result;
  }

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img,0,0,canvas.width,canvas.height);
    img.style.display = 'none';
  }
}

const filters = document.querySelectorAll("ul li input");
filters.forEach(  filter=> {
  filter.addEventListener('input', function() {
    context.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayscale.value})
      blur(${blur.value}px)
      hue-rotate(${hueRotate.value}deg)
    `;
    context.drawImage(img,0,0,canvas.width,canvas.height);
  });
});

download.onclick = function() {
  download.href = canvas.toDataURL('image/jpeg'); // clear the src between the parentheses to download it as png (default)
}

// saturate.addEventListener("input", function () {
//   img.style.filter = `saturate(${saturate.value}%)`; //? wrong method because only one filter will work
// })

// contrast.addEventListener("input", function () {
//   img.style.filter = `saturate(${contrast.value}%)`; //? wrong method
// })

