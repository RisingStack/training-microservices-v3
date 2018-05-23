export default function autoBlur () {
  window.addEventListener('keypress', ev => {
    const element = ev.target
    const isEnter = ev.charCode === 13 || ev.which === 13 || ev.keyCode === 13
    const isInput = element.matches('input, select')
    if (isInput && isEnter) {
      if (element.form) {
        const inputs = Array.from(
          element.form.querySelectorAll('input, textarea, select')
        )
        const inputIndex = inputs.indexOf(element)
        const nextInput = inputs[inputIndex + 1]
        if (nextInput) {
          nextInput.focus()
          nextInput.select()
        } else {
          element.blur()
        }
      } else {
        element.blur()
      }
    }
  })
}
