var StringConverterApp = function(){
    this.units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
    ];
    this.tens = ["", "", "twenty", "thirty", "forty", "fifty",
        "sixty", "seventy", "eighty", "ninety"];
    this.multipliers = ["hundred", "thousand", "million", "billion", "trillion"];

    this.dict = {};
    for(var i=0; i<this.units.length; i++){
        var currentUnit = this.units[i];
        //First value in pair is multiplier, second is increment
        this.dict[currentUnit] = [1, i];
    }
    for(i=1; i<this.tens.length; i++){
        currentUnit = this.tens[i];
        //First value in pair is multiplier, second is increment
        this.dict[currentUnit] = [1, i*10];
    }
    for(i=0; i<this.multipliers.length; i++){
        currentUnit = this.multipliers[i];
        //First value in pair is multiplier, second is increment
        if(i===0)
            this.dict[currentUnit] = [100, 0];
        else
            this.dict[currentUnit] = [Math.pow(10, i*3), 0]; //(when i===1 this is 1000,0)
    }
};

StringConverterApp.prototype = {
    init: function(){
        var onConvertClickDelegate = this.createDelegate(this, this.onConvertClick);
        document.getElementById('btnConvert').addEventListener('click', onConvertClickDelegate);
        this.txtResult = document.getElementById('txtResult');
    },
    onConvertClick: function(event){
        var userString = document.getElementById('txtUserInput').value;
        var intResult = this.getIntegerValueFromString(userString);
        if(intResult){
            this.txtResult.innerHTML = intResult;
        }
        else{
            this.txtResult.innerHTML = 'Invalid input.';
        }
    },
    getIntegerValueFromString: function(userString){
        //Make sure they entered something
        if(userString){
            //Get rid of dashes
            userString = userString.replace('-', ' ').toLowerCase();
            //Split into tokens
            var tokensArray = userString.split(' ');

            //special case for negative numbers
            var isNegative = false;
            if(tokensArray[0]==='negative') {
                isNegative = true;
                tokensArray.splice(0,1);
            } else{
                isNegative=false;
            }

            var intResult = 0;
            var currentTriplet=0; //for example the 321 in (321),000,000

            while(tokensArray.length > 0){
                //Find out what the multiplier/increment is
                var multiplierIncrementPair = this.dict[tokensArray[0]];
                if(multiplierIncrementPair){
                    //First value in pair is multiplier, second is increment
                    currentTriplet = (currentTriplet * multiplierIncrementPair[0]) + multiplierIncrementPair[1];

                    if(multiplierIncrementPair[0] > 100){
                        intResult += currentTriplet;
                        currentTriplet = 0;
                    }

                    tokensArray.splice(0, 1);
                }
                else{
                    return null;
                }
            }

            return isNegative ? -(intResult+currentTriplet) : intResult+currentTriplet;

        }
        return null;
    },
    getTokenIntValue: function(token){
        switch(token){
            case 'one':
                return 1;
                break;
            case 'two':
                return 2;
                break;
            case 'three':
                return 3;
                break;
            case 'four':
                return 4;
                break;
            case 'five':
                return 5;
                break;
            case 'six':
                return 6;
                break;
            case 'seven':
                return 7;
                break;
            case 'eight':
                return 8;
                break;
            case 'nine':
                return 9;
                break;
            case 'ten':
                return 10;
                break;
            case 'twenty':
                return 20;
                break;
            case 'thirty':
                return 30;
                break;
            case 'forty':
                return 40;
                break;
            case 'fifty':
                return 50;
                break;
            case 'sixty':
                return 60;
                break;
            case 'seventy':
                return 70;
                break;
            case 'eighty':
                return 80;
                break;
            case 'ninety':
                return 90;
                break;
            case 'hundred':
                return 100;
                break;
            case 'thousand':
                return 1000;
                break;
            case 'million':
                return 1000000;
                break;
            case 'billion':
                return 1000000000;
                break;
            case 'trillion':
                return 1000000000000;
                break;
            default:
                return null;
        }
    },
    createDelegate: function(object, method){
        var shim =  function()
        {
            return method.apply(object, arguments);
        }
        return shim;
    }
}

var app = new StringConverterApp();
