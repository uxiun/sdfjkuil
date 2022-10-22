import React from "react"

import {
    code_key_map
    , char_code_map
    , OutProps
    , keyinfo_list
    , Keyname_jpn
    , SizeInfo
} from "../../lib/Out"

const Out: React.VFC<OutProps> = (props: OutProps) => {
    const res = props.res === undefined
        ? {
            res: [],
            info: {
                mojisu: 0,
                word: 0,
                linebreak: 0,
            }
        }
        : props.res
    keyinfo_list.forEach((keyinfo, i) => {
        code_key_map.set(i, keyinfo)
        char_code_map.set(keyinfo.char, i)
    })
    const text_size_infos = [
        "mojisu"
        , "word"
        , "linebreak"
    ]
    return (
        <div className="output">
            <div className="short">
                {
                    res.res.map(([gyo, gyoxes], i) =>
                        <div key={`gyo${i}`}>
                            {/* <div className="gyo">{gyo}</div> */}
                            <div
                                className="gyo styled"
                                key={`styled_gyo${i}`}
                            >
                                {
                                    gyoxes.map(([gloss, glosstag, tagclass])=> {
                                        const cl = `${glosstag} ${glosstag}${tagclass}`
                                        return <span className={cl} key={gloss}>{gloss}</span>
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="detail">
                detail
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