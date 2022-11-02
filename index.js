var fs = require('fs');
var path = require('path');
const readline = require('readline');
const { once } = require('node:events');

let snippetsFolder = path.join(__dirname, "snippets")

let generatedSnippets = []
let loadedCount = 0
let fileCount = 0

function FinishProgram(){
    let finalString = "{\n"

    for(let i = 0; i < generatedSnippets.length; i++){
        let snippet = generatedSnippets[i]
        let isFinal = i == generatedSnippets.length - 1

        finalString += `${snippet}`
        if(!isFinal)
            finalString += ",\n"
        else
            finalString += "\n"
    }

    finalString += "}"

    fs.writeFile("finalSnippets.json", finalString, (err)=>{
        if(err)
            console.log(err)
    })
}

async function readFile(fullFilePath){
    let fileContent = readline.createInterface({
        input: fs.createReadStream(fullFilePath)
    });

    let cleanedContent = ""
    let count = 0
    fileContent.on('line', (line) => {
        if(count > 0)
            cleanedContent += ",\n"

        let cleanLine = ""
        for(let i = 0; i < line.length; i++){

            if(line[i] == '"')
                cleanLine += "\\\""
            else
                cleanLine += line[i]
        }

        cleanedContent += `\t\t"${cleanLine}"`

        count += 1
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

    finalString += `"${fileName}": {\n`
    finalString += `\t"scope": "${fileType}",\n` //Scope
    finalString += `\t"prefix": [${prefixes}],\n` //Prefixes
    finalString += `\t"body":[\n${cleanedContent}\n\t],\n`
    finalString += `\t"description": "This Snippet was auto generated by @Prooheckcp's program"\n`
    finalString += "\t}"

    generatedSnippets.push(finalString)
    
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