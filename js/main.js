var currentSelection = {
    "white":1,
    "blue":0,
    "black":0,
    "red":0,
    "green":0
};

var comboNames = {
    '00000':"Colorless",
    '10000':"White",
    '01000':"Blue",
    '00100':"Black",
    '00010':"Red",
    '00001':"Green",
    '11000':"Azorius",
    '10100':"Orzhov",//Silverquill
    '10010':"Boros", //Lorehold
    '10001':"Selesnya",
    '01100':"Dimir",
    '01010':"Izzet", //Prismari
    '01001':"Simic", //Quandrix
    '00110':"Rakdos",
    '00101':"Golgari", //Witherbloom
    '00011':"Gruul",
    '11100':"Esper",
    '11010':"Jeskai",
    '11001':"Bant",
    '10110':"Mardu",
    '10101':"Abzan",
    '10011':"Naya",
    '01110':"Grixis",
    '01101':"Sultai",
    '01011':"Temur",
    '00111':"Jund",
    '11110':"Yore",
    '11101':"Witch",
    '11011':"Ink",
    '10111':"Dune",
    '01111':"Glint",
    '11111':"5-Color" 
}

 window.addEventListener("load", radialOffet());
 window.addEventListener("load", backgroundOffset());
 window.addEventListener("load", updateDisplay())


//Get each manaSymbol && and an eventListener to pass the id into selectColor()
var manaSymbols = document.getElementsByClassName("manaSymbol");
for(var i=0; i<manaSymbols.length; i++){
    manaSymbols[i].addEventListener("click", function() {
        selectColor(this.id);
    })
}


//create the collapsible menu listeners
var coll = document.getElementsByClassName("collapsible");

for(var i = 0; i < coll.length; i++){
    coll[i].addEventListener("click", function() {
        var content = this.nextElementSibling;
        console.log(content);
        if(content.style.display === "block"){
            content.style.display = "none";
        }else{
            content.style.display = "block";
        }
    });
}

//create the color menu event listeners
let liCollection = document.getElementsByTagName("li")
let colorLiArray = []

for(let i = 0; i < liCollection.length; i++){
    if(liCollection[i].id.includes("List")){
        colorLiArray.push(liCollection[i])
    }
}

console.log(colorLiArray)
for(let i = 0; i < colorLiArray.length; i++){
    colorLiArray[i].addEventListener("click", function(){
        updateCurrentSelection(getKeyByValue(comboNames, this.innerText))
    });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

//updates the current selection based on the comboID and updates the display
function updateCurrentSelection(value){
    currentSelection.white = +value.split('')[0]
    currentSelection.blue = +value.split('')[1]
    currentSelection.black = +value.split('')[2]
    currentSelection.red = +value.split('')[3]
    currentSelection.green = +value.split('')[4]
    updateDisplay()
}



 function radialOffet() {
     let listItems = document.querySelectorAll(".manaSymbolPosition");
     let listContent = document.querySelectorAll(".manaSymbol");

     const initalAngle = -90;
     const deg = 360 / listItems.length;

     for(var i = 0; i < listItems.length; i++){
        let thisRotation = (initalAngle + (deg * i));
        listItems[i].style.cssText = "transform: rotate(" + thisRotation + "deg) translateX(150px);";
        listContent[i].style.cssText = "transform: rotate(" +(360 - thisRotation) +"deg);"
     }
 }

 function backgroundOffset() {
    let listContent = document.querySelectorAll(".manaSymbol");
    const backgroundSize = 110;
    
    for(var i = 0; i < listContent.length; i++){
        listContent[i].style.cssText += "background-position: -" + (backgroundSize * i) + "px 0px;";
    }
 }

 function selectColor(colorName) {
     if(currentSelection[colorName] === 1){
        currentSelection[colorName] = 0;
     }
     else{
        currentSelection[colorName] = 1;
     }
     updateDisplay();
 }


 //Update Display should add a class to the manaSymbols rather than change the style
 function updateDisplay() {
    var comboID = "";
     for(const [key, value] of Object.entries(currentSelection)){
         let element = document.querySelector('#'+key);
         if(value > 0){
            element.style.border = "3px solid black"
            element.style.opacity = "100%"
            comboID += "1"
         }
         else{
            element.style.border = "3px solid white"
            element.style.opacity = "70%"
            comboID += "0"
         }
     }
     document.querySelector("#comboName").innerText = getComboName(comboID)
 }

 function getComboName(comboID) {
     return comboNames[comboID]
 }


