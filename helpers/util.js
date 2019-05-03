'use strict'

let util = {}

util.replacer = function(template, data) {
    for(let key in data) {
        // console.log('Im here with key : ', key);
        let keyStr = '#{' + key + '}'
        template = template.replace(keyStr, data[key])
    }
    return template
}

module.exports = util