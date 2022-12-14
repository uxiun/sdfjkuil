import {gloss, StrTsx} from "./Pattern"
import { Language, selectGlosser } from "./phone"

export const keyinfo_list: KeyInfo[] = [
    {
        char: "w",
        yubi: 3,
        dan: 1,
        left: true,
    },
    {
        char: "e",
        yubi: 2,
        dan: 1,
        left: true,
    },
    {
        char: "r",
        yubi: 1,
        dan: 1,
        left: true,
    },
    {
        char: "s",
        yubi: 3,
        dan: 0,
        left: true,
    },
    {
        char: "d",
        yubi: 2,
        dan: 0,
        left: true,
    },
    {
        char: "f",
        yubi: 1,
        dan: 0,
        left: true,
    },
    {
        char: "z",
        yubi: 3,
        dan: -1,
        left: true,
    },
    {
        char: "x",
        yubi: 2,
        dan: -1,
        left: true,

    },
    {
        char: "c",
        yubi: 1,
        dan: -1,
        left: true,
    },
    {
        char: "a",
        yubi: 4,
        dan: 0,
        left: true,
    },
    {
        char: "o",
        yubi: 3,
        dan: 1,
        left: false,
    },
    {
        char: "i",
        yubi: 2,
        dan: 1,
        left: false,
    },
    {
        char: "u",
        yubi: 1,
        dan: 1,
        left: false,
    },
    {
        char: "l",
        yubi: 3,
        dan: 0,
        left: false,
    },
    {
        char: "k",
        yubi: 2,
        dan: 0,
        left: false,
    },
    {
        char: "j",
        yubi: 1,
        dan: 0,
        left: false,
    },
    {
        char: ".",
        yubi: 3,
        dan: -1,
        left: false,
    },
    {
        char: ",",
        yubi: 2,
        dan: -1,
        left: false,
    },
    {
        char: "m",
        yubi: 1,
        dan: -1,
        left: false,
    },
    {
        char: ";",
        yubi: 4,
        dan: 0,
        left: false,
    },
]

const sdfjkl_set = {
    d18: /[wersdfzxcuiojklm,.]/,
    f9: /[wersdfzxc]/,
    j9: /[uiojklm,.]/,
    dk: /[sdfjkl]/,
}
type Kakko = {
    zi: [string, string]
    ,message: [string, string]
    ,gramset: [string, string]
}
export const Kakko: Kakko = {
    zi: ["'", "'"]
    ,message: ["(", ")"]
    ,gramset: ["[", "]"]
}
type Delemeter = {
    word: string,
    grammar: string,
    keitaiso_grammars: string,
    keitaiso: string,
    zi: string,
    zi_grammar: string
    ,whitespace: string
    ,listitem: string
}
export const Delemeter: Delemeter = {
    word: "  ,  ",
    grammar: ".",
    keitaiso_grammars: " - ",
    keitaiso: "/",
    zi: ' ',
    zi_grammar: " "
    , whitespace: " "
    , listitem: ", "
}
const Chars = "wersdfzxcuiojklm,."
const grammar_values = {
    concatanation: [0, 1, 2],
    stem: [1, 2, 3, 0],
    version: [
        ["PRS", "processual", "?????????"],
        ["CPT", "completive", "?????????"],
    ],
    specification: [
        ["BSC", "basic", "?????????"],
        ["CTE", "contential", "????????????"],
        ["CSV", "constitutive", "????????????"],
        ["OBJ", "objective", "????????????"],
    ],
    function: [
        ["STA", "stative", "???"],
        ["DYN", "dynamic", "???"],
    ],
    context: [
        ["EXS", "existential", "????????????"],
        ["FNC", "functional", "????????????"],
        ["RPS", "representational", "????????????"],
        ["AMG", "amalgamative", "????????????"],
    ],
    affiliation: [
        ["NAT", "natural", "?????????"],
        ["ASO", "associative", "?????????"],
        ["COA", "coalescent", "?????????"],
        ["VAR", "variable", "?????????"],
    ],
    configuration: {
        plexity: [false, true],
        similarity: [
            ["S", "similar", "???"],
            ["D", "dissimilar", "???"],
            ["F", "fuzzy", "??????"],
        ],
        connectivity: [
            ["S", "seperate", "???"],
            ["C", "connected", "???"],
            ["F", "fused", "???"]
        ]
    }
} as const

