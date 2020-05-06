if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const cursor = doucment.querySelector('.global_cursor')
    cursor.style.display = 'none'
    console.log('mobile')
}