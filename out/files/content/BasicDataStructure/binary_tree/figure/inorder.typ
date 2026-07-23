#import "@preview/cetz:0.5.2"

#set page(margin: .1cm, height: auto, width: auto)

#stack(
  dir: ltr, spacing: 1cm,
  cetz.canvas({
    import cetz.draw: *
    
    let node(coord, name) = {
      circle(coord, name: name, radius: .3)
      content(name, $#name$)
    }
    
    node((0, 0), "4")
    node((-2, -1), "2")
    node((-3, -2), "1")
    node((-1, -2), "3")
    node((2, -1), "6")
    node((1, -2), "5")
    node((3, -2), "7")
    
    line("4", "2")
    line("2", "1")
    line("2", "3")
    line("4", "6")
    line("6", "5")
    line("6", "7")
  }),
  cetz.canvas({
    import cetz.draw: *
    
    let node(coord, name) = {
      circle(coord, name: name, radius: .3)
      content(name, $#name$)
    }
    
    node((0, 0), "4")
    node((-2, -1), "2")
    node((-3, -2), "1")
    node((-1, -2), "3")
    node((2, -2), "6")
    node((1, -1), "5")
    node((3, -3), "7")
    
    line("4", "2")
    line("2", "1")
    line("2", "3")
    line("4", "5")
    line("6", "5")
    line("6", "7")
  }),
)