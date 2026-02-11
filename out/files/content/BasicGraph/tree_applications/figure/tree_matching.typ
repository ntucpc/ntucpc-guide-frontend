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

  let color_edges(connections) = {
    for (u, v) in connections {
      color_edge(u, v, red)
    }
  }

  let edges(connections) = {
    for (u, v) in connections {
      edge(u, v)
    }
  }

  normal_nodes(((0, 0), (-2, -1.5), (0.2, -1.5), (2, -1.5), (-3.5, -3), (-2.2, -3), (-0.5, -3), (0.9, -3), (0.1, -4.5), (2.5, -3), (2.2, -4.5)), (
    str(1): $u$,
    str(2): $v_1$,
    str(3): $v_2$,
    str(4): $v_3$,
    str(5): "",
    str(6): "",
    str(7): "",
    str(8): "",
    str(9): "",
    str(10): "",
    str(11): ""
  ))
  edges(((1, 2), (1, 3), (2, 6), (3, 7), (4, 10)))
  color_edges(((1, 4), (2, 5), (3, 8), (7, 9), (10, 11)))
})
