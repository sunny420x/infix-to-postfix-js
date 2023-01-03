function infix_to_postfix() {
    formula = document.getElementById("formula-box").value;
    formula = formula.split(" ");
    result = 0;
    //Define Oparator (Stack) and oparand.
    oparator = [];
    oparand = [];
    for(i = 0; i <= formula.length; i++) {
        console.log(oparand[oparand.length]);
        switch(formula[i]) {
            case "%": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("%");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("%");
                        break;
                    }
                    default: {
                        oparator.push("%");
                        break;
                    }
                }
                break;
            }
            case "^": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("^");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("^");
                        break;
                    }
                    default: {
                        oparator.push("^");
                        break;
                    }
                }
                break;
            }
            case "*": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("*");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("*");
                        break;
                    }
                    case "*": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("*");
                        break;
                    }
                    case "/": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("*");
                        break;
                    }
                    default: {
                        oparator.push("*");
                        break;
                    }
                }
                break;
            }
            case "/": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("/");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("/");  
                        break;
                    }
                    case "*": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("/");
                        break;
                    }
                    case "/": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("/");
                        break;
                    }
                    default: {
                        oparator.push("/");
                        break;
                    }
                }
                break;
            }
            case "+": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    case "*": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    case "/": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    case "+": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    case "-": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("+");
                        break;
                    }
                    default: {
                        oparator.push("+");
                        break;
                    }
                }
                break;
            }
            case "-": {
                last = oparator[oparator.length - 1];
                switch(last) {
                    case "%": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    case "^": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    case "*": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    case "/": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    case "+": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    case "-": {
                        oparator.pop();
                        oparand.push(last);
                        oparator.push("-");
                        break;
                    }
                    default: {
                        oparator.push("-");
                        break;
                    }
                }
                break;
            }
            case "(": {
                oparator.push("(");
                break;
            }
            case ")": {
                if(oparator[oparator.length - 2] == "(") {
                    tmp = oparator[oparator.length - 1];
                    oparator.splice(oparator.length - 2, 2)
                    oparator.push(tmp);
                    break;
                } else {
                    oparator.push(")");
                    break;   
                }
            }
            default: {
                oparand.push(formula[i]);
                break;
            }
        }
    }
    //Push Last oparator.
    if(oparator[oparator.length - 1] != undefined) {
        last = oparator[oparator.length - 1];
        oparator.pop();
        oparand.pop();
        oparand.push(last);
    }
    console.log("oparator: "+oparator);
    console.log("oparand: "+oparand);

    result_addr = 0;
    //Calculate from postfix oparand.
    i = 0;
    while(1) {
        if(oparand[i] == undefined) {
            break;
        }
        if(i < 0) {
            i = 0;
        }
        else if(oparand[i] == "%") {
            result = oparand[i-2] % oparand[i-1];
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        }
        else if(oparand[i] == "^") {
            result = oparand[i-2] ** oparand[i-1];
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        }
        else if(oparand[i] == "*") {
            result = oparand[i-2] * oparand[i-1];
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        }
        else if(oparand[i] == "/") {
            result = oparand[i-2] / oparand[i-1];
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        }
        else if(oparand[i] == "+") {
            result = parseInt(oparand[i-2]) + parseInt(oparand[i-1]);
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        }
        else if(oparand[i] == "-") {
            result = oparand[i-2] - oparand[i-1];
            oparand.splice(i-2,i+1);
            oparand.unshift(result);
            i -= 2;
            console.log(oparand,i);
        } else {
            i++;
        }
    }
    console.log("oparator: "+oparator);
    console.log("oparand: "+oparand);

    document.getElementById('result').innerHTML += formula.join(" ")+' = '+oparand+'<br>';
    document.getElementById("formula-box").value = result;
    console.log(result);
}