const inquirer = require("inquirer");
const fs = require('fs');
//const path = require('path');
const { Circle, Square, Triangle } = require("./lib/shape");

class Svg {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
}

// Question array 
const questions = [
    {
        type: "input",
        name: 'text',
        message: "Enter character upto 3 element:",
    },
    {
        type: "input",
        name: "textColor",
        message: "Enter text-color of your choice:",
    },
    {
        type: "list",
        name: "shapeType",
        message: "Select a shape of your choice:",
        choices: ['Square', 'Circle', 'Triangle'],
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Select shape-color of your choice:",
    },
];

// function to write data into the file
function writeToFile(fileName, data) {
    console.log("Write[" + data + "] to file[" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
        }
        console.log(" SVG logo generated");
    });
}

async function init() {
    console.log("Startign init");
    var svgString = "";
    var svg_file = "logo.svg";

    const answers = await inquirer.prompt(questions);
    //user input text
    //var user_text = "";
    if (answers.text.length >= 4) {
        console.log("Invalid text length provided.");
        return null; // or you could also return init();
    } else {
        let user_shape;
        switch (answers.shapeType) {
            case "Square":
                user_shape = new Square(answers.shapeColor);
                // console.log('square user_shape is', user_shape);
                break;
            case "Circle":
                user_shape = new Circle(answers.shapeColor);
                break;
            case "Triangle":
                user_shape = new Triangle(answers.shapeColor);
                break;
            default:
                console.log("Improper shape returned. Returning out of function.")
                return null;
        }

        // create a new SVG instance, and call its setTextElement and setShapeElement methods
        var svg = new Svg();
        svg.setTextElement(answers.text, answers.textColor);
        svg.setShapeElement(user_shape);
        svgString = svg.render();
        //print log
    
        console.log("SVG logo generated");
        console.log("writing shape to file");
        writeToFile(svg_file, svgString);
    }
    
   
}

init()