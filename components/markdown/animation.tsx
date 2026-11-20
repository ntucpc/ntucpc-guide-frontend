"use client"
import { useEffect, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBackwardStep,
    faForwardStep,
    faPause,
    faPlay,
} from "@fortawesome/free-solid-svg-icons"

const SPEEDS = [0.25, 0.5, 1, 1.5, 2]
const DEFAULT_DELAY = 500

type AnimationProps = {
    // Public path of the frame directory, rewritten by remarkAnimation
    src: string
    // Number of frames 1.svg ... N.svg, added by remarkAnimation
    frames: string
    // Comma-separated display widths (px) of the frames, added by remarkAnimation
    widths: string
    // Milliseconds per frame at 1x speed
    delay?: string
    // Display width (px) of the widest frame, like <figure width="...">; the others scale with it
    width?: string
}

function ControlButton(props: {
    label: string
    onClick: () => void
    children: ReactNode
}) {
    return (
        <button
            type="button"
            aria-label={props.label}
            title={props.label}
            onClick={props.onClick}
            className="w-7 h-7 shrink-0 rounded-md flex items-center justify-center text-fg-muted hover:text-fg hover:bg-surface-muted transition-colors"
        >
            {props.children}
        </button>
    )
}

export function Animation(props: AnimationProps) {
    const frameCount = parseInt(props.frames)
    const naturalWidths = props.widths.split(",").map((w) => parseInt(w))
    const scale = props.width
        ? parseFloat(props.width) / Math.max(...naturalWidths)
        : 1
    const widths = naturalWidths.map((w) => w * scale)
    const delay = props.delay ? parseFloat(props.delay) : DEFAULT_DELAY

    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(true)
    const [speed, setSpeed] = useState(1)

    // Respect the reader's reduced motion setting by starting paused
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPlaying(false)
        }
    }, [])

    // Advance one frame after the (speed-adjusted) delay, looping like a GIF
    useEffect(() => {
        if (!playing || frameCount <= 1) return
        const timer = setTimeout(
            () => setIndex((i) => (i + 1) % frameCount),
            delay / speed
        )
        return () => clearTimeout(timer)
    }, [playing, index, speed, delay, frameCount])

    const goTo = (i: number) => {
        setPlaying(false)
        setIndex(Math.min(Math.max(i, 0), frameCount - 1))
    }
    const togglePlaying = () => setPlaying((p) => !p)

    // Shortcuts when the player itself (not one of its controls) is focused
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return
        if (e.key === " " || e.key === "k") togglePlaying()
        else if (e.key === "ArrowLeft") goTo(index - 1)
        else if (e.key === "ArrowRight") goTo(index + 1)
        else return
        e.preventDefault()
    }

    return (
        <div
            tabIndex={0}
            onKeyDown={onKeyDown}
            aria-label="動畫（空白鍵播放／暫停，左右方向鍵切換步驟）"
            className="mx-auto my-2 w-fit max-w-full flex flex-col items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-4"
        >
            {/* All frames are stacked in one grid cell so the size never jumps; only the current one is visible */}
            {/* Figures are drawn for a white background, so keep it white in dark mode */}
            <div
                className="grid cursor-pointer dark:bg-white dark:rounded-md"
                onClick={togglePlaying}
            >
                {Array.from({ length: frameCount }, (_, i) => (
                    <img
                        key={i}
                        src={`${props.src}/${i + 1}.svg`}
                        width={widths[i]}
                        alt={i === index ? `動畫第 ${i + 1} 步` : ""}
                        aria-hidden={i !== index}
                        loading="lazy"
                        draggable={false}
                        className={`[grid-area:1/1] place-self-center max-w-full h-auto select-none ${
                            i === index ? "visible" : "invisible"
                        }`}
                    />
                ))}
            </div>

            <div className="mt-1 w-full min-w-[18rem] flex items-center gap-1 text-sm text-fg-muted">
                <ControlButton label="上一步" onClick={() => goTo(index - 1)}>
                    <FontAwesomeIcon icon={faBackwardStep} />
                </ControlButton>
                <ControlButton
                    label={playing ? "暫停" : "播放"}
                    onClick={togglePlaying}
                >
                    <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                </ControlButton>
                <ControlButton label="下一步" onClick={() => goTo(index + 1)}>
                    <FontAwesomeIcon icon={faForwardStep} />
                </ControlButton>
                <input
                    type="range"
                    aria-label="目前步驟"
                    min={0}
                    max={frameCount - 1}
                    value={index}
                    onChange={(e) => goTo(parseInt(e.target.value))}
                    className="flex-1 min-w-0 mx-1 accent-accent-500 cursor-pointer"
                />
                <span className="tabular-nums whitespace-nowrap">
                    {index + 1} / {frameCount}
                </span>
                <select
                    aria-label="播放速度"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="ml-1 h-7 px-1 rounded-md bg-surface border border-line text-fg-muted cursor-pointer"
                >
                    {SPEEDS.map((s) => (
                        <option key={s} value={s}>
                            {s}x
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
