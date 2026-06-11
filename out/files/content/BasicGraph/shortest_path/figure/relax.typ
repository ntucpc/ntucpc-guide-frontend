#import "@preview/cetz:0.4.2"

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

  let path(x, y, label: none, amp) = {
    let start = "node" + str(x)
    let end = "node" + str(y)
    
    cetz.decorations.wave({
      cetz.draw.line(start, end)
    }, amplitude: amp, segment-length: 2)

    line(start, end, stroke: none, name: "templiner")
    
    line(start, end, stroke: 0pt, mark: (end: "stealth", fill: black))
    
    if label != none {
      content(
        "templiner.50%", 
        label, 
        angle: (end), 
        anchor: "south", 
        padding: .1
      )
    }
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

  normal_nodes(((0, 0), (3, 1), (6, 0)), (
    str(1): $s$,
    str(2): $u$,
    str(3): $v$,
  ))
  path(1, 2, label: text([$"dis"[u]$], size: 8pt), .1)
  path(1, 3, label: text([$"dis"[v]$], size: 8pt), .1)
  path(2, 3, label: text([$w$], size: 8pt), 0)
})
