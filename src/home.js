document.getElementById("conf").addEventListener("click", showConf);
document.getElementById("conf-exit").addEventListener("click", hidConf);
document.getElementById("darkmode").addEventListener("click", darkMode);
document.getElementById("range-quantum").addEventListener("input",rangeValue);
document.getElementById("FIFO").addEventListener("click", showFifoMenu);
document.getElementById("return-home").addEventListener("click", showHome);
document.getElementById("add-process").addEventListener("click", addProcess);
document.getElementById("range-frames").addEventListener("input",rangeValueFrames);
document.getElementById("range-pages").addEventListener("input",rangeValuePages);
document.getElementById("range-value-quantum").innerHTML=""+1;
document.getElementById("range-value-frames").innerHTML=""+3;
document.getElementById("range-value-pages").innerHTML=""+3;

function showConf(){
  document.getElementById("home").classList.add("blur");
  document.getElementById("conf").classList.add("blur");
  document.getElementById("Fifo-menu").classList.add("blur");
  document.getElementById("conf-view").classList.add("conf-view-adjust");
}

function hidConf(){
  document.getElementById("home").classList.remove("blur");
  document.getElementById("conf").classList.remove("blur");
  document.getElementById("Fifo-menu").classList.remove("blur");
  document.getElementById("conf-view").classList.remove("conf-view-adjust");
}

function darkMode(){
  document.body.classList.toggle("darkmode");
}

function rangeValue(e){
  document.getElementById("range-value-quantum").innerHTML=""+e.target.value;
}

function showFifoMenu(){
  document.getElementById("home").classList.add("hid");
  document.getElementById("Fifo-menu").classList.remove("hid");
}

function showHome(){
  document.getElementById("home").classList.remove("hid");
  document.getElementById("Fifo-menu").classList.add("hid");
}

function rangeValueFrames(e){
  document.getElementById("range-value-frames").innerHTML=""+e.target.value;
}

function rangeValuePages(e){
  document.getElementById("range-value-pages").innerHTML=""+e.target.value;
}

function addProcess(){
  document.getElementById("home").classList.add("blur");
  document.getElementById("conf").classList.add("blur");
  document.getElementById("Fifo-menu").classList.add("blur");
  document.getElementById("add-process-menu").classList.add("add-process-menu-adjust");
}
