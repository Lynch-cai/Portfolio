// sizes
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener(
    'resize',
    () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    }
)

const $cursor_parallax = document.querySelector('.js-cursor-parallax')

document.addEventListener(
    'mousemove',
    (_event)=>{
        const ratioX = _event.clientX / sizes.width - 0.5 // give value between -0.5 & 0.5
        const ratioY = _event.clientY / sizes.height - 0.5
            const translateX = ratioX * -10
            const translateY = ratioY * -10
            $cursor_parallax.style.transform = `translate(${translateX}%, ${translateY}%) scale(1.1)`
    }
)