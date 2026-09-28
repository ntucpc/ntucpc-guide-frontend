#import "@preview/cetz:0.4.1"

#set page(width: auto, height: auto, margin: 0.1cm)

#cetz.canvas({
  import cetz.draw: *
  let vertices(x, y, radius, color, naming, display) = {
    circle((x, y), radius: radius, fill: color, name: naming)
    //content((), [#display])
  }

  let normal_node(x, y, num) = {
    vertices(x, y, 5pt, white, "node" + str(num), $#num$)
  }

  let edge(x, y) = {
    line("node" + str(x), "node" + str(y), stroke: 3pt)
  }

  let gray_edge(x, y) = {
    line("node" + str(x), "node" + str(y), stroke: (paint: luma(220)))
  }

  let red_edge(x, y) = {
    line("node" + str(x), "node" + str(y), stroke: (paint: rgb("#e53935"), thickness: 3pt))
  }

  let normal_nodes(positions) = {
    for (i, p) in positions.enumerate(start: 1) {
      normal_node(p.at(0), p.at(1), i)
    }
  }

  let edges(connections) = {
    for (u, v) in connections {
      edge(u, v)
    }
  }
  let gray_edges(connections) = {
    for (u, v) in connections {
      gray_edge(u, v)
    }
  }

  normal_nodes(((0, 0), (0, 3), (1, 1), (2, -0.5), (2, 3.5), (2.5, -2), (2.7, 1.8), (3.5, 0.5), (4, -1.5), (4.5, 2.3), (5, 0.3), (5, 4)))

  gray_edges(((1, 2), (2, 8), (4, 7), (6, 1), (10, 5), (2, 10), (9, 3), (5, 11), (9, 11), (9, 4), (10, 12), (9, 8), (10, 11)))
  edges(((2, 3), (1, 3), (1, 4), (4, 6), (3, 7), (7, 8)))

  line((4.2, 0.5), (1.1, 4.1), stroke: (paint: red, thickness: 2pt, dash: "dashed"))
  line((3, -2), (4.2, 0.5), stroke: (paint: red, thickness: 2pt, dash: "dashed"))

  content((1.05, 3.55), [$U$])
  content((2, 4), [$V ∖ U$])
  content((-0.4, -0.3), [$s$])

  red_edge(8, 10)
})
