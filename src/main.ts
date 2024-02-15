import "./styles/main.sass";
import config from "./core/config";
import { LoadAnimation } from "./core/animator";
/*!
 * -= hihacity website =-
 *
 * Damn I spent a lot of time to cook the effect
 *
 * @author stdpi
 */

// import "./styles/bg.sass"
// import "./styles/pages.sass"

window.addEventListener("load", async function OnClientLoaded() {
  this.setTimeout(() => {
    LoadAnimation(config.anim);
  }, 100);
  await import("./core/client.lazy");
});
