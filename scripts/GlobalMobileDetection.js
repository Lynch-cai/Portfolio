// First detection
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    cursor.$cursor_container.style.display = 'none'
    // console.log('mobile')
}
// Second detection
else if (sizes.width <= 768) {
    cursor.$cursor_container.style.display = 'none'
}