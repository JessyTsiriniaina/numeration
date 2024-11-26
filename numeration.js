var output = document.getElementById('output');


function base_is_ok(base) {
    if(document.getElementById('base').value < 2) {
        output.innerHTML = '<span class="error">Base must be greater than 1</span>';
        return false;
    }
    return true;
}

function empty_input() {

    var allFilled = document.getElementById('input').value.length < 1 
                    || document.getElementById('base').value.length < 1;

    if(allFilled) {
        output.innerHTML = '<span class="error">All fields must be filled</span>';
        return true;
    }
    return false;
}


function toDecimal() {

    var input = document.getElementById('input').value.trim().toUpperCase(),
        base = document.getElementById('base').value;

    if(empty_input() || (!base_is_ok(base)))
        return 0;
        
    var realValue,
        result = 0,
        inputLength = input.length,
        pointPosition = input.indexOf('.');
            

    if (pointPosition == -1)
        pointPosition = inputLength;

    for (var i = 0; i < inputLength; i++) {
        switch (input[i]) {
            case '0':
                realValue = 0;
                break;
            case '1':
                realValue = 1;
                break;
            case '2':
                realValue = 2;
                break;
            case '3':
                realValue = 3;
                break;
            case '4':
                realValue = 4;
                break;
            case '5':
                realValue = 5;
                break;
            case '6':
                realValue = 6;
                break;
            case '7':
                realValue = 7;
                break;
            case '8':
                realValue = 8;
                break;
            case '9':
                realValue = 9;
                break;
            case 'A':
                realValue = 10;
                break;
            case 'B':
                realValue = 11;
                break;
            case 'C':
                realValue = 12;
                break;
            case 'D':
                realValue = 13;
                break;
            case 'E':
                realValue = 14;
                break;
            case 'F':
                realValue = 15;
                break;
            case '.':
                continue;
        }

        if(realValue < base) {
            if (i < pointPosition) 
                result += realValue * base ** (pointPosition - i - 1);

            else if (i != pointPosition) 
                result += realValue * base ** (pointPosition - i);

        } else {
            output.innerHTML = '<span class="error">Invalid input</span>';
            return 0;
        }

    }
   
    output.innerHTML = 'To decimal: ' + result;
}

function deci_to_hex(hex) {
    switch (hex) {
        case 10:
            hex = 'A';
            break;
        case 11:
            hex = 'B';
            break;
        case 12:
            hex = 'C';
            break;
        case 13:
            hex = 'D';
            break;
        case 14:
            hex = 'E';
            break;
        case 15:
            hex = 'F';
            break;
    }

    return hex;
}

function toBase() {

    var input = document.getElementById('input').value.trim().toUpperCase(),
        base = document.getElementById('base').value;
    
    for(let i = 0; i < input.length; i++)
        if(isNaN(input[i])) {
            output.innerHTML = '<span class="error">Invalid input</span>';
            return 0;
        }

    if(empty_input())
        return 0;

    if(!base_is_ok(base))
        return 0;

    var intPart = Math.floor(input),
        floatPart = input - intPart,
        result = '';

    while (intPart >= base) {
        var reste = intPart % base;
        reste = deci_to_hex(reste);

        var quotient = Math.floor(intPart / base);
        result = reste + result;
        intPart = quotient;
    }

    intPart = deci_to_hex(intPart);

    result = intPart + result;

    if (floatPart != 0) {
        result += '.';
    }
    
    var i = 1;
    while ((floatPart != 0) && (i++ != 20)) {
        var newInput = floatPart * base,
            newInt = Math.floor(newInput),
            newFloat = newInput - newInt;

        newInt = deci_to_hex(newInt);

        result += newInt;
        floatPart = newFloat;
    }

    output.innerHTML = 'To base: ' + result;
}