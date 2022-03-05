export default function(type, properties = {}, text = '') {
    const el = document.createElement(type)

    let keys = Object.keys(properties)

    keys.forEach(key => {
        if (properties[key].constructor === Array) properties[key] = properties[key].join(' ')
        el.setAttribute(key, properties[key])
    })

    el.innerHTML = text

    return el
}