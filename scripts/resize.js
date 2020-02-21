let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener(
    'resize',
    ()=>{
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    }
)