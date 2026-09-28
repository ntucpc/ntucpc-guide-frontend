#import "@preview/cetz:0.5.2"

#set text(font: "Noto Sans CJK TC")
#set align(center + horizon)
#set page(width: 25cm, height: 12cm, margin: .1cm)

#let gao(step) = cetz.canvas({
  import cetz.draw: *

  line((-2, 1), (20, -10), stroke: none)

  let max_n = 10
  let fib = ()
  let fib2 = ()
  for i in range(max_n) {
    if i <= 1 {
      fib.push(1)
      fib2.push(1)
    }
    else {
      fib.push(fib.at(i - 2) + fib.at(i - 1))
      fib2.push(fib2.at(i - 2) + fib2.at(i - 1) + 1)
    }
  }

  // For each call f(n) (identified by idx), work out the global step at
  // which it first appears, and the (later) step at which its return
  // value appears -- only after f(n-1) and f(n-2) have both fully returned.
  let compute-node-steps(n, idx, counter) = {
    let appear-step = counter
    let counter = counter + 1
    if n <= 1 {
      let steps = (:)
      steps.insert(str(idx), (appear: appear-step, reveal: appear-step))
      (steps: steps, next: counter)
    } else {
      let left = compute-node-steps(n - 1, idx + 1, counter)
      let right = compute-node-steps(n - 2, idx + 1 + fib2.at(n - 1), left.next)
      let reveal-step = right.next
      let steps = (:)
      for (key, value) in left.steps { steps.insert(key, value) }
      for (key, value) in right.steps { steps.insert(key, value) }
      steps.insert(str(idx), (appear: appear-step, reveal: reveal-step))
      (steps: steps, next: reveal-step + 1)
    }
  }

  let node-steps = compute-node-steps(5, 0, 0).steps

  let f(n, base_x, base_y, idx, parent: -1) = {
    let node-step = node-steps.at(str(idx))
    if node-step.appear < step {
      let width = 3
      let height = 1
      line((base_x - width / 2, base_y - height / 2),
           (base_x + width / 2, base_y - height / 2),
           (base_x + width / 2, base_y + height / 2),
           (base_x - width / 2, base_y + height / 2),
           close: true, name: str(idx), stroke: none,
           fill: if n > 1 {blue.lighten(60%)} else {orange.lighten(30%)})
      content(str(idx), [
        #set align(center)
        #n 階方法數
        #if node-step.reveal < step [
          \ #text([回傳 #fib.at(n)], size: 8pt)
        ] else [
          \ #text([回傳 #fib.at(n)], size: 8pt, fill: rgb(0, 0, 0, 0))
        ]
      ])
      if parent != -1 {
        line(str(parent), str(idx), mark: (end: "stealth", fill: black))
      }
      if n > 1 {
        f(n - 1, base_x + width * 1.5, base_y, idx + 1, parent: idx)
        f(n - 2, base_x + width * 1.5, base_y - height * 1.3 * fib.at(n - 1), idx + 1 + fib2.at(n - 1), parent: idx)
      }
    }
  }

  f(5, 0, 0, 0)
})

#for i in range(1, 23) {
  pagebreak(weak: true)
  gao(i)
}
