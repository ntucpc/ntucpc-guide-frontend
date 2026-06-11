#import "@preview/cetz:0.4.2"

#set page(width: auto, height: auto, margin: 0.1cm)

#cetz.canvas({
  import cetz.draw: *
  let vertices(x, y, radius, color, naming, display) = {
    circle((x, y), radius: radius, fill: color, name: naming)
    content((), [#display])
  }
  
  let normal_node(x, y, num, display, color: white) = {
    if display == none {
      vertices(x, y, 10pt, color, "node" + str(num), $#num$)
    } else {
      vertices(x, y, 10pt, color, "node" + str(num), display)
    }
  }
  
  let edge(x, y, label: none, color: black) = {
    let start = "node" + str(x)
    let end = "node" + str(y)
    let edge-name = "e-" + str(x) + "-" + str(y)
    
    line(
      start,
      end,
      stroke: color,
      mark: (end: "stealth", fill: color),
      name: edge-name,
    )
    
    if label != none {
      content(
        edge-name + ".50%",
        std.box(
          fill: white,
          inset: 0.4pt,
          [#label],
        ),
        angle: edge-name,
        anchor: "center",
        padding: .1,
      )
    }
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
  
  let weighted_edges(connections) = {
    for (u, v, w) in connections {
      edge(u, v, label: $#w$)
    }
  }
  
  let circle_edges(connections) = {
    for (u, v, w) in connections {
      edge(u, v)
      let lst = "node" + str(u)
      for i in range(w - 1) {
        let edge-name = "e-" + str(u) + "-" + str(v)
        let coord = ((name: edge-name, anchor: 100% * (i + 1) / w))
        circle(coord, radius: 5pt, fill: white, name: "mid" + str(u) + str(v) + str(i))
        line(
          lst,
          "mid" + str(u) + str(v) + str(i),
          stroke: black,
          mark: (end: "stealth", fill: black),
        )
        lst = "mid" + str(u) + str(v) + str(i)
      }
    }
  }

  normal_nodes(((0, 0), (2, 0), (2.5, -1.5), (2, -4)), (
    str(1): $1$,
  ))
  weighted_edges(((1, 2, 1), (1, 3, 3), (1, 4, 5)))
  content((4, -1.5), [$=>$])
  normal_nodes(((5, 0), (7, 0), (7.5, -1.5), (7, -4)), (
    str(1): $1$,
  ))
  circle_edges(((1, 2, 1), (1, 3, 3), (1, 4, 5)))
})