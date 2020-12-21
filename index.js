let runningTotal = 0 // 
let buffer = "0" //
let previosOperater = null; //nothing has previously been assigned here
const screen = document.querySelector('.screen');// grabs the cal screen from the DOM

document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText); // gives back what button was clicked 
})

const buttonClick = (value) => {
    //if the value is a number i want to go down a different code path
    if (isNaN(parseInt(value))) {    
        handleSymbol(value); //calls the 'handleSymbol function
    } else {
        handleNumber(value); //calls the 'handleNumber function
    }
    reRender(); // calls the 'reRender' function
}

const handleNumber = (value) => {
    if (buffer === '0'){
        buffer = value  // makes buffer equal to 'value'
    } else {
        buffer += value //appends value to buffer 
    }
}

const handleSymbol = (value) => {
    switch(value){ //im going to switch different code blocks based on value 
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperater = null;
            break;
        case '=':
            //if theres no previous 'operator' then dont do anything
            if(previousOperater === null){
                return;
            }
            flushOperation(parseInt(buffer));//i have a previous operator that i want you to hold on to 
            previousOperater = null;
            buffer = "" + runningTotal;// keeps buffer a string because of the string concatination
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1){
                buffer = 0;
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
        

    }
}

const handleMath = (value) =>{
    const intBuffer = parseInt(buffer); // turns 'buffer' into an integer
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);//
    }
    previousOperater = value;
    buffer = "0"
}


const flushOperation = (intBuffer) =>{
    if (previousOperater === "+"){
        runningTotal += intBuffer;
    } else if (previousOperater === "-"){
        runningTotal -= intBuffer;
    } else if ( previousOperater === "÷"){
        runningTotal /= intBuffer;
    } else {
        runningTotal *= intBuffer;
    }
}

//when called the calc 'screen' is rerendered 
const reRender = () =>{
    screen.innerText = buffer;
}

// key variables
//     -buffer = what is currently being rendered on the calculaters screen in string form
//     -intBuffer = takes whatever is on the screen and turns it from a string to a number 
//     -screen = is the actual black calculater screen that displays the numbers you type in 
//     -previousOperater = the previouse sign that the user is using to do the math so +, -, ×, ÷
//     -runningTotal =