export type GrammarTaku = {
    concatenation: number,
    stem: number,
    version: number,
    specification: number,
    function: number,
    context: number,
    affiliation: number,
    configuration: number,
    extension: number,
    perspective: number,
    essence: number,
    valence: number,
    phase: number,
    effect: number,
    level: number,
    mood: number,
    casescope: number,
    aspect: number,
    illocution: number,
    validation: number,
    // expectation: number,
    illovali: number,
    case: number,
    casegroup: number,
    aspector: number,
    //orcase: number,
    notspecified: number,
}
export const grammar_nantaku: GrammarTaku = {
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
    //expectation: 3,
    illovali: 17,
    case: 68,
    casegroup: 4,
    aspector: 2,
    //orcase: 2,
    notspecified: 1,
}
const grammar_names = {
    con: "concatenation",
    ste: "stem",
    ver: "version",
    spe: "specification",
    fun: "function",
    cont: "context",
    aff: "affiliation",
    conf: "configuration",
    ext: "extension",
    per: "perspective",
    ess: "essence",
    val: "valence",
    pha: "phase",
    eff: "effect",
    lev: "level",
    moo: "mood",
    scope: "casescope",
    asp: "aspect",
    ill: "illocution",
    vali: "validation",
    // exp: "expectation",
    ilvl: "illovali",
    case: "case",
    asor: 'aspector',
    caseb: 'casegroup',
    // or: "orcase",
    skip: "skip",
    notspeci: "notspecified",
} as const
export type GrammarName = typeof grammar_names[keyof typeof grammar_names]
export type KeyInfo = {
    char: string,
    left: boolean,
    yubi: number, //??????????????????0..5
    dan: number, //?????????1 0 -1
}

export let code_key_map: Map<number, KeyInfo> = new Map()
export let char_code_map: Map<string, number> = new Map()

const key_forms = {
    DAN: "dan",
    FUTI: "futi",
    MASU: "masu",
    RETU: "retu",
    k20: "20-1",
    sdfe: "sdfe",
    ue: "wersdf",
} as const
type KeyForm = typeof key_forms[keyof typeof key_forms]

type InRange = (d: number) => boolean
type GroupId = (d: number) => number

let keyform_func_map: Map<KeyForm, [InRange, GroupId]> = new Map([
    ["dan", [(d: number) => 0 <= d && d < 20 && d % 10 !== 9, (d: number) => ~~((d % 10) / 3)]], //?????????0,1,2
    ["retu", [(d: number) => 0 <= d && d < 20 && d % 10 !== 9, (d: number) => d % 3]],  //????????????0,1,2
    ["futi", [(d: number) => 0 <= d && d < 20 && d % 10 !== 9 && d % 10 !== 4, (d: number) => d % 2]], // 0268 1357 <4> ?????????0 ??????1
    ["masu", [(d: number) => 0 <= d && d < 20 && d % 10 !== 9, (d: number) => d < 10 ? 0 : 1]], //wersdfzxc?????????0...10
    ["20-1", [(d: number) => 0 <= d && d < 20, (d: number) => d]], //
    ["sdfe", [(d: number) => (3 <= d % 10 && d % 10 < 6) || d % 10 === 1, (d: number) => {
        const k = d % 10
        return k===1 ? 0 : k - 2
    }]],
    ["wersdf", [(d: number) => 0 <= d % 10 && d % 10 < 6, (d: number) => d % 10]]
])


