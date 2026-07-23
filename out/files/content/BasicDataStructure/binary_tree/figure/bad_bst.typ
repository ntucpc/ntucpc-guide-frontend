#import "@preview/cetz:0.5.2"

#set page(margin: .1cm, height: auto, width: auto)

#stack(
  dir: ltr, spacing: 1cm,
  cetz.canvas({
    import cetz.draw: *
    
    let node(coord, name, cont: none) = {
      circle(coord, name: name, radius: .3)
      content(name, if cont == none {$#name$} else {cont})
    }
    
    node((0, 0), "1")
    node((1, -1), "2")
    node((2, -2), "3")
    node((3, -3), "4")
    circle((4, -4), name: "dots", radius: .3, stroke: none)
    content("dots", $dots.down$)
    node((5, -5), "n", cont: $n$)
    line("1", "2")
    line("2", "3")
    line("3", "4")
    line("4", "dots")
    line("dots", "n")
  }))