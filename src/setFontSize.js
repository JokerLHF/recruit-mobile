const oHtml = document.getElementsByTagName('html')[0],
  oBody = document.getElementsByTagName('body')[0];
const width = oHtml.clientWidth;
oHtml.style.fontSize = (width / 10) + "px";
oBody.style.fontSize = (width / 10) + "px";
