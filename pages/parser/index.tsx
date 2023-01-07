import { useAtom } from "jotai"
import type { FC } from "react"
import React from "react"
import { useState, useRef } from "react"
import { defaultParsersOption, lineparsersOptionAtom, ParsersOption, selectedLanguage } from "../../lib/jotai"
import { Res, KeyInfo, parse, markupParsedSynthLine, Glosstsx, markupParsedSynthWords } from "../../lib/Out"
import { AllLanguage, Language } from "../../lib/phone"
import Out from "./OutCompo"
import {useForm} from "react-hook-form"


const InAndOut: FC = () => {
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
        rows={3}
        className="input"
      />
      {/* <Out moji={moji} /> */}
    </>
  )
}

const In: React.FC<SetState> = ({ setstate }: SetState) => {
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
      rows={3}
      className="input"
    />
  )
}

type SetState = {
  setstate: {
    moji: (s: string) => void
  }
}

const Setting: React.FC = () => {
  const [currentLang, setLang] = useAtom(selectedLanguage)
  const select = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as Language)
  }
  return (
    <div className="setting">
      <select id="select_language" onChange={select} >
        <option value="">文法選択</option>
        {
        AllLanguage.map((lang, i) => <option value={lang} selected={lang === currentLang} >{lang}</option> )
      } </select>
    </div>
  )
}

const InLine: React.FC<SetState> = ({setstate}: SetState) => {
  // const [text, setText] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setstate.moji(e.target.value)
  }
  return(
    <input type="text" onChange={onChange} />
  )
}
type OutLineProps = {
  text: string,
  lang: Language,
}

const OutLine: React.FC<OutLineProps> = ({text, lang}: OutLineProps) => {
  //const words = text.split("\s")
  const [option] = useAtom(lineparsersOptionAtom)
  const glosstsxList: Glosstsx[] = markupParsedSynthLine(text, lang)
  return <div className="synth-line gyo">{
    glosstsxList.map(([gloss, glosstag, tagclass], j) => {
      const cl = `${glosstag} ${glosstag}${tagclass}`
      let key = `${gloss}${j}`
      if (glosstag === 'value') key += `${Math.random()}`
      return <span className={cl} key={key}>{gloss}</span>
    })
  } </div>
}
const OutLinebreak: React.FC<OutLineProps> = ({text, lang}: OutLineProps) => {
  //const words = text.split("\s")
  const glosstsxLists: Glosstsx[][] = markupParsedSynthWords(text, lang)
  return <div className="synth-line gyo">{
    glosstsxLists.map( list => {
      const spans = list.map( ([gloss, glosstag, tagclass], j) => {
        const cl = `${glosstag} ${glosstag}${tagclass}`
        let key = `${gloss}${j}`
        if (glosstag === 'value') key += `${Math.random()}`
        return <span className={cl} key={key}>{gloss}</span>
      })
      return <div className="word">{spans}</div>
    })
  } </div>
}

type LineParserProps = {
  lang: Language,
  setting: ParsersOption
}
const LineParser: React.FC<LineParserProps> = ({lang}: LineParserProps) => {
  const [option] = useAtom(lineparsersOptionAtom)
  const [text, setText] = useState("")
  const set_moji = (m: string) => setText(m)
  const setstate = {
    moji: set_moji
  }
  return(
    <div id="line-parser">
      {lang}
      <InLine setstate={setstate} />
      {outSwitcher(option)(text, lang)}
    </div>
  )
}

const outSwitcher = (option: ParsersOption) => (text: string, lang: Language) => {
  console.log("outSwitcher <- ", option)
  return option.linebreak? <OutLinebreak text={text} lang={lang} /> : <OutLine text={text} lang={lang} />
}

type States<T> = {
  current: T,
  setter: (t: T) => void
}
function orDefault<T> (defau: T, optional: T | null | undefined): T {
  return optional? optional: defau
}
const ParsersSetting: React.FC<States<ParsersOption>> = ({current, setter}: States<ParsersOption>) => {
  const {register, getValues}  =useForm<ParsersOption>({
    defaultValues: defaultParsersOption
  })
  const [atom, setAtom] = useAtom(lineparsersOptionAtom)
  const typemap = new Map([
    ["linebreak" as keyof ParsersOption , "checkbox"]
  ])
  // const formOnChange = (e: React.ChangeEvent<HTMLFormElement>) => {
  const formOnChange = (e: React.FormEvent<HTMLFormElement>) => (option: ParsersOption) => {
    console.log("form changed.", e)
    console.log("option:", option)
    setAtom(option)
  }
  return(<div id="parsers-setting">
    <form onChange={e => formOnChange (e) (getValues())} >
    { Object.entries(current).map( kv => {
      const k = kv[0] as keyof ParsersOption
      return <label>{k} <input type={orDefault("checkbox", typemap.get(k) )} {...register(k)} /></label>
    })
    }
    </form>
  </div>)
}
const Parsers: React.FC = () => {
  const [opt, setOpt] = useState<ParsersOption>(defaultParsersOption)

  return (
    <div id="parsers">
      <h2>合成部分のみ</h2>
      <ParsersSetting current={opt} setter={setOpt} />
      {AllLanguage.map(l => <LineParser lang={l} setting={opt} /> ) }
    </div>
  )
}
const Parser: React.FC = () => {
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
      <Setting />
      <In setstate={setstate} />
      <Out moji={m} />
      <Parsers />
    </div>
  )
}

export default Parser