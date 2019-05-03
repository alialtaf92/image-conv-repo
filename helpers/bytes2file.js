const fs = require('fs')

let bytes2File = (filename, actualName) => {
    const arrByte = fs.readFileSync(filename)
    let compLength = arrByte.readInt32LE(8)
    let compInfoTemp = []

    for(let i=0; i< compLength; i++) {
        compInfoTemp[i] = arrByte[i+12]
    }
    compInfoTemp = Buffer.from(compInfoTemp)

    let imageInfos = []
    for(let i=0; i < compLength; i+=8) {
        let offset = compInfoTemp.readInt32LE(i)
        let length = compInfoTemp.readInt32LE(i+4)
        imageInfos.push({from: offset, to: length})
    }

    let count = 4 + 4 + 4 + compLength
    let dataLength = arrByte.length - count
    let data = []
    for(let i= 0; i < dataLength; i ++) {
        data[i] = arrByte[count + i]
    }

    let imageNum = 0
    for(let imageInfo of imageInfos) {
        let imageBytes = []
        for(let i = imageInfo.from; i < imageInfo.to; i++) {
            imageBytes[i - imageInfo.from] = data[i]
        }

        let imageBuffer = Buffer.from(imageBytes)
        fs.writeFileSync(actualName + '-' + imageNum.toString() + '.png', imageBuffer)
        imageNum += 1
    }

}

module.exports = bytes2File
