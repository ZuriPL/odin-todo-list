import _ from "lodash"

export default function(type, properties) {
    const el = document.createElement(type)
    
    if (properties?.id != undefined) {
        el.setAttribute('id', properties.id)
        console.log('id')
    }

    if (properties?.class != undefined) {
        console.log('class')
        if (properties.class.constructor === Array) properties.class = _.join(properties.class, ' ')
        el.setAttribute('class', properties.class)
    }

    return el
}