type KeyGroup = {
    form: KeyForm,
    fjfree: boolean, //??????????????????????????????????????????????????????????????????false
    fjmix: boolean, // member?????????????????????????????????????????????????????????????????????3??????group?????????????????????sdfjkl???6??????6?????????????????????????????????????????????
}
let key_grouping: Map<string, KeyGroup[]> = new Map([
    ["3-6", [{ form: "dan", fjfree: false, fjmix: true }]],
    ["2-4", [{ form: "futi", fjfree: true, fjmix: false }]],
    ["2-9", [{ form: "masu", fjfree: false, fjmix: false }]],
    ["4-6", [
        { form: "sdfe", fjfree: false, fjmix: false }, //???????????????grammars??????????????????????????????????????????
        { form: "wersdf", fjfree: false, fjmix: false },
    ]],
    ["9-1", [{ form: "masu", fjfree: true, fjmix: false }]],
    ["18-1", [{ form: "masu", fjfree: false, fjmix: false }]],
    ["20-1", [{ form: "20-1", fjfree: false, fjmix: false }]],
    //number => ?????????[] ??????????????????????????????
])
//            [group, member]

let code_group_memo: Map<number, Map<KeyForm, [number, number]>> = new Map()

function memo_and_ids(code: number, keygroup: KeyGroup) {
    const { form, fjfree, fjmix } = keygroup
    if (!fjmix) { code = code % 10 }
    const gotfuncs = keyform_func_map.get(form)
    let return_id: [number, number] = [-1, -1]
    if (gotfuncs !== undefined) {
        const [in_range, group_id] = gotfuncs
        console.log("group_id", group_id)
        let endindex = 20
        let i = 0
        let chars: number[] = []
        let value_store: Map<number, number[]> = new Map()
        while (i < endindex) {

            if (in_range(i)) {
                const id = group_id(i) //why 11
                // console.log("group_id ->", id)
                let member_id = 0
                const codes = value_store.get(id)
                if (codes === undefined) {
                    value_store.set(id, [i])
                } else {
                    // console.log("codes", codes)
                    const indexofi = codes.indexOf(i)
                    if (indexofi >= 0) {
                        member_id = indexofi
                        // console.log("indexOf i", member_id)
                    } else {
                        value_store.set(id, [...codes, i])
                        member_id = codes.length
                        // console.log("codes.length", member_id)
                    }
                }
                if (i === code) {
                    console.log("i", i, "code", code)
                    return_id = [id, member_id]
                }
                // console.log(`memo.set(${id}, ${member_id})`)
                const memo = code_group_memo.get(i) //code ???????????????
                if (memo === undefined) {
                    const map: Map<KeyForm, [number, number]> = new Map()
                    map.set(form, [id, member_id])
                    code_group_memo.set(i, map)

                } else {
                    memo.set(form, [id, member_id])
                }
            } else {
                // console.log(`${i} is out of range`)
            }
            i += 1
        }
        console.log("value_store", value_store)
    }

    console.log("code_group_memo", code_group_memo)
    console.log("last return_id", return_id)
    return return_id
}

function get_ids(code: number, keygroup: KeyGroup) {
    const code_ = keygroup.fjfree ? code % 10 : code
    const memo = code_group_memo.get(code_)
    if (memo === undefined) {
        console.log("memo_and_ids()")
        return memo_and_ids(code, keygroup)
    } else {
        const id = memo.get(keygroup.form)
        if (id === undefined) {
            console.log("not yet memoed this form")
            return memo_and_ids(code, keygroup)
        } else {
            console.log("returned memo", id)
            return id
        }
    }
}


