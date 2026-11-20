#!/usr/bin/env bash
# Export each page of $1.typ as a frame of <animation src="$1" />
rm -rf "$1" && mkdir "$1"
typst compile --input animation=true "$1.typ" "$1/{p}.svg"
