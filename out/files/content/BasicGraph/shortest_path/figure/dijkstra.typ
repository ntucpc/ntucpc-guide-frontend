#import "@preview/cetz:0.4.2"

#set page(width: 182pt, height: auto, margin: 0.1cm)

#let draw(node_position, node_display, edges, highlight_edge, dis_array, vis_array, best) = {
  pagebreak(weak: true)
  cetz.canvas({
    import cetz.draw: *
    let vertices(x, y, radius, color, naming, display) = {
      circle((x, y), radius: radius, fill: color, name: naming)
      content((), [#display])
    }

    let normal_node(x, y, num, display, color: white) = {
      if display == none {
        vertices(x, y, 10pt, color, "node" + str(num), $#num$)
      }
      else {
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
        name: edge-name
      )

      if label != none {
        content(
          edge-name + ".50%",
          std.box(
            fill: white, 
            inset: 0.4pt, 
            [#label]
          ),
          angle: edge-name,
          anchor: "center",
          padding: .1
        )
      }
    }

    let highlight_color = red.lighten(40%)
    let n = node_position.len()
    let formatted_items = dis_array.enumerate().map(((i, n)) => {
      let body = if n == -1 { $oo$ } else { [#n] }
      if i == best {
        return text(fill: highlight_color, weight: "bold", body)
      } else {
        return body
      }
    })
    let dis_content = formatted_items.join(", ")
    let dis_label = [$"dis"$: $[#dis_content]$]
    let vis_content = vis_array.map(n => [#n] ).join(", ")
    let table_label = std.grid(
      columns: 2,
      rows: 3,
      column-gutter: 4pt,
      row-gutter: 6pt,
      align: (right, left),
      [$"dis":$], $[ #dis_content ]$,
      [$"vis":$], $[ #vis_content ]$,
      [$"best":$], $#best$
    )
    content((-0.1, 1.25), table_label, anchor: "west")
    for (i, p) in node_position.enumerate(start: 0) {
      if i == best {
        normal_node(p.at(0), p.at(1), i, node_display.at(str(i), default: none), color: highlight_color)
      }
      else {
        normal_node(p.at(0), p.at(1), i, node_display.at(str(i), default: none))
      }
    }
    for (u, v, w) in edges {
      if (u, v) == highlight_edge {
        edge(u, v, label: $#w$, color: highlight_color)
      }
      else {
        edge(u, v, label: $#w$)
      }
    }
  })
}

#{
  let node_position = ((0, -0.6), (3.5, 0), (1.7, -1.2), (2.4, -2.8), (5, -2), (5.5, 0))
  let node_display = (
      str(0): $0$,
  )
  let edges = (
    (0, 1, 6),
    (0, 2, 1),
    (1, 2, 1),
    (0, 3, 3),
    (2, 3, 1),
    (3, 1, 2),
    (1, 4, 3),
    (3, 4, 6),
    (4, 5, 2),
    (5, 1, 1),
  )
  let dis_array = (-1, ) * node_position.len()
  dis_array.at(0) = 0
  let vis_array = (0, ) * node_position.len()
  let highlight_edge = (0, 1)
  for step in range(node_position.len()) {
    let best = -1
    for i in range(node_position.len()) {
      if vis_array.at(i) == 0 and (best == -1 or (dis_array.at(i) != -1 and dis_array.at(i) < dis_array.at(best))) {
        best = i
      }
    }
    if best == -1 {
      break
    }
    draw(node_position, node_display, edges, none, dis_array, vis_array, best)
    vis_array.at(best) = 1
    for (u, v, w) in edges {
      if u == best {
        highlight_edge = (u, v)
        if dis_array.at(v) == -1 or dis_array.at(best) + w < dis_array.at(v) {
          dis_array.at(v) = dis_array.at(best) + w
        }
        draw(node_position, node_display, edges, highlight_edge, dis_array, vis_array, best)
      }
    }
  }
  draw(node_position, node_display, edges, none, dis_array, vis_array, "-")
  draw(node_position, node_display, edges, none, dis_array, vis_array, "-")
  draw(node_position, node_display, edges, none, dis_array, vis_array, "-")
}