type Taku = {
    skip: number[]
}
const cover_const = {

}
const grammar_relations = {
    orcase: {
        or: [["casescope", "mood"], ["case", "ive"]],
    },
    ive: {
        with: ["illocution", "validation", "expectation"]
    }
}
type Slot = {
    taku: Taku[],
    cover: GrammarName[],
}
const slot_structure: Slot[] = [
    {
        taku: [
            { skip: [0, 2, 3, 4, 5] },
            { skip: [1] },
            { skip: [] },
            { skip: [2] },
            { skip: [] },
            { skip: [] },
            { skip: [] },
            { skip: [] },
            { skip: [] },
        ],
        cover: ["version"],
    },
    {
        cover: [
            "concatenation",
            "casescope",
        ],
        taku: [],
    },
    {
        cover: [
            "specification",
            "function"
        ],
        taku: [],
    },
    {
        cover: [
            "configuration"
        ],
        taku: [],
    },
    {
        cover: [
            "extension",
            "affiliation"
        ],
        taku: [],
    },
    {
        cover: [
            "perspective",
            "essence"
        ],
        taku: [],
    },
    {
        cover: [
            "valence",
        ],
        taku: [],
    },
    {
        cover: [
            "context",

        ],
        taku: [],
    },
    {
        cover: [
            "case",

        ],
        taku: [],
    },
];

const Hinsi = {
    root: "root",
    kino: "kino",
    affixes: "affixes"
} as const
type Hinsi = typeof Hinsi[keyof typeof Hinsi]

let kino_rules = new Map([
    ["default", slot_structure],
]);

function read_root(word: string) {
    const match = word.match(/^[wersdfzxcuiojklm,\.]+$/)
    const ngmatch = word.match(/^[^wersdfzxcuiojklm,\.]+$/g)
    type IsOk = boolean
    let strlist: string[] = []
    let last_ok = true
    let start_by_ok = true
    let allok = true
    for (const char of word) {
        const ngone = char.match(/^[^wersdfzxcuiojklm,\.]+$/)
        console.log("ngone", ngone)
        if (ngone) {
            allok = false
            if (strlist.length===0 || last_ok) {
                if (strlist.length===0) start_by_ok = false
                strlist.push(char)
            }else{
                let before = strlist[strlist.length-1] //?????????
                strlist[strlist.length-1] += char
            }
            last_ok = false
        } else {
            if (strlist.length===0 || !last_ok) {
                strlist.push(char)
            }else{
                let before = strlist[strlist.length-1] //?????????
                strlist[strlist.length-1] += char
            }
            last_ok = true
        }
    }
    let reslist: Glosstsx[] = []
    if (allok) {
        reslist.push(
            [word, "spell", 0]
        )
    } else {

        strlist.forEach((str, i)=>{
            const g = i%2===0
            const isok = start_by_ok === g
            const topush: Glosstsx = isok
            ? [str, "spell", 0]
            : [str, "errorhere", 0]
            reslist.push(topush)
        })
        reslist = [
            ...reslist
            , [Delemeter.zi_grammar, "delem", 0]
            , ["red invalid", "abouterror", 0]
        ]
    }

    return reslist
}
type GrammaResolve = {
    ruler_index: number,
    grammar: [GrammarName, number]
}
type SkipInfo = {
    skip_slot: number,
    skip_by_slot: number,
    ronri_i: number,
}

