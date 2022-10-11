export const resize = function (chart) {
    let timer = null
    window.addEventListener("resize", () => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            chart.resize()
        }, 100)
    })
}
