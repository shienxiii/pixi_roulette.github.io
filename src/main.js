/*import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
*/

/*import * as PIXI from 'pixi.js';

(async () => {
    const app = new PIXI.Application();
    await app.init({
        width: 640,
        height: 360
    });

    document.body.appendChild(app.canvas);
})();*/

import { Application } from "pixi.js";
import { Wheel } from "./wheel";

(async() =>
{
    const app = new Application();
    
    await app.init({
        resizeTo: window,
        backgroundColor: "#852928"
    });

    app.canvas.style.position = 'absolute';
    
    document.body.appendChild(app.canvas);

    const wheel = new Wheel([]);
    wheel.drawWheel();

    
    
    app.stage.addChild(wheel.wheelContainer);

    wheel.wheelContainer.position.set(app.canvas.width * 0.5, app.canvas.height * 0.5)

    // create a pointer to function
    let rot = (time) => {
        wheel.rotateWheel(time);
    };

    /*app.ticker.add((time) => {
        //wheel.wheelContainer.rotation += 0.03 * time.deltaTime;
        wheel.rotateWheel(time);
    })*/

    // use basic javascript to create keyboard event
    document.addEventListener('keydown', function(event) {
        if (event.key === 's')
        {
            // add a simple tick event
            app.ticker.add(rot);
        }
        else if (event.key === 'd')
        {
            // remove tick event
            app.ticker.remove(rot);
        }
    });

}) ();