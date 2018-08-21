let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmlDom = document.getElementsByTagName("html")[0];
if(htmlwidth>750){
    htmlwidth = 750
}
htmlDom.style.fontSize = htmlwidth/20 + 'px'