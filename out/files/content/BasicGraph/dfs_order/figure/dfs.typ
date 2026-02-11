#import "@preview/cetz:0.4.2"
#set text(size: 14pt)
#set page(width: auto, height: auto, margin: 1cm)

#cetz.canvas({
  import cetz.draw: *
  import cetz.tree
  tree.tree(([1], ([2], ([4], ([6])), ([5], ([8]), ([9]))), ([3], ([7], ([10]), ([11]), [12]))), draw-node: (node, ..) => {
    circle((), radius : .5)
    content((), node.content)
  })
})