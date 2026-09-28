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

  normal_nodes(((0, 0), (0, 3), (1, 1), (2, -0.5), (2, 3.5), (2.5, -2), (2.7, 1.8), (3.5, 0.5), (4, -1.5), (4.5, 2.3), (5, 0.3), (5, 4),
                (10, 0), (10, 3), (11, 1), (12, -0.5), (12, 3.5), (12.5, -2), (12.7, 1.8), (13.5, 0.5), (14, -1.5), (14.5, 2.3), (15, 0.3), (15, 4)))
  gray_edges(((1, 3), (2, 8), (4, 7), (4, 1), (2, 10), (9, 3), (10, 11), (9, 8), (8, 10)))
  edges(((1, 2), (2, 3), (1, 6), (10, 5), (4, 6), (3, 7), (7, 8), (4, 9), (10, 12), (9, 11), (5, 11)))

  gray_edges(((13, 14), (14, 20), (16, 19), (18, 13), (14, 22), (21, 15), (17, 23), (21, 23), (21, 16)))
  edges(((14, 15), (13, 15), (13, 16), (22, 17), (16, 18), (15, 19), (19, 20), (20, 22), (22, 24), (21, 20), (22, 23)))
})
