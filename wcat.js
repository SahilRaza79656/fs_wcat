 let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let optionArr = [];
let fileArr = [];
// seggregate file path and options
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionArr.push(inputArr[i]);
    } else {
        fileArr.push(inputArr[i]);
    }
}
// checking if file exist or not
for (let i = 0; i < fileArr.length; i++) {
    let isFile = fs.existsSync(fileArr[i]);
    if (isFile == false) {
        console.log("File does not exist");
        return;
    }
}
// append content of files
let content = ""
for (let i = 0; i < fileArr.length; i++) {
    content = content + fs.readFileSync(fileArr[i]) + "\r\n";
}
let contentArr = content.split("\r\n");

// "-s" command
let isSPresent = optionArr.includes("-s");
if (isSPresent) {
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    // console.log(contentArr);
    contentArr = tempArr;
    // console.log(contentArr);
}
// -n and -b command
// check if both commands are present
if (optionArr.includes("-n") && optionArr.includes("-b")) {
    let indxOfN = optionArr.indexOf("-n");
    let indxOfB = optionArr.indexOf("-b");
    // checking which comes first
    if (indxOfN < indxOfB) {
        let count = 1;
        for (let i = 0; i < contentArr.length; i++) {
            contentArr[i] = count + " " + contentArr[i];
            count++;

        }
    } else if (indxOfB < indxOfN) {
        let count = 1;
        for (let i = 0; i < contentArr.length; i++) {
            if (contentArr[i] != "" && contentArr[i] != null) {
                contentArr[i] = count + " " + contentArr[i];
                count++;
            }
        }
    }
} else {
    let isNPresent = optionArr.includes("-n");
    if (isNPresent) {
        let count = 1;
        for (let i = 0; i < contentArr.length; i++) {
            contentArr[i] = count + " " + contentArr[i];
            count++;
        }
    }

    let isBPresent = optionArr.includes("-b");
    if (isBPresent) {
        let count = 1;
        for (let i = 0; i < contentArr.length; i++) {
            if (contentArr[i] != "" && contentArr[i] != null) {
                contentArr[i] = count + " " + contentArr[i];
                count++;
            }
        }
    }
}

console.log(contentArr.join("\r\n"));
