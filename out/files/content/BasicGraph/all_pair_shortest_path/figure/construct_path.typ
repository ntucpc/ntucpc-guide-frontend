#import "@preview/cetz:0.5.2"
#set page(width: auto, height: auto, margin: 1cm)

#let path = (0, 5, 1, 2, 7, 3, 4, 6, 8)
#let n = path.len()
#let draw_graph(breakpoint, highlight: -1) = {

  cetz.canvas({
    import cetz.draw: *

    for i in range(breakpoint.len() - 1) {
      let l = breakpoint.at(i)
      let r = breakpoint.at(i + 1)
      let h = (l + r - 1) / 2
      for j in range(l, r + 1) {
        let color = if path.at(j) == highlight { red } else {black}
        circle((1.5 * j, -h * 0.8), radius: .3, name: str(j), stroke: color)
        content(str(j), text($#path.at(j)$, fill: color))
      }
      for j in range(l, r) {
        line(str(j), str(j + 1), mark: (end: "stealth", fill: black))
      }
    }
    line((-1, .5), (13, -6), stroke: none)
  })



}

#let arr = (
(0, 1, 2, 3, 4, 5, 6, 7, 8),
(0, 1, 3, 4, 5, 6, 7, 8),
(0, 1, 4, 5, 6, 7, 8),
(0, 1, 4, 6, 7, 8),
(0, 1, 4, 7, 8),
(0, 4, 7, 8),
(0, 4, 8),
(0, 8),
(0, 8),
)

#let dis_table = ((10000,) * n,) * n
#for i in range(n - 1) {
  dis_table.at(path.at(i)).at(path.at(i + 1)) = 1
}
#for i in range(n) {
  dis_table.at(i).at(i) = 0
}

#for k in range(arr.len()) {
  let cells = ([], )
  for i in range(n) {
    cells.push([$#i$])
  }
  let new_table = dis_table
  for i in range(n) {
    for j in range(n) {
      new_table.at(i).at(j) = calc.min(
        new_table.at(i).at(j),
        new_table.at(i).at(k) + 
        new_table.at(k).at(j)
      )
    }
  }
  for i in range(n) {
    cells.push([$#i$])
    for j in range(n) {
      let d = dis_table.at(i).at(j)
      let nd = new_table.at(i).at(j)
      if nd == 10000 {
        cells.push([$$])
      }
      else if nd != d {
        cells.push(text([$#nd$], fill: red))
      }
      else {
        cells.push([$#nd$])
      }
    }
  }
  let w = 1.5em
  pagebreak(weak: true)
  stack(dir: ltr, spacing: 1cm,
    draw_graph(arr.at(calc.max(0, k - 1)), highlight: k),
    [
      $k=#k$
    #table(columns: (w,) * (n + 1), align: center,
      stroke: none,
      ..cells,
      table.hline(y: 1),
      table.vline(x: 1)
    )
    ]
  )
  pagebreak(weak: true)
  stack(dir: ltr, spacing: 1cm,
    draw_graph(arr.at(calc.max(0, k)), highlight: k),
    [
      $k=#k$
    #table(columns: (w,) * (n + 1), align: center,
      stroke: none,
      ..cells,
      table.hline(y: 1),
      table.vline(x: 1)
    )
    ]
  )
  dis_table = new_table
}