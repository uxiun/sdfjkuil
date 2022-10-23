import type { VFC } from "react"
import React from "react"
import { useState, useRef } from "react"
import {Res, KeyInfo, parse} from "../../lib/Out"
import Out from "./OutCompo"

const InAndOut: VFC = () => {
    const [moji, setMoji] = useState("")
    const [res, setRes] = useState<Res>({
        res: [],
        info: {
            mojisu: 0,
            linebreak: 0,
            word: 0
        }
    })
    // const [tksa, setTksa] = useState(0)
    // const mojiRef = useRef(null)
    const mojimwbm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const m = e.target.value
        setMoji(m)

    }

    //tameshi start

    //tameshi end
    return (
        <>
            <textarea
                // ref={mojiRef}
                value={moji}
                onChange={mojimwbm}
                rows={8}
                className="input"
            />
            {/* <Out moji={moji} /> */}
        </>
    )
}

const In: VFC<SetState> = ({setstate}: SetState) => {
    const [moji, setMoji] = useState("")
    const moji_reflect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const m = e.target.value
        setMoji(m)
        setstate.moji(m)
    }

    return (
        <textarea
            value={moji}
            onChange={moji_reflect}
            rows={8}
            className="input"
        />
    )
}

type SetState = {
    setstate: {
        moji: (s: string) => void
    }
}

const Parser: VFC = () => {
    //infile global object
    const [m, setM] = useState("")
    const set_moji = (m: string) => setM(m)
    const setstate = {
        moji: set_moji
    }
    return (
        <div className="mainpage parser center-sayu">
            <h1>構文解析器</h1>
            {/* <InAndOut /> */}
            <In setstate={setstate} />
            <Out moji={m} />
        </div>
    )
}

export default Parser