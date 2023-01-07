import { useAtom } from "jotai"
import React from "react"
import { useState } from 'react'
import { selectedLanguage } from "../../lib/jotai"
import { parse } from "../../lib/Out"

import {
  code_key_map
  , char_code_map
  , OutProps
  , keyinfo_list
  , Keyname_jpn
  , SizeInfo
} from "../../lib/Out"
import { Language } from "../../lib/phone"

type OutProps2 = {
  moji: string
}

const AtLeastZero = (x: number) => x < 0 ? 0 : x

const Out: React.FC<OutProps2> = ({ moji }: { moji: string }) => {
  keyinfo_list.forEach((keyinfo, i) => {
    code_key_map.set(i, keyinfo)
    char_code_map.set(keyinfo.char, i)
  })
  const _moji = moji === undefined ? "" : moji
  const [currentLang] = useAtom(selectedLanguage)
  const parsed = parse(_moji, currentLang)
  const res = parsed
  const map = new Map<string, boolean>
  const [isfirst, setisfirst] = useState(map)
  const res_html = res.res.map(([gyo, gyoxes], i) =>
    <React.Fragment key={`gyo${i}`}>
      <div className="gyo styled">{
        gyoxes.map(([gloss, glosstag, tagclass], j) => {
          const cl = `${glosstag} ${glosstag}${tagclass}`
          let key = `${i}${gloss}${j}`
          if (glosstag === 'value') key += `${Math.random()}`
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
                    {Keyname_jpn(info_name)}: {AtLeastZero(value)}
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