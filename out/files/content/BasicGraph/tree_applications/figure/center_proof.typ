#import "@preview/cetz:0.4.1"

#set page(width: auto, height: auto, margin: 0.1cm)

#cetz.canvas({
  import cetz.draw: *
  let vertices(x, y, radius, color, naming, display) = {
    circle((x, y), radius: radius, fill: color, name: naming)
    content((), [#display])
  }

  let normal_node(x, y, num, display) = {
    if display == none {
      vertices(x, y, 10pt, white, "node" + str(num), $#num$)
    }
    else {
      vertices(x, y, 10pt, white, "node" + str(num), display)
    }
  }

  let edge(x, y) = {
    line("node" + str(x), "node" + str(y))
  }

  let color_edge(x, y, color) = {
    line("node" + str(x), "node" + str(y), stroke: (paint: color))
  }

  let normal_nodes(positions, display) = {
    for (i, p) in positions.enumerate(start: 1) {
      normal_node(p.at(0), p.at(1), i, display.at(str(i), default: none))
    }
  }

  let color_edges(connections, color) = {
    for (u, v) in connections {
      color_edge(u, v, color)
    }
  }

  let edges(connections) = {
    for (u, v) in connections {
      edge(u, v)
    }
  }

  normal_nodes(((0, 0), (1.5, 0), (3, 0), (4.5, 0), (6, 0), (4, -1.5), (1.5, -3), (3, -3), (4.5, -3), (6, -3), (7.5, -3)), (
    str(1): "",
    str(2): "",
    str(3): $c_1$,
    str(4): "",
    str(5): "",
    str(6): "",
    str(7): "",
    str(8): "",
    str(9): $c_2$,
    str(10): "",
    str(11): "",
  ))
  color_edges(((1, 2), (2, 3), (9, 10), (10, 11)), blue)
  color_edges(((3, 4), (4, 6), (6, 8), (8, 9)), red)
  edges(((4, 5), (7, 8)))
})
