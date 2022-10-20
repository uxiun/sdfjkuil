import type { VFC } from "react"
import React from "react"
import { useState, useRef } from "react"
import {Out, KeyInfo, parse} from "../parser/Out"

type Res = {
    res: string[],
    info: {
        mojisu: number,
        linebreak: number,
        word: number,
    }
}
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
        const r = parse(m)
        setRes(r)
    }
    return (
        <>
            <textarea
                // ref={mojiRef}
                value={moji}
                onChange={mojimwbm}
                rows={8}
                className="input"
            />
            <Out res={res} />
        </>
    )
}




const Parser: VFC = () => {
    //infile global object

    return (
        <div className="mainpage center-sayu">
            <h1>構文解析器</h1>
            <InAndOut />
        </div>
    )
}

export default Parser