function read_kino(word_: string) {
    const match = word_.match(/^[wersdfzxcuiojklm,\.a;]+$/)
    console.log("\n\nword", word_)
    console.log("match", match)
    if (!match) { return match }
    const word = match[0]

    const slots = kino_rules.get("default")
    let infos: GrammaResolve[] = []
    let skip_slots: number[] = []
    let skip_info_map: Map<number, SkipInfo> = new Map()
    let looking_index: number = 0
    let ronri_index: number = 0
    let ronri_literal_index_map: Map<number, number> = new Map()
    let last_ronrisetu_fj = true //right, j
    if (slots !== undefined) {
        slots.forEach((slot, slot_index) => {
            console.log("word[looking_index]", word[looking_index])
            const looking_code = char_code_map.get(word[looking_index])
            let is_skipped = false

            console.log("looking_code", looking_code)
            if (looking_code !== undefined) {
                let skips_group_id = -1
                if (slot.cover.length > 0) {
                    const grammars_origin: [GrammarName, number][] = slot.cover.map(name => {
                        return [name, grammar_nantaku[name as keyof GrammarTaku]]
                    })
                    let grammars = grammars_origin
                    console.log("grammars", grammars)
                    const skip_info = skip_info_map.get(slot_index)
                    //skip_slots.includes(slot_index)
                    if (skip_info !== undefined) {
                        is_skipped = true
                        console.log("this slot skipped")
                        //
                        let skipped_infos: GrammaResolve[] = grammars.map(([name, _]) => {

                            const ruler_index = skip_info.ronri_i
                            return {
                                ruler_index,
                                grammar: [name, 0]
                            }
                        })
                        console.log("skipped_infos", skipped_infos)
                        infos = [...infos, ...skipped_infos]
                    } else {
                        let numbers: string = "";
                        let pattern_items = grammars
                        let has_taku = false
                        if (grammars.length === 1) {
                            const taku_len = slot.taku.length
                            if (taku_len > 0) {
                                has_taku = true
                                pattern_items = [...grammars, ["skip", taku_len]]
                                const sorted = pattern_items.sort((d, f) => d[1] - f[1])

                                console.log("sorted", sorted)
                                numbers = sorted
                                    .map(([_, number]) => number)
                                    .reduce((d, f) => d + "-" + f, "")
                                    .substring(1)
                            } else {
                                numbers = `${grammars[0][1]}-1`
                            }
                        } else {
                            grammars.sort((d, f) => d[1] - f[1])//??????
                            numbers = grammars.map(([name, number]) => number).reduce((d, f) => `${d}-${f}`, "")
                            numbers = numbers.substring(1)
                        }
                        console.log("numbers", numbers)
                        const keygroups = key_grouping.get(numbers)

                        console.log("key_grouping", key_grouping)
                        console.log("key_groups", keygroups)
                        if (keygroups !== undefined && keygroups.length > 0) {
                            const this_fj = looking_code > 9
                            looking_index -= 1
                            let ids_s: [number,number][] = []
                            for (const keygroup of keygroups) {
                                looking_index += 1
                                const looking_code = char_code_map.get(word[looking_index])
                                if (looking_code !== undefined) {

                                    const ids = get_ids(looking_code, keygroup)
                                    ids_s.push(ids)
                                }
                            }
                            pattern_items.forEach(([name, _], i) => {
                                let index = ids_s.length > 1 ? [i, 0] : [0, i]
                                const ids = ids_s[index[0]]
                                if (name === "skip" && has_taku) {
                                    skips_group_id = ids[index[1]]
                                    console.log("i am skip so not add as grammar")
                                } else {
                                    const grammar: GrammaResolve = {
                                        ruler_index: ronri_index,
                                        grammar: [name, ids[index[1]]],
                                    }
                                    infos.push(grammar)
                                }
                            })

                        }
                        console.log("infos", infos)

                    }
                }

                if (slot.taku.length > 0) {
                    const skips_group = slot.taku
                    let groupid = -1
                    if (skips_group_id < 0) {

                        const fjfree = skips_group.length < 10
                        const keygroup: KeyGroup = { form: "masu", fjfree, fjmix: false }
                        console.log("keygroup", keygroup)

                        const [_groupid, memberid] = get_ids(looking_code, keygroup)
                        console.log("groupid", _groupid, "memberid", memberid)
                        groupid = _groupid
                    } else {
                        groupid = skips_group_id
                    }

                    if (skips_group.length < groupid + 1) {
                        console.log("you have to add more skips groups than group_id specified by typed spell")
                    } else {
                        //skip????????????

                        if (skips_group[groupid]) {
                            for (const skip_slot of skips_group[groupid].skip) {
                                const abs_skip_slot = 1 + slot_index + skip_slot
                                // console.log("abs skip slot", abs_skip_slot)
                                const new_skip_info = {
                                    skip_slot: abs_skip_slot,
                                    skip_by_slot: slot_index,
                                    ronri_i: ronri_index,
                                }
                                const already = skip_info_map.get(abs_skip_slot)
                                if (already === undefined) {
                                    skip_info_map.set(abs_skip_slot, new_skip_info)
                                } else {
                                    skip_info_map.set(abs_skip_slot, new_skip_info)

                                }
                                skip_slots.push(abs_skip_slot)
                            }
                        }
                    }
                }
                if (!is_skipped) {
                    ronri_literal_index_map.set(ronri_index, looking_index)
                    ronri_index += 1
                }

            }
            if (!is_skipped) { looking_index += 1 }
        })
    }
    console.log("---------------------")
    console.log("infos", infos)
    console.log("ronri_literal_index_map", ronri_literal_index_map)
    console.log("skip_info_map", skip_info_map)

    let kiridas_range: [number, number] = [0, 0]



    let word_gloss = ""
    let last_literali = -1
    for (const [ronrii, literali] of ronri_literal_index_map) {
        const kiridas_start = kiridas_range[1]
        const kiridas_end = literali + 1
        kiridas_range = [kiridas_start, kiridas_end]
        const target_moji = word.substring(kiridas_start, kiridas_end)

        let ruling_notskip = infos.filter(gram => gram.ruler_index === ronrii)
        // let ruling_skip = Array.from(skip_info_map).filter(([_, skip_info]) => skip_info.ronri_i === ronrii)
        const ruling_grammars = ruling_notskip

        let gloss = ""
        for (const d of ruling_grammars) {
            gloss += `${Delemeter.grammar}${d.grammar[0]}${d.grammar[1]}`
        }
        gloss = gloss.substring(Delemeter.grammar.length)
        gloss = target_moji + Delemeter.keitaiso_grammars + gloss
        word_gloss += Delemeter.keitaiso + gloss

        last_literali = literali
    }
    if (last_literali < word.length - 1) {
        const target_moji = word.substring(last_literali + 1)
        word_gloss += Delemeter.keitaiso + target_moji
    }

    word_gloss = word_gloss.substring(Delemeter.keitaiso.length)
    return word_gloss
}

