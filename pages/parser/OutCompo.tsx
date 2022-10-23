import React from "react"
import { parse } from "../../lib/Out"

import {
    code_key_map
    , char_code_map
    , OutProps
    , keyinfo_list
    , Keyname_jpn
    , SizeInfo
} from "../../lib/Out"

type OutProps2 = {
    moji: string
}

const Out: React.VFC<OutProps2> = ({moji}: {moji: string}) => {
    keyinfo_list.forEach((keyinfo, i) => {
        code_key_map.set(i, keyinfo)
        char_code_map.set(keyinfo.char, i)
    })
    const parsed = parse(moji)
    const res = parsed === undefined
        ? {
            res: [],
            info: {
                mojisu: 0,
                word: 0,
                linebreak: 0,
            }
        }
        : parsed
    const res_html = res.res.map(([gyo, gyoxes], i) =>
        <React.Fragment key={`gyo${i}`}>
            <div className="gyo styled">{
                gyoxes.map(([gloss, glosstag, tagclass], j)=> {
                    const cl = `${glosstag} ${glosstag}${tagclass}`
                    const key = `${i}${gloss}${j}`
                    return <span className={cl} key={key}>{gloss}</span>
                })
            }</div>
        </React.Fragment>
    )


    const text_size_infos = [
        "mojisu"
        , "word"
        , "linebreak"
    ]
    return (
        <div className="output">
            <div className="gloss">
                {res_html}
            </div>
            <div className="info">
                {res.info
                    ? <>
                        {
                            text_size_infos.map(info_name => {
                                const value = res.info[info_name as keyof SizeInfo]
                                return (
                                    <div className="child" key={info_name}>
                                        {Keyname_jpn(info_name)}: {value}
                                    </div>
                                )
                            })
                        }
                    </>
                    : ""}
            </div>
        </div >
    )
}

export default Out