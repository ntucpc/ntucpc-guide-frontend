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

  let path(x, y) = {
    cetz.decorations.wave(line("node" + str(x), "node" + str(y)), amplitude: .05, segment-length: 1)
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

  let paths(connections) = {
    for (u, v) in connections {
      path(u, v)
    }
  }

  normal_nodes(((0, 0), (4.5, 0), (7.5, 0), (5, 2)), (
    str(1): $u$,
    str(2): $p$,
    str(3): $v$,
    str(4): $x$,
  ))
  paths(((1, 2), (2, 3), (2, 4)))
})