function is_affixes(word: string) {
    return false
}

const glosstag = {
    other: "other"
    ,attr: "attr"
    ,delem: "delem"
    ,value: "value"
    ,kakko: "kakko"
    ,spell: "spell"
    ,message: "message"
    ,errorhigh: "errorhere"
    ,errordisc: "abouterror"
} as const
type Gloss = string
type GlossTag = typeof glosstag[keyof typeof glosstag]
type GlossTagClass = number
export type Glosstsx = [Gloss, GlossTag, GlossTagClass]

function readgyo(gyo: string, gyosu: number, language: Language): StrTsx {
    const fn_r: StrTsx = ["", []]
    const delemeter = Delemeter.word
    const words = gyo.match(/\S+/g)
    if (words) {
        let wordres_list: string[] = []
        let htmlist: Glosstsx[][] = []
        let formative_started = false
        let pre_hinsi: Hinsi = "root"
        for (const i in words) {
            const word = words[i]
            if (word == undefined) {
                continue;
            }
            if (formative_started) {
                if (is_affixes(word)) {
                    pre_hinsi = "affixes"
                } else {
                    const [rstr, rlist] = selectGlosser (language)(word)  //gloss(word)
                    // const r = read_kino(word)
                    if (rstr) {
                        wordres_list.push(`${rstr} :kino`)
                        htmlist.push( [

                            ...rlist
                            , [" :", "delem", 0]
                            , ["kino", "attr", 1]
                        ])
                        pre_hinsi = "kino"
                    } else {
                        return [`line[${gyosu}] word[${i}] invalid kino: '${word}'`, []] as StrTsx
                    }
                    formative_started = false
                }
            } else {
                formative_started = true
                const r = read_root(word)
                if (r) {
                    wordres_list.push(`${word} :root`)
                    htmlist.push( [
                        ...r
                        // ,[word, "spell", 0]
                        ,[" :", "delem", 0]
                        ,["root", "attr", 1]
                    ])
                    pre_hinsi = "root"
                } else {
                    return [`line[${gyosu}] word[${i}] invalid root: '${word}'`, []] as StrTsx
                }
            }
        }
        let w = wordres_list.reduce((d, f) => d + delemeter + f, "")
        let wlist: Glosstsx[] = []
        htmlist.forEach(e => {
            wlist = [
                ...wlist
                , [delemeter, "delem", 0]
                , ...e
            ]
        })
        if (pre_hinsi != "kino") {
             w += "..."
             wlist.push(["...", "other", 0])
        }
        wlist.shift()
        w = w.substring(delemeter.length)
        return [w, wlist] as StrTsx
    } else {
        return [gyo, []] as StrTsx
    }
}
function intersperse<T> (x: T, list: T[] ) : T[] {
    let l = list.flatMap(e => [x, e] )
    l.pop()
    return l
}
const parseSynth = (word: string, lang: Language): Glosstsx[] => {
    if ( word.match(/^\S+$/) ) {
        const [rword ,glosseds] = selectGlosser(lang)(word)
        if (rword) {
            return [
                ...glosseds
                , [" :", "delem", 0]
                , ["synth", "attr", 1]
            ]
        } else {
            console.log("invalid synthesis")
            return []
        }
    } else {
        console.log("invalid string as a word")
        return []
    }
}

