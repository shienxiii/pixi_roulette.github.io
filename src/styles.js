import { TextStyle } from "pixi.js";

export class FontStyle
{
    static pocketFont()
    {
        return new TextStyle({
            fill: '#ffffff',
            fontFamily: 'DM Serif Text',
            fontSize: 27,
            fontStyle: 'normal',
            fontWeight: 'bold',
            stroke: { color: '#fcb722ff', width: 5 },
            
            wordWrap: true,
            wordWrapWidth: 1000
        });
    }
}