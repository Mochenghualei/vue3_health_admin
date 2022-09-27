export const resize = (chart) => {
    let timer = null
    window.addEventListener("resize", () => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            chart.resize()
        }, 100)
    })
}
