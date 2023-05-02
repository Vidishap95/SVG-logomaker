const inquirer = require("inquirer");
const fs = require('fs');
//const path = require('path');
const {Circle, Square, Triangle} = require("./lib/shape");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

// Question array 
const questions =[
    {
        type:"input",
        name:'text',
        message: "Enter character upto 3 element:",
    },
    {
        type:"input",
        name:"text-color",
        message:"Enter text-color of your choice:",
    },
    {
        type:"list",
        name:"shape-type",
        message:"Select a shape of your choice:",
        choices:['Square','Circle','Triangle'],
    },
    {
        type:"input",
        name:"shape-color",
        message:"Select shape-color of your choice:",
    },
];

// function to write data into the file
function writeToFile(fileName, data) {
    console.log("Write["+data + "] to file["+ fileName + "]")
    fs.writeFileSync(fileName, data);
        console.log(" SVG logo generated");
}

async function init() {
    console.log("Startign init");
    var svgString = "";
    var svg_file= "logo.svg";

    const answers = await inquirer.prompt(questions);

    //user input text
    var user_text = "";
    if (answers.text.length > 0 && answers.text.length < 4) {
        user_text = answers.text;
    }else {
        console.log("Invalid user iput text");
    return;
    }

    user_text = answers["text"];
    console.log ("User text:[" + user_text + "]");

    // for font color
    user_font_color = answers["text-color"];
    console.log("User font color: [" + user_font_color + "]");

    //for shape color
    user_shape_color = answers["shape-color"]
    console.log("User shape color: [" + user_shape_color + "]");

    //for shape type
    user_shape_type = answers["shape-type"];
    console.log("User shape type: [" + user_shape_type + "]");

    //usershape
    let user_shape;
    if(user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
        console.log("Selected shape is square");
    } else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
        console.log("Selected shape is circle"); 
    } else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Square();
        console.log("Selected shape is triangle"); 
    } else {
        console.log("Invalid shape");
    }
    user_shape.setColor(user_shape_color);

    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    //print log
    console.log("Dispaly shape:\n\n" + svgString);

    console.log("SVG logo generated");
    console.log("writing shape to file");
    writeToFile(svg_file, svgString);
}

init()