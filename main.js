import { Application } from "pixi.js";
import { Wheel } from "./wheel";

(async() =>
{
    const app = new Application();
    
    await app.init({
        resizeTo: window,
        backgroundColor: "#852928"
    });

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