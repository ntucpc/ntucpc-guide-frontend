#import "@preview/cetz:0.5.2"

#set page(margin: .1cm, width: auto, height: auto)

#cetz.canvas({
  import cetz.draw: *

  line((3, 1 +.1), (7, 1 +.1), (7, 0 +.1), (3, 0 +.1), close: true, fill: red.transparentize(50%), stroke: none)
  line((5, 1 -.1), (9, 1 -.1), (9, 0 -.1), (5, 0 -.1), close: true, fill: blue.transparentize(50%), stroke: none)

  for i in range(0, 15) {
    content((i + 0.5, 0.5), $a_#i$)
  }

  content((6, -.8), $min(a_3,a_4,...,a_8) = min( text(min(a_3,a_4,a_5,a_6), fill: #red), text(min(a_5,a_6,a_7,a_8), fill: #blue))$)

})