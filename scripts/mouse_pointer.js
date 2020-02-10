const $mouse_circle = document.querySelector('.js-mouse_circle')
const $mouse_dot = document.querySelector('.js-mouse_dot')
// document.addEventListener(
//     'mousemove',
//     ()=>{
//         const mouse_pos_x = event.clientX;
//         const mouse_pos_y = event.clientY;
//         $mouse_dot.style.transform = `translate(${(mouse_pos_x - $mouse_dot.offsetWidth/2)}px, ${(mouse_pos_y - $mouse_dot.offsetHeight/2)}px)`
//         setTimeout(
//             function(){
//                 $mouse_circle.style.transform = `translate(${(mouse_pos_x - $mouse_circle.offsetWidth/2)}px, ${(mouse_pos_y - $mouse_circle.offsetHeight/2)}px)`
//             }, 75
//         )
//     }
// )

const mouse_circle = {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    border: 1
}

// mouse_circle.style.width = mouse_circle.width
// mouse_circle.style.height = mouse_circle.height

const mouse_dot = {
    x: 0,
    y: 0,
    width: 8,
    height: 8
}

const cursor = {
    x: 0,
    y: 0
}


window.addEventListener(
    'mousemove',
    (_event)=>{
        cursor.x = _event.clientX
        cursor.y = _event.clientY
    }
)


let previousTime = Date.now()


const animation_loop = ()=>{
    window.requestAnimationFrame(animation_loop)
    const time = Date.now()
    const delta = time - previousTime
    previousTime = time
    mouse_dot.x += (cursor.x - mouse_dot.x) * (0.01 * delta)
    mouse_dot.y += (cursor.y - mouse_dot.y) * (0.01 * delta)
    mouse_circle.x += (cursor.x - mouse_circle.x) * (0.02 * delta)
    mouse_circle.y += (cursor.y - mouse_circle.y) * (0.02 * delta)
    $mouse_dot.style.transform = `translate(${mouse_dot.x - mouse_dot.width/2}px, ${mouse_dot.y - mouse_dot.height/2}px)`
    $mouse_circle.style.transform = `translate(${mouse_circle.x - (mouse_circle.width/2) - (mouse_circle.border/2)}px, ${mouse_circle.y - (mouse_circle.height/2) - (mouse_circle.border/2)}px)`
}
animation_loop()