export const markupParsedSynthLine = (text: string, lang: Language): Glosstsx[] => {
    let ma = text.match(/\S+/g)
    let l = (()=> {
        if (ma) {
            return ma.flatMap(word => [
                ...parseSynth(word, lang),
                [Delemeter.word, "delem", 0] as Glosstsx
            ] )
        } else return []})();
    l.pop()
    return l

}
export const markupParsedSynthWords = (text: string, lang: Language): Glosstsx[][] => {
    let ma = text.match(/\S+/g)
    return ma ? ma.map(word => parseSynth(word, lang)) : []
}

// function strtsx_converter([str, glosstsx]: StrTsx) {
//     const tenkai = glosstsx.map(([gloss, glosstag, tagclass])=>
//         <span className=`${glosstag} ${glosstag}${tagclass}`>{gloss}</span>
//     )
// }

export function parse(moji: string, language: Language) {
    let gyos = moji.split("\n")
    let words = (moji.match(/\S+/g) || []).length
    let lines = gyos.length == 0 ? (words != 0 ? 1 : 0) : gyos.length
    let char = (moji.match(/\S/g) || []).length
    let almost_delemeter = (moji.match(/\S +/g) || []).length
    let char_num = almost_delemeter == words ? char + almost_delemeter - 1 : char + almost_delemeter

    // const [rstr, xlist] = gyos.map((gyo, i) => readgyo(gyo, i))
    return {
        res: gyos.map((gyo, i) => readgyo(gyo, i, language)),
        info: {
            mojisu: char_num,
            linebreak: lines,
            word: words,
        }
    }
}

export const Keyname_jpn = (key: string) => {
    switch (key) {
        case "mojisu":
            return "??????"
            break;
        case "linebreak":
            return "??????"
            break;
        case "word":
            return "??????"
            break
        default:
            return "??"
    }
}
export type SizeInfo = {
    mojisu: number,
    word: number,
    linebreak: number,
}
export type Res = {
    res: StrTsx[],
    info: SizeInfo
}

export type OutProps = {
    res: Res
}