import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
// import { setupTweenScale } from './tweenScale'

const emblaNode = document.querySelector('.embla')
const options = { loop: true }
const plugins = [Autoplay()]
const emblaApi = EmblaCarousel(emblaNode as HTMLElement, options, plugins)

emblaApi.reInit()

console.log(emblaNode)
//alert("ok")
