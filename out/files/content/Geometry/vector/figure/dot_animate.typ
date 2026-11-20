#import "@preview/cetz:0.5.3"

#set page(width: auto, height: auto, margin: .1cm)

// 向量長度與動畫設定
#let lu = 4.5              // |u|
#let lv = 3                // |v|
#let step = 22.5deg        // 每個 frame 逆時針轉的角度
#let frames = 16           // 360deg / 22.5deg

#let frame(ang) = cetz.canvas({
  import cetz.draw: *

  // 固定的邊界框（不畫出來），確保每頁大小一樣
  rect((-lv - 0.8, -lv - 0.8), (lu + 1.5, lv + 0.8), stroke: none)

  let eps = 1e-9
  let O = (0, 0)
  let u = (lu, 0)
  let v = (lv * calc.cos(ang), lv * calc.sin(ang))
  let c = calc.cos(ang)
  let s = calc.sin(ang)
  let foot = (v.at(0), 0) // v 投影到 u 所在直線上的垂足

  // 右上角標示內積目前的範圍
  let udv = $arrow(u) dot arrow(v)$
  let uv-len = $|arrow(u)||arrow(v)|$
  let range-text = if calc.abs(c - 1) < eps {
    $#udv = #uv-len$
  } else if calc.abs(c + 1) < eps {
    $#udv = -#uv-len$
  } else if c > eps {
    $0 < #udv < #uv-len$
  } else if c < -eps {
    $-#uv-len < #udv < 0$
  } else {
    $#udv = 0$
  }
  content((lu + 1.5, lv + 0.8), range-text, anchor: "north-east")

  // 投影：內積為正塗綠色、為負塗紫色
  if calc.abs(c) > eps {
    let proj-color = if c > 0 { green.darken(10%).transparentize(30%) } else { purple.transparentize(30%) }
    line(O, foot, stroke: proj-color + 6pt)
    // 投影長度標在 v 的另一側
    if calc.abs(s) > eps {
      content(
        (foot.at(0) / 2, if s > 0 { -0.35 } else { 0.35 }),
        $lr(|#h(0pt) |arrow(v)| cos theta #h(0pt)|)$,
      )
    }
  }

  // 垂線與直角記號
  if calc.abs(s) > eps and calc.abs(c) > eps {
    line(v, foot, stroke: (paint: black, dash: "dashed", thickness: 0.8pt))
    let d = 0.2
    let sx = if c > 0 { -1 } else { 1 }  // 往原點那側
    let sy = if s > 0 { 1 } else { -1 }
    line(
      (foot.at(0) + sx * d, 0),
      (foot.at(0) + sx * d, sy * d),
      (foot.at(0), sy * d),
      stroke: 0.6pt,
    )
  }

  // 夾角：取 u 和 v 之間不超過 180 度的那個角
  if ang > 0deg {
    let (start, stop) = if s >= -eps { (0deg, ang) } else { (ang, 360deg) }
    arc(O, start: start, stop: stop, radius: 0.5, anchor: "origin", stroke: orange + 0.8pt)
    let mid = (start + stop) / 2
    content(
      (0.8 * calc.cos(mid), 0.8 * calc.sin(mid)),
      text(fill: orange)[$theta$],
    )
  }

  // 向量
  line(O, u, stroke: blue.darken(20%) + 1.2pt, mark: (end: "stealth", fill: blue.darken(20%)))
  line(O, v, stroke: red.darken(20%) + 1.2pt, mark: (end: "stealth", fill: red.darken(20%)))

  content((lu + 0.35, 0), text(fill: blue.darken(20%))[$arrow(u)$])
  content(
    ((lv + 0.35) * c, (lv + 0.35) * s + if ang == 0deg { 0.3 } else { 0 }),
    text(fill: red.darken(20%))[$arrow(v)$],
  )
  circle(O, radius: 0.04, fill: black)
})

#for i in range(frames) {
  if i > 0 { pagebreak() }
  frame(i * step)
}
