#import "@preview/cetz:0.3.0"
#import "@preview/suiji:0.3.0": *
#import cetz.draw: *

#set page(width: auto, height: auto, margin: (x: 0.5cm, y: 0.5cm))
#set align(horizon + center)


#let draw_cell(x, y, color) = {
  line((y, -x), (rel: (0, -1)), (rel: (1, 0)), (rel: (0, 1)), close: true, fill: color)
}
#let draw_block(x, y, dir1, dir2, color) = {
  draw_cell(x, y, color)
  draw_cell(x + dir1.at(0), y + dir1.at(1), color)
  draw_cell(x + dir2.at(0), y + dir2.at(1), color)
}

#cetz.canvas({
  import cetz.draw: *

  let n = 4
  line((0, 0), (n, 0), (n, -n), (0, -n), close: true, fill: rgb("#fff1a3"))
  for i in range(n + 1) {
    line((i, 0), (i, -n))
  }
  for i in range(n + 1) {
    line((0, -i), (n, -i))
  }
  draw_cell(2, 3, gray.darken(50%))
  draw_block(3, 2, (0, 1), (-1, 0), blue)

})

#pagebreak()

#cetz.canvas({
  import cetz.draw: *

  let n = 4
  line((0, 0), (n, 0), (n, -n), (0, -n), close: true, fill: rgb("#fff1a3"))
  for i in range(n + 1) {
    line((i, 0), (i, -n))
  }
  for i in range(n + 1) {
    line((0, -i), (n, -i))
  }
  draw_cell(2, 3, gray.darken(50%))
  draw_block(3, 2, (0, 1), (-1, 0), blue)
  draw_block(0, 3, (1, 0), (0, -1), red)
  draw_block(0, 0, (1, 0), (0, 1), green)
  draw_block(3, 0, (-1, 0), (0, 1), yellow)
  draw_block(1, 1, (1, 0), (0, 1), purple)

})