#import "@preview/cetz:0.5.2"

#set page(margin: .1cm, height: auto, width: auto)

#cetz.canvas({
  import cetz.draw: *
  
  let node(coord, name) = {
    circle(coord, name: name, radius: .3)
    content(name, $#name$)
  }

  node((0, 0), "1")
  node((-1, -1), "2")
  node((-2, -2), "3")
  node((-1, -2), "4")
  node((0, -2), "5")
  node((1.5, -1), "6")
  node((1, -2), "7")
  node((2, -2), "11")
  node((-.5, -3), "8")
  node((.5, -3), "9")
  node((-2, -3), "10")

  line("1", "2")
  line("1", "6")
  line("2", "3")
  line("2", "4")
  line("2", "5")
  line("6", "7")
  line("6", "11")
  line("3", "10")
  line("5", "8")
  line("5", "9")
})