var fs = require('fs');
var path = require('path');

let snippetsFolder = path.join(__dirname, "snippets")

let loadFile = () =>{

}

fs.readdir(snippetsFolder, (err, files)=>{
    files.forEach((file, index)=>{
        let fullFilePath = path.join(snippetsFolder, file)
        let words = file.split(".")
        let fileContent = ""
        let fileType = words[words.length - 1]
        let fileName = words[0]
        
        fileContent = fs.readFileSync(fullFilePath, 'utf8')

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

        let cleanedContent = ""
        
        finalString += `"${fileName}": {\n`
        finalString += `\t"scope": "${fileType}",\n` //Scope
        finalString += `\t"prefix": [${prefixes}],\n` //Prefixes
        finalString += `\t"body":["${cleanedContent}"],\n`
        finalString += `\t"description": "No"\n`
        finalString += "}"
        console.log(finalString)
    })
})