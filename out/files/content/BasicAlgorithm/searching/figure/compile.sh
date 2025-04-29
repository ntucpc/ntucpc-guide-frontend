#!/usr/bin/env bash

typst compile $1.typ
convert -density 300 $1.pdf -background white -alpha remove -alpha off $1.png
for i in {0..9}; do mv $1-${i}.png $1-0${i}.png; done
convert -delay 50 -loop 0 $1*.png $1.gif
rm *.png

