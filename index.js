var fs = require('fs');
var path = require('path');
const readline = require('readline');
const { once } = require('node:events');

let snippetsFolder = path.join(__dirname, "snippets")

let loadedCount = 0
let fileCount = 0

function FinishProgram(){
    console.log("Finished program");
}

async function readFile(fullFilePath){
    let fileContent = readline.createInterface({
        input: fs.createReadStream(fullFilePath)
    });

    let cleanedContent = ""
    fileContent.on('line', (line) => {
        cleanedContent += line
    })

    await once(fileContent, 'close');

    return cleanedContent
}

async function loadFile(file){
    let fullFilePath = path.join(snippetsFolder, file)
    let words = file.split(".")
    let fileType = words[words.length - 1]
    let fileName = words[0]

    let finalString = ""

    let prefixes = ""
    for(let i = 0; i < words.length; i++){
        if (i == words.length - 1) {
            continue
        }

        if(i > 0){
            prefixes += ","
        }
        prefixes += '"'+words[i]+'"'
    }


    let cleanedContent = await readFile(fullFilePath)      
    console.log(cleanedContent)
    
    finalString += `"${fileName}": {\n`
    finalString += `\t"scope": "${fileType}",\n` //Scope
    finalString += `\t"prefix": [${prefixes}],\n` //Prefixes
    finalString += `\t"body":["${cleanedContent}"],\n`
    finalString += `\t"description": "No"\n`
    finalString += "}"

    loadedCount += 1
    if(loadedCount == fileCount){
        FinishProgram();
    }
}

let files = fs.readdirSync(snippetsFolder)

files.forEach((file)=>{
    fileCount += 1
    loadFile(file)
})