#import "@preview/cetz:0.3.2"
#set page(width: auto, height: auto, margin: .5cm)
#set align(center + horizon)

#let arr = ([X], 1, 4, 5, 8, 8, 10, 12, 13, 15, 15, 20, 29, 33, [X])
#let k = 15
#let n = arr.len() - 2
#let draw(l, r, mid: -1) = {
  pagebreak(weak: true)
cetz.canvas(length: .8cm, {
  import cetz.draw: *

  content((-.8, 1), [$i:$], anchor: "east")
  content((-.8, 0), [$x_i:$], anchor: "east")
  content((-.8, -1), [$f(i):$], anchor: "east")
  for i in range(0, n + 2) {
    content((i, 1), [#{i}])
    content((i, 0), [#{arr.at(i)}])
    if i <= l {
      content((i, -1), text([0], fill: blue))
    }
    else if i >= r {
      content((i, -1), text([1], fill: red))
    }
    else {
      content((i, -1), text([?], fill: green.darken(40%)))
    }
  }

  content((l, -2), text([$ell$], fill: blue))
  content((r, -2), text([$r$], fill: red))
  line((l, -2 + .2), (rel: (0, .5)), mark: (end: "stealth", fill: blue), stroke: blue)
  line((r, -2 + .2), (rel: (0, .5)), mark: (end: "stealth", fill: red), stroke: red)
  if mid != -1 {
    content((mid, -2), text([$m$], fill: gray.darken(50%)))
    line((mid, -2 + .2), (rel: (0, .5)), mark: (end: "stealth", fill: gray.darken(50%)), stroke: gray.darken(50%))
  }

  content((-2, 2), [$k=#k$], anchor: "west")
})

}

// #draw(0, 14)
// #{
//   let l = 0
//   let r = n + 1
//   while l + 1 < r {
//     let mid = int((l + r) / 2)
//     draw(l, r, mid: mid)
//     if arr.at(mid) < k {
//       l = mid
//     }
//     else {
//       r = mid
//     }
//     draw(l, r)
//   }
// }

#draw(3, 9, mid: 6)