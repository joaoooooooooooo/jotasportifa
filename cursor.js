import gsap from "gsap"



document.addEventListener('mousemove', e => {
    gsap.to('#cursor', {
        x: e.clientX,
        y: e.clientY,
        duration: .5,
        xPercent: -50,
        yPercent: -50
    })
})