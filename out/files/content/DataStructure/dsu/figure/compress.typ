#import "@preview/cetz:0.4.2"

#set text(font: "Noto Sans CJK TC")
#set align(horizon)
#set page(margin: 0.3cm, width: auto, height: auto)

#stack(dir: ltr, spacing: 1cm,
  cetz.canvas({
    import cetz.draw: *

    set-style(radius: .3, fill: red.lighten(30%), stroke: none)
    circle((0, 0), name: "v1")
    circle((-.5, -1), name: "v2")
    circle((-.8, -2), name: "v3")
    circle((-1, -3), name: "v4")
    circle((-1.1, -4), name: "v5")

    set-style(radius: .3, fill: gray, stroke: none)
    circle((0.8, -1), name: "v6")
    circle((1.8, -2), name: "v7")
    circle((0.5, -2), name: "v8")
    circle((0, -3), name: "v9")
    circle((0.4, -4), name: "v10")
    circle((-2.3, -4), name: "v11")
    circle((-1.8, -5), name: "v12")
    circle((-0.4, -5), name: "v13")

    content("v1.north", [組長], anchor: "south", padding: .2)
    content("v5", [$v$])

    set-style(stroke: 1pt)
    line("v1", "v2")
    line("v2", "v3")
    line("v3", "v4")
    line("v4", "v5")

    line("v1", "v6")
    line("v6", "v7")
    line("v6", "v8")
    line("v3", "v9")
    line("v9", "v10")
    line("v4", "v11")
    line("v5", "v12")
    line("v5", "v13")
  }), 
  [$stretch(=>)^(#text([`findDSU(`$v$`)`]))$],
  cetz.canvas({
    import cetz.draw: *

    set-style(radius: .3, fill: red.lighten(30%), stroke: none)
    circle((0, 0), name: "v1")
    circle((-2, -1), name: "v2")
    circle((-1, -1), name: "v3")
    circle((0, -1), name: "v4")
    circle((1, -1), name: "v5")

    set-style(radius: .3, fill: gray, stroke: none)
    circle((0.8+1.5, -1), name: "v6")
    circle((1.8+1.5, -2), name: "v7")
    circle((0.5+2, -2), name: "v8")
    circle((0-1.3, -3+1), name: "v9")
    circle((0.4-1.3, -4+1), name: "v10")
    circle((-2.3+2, -4+2), name: "v11")
    circle((-1.8+2.5, -5+3), name: "v12")
    circle((-0.4+2, -5+3), name: "v13")

    content("v1.north", [組長], anchor: "south", padding: .2)
    content("v5", [$v$])

    set-style(stroke: 1pt)
    line("v1", "v2")
    line("v1", "v3")
    line("v1", "v4")
    line("v1", "v5")

    line("v1", "v6")
    line("v6", "v7")
    line("v6", "v8")
    line("v3", "v9")
    line("v9", "v10")
    line("v4", "v11")
    line("v5", "v12")
    line("v5", "v13")
  }), 
)