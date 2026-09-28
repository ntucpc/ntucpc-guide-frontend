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

  let star-points(cx, cy, r-outer, r-inner, n) = {
    range(2 * n).map(i => {
      let r = if calc.rem(i, 2) == 0 { r-outer } else { r-inner }
      let a = 90deg + i * (360deg / (2 * n))
      (cx + r * calc.cos(a), cy + r * calc.sin(a))
    })
  }

  // f(n) always calls f(n-1) first (the chain), then calls f(n-2). By the
  // time f(n-2) is called, it has already been memoized by the chain's
  // unwind (or it's a trivial base case) -- so it resolves immediately,
  // without spawning its own subtree.
  let compute-node-steps(n, counter) = {
    let appear-step = counter
    let counter = counter + 1
    if n <= 1 {
      let steps = (:)
      steps.insert("c" + str(n), (appear: appear-step, reveal: appear-step))
      (steps: steps, next: counter)
    } else {
      let left = compute-node-steps(n - 1, counter)
      let second-appear = left.next
      let steps = left.steps
      steps.insert("m" + str(n), (appear: second-appear, reveal: second-appear))
      let reveal-step = second-appear + 1
      let star-step = reveal-step + 1
      steps.insert("c" + str(n), (appear: appear-step, reveal: reveal-step, star: star-step))
      (steps: steps, next: star-step + 1)
    }
  }

  let node-steps = compute-node-steps(5, 0).steps

  let width = 3
  let height = 1

  let f(n, base_x, base_y, parent: none) = {
    let key = "c" + str(n)
    let s = node-steps.at(key)
    if s.appear < step {
      line((base_x - width / 2, base_y - height / 2),
           (base_x + width / 2, base_y - height / 2),
           (base_x + width / 2, base_y + height / 2),
           (base_x - width / 2, base_y + height / 2),
           close: true, name: key, stroke: none,
           fill: if n > 1 {blue.lighten(60%)} else {orange.lighten(30%)})
      content(key, [
        #set align(center)
        #n 階方法數
        #if s.reveal < step [
          \ #text([回傳 #fib.at(n)], size: 8pt)
        ] else [
          \ #text([回傳 #fib.at(n)], size: 8pt, fill: rgb(0, 0, 0, 0))
        ]
      ])
      if parent != none {
        line(parent, key, mark: (end: "stealth", fill: black))
      }
      if n > 1 {
        f(n - 1, base_x + width * 1.5, base_y, parent: key)

        let mkey = "m" + str(n)
        let ms = node-steps.at(mkey)
        if ms.appear < step {
          let second-n = n - 2
          let mx = base_x + width * 1.5
          let my = base_y - height * 1.3 * fib.at(n - 1)
          line((mx - width / 2, my - height / 2),
               (mx + width / 2, my - height / 2),
               (mx + width / 2, my + height / 2),
               (mx - width / 2, my + height / 2),
               close: true, name: mkey, stroke: none,
               fill: orange.lighten(30%))
          line(key, mkey, mark: (end: "stealth", fill: black))
          content(mkey, [
            #set align(center)
            #second-n 階方法數
            \ #text(if second-n <= 1 [回傳 #fib.at(second-n)] else [回傳已經記起來的答案], size: 8pt)
          ])
        }

        if s.star < step {
          let star-cx = base_x + 0.9
          let star-cy = base_y + 0.8
          content((star-cx, star-cy), text([記起來！], size: 10pt, fill: red))
        }
      }
    }
  }

  f(5, 0, 0)
})

#for i in range(1, 18) {
  pagebreak(weak: true)
  gao(i)
}
