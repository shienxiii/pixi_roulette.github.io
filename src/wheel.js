import { Graphics, Text, Container } from "pixi.js"
import { FontStyle } from "./styles";

// Pocket: The part of the roulette wheel with the number and color
class Pocket
{
    constructor(number, color)
    {
        this.number = number;
        this.color = color;
    }
}

/**
 * NOTE: From Wikipedia
 * The pockets of the roulette wheel are numbered from 0 to 36.
 * 
 * In number ranges from 1 to 10 and 19 to 28, odd numbers are red and even are black.
 * In ranges from 11 to 18 and 29 to 36, odd numbers are black and even are red.
 * 
 * There is a green pocket numbered 0 (zero). In American roulette, there is a second green pocket marked 00.
 * Pocket number order on the roulette wheel adheres to the following clockwise sequence in most casinos:
 * 
 * Single-zero wheel
 *      0-32-15-19-4-21-2-25-17-34-6-27-13-36-11-30-8-23-10-5-24-16-33-1-20-14-31-9-22-18-29-7-28-12-35-3-26
 * Double-zero wheel
 *      0-28-9-26-30-11-7-20-32-17-5-22-34-15-3-24-36-13-1-00-27-10-25-29-12-8-19-31-18-6-21-33-16-4-23-35-14-2
 * Triple-zero wheel
 *      0-000-00-32-15-19-4-21-2-25-17-34-6-27-13-36-11-30-8-23-10-5-24-16-33-1-20-14-31-9-22-18-29-7-28-12-35-3-26
*/

export class Wheel
{
    /**
     * class variables
     * pockets: array of Pocket
     * wheelContainer: the entire drawn wheel
     * angleSpan: the angle between each pockets
     */


    constructor()
    {
        this.pockets = [];
        this.initializePockets();
        this.angleSpan = ((360 / this.pockets.length) / 360) * Math.PI * 2;
    }

    initializePockets()
    {
        // we're creating a single-zero wheel
        let wheelSequence = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
        
        for(let i = 0; i < wheelSequence.length; i++)
        {
            this.pockets[i] = new Pocket(wheelSequence[i], this.getPocketColor(wheelSequence[i]));
        }
    }

    getPocketColor(number)
    {
        if(number === 0)
        {
            return "#128a2cff";
        }
        else if((number >= 1 && number <= 10) ||
                (number >= 19 && number <= 28))
        {
            return number % 2 == 0 ? "#000000" : "#ff0000ff";
        }
        else
        {
            return number % 2 == 0 ? "#ff0000ff" : "#000000";
        }

        // In number ranges from 1 to 10 and 19 to 28, odd numbers are red and even are black.
        // In ranges from 11 to 18 and 29 to 36, odd numbers are black and even are red.
    }

    drawWheel()
    {
        this.wheelContainer = new Container();
        
        const wheelRadius = 360;

        const pocketWidth = 55;
        const pocketHeight = pocketWidth * 0.75;

        for(let i = 0; i < this.pockets.length; i++)
        {
            console.log(this.pockets[i].number);

            // Since a Graphics object cannot have a child, we're containing the
            // Graphics and Text in a container to make it easier to handle transform and placements.
            const pocketContainer = new Container();

            // draw the wheel pocket as a rectangle
            const pocketGraphic = new Graphics()
                .rect(-pocketWidth / 2, -wheelRadius, pocketWidth, pocketHeight)
                .fill({
                    color: this.pockets[i].color
                })
                .stroke({
                    width: 7,
                    color: "#e4e4e4ff"
            });

            pocketContainer.addChild(pocketGraphic);

            // draw the number
            const pocketNum = new Text({
                text: this.pockets[i].number,
                style: FontStyle.pocketFont()
            });
            
            pocketNum.anchor.set(0.5, 0);

            // shorten wheel radius for text placement to make the text alignment look nicer
            pocketNum.position.set(0, -(wheelRadius - 2));

            pocketContainer.addChild(pocketNum);

            this.wheelContainer.addChild(pocketContainer);
            pocketContainer._pivot.set(0, 0);
            pocketContainer.rotation = this.angleSpan * i;
        }

        const center = new Graphics()
            .circle(0, 0, wheelRadius * 0.8)
            .fill({
                    color: "#ffb326ff"
                });

        this.wheelContainer.addChild(center);
    }

    rotateWheel(time)
    {
        this.wheelContainer.rotation += 0.02 * time.deltaTime;
    }
}