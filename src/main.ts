import "./styles/main.sass";
// import "./styles/bg.sass"
// import "./styles/pages.sass"

window.addEventListener("load", function () {
  this.setTimeout(() => {
    document.body.className += "loaded";
    let state = false;
    this.setInterval(() => {
      state
        ? this.document.body.style.setProperty("--e", "0")
        : this.document.body.style.setProperty("--e", "0.0004");
      state = !state;
    }, 1500);
  }, 100);
});
