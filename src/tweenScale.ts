const TWEEN_FACTOR_BASE = 0.52
let tweenFactor = 0
let tweenNodes:any = []

const numberWithinRange = (number:any, min:any, max:any) =>
  Math.min(Math.max(number, min), max)

const setTweenNodes = (emblaApi:any) => {
  tweenNodes = emblaApi.slideNodes().map((slideNode:any) => {
    return slideNode.querySelector('.embla__slide__number')
  })
}

const setTweenFactor = (emblaApi:any) => {
  tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
}

const tweenScale = (emblaApi:any, eventName?:any) => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()
  const slidesInView = emblaApi.slidesInView()
  const isScrollEvent = eventName === 'scroll'

  emblaApi.scrollSnapList().forEach((scrollSnap:any, snapIndex:any) => {
    let diffToTarget = scrollSnap - scrollProgress
    const slidesInSnap = engine.slideRegistry[snapIndex]

    slidesInSnap.forEach((slideIndex:any) => {
      if (isScrollEvent && !slidesInView.includes(slideIndex)) return

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem:any) => {
          const target = loopItem.target()

          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target)

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress)
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          }
        })
      }

      const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor)
      const scale = numberWithinRange(tweenValue, 0, 1).toString()
      const tweenNode = tweenNodes[slideIndex]
      tweenNode.style.transform = `scale(${scale})`
    })
  })
}

export const setupTweenScale = (emblaApi:any) => {
  setTweenNodes(emblaApi)
  setTweenFactor(emblaApi)
  tweenScale(emblaApi)

  emblaApi
    .on('reInit', setTweenNodes)
    .on('reInit', setTweenFactor)
    .on('reInit', tweenScale)
    .on('scroll', tweenScale)
    .on('slideFocus', tweenScale)

  return () => {
    tweenNodes.forEach((slide:any) => slide.removeAttribute('style'))
  }
}
