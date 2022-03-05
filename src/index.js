import sidebarF from './js/components/sidebar'
import topbarF from './js/components/topbar'
import elFactory from './js/elFactory'
import './css/global.css'
import './css/body.css'


const sidebar = sidebarF()
const topbar = topbarF()


document.body.appendChild(sidebar)
document.body.appendChild(topbar)