#!/usr/bin/env bash

typst compile $1.typ $1-{n}.png --ppi 300
for f in $1-*.png; do
    num=$(echo $f | grep -oE '[0-9]+')
    new_name=$(printf "$1-%02d.png" $((10#$num))) 
    if [ "$f" != "$new_name" ]; then
        mv "$f" "$new_name"
    fi
done

magick -delay 50 -loop 0 $1-*.png $1.gif
rm $1-*.png
