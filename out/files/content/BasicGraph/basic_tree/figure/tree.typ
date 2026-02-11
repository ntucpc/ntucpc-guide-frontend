#import "@preview/cetz:0.4.1"

#set page(width: auto, height: auto, margin: 0.1cm)

#cetz.canvas({
  import cetz.draw: *
  let vertices(x, y, radius, color, naming, display) = {
    circle((x, y), radius: radius, fill: color, name: naming)
    content((), [#display])
  }

  let normal_node(x, y, num) = {
    vertices(x, y, 10pt, white, "node" + str(num), $#num$)
  }

  let edge(x, y) = {
    line("node" + str(x), "node" + str(y))
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

  normal_nodes(((0, 0), (-1.5, -1.5), (0.2, -1.5), (1.5, -1.5), (-2.5, -3), (-0.5, -3), (0.9, -3), (0.3, -4.5)))
  edges(((1, 2), (1, 3), (1, 4), (2, 5), (3, 6), (3, 7), (7, 8)))
})
