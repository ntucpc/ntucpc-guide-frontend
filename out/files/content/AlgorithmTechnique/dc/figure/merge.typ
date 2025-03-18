#import "@preview/cetz:0.3.0"
#import "@preview/suiji:0.3.0": *
#import cetz.draw: *

#set page(width: auto, height: auto, margin: (x: 0.5cm, y: 0.5cm))
#set align(horizon + center)

#cetz.canvas({
  import cetz.draw: *

  let draw_block(coord, number) = {
    rect((rel: (-0.5, -0.5), to: coord), (rel: (0.5, 0.5), to: coord))
    content(coord, text([#number], size: 16pt))
  }
  let draw_seq(coord, seq, name) = {
    let len = seq.len()
    for i in range(len) {
      draw_block((rel: (- len / 2 + i, 0), to: coord), seq.at(i))
    }
    rect((rel: (-(len / 2) - 0.5, -0.5), to: coord), (rel: ((len / 2) - 1 + 0.5, 0.5), to: coord), name: name)
  }
  draw_seq((0, 0), (3, 1, 4, 1, 5, 9, 2, 6), "v1")
  draw_seq((-4, -2), (3, 1, 4, 1), "v2")
  draw_seq((4, -2), (5, 9, 2, 6), "v3")
  line("v1", "v2", mark: (end: "stealth", fill: black))
  line("v1", "v3", mark: (end: "stealth", fill: black))
  draw_seq((-6, -4), (3, 1), "v4")
  draw_seq((-2, -4), (4, 1), "v5")
  draw_seq((2, -4), (5, 9), "v6")
  draw_seq((6, -4), (2, 6), "v7")
  line("v2", "v4", mark: (end: "stealth", fill: black))
  line("v2", "v5", mark: (end: "stealth", fill: black))
  line("v3", "v6", mark: (end: "stealth", fill: black))
  line("v3", "v7", mark: (end: "stealth", fill: black))

  draw_seq((-7, -6), (3, ), "v8")
  draw_seq((-5, -6), (1, ), "v9")
  draw_seq((-3, -6), (4, ), "v10")
  draw_seq((-1, -6), (1, ), "v11")
  draw_seq((1, -6), (5, ), "v12")
  draw_seq((3, -6), (9, ), "v13")
  draw_seq((5, -6), (2, ), "v14")
  draw_seq((7, -6), (6, ), "v15")
  line("v4", "v8", mark: (end: "stealth", fill: black))
  line("v4", "v9", mark: (end: "stealth", fill: black))
  line("v5", "v10", mark: (end: "stealth", fill: black))
  line("v5", "v11", mark: (end: "stealth", fill: black))
  line("v6", "v12", mark: (end: "stealth", fill: black))
  line("v6", "v13", mark: (end: "stealth", fill: black))
  line("v7", "v14", mark: (end: "stealth", fill: black))
  line("v7", "v15", mark: (end: "stealth", fill: black))

})

#pagebreak()

#cetz.canvas({
  import cetz.draw: *

  let draw_block(coord, number) = {
    rect((rel: (-0.5, -0.5), to: coord), (rel: (0.5, 0.5), to: coord))
    content(coord, text([#number], size: 16pt))
  }
  let draw_seq(coord, seq, name) = {
    let len = seq.len()
    for i in range(len) {
      draw_block((rel: (- len / 2 + i, 0), to: coord), seq.at(i))
    }
    rect((rel: (-(len / 2) - 0.5, -0.5), to: coord), (rel: ((len / 2) - 1 + 0.5, 0.5), to: coord), name: name)
  }
  draw_seq((0, 0), (1, 1, 2, 3, 4, 5, 6, 9), "v1")
  draw_seq((-4, -2), (1, 1, 3, 4), "v2")
  draw_seq((4, -2), (2, 5, 6, 9), "v3")
  line("v2", "v1", mark: (end: "stealth", fill: black))
  line("v3", "v1", mark: (end: "stealth", fill: black))
  draw_seq((-6, -4), (1, 3), "v4")
  draw_seq((-2, -4), (1, 4), "v5")
  draw_seq((2, -4), (5, 9), "v6")
  draw_seq((6, -4), (2, 6), "v7")
  line("v4", "v2", mark: (end: "stealth", fill: black))
  line("v5", "v2", mark: (end: "stealth", fill: black))
  line("v6", "v3", mark: (end: "stealth", fill: black))
  line("v7", "v3", mark: (end: "stealth", fill: black))

  draw_seq((-7, -6), (3, ), "v8")
  draw_seq((-5, -6), (1, ), "v9")
  draw_seq((-3, -6), (4, ), "v10")
  draw_seq((-1, -6), (1, ), "v11")
  draw_seq((1, -6), (5, ), "v12")
  draw_seq((3, -6), (9, ), "v13")
  draw_seq((5, -6), (2, ), "v14")
  draw_seq((7, -6), (6, ), "v15")
  line("v8", "v4", mark: (end: "stealth", fill: black))
  line("v9", "v4", mark: (end: "stealth", fill: black))
  line("v10","v5",  mark: (end: "stealth", fill: black))
  line("v11","v5",  mark: (end: "stealth", fill: black))
  line("v12","v6",  mark: (end: "stealth", fill: black))
  line("v13","v6",  mark: (end: "stealth", fill: black))
  line("v14","v7",  mark: (end: "stealth", fill: black))
  line("v15","v7",  mark: (end: "stealth", fill: black))

})
