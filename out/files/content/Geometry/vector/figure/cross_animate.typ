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
  rect((-lv - 0.8, -lv - 0.8), (lu + lv + 0.8, lv + 0.8), stroke: none)

  let O = (0, 0)
  let u = (lu, 0)
  let v = (lv * calc.cos(ang), lv * calc.sin(ang))
  let uv = (u.at(0) + v.at(0), v.at(1))
  let s = calc.sin(ang)
  let positive = s > 1e-9
  let negative = s < -1e-9

  // 右上角標示外積目前的範圍
  let uxv = $arrow(u) times arrow(v)$
  let uv-len = $|arrow(u)||arrow(v)|$
  let range-text = if calc.abs(s - 1) < 1e-9 {
    $#uxv = #uv-len$
  } else if calc.abs(s + 1) < 1e-9 {
    $#uxv = -#uv-len$
  } else if positive {
    $0 < #uxv < #uv-len$
  } else if negative {
    $-#uv-len < #uxv < 0$
  } else {
    $#uxv = 0$
  }
  content((lu + lv + 0.8, lv + 0.8), range-text, anchor: "north-east")

  // 平行四邊形：外積為正塗藍色、為負塗紅色
  let fill-color = if positive { blue.lighten(80%) } else if negative { red.lighten(80%) } else { none }
  line(O, u, uv, v, close: true, fill: fill-color, stroke: gray + 0.6pt)

  // 高：從不在底邊 u 上的頂點往 u 所在直線作垂線，
  // 選垂足落在底邊 [0, |u|] 內的那個頂點
  if positive or negative {
    let top = if v.at(0) >= 0 { v } else { uv }
    let foot = (top.at(0), 0)
    line(top, foot, stroke: (paint: black, dash: "dashed", thickness: 0.8pt))
    // 直角記號
    let d = 0.2
    let sx = if top.at(0) + d <= lu { 1 } else { -1 }
    let sy = if positive { 1 } else { -1 }
    line(
      (foot.at(0) + sx * d, 0),
      (foot.at(0) + sx * d, sy * d),
      (foot.at(0), sy * d),
      stroke: 0.6pt,
    )
    // 高的長度標在平行四邊形內側：
    // 從 v 往下作垂線時內側在右邊，從 u + v 往下作垂線時內側在左邊
    // 但從 u + v 往下作垂線且平行四邊形很扁時，內側會撞到夾角，改標在 u + v 外面
    let h-label = $lr(|#h(0pt) |arrow(v)| sin theta #h(0pt)|)$
    let inside-right = top == v
    if not inside-right and calc.abs(s) < 0.5 {
      content(
        (top.at(0), top.at(1) + sy * 0.15),
        h-label,
        anchor: if positive { "south" } else { "north" },
      )
    } else {
      content(
        (foot.at(0) + if inside-right { 0.15 } else { -0.15 }, top.at(1) / 2),
        h-label,
        anchor: if inside-right { "west" } else { "east" },
      )
    }
  }

  // 夾角：從 u 逆時針轉到 v
  if ang > 0deg {
    arc(O, start: 0deg, stop: ang, radius: 0.5, anchor: "origin", stroke: orange + 0.8pt)
    content(
      (0.8 * calc.cos(ang / 2), 0.8 * calc.sin(ang / 2)),
      text(fill: orange)[$theta$],
    )
  }

  // 向量
  line(O, u, stroke: blue.darken(20%) + 1.2pt, mark: (end: "stealth", fill: blue.darken(20%)))
  line(O, v, stroke: red.darken(20%) + 1.2pt, mark: (end: "stealth", fill: red.darken(20%)))

  content((lu / 2, if negative { 0.3 } else { -0.3 }), text(fill: blue.darken(20%))[$arrow(u)$])
  content(
    ((lv + 0.35) * calc.cos(ang), (lv + 0.35) * calc.sin(ang) + if ang == 0deg { 0.3 } else { 0 }),
    text(fill: red.darken(20%))[$arrow(v)$],
  )
  circle(O, radius: 0.04, fill: black)
})

#for i in range(frames) {
  if i > 0 { pagebreak() }
  frame(i * step)
}
