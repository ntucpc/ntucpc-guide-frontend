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

  gray_edges(((1, 2), (2, 8), (4, 7), (6, 1), (2, 10), (9, 3), (5, 11), (9, 11), (9, 4)))
  edges(((2, 3), (1, 3), (1, 4), (10, 5), (4, 6), (3, 7), (7, 8), (8, 10), (10, 12), (9, 8), (10, 11)))

  let highlight_cycle(points) = {
    line(..points, stroke: (paint: rgb("#FDE047").transparentize(40%), thickness: 5pt))
  }
  highlight_cycle(((0.2, 3.2), (1.35, 0.85), (3.05, 1.65), (3.85, 0.3), (4.15, -0.9), (5.1, 0.8), (4.7, 2.5), (0.2, 3.2)))

  content((5.3, 2.5), text(fill: rgb("#FDE047"))[$C$])
  content((1.45, 1.55), [$e$])
  content((2.4, 2.4), [$e'$])
  line((3.5, -2), (0.8, 4), stroke: (paint: red, thickness: 2pt, dash: "dashed"))
})
