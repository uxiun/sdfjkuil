import React from "react"

import {
    code_key_map
    ,char_code_map
    ,OutProps
    ,keyinfo_list
    ,Keyname_jpn
} from "./Out"

const Out: React.VFC<OutProps> = ({ res }: OutProps) => {
    keyinfo_list.forEach((keyinfo, i) => {
        code_key_map.set(i, keyinfo)
        char_code_map.set(keyinfo.char, i)
    })
    return (
        <div className="output">
            <div className="short">
                {res.res.map((gyo, i) => <div className="gyo" key={`gyo${i}`}>{gyo}</div>)}
            </div>
            <div className="detail">
                detail
            </div>
            <div className="info">
                {res.info
                    ? <>
                        {Object.entries(res.info).map(kv => {
                            const [key, value] = kv
                            return (
                                <div className="child" key={key}>
                                    {Keyname_jpn(key)}: {value}
                                </div>
                            )
                        })}
                    </>
                    : ""}
            </div>
        </div>
    )
}

export default Out