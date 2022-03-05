import _, { keys } from "lodash"

export default function(type, properties = {}, text = '') {
    const el = document.createElement(type)

    let keys = Object.keys(properties)

    keys.forEach(key => {
        if (properties[key].constructor === Array) properties[key] = _.join(properties[key], ' ')
        el.setAttribute(key, properties[key])
    })

    el.textContent = text

    return el
}