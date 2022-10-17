import type { VFC } from "react"
import { useState, useRef } from "react"

const sdfjkl_set = {
    d18: /[wersdfzxcuiojklm,.]/,
    f9: /[wersdfzxc]/,
    j9: /[uiojklm,.]/,
    dk: /[sdfjkl]/,
}

const Chars = "wersdfzxcuiojklm,."
const grammar_values = {
    concatanation: [0,1,2],
    stem: [1,2,3,0],
    version: [
        ["PRS", "processual", "通常版"],
        ["CPT", "completive", "完了版"],
    ],
    specification: [
        ["BSC", "basic", "全指向"],
        ["CTE", "contential", "内容指向"],
        ["CSV", "constitutive", "構成指向"],
        ["OBJ", "objective", "対物指向"],
    ],
    function: [
        ["STA", "stative", "静"],
        ["DYN", "dynamic", "動"],
    ],
    context: [
        ["EXS", "existential", "存在文脈"],
        ["FNC", "functional", "機能文脈"],
        ["RPS", "representational", "寓意文脈"],
        ["AMG", "amalgamative", "融合文脈"],
    ],
    affiliation: [
        ["NAT", "natural", "自然組"],
        ["ASO", "associative", "提携組"],
        ["COA", "coalescent", "相補組"],
        ["VAR", "variable", "不揃組"],
    ],
    configuration: {
        plexity: [false, true],
        similarity: [
            ["S", "similar", "似"],
            ["D", "dissimilar", "異"],
            ["F", "fuzzy", "曖昧"],
        ],
        connectivity: [
            ["S", "seperate", "離"],
            ["C", "connected", "結"],
            ["F", "fused", "混"]
        ]
    }
} as const
const grammar_nantaku = {
    concatenation: 3,
    stem: 4,
    version: 2,
    specification: 4,
    function: 2,
    context: 4,
    affiliation: 4,
    configuration: 20,
    extension: 6,
    perspective: 4,
    essence: 2,
    valence: 9,
    phase: 9,
    effect: 9,
    level: 9,
    mood: 6,
    casescope: 6,
    aspect: 36,
    illocution: 2,
    validation: 8,
    expectation: 3,
    case: 68,
    orcase: 2,
}

const key_forms = {
    DAN: "dan",
    FUTI: "futi",
    MASU: "masu"
} as const
type KeyForm = typeof key_forms[keyof typeof key_forms]
type KeyGroup = {
    form: KeyForm,
    fjfree: boolean,
}
let key_grouping: Map<number[], KeyGroup> = new Map()
key_grouping.set([3,6], {form: "dan", fjfree: false})
key_grouping.set([2,4], {form: "futi", fjfree: true})

const slot_structure = [
    {
        taku: [
            {skip: [0,2,3,4,5]},
        ]
    },
    {
        zi: 1,
        cover: [
            "concatenation",
            { kouho: ["case", "mood"], decider: ["orcase"] },
        ]
    },
    {
        zi: 1,
        cover: [
            "specification",
            "function"
        ]
    }
];

const Hinsi = {
    root: "root",
    kino: "kino",
    affixes: "affixes"
} as const
type Hinsi = typeof Hinsi[keyof typeof Hinsi]

type Slot = {
    name: string
    grammar: [string]
    skip: [number]
}
function read_root(word) {
    const match = word.match(/^[wersdfzxcuiojklm,\.]+$/)
    return match
}
function read_kino(word) {
    const match = word.match(/^[wersdfzxcuiojklm,\.a;]+$/)
    return match
}
function is_affixes(word) {
    return false
}

function readgyo(gyo, gyosu) {
    const delemeter = " "
    const words = gyo.match(/\S+/g)
    if (words) {
        let wordres_list: string[] = []
        let formative_started = false
        let pre_hinsi: Hinsi = "root"
        for (const [i,word] of words.entries()) {
            if (word == undefined) {
                continue;
            }
            if (formative_started) {
                if (is_affixes(word) ) {

                } else {
                    const r = read_kino(word)
                    if (r) {
                        wordres_list.push(`${word}<kino>`)
                    } else {
                        return `line[${gyosu}] word[${i}] invalid kino: '${word}'`
                    }
                    formative_started = false
                }
            } else {
                formative_started = true
                const r = read_root(word)
                if (r) {
                    wordres_list.push(`${word}<root>`)
                } else {
                    return `line[${gyosu}] word[${i}] invalid root: '${word}'`
                }
            }
        }
        let w = wordres_list.reduce((d,f) => d+delemeter+f, "")
        return w.substring(delemeter.length)
    } else {
        return gyo
    }
}
function parse(moji) {
    let gyos = moji.split("\n")
    let br = (moji.match(/\n\S/g) || []).length
    let lines = br==0 ? 0 : br+1

    return {
        res: gyos.map((gyo,i) => readgyo(gyo, i)),
        info: {
            mojisu: moji.length,
            linebreak: lines,
            word: (moji.match(/\S+/g) || []).length,
        }
    }
}

const Keyname_jpn = {
    mojisu: "字数",
    linebreak: "行数",
    word: "語数",
}

const Out: VFC = ({res}) => {

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
                ? Object.entries(res.info).map( kv => {
                    const [key, value] = kv
                    return (
                        <div className="child" key={key}>
                            {Keyname_jpn[key]}: {value}
                        </div>
                    )
                }  )
                : ""}
            </div>
        </div>
    )
}
const InAndOut: VFC = () => {
    const [moji, setMoji] = useState("")
    const [res, setRes] = useState({
        res: []
    })
    // const [tksa, setTksa] = useState(0)
    // const mojiRef = useRef(null)
    const mojimwbm = (e) => {
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
            />
            <Out res={res} />
        </>
    )
}




const Parser: VFC = () => {
    return (
        <div className="mainpage center-sayu">
            <h1>構文解析器</h1>
            <InAndOut />
        </div>
    )
}

export default Parser