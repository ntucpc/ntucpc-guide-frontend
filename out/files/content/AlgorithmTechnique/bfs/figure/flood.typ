#import "@preview/cetz:0.3.0"
#import "@preview/suiji:0.3.0": *

#set page(width: auto, height: auto, margin: (x: 0.5cm, y: 0.5cm))
#set align(horizon + center)

#let f(time) = cetz.canvas({
  import cetz.draw: *

  let a = (
    (0, 0, 1, 0, 0),
    (1, 0, 0, 0, 0),
    (0, 1, 0, 0, 0),
    (0, 0, 0, 1, 0),
    (0, 1, 0, 0, 0)
  )

  let n = 5
  
  on-layer(1, {
    for i in range(n + 1) {
      line((i, 0), (i, n))
      line((0, i), (n, i))
    }
    line((0, 0), (n, 0), (n, n), (0, n), close: true)
  })


  for i in range(n) {
    for j in range(n) {
      if a.at(i).at(j) == 1 {
        line((j, n - 1 - i), (rel: (1, 0)), (rel: (0, 1)), (rel: (-1, 0)), close: true, fill: black.lighten(30%))
      }
    }
  }

  let q = ( (1, 3), )
  let dis = ( (-1, ) * 5, ) * 5
  dis.at(1).at(3) = 0
  while q.len() > 0 {
    let (x, y) = q.at(0)
    q = q.slice(1)
    if dis.at(x).at(y) > time {
      break
    }
    line((y, n - 1 - x), (rel: (1, 0)), (rel: (0, 1)), (rel: (-1, 0)), close: true, fill: blue.lighten(90% / (time + 1) * (dis.at(x).at(y)) + 10%), sroke: none)
    content((y + 0.5, n - 1 - x + 0.5), [#dis.at(x).at(y)])
    for (dx, dy) in ((0, 1), (1, 0), (0, -1), (-1, 0)) {
      let nx = x + dx
      let ny = y + dy
      if nx < 0 or n <= nx or ny < 0 or n <= ny {
        continue
      }
      if dis.at(nx).at(ny) != -1 or a.at(nx).at(ny) == 1 {
        continue;
      }
      dis.at(nx).at(ny) = dis.at(x).at(y) + 1
      q.push((nx, ny))
    }
  }

})

#stack(dir: ltr, spacing: 1cm, [#f(0)], [#f(1)], [#f(2)], [#f(3)])
#stack(dir: ltr, spacing: 1cm, [#f(4)], [#f(5)], [#f(6)])