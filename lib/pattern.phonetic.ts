type GrammarTaku = {
    Chow: number,
    Cwhere: number,
    Vy: number,
    Vrx: number,
    // Vr: number,
}
const grammar_nantaku: GrammarTaku = {
    Chow: 8, //+1
    Cwhere: 13,
    Vy: 3,
    Vrx: 6,
    // Vr: 2,
}
const grammar_names = {
    Chow: "Chow",
    Cw: "Cwhere",
    Vy: "Vy",
    Vrx: "Vrx",
} as const
type GrammarName = typeof grammar_names[keyof typeof grammar_names]

import { OutProps,
    code_key_map, char_code_map, Delemeter, Glosstsx, Kakko
} from "./Out"


const grammar_sets_name = {
    cv: "cv"
} as const
type GrammarSetName = typeof grammar_sets_name[keyof typeof grammar_sets_name]
type GrammarSet = GrammarName[]
const grammar_sets: Map<GrammarSetName, GrammarSet> = new Map([

])

const GrammarValues: Map<GrammarName, string[]> = new Map()
type SkipSlotId = number
type GrammarAssign = [GrammarName, number]
type GrammarSetValue = [GrammarSetName, boolean] //boolean? chose which grammar : chose grammar value
type Assign = GrammarAssign | GrammarSetValue | SkipSlotId
type Skip = Assign[]
type Gram = GrammarName | GrammarSetValue | Skip[]
// GrammarNameとSkipは掛け算。Skip.length == 1なら、必ずSkipする。[]を入れておけば避けられる。
type Slot = {
    grams: Gram[]
    fill: Skip[][] //未活用
}
const slots: Slot[] = [
    {
        grams: [
            "Chow"
            ,[
                []
                ,[0]
            ]
        ]
        ,fill: []
    },{
        grams: [
            "Cwhere"
            ,[
                []
                ,[0]
            ]
        ]
        ,fill: []
    },{
        grams: [
            "Vy","Vrx"
        ]
        ,fill: []
    },
]
type Whiches = [number, number | ([number, number] | Whiches)[]]
const typing_inst: Whiches = [2, [[3, 3], [1, 1]]] //選択の連続。左右どちらの手を使うか（2） 小指かそれ以外か（2） （人指・中・薬指のどれ（3） 上中下の鍵のどれ（3） OR 小指
//2*( 3*3 + 1*1)=20
function jigensu() {
    let su: number[] = []
    function loop(which: Whiches) {
        const w = which[0]
        su.push(w)
        const h = which[1]
        if (typeof h === "number") {

        } else {

        }
    }
}
type Range = [number, number]
const def_range: Range = [0, 20]
const shifter = (d: number) => d < 10
const sivoris = [
    (d: number) => d % 10 !== 9, //18
    (d: number) => d % 10 !== 9 && d % 10 !== 4, //16
]
const key_size = 20
const shift_num = key_size / 2

type Code = number
type GroupId = number
type SlotReader = [GramId, number][]//grammar id and its value
type SlotReaderFilled = {
    grams: SlotReader
    ,fill: SlotReader
}
type ReaderMap = Map<Code, SlotReader>
type ReaderMapFilled = Map<Code, SlotReaderFilled>
type KatateReaderMap = [Katate, ReaderMap]
const easytype_codeorder = [4,5,3,1,8,0,2,7,6,9]
function easyTypeOrdering(code_group: Map<number, number[]>){
    const map = new Map<number, number[]>()
    easytype_codeorder.forEach((easycode, i)=>{
        for (const [key, codes] of code_group.entries()){
            if (codes.some(code=> code%shift_num ===easycode)) {
                map.set(map.size, codes)
                code_group.delete(key)
            }
        }
    })
    return map
}
function grouping() {
    let i = 0
    while (i < 20) {

    }
}
type Haiti = {
    katate: boolean,
    range: (d: number) => boolean,
    classer: (d: number) => number,
}
const hanten = (d: number) => d < 10 ? d + 10 : d - 10
const taku_haiti_map: Map<number, Haiti> = new Map()
const sivoris_size_map: Map<number, number> = new Map()
const amr_range_map: Map<number, number[]> = new Map()
const nokos_order = [//length 8
    [0, 1, 2, 3, 5, 6, 7, 8]
    , [0, 1, 2, 3, 4, 5, 7,]
    , [0, 1, 2, 3, 4, 5,]
    , [1, 3, 4, 5, 7,]
    , [1, 3, 4, 5,]
    , [3, 4, 5,] //6
    , [4, 5,]
    , [4,]
]
type VoidBool = [(d: number) => number, boolean]
type Classer = [GramId, VoidBool]
type Masume = {
    range: (d: number) => boolean
    , classer: Classer[]
    , katate: boolean
}
function find_buddy(gram_used_map: Map<GramId, boolean>
    , su_type_s: [number, GramType, GramId][]
    , sho: number) {
    // console.log(`find-buddy func, gram used map`, gram_used_map)

    const buddy = su_type_s.find(e => {
        const used = gram_used_map.get(e[2])
        if (used === undefined) {
            return e[0] <= sho
        } else {
            return e[0] <= sho && !used
        }
    })
    return buddy
}
function get_range(amr: number) {
    const rangegot = amr_range_map.get(amr)
    if (rangegot === undefined) {
        let range = []
        let i = 0
        while (i < shift_num) {
            let isok = false
            const sa = 9 + amr - shift_num
            if (0 < sa) {
                isok = nokos_order[sa - 1].includes(i)
            } else {
                const sa = shift_num - amr
                isok = i < sa
            }
            if (isok) range.push(i)
            i += 1
        }
        amr_range_map.set(amr, range)
        return range
    } else return rangegot
}
// function fill_group(code_readers: KatateReaderMap[], slot: Slot
//     , outranges: number[][]) {

//     if (slot.fill.length===0) {
//         console.log("no slot.fill, just return")
//         return code_readers
//     }
//     const code_readers_filled: KatateReaderMap[] = []
//     code_readers.forEach(([katate, readermap], nzi)=>{
//         const outrange = outranges[nzi]
//         if (outrange.length===0) {
//             console.log("no outrange, just return")
//             return
//         }
//         const code_reader_filled: ReaderMapFilled = new Map()
//         if (nzi <= slot.fill.length) {
//             const fill = slot.fill[nzi]
//             outrange.forEach((outcode, i)=>{
//                 if (i <= fill.length) {
//                     const f = fill[i]

//                     code_reader_filled.set(outcode, {
//                         grams: slot.grams.map((_, i) => [i, 0])
//                         ,fill: [nzi, i]
//                     })
//                 }
//             })
//         }
//     })
// }
type GramType = 0 | 1 | 2
type GramId = number
type TakuSize = number
type SuTypeS = [TakuSize, GramType, GramId][]
type SuTypeM = Map<GramId, [TakuSize, GramType]>
function su_type_analyze(slot: Slot, gram_resolved: GramResolved ){
    type R = {
        grams: [SuTypeM, SuTypeS]
        ,fill: [SuTypeM, SuTypeS]
    }

    const m: Map<string, [SuTypeM, SuTypeS]> = new Map()
    Object.entries(slot).forEach(([key, value])=>{
        const fillm: SuTypeM = new Map()
        const fills: SuTypeS = []
        value.forEach((gram, i) => {
            if (typeof gram === "string") {//GrammarName
                const name = gram as GrammarName
                const resolve = gram_resolved.get(name)
                if (resolve!==undefined) return

                const value_su = grammar_nantaku[name as keyof GrammarTaku]
                console.log(`grammar name detected. ${gram}: ${value_su}`)
                fills.push([value_su, 0, i])
                fillm.set(i, [value_su, 0])
            } else if (typeof gram[1] === 'boolean') { //GrammarSetValue
                const gram_set_value = gram as GrammarSetValue
                const gram_set = grammar_sets.get(gram_set_value[0])
                let value_su = -1
                if (gram_set !== undefined) {
                    let value_count = 0
                    value_su = gram_set
                        .map(d => {
                           const taku = grammar_nantaku[d as keyof GrammarTaku]
                            value_count = taku
                            return taku
                        })
                        .reduce((d, f) =>
                            (d === 0 || d === f) ? f : -1, 0
                        )
                    if (value_su < 0) {
                        console.log("択数が一定でないgrammar setは不正")

                    } else {
                        value_su = gram_set_value[1]
                        ? gram_set.length
                        : value_count
                    }
                }
                fills.push([value_su, 1, i])
                fillm.set(i, [value_su, 1])
            } else {//Skip[]
                fills.push([gram.length, 2, i])
                fillm.set(i, [gram.length, 2])
            }
        })
        m.set(key, [fillm, fills])
    })

    // const ret: [SuTypeM, SuTypeS] = [su_type_m, su_type_s]
    return m
}

function process(slot: Slot
    , gram_resolved: GramResolved
) {
    console.log(`\nprocess()`)
    // console.log("gram_resolved=", gram_resolved)
    const grams = slot.grams
    let su_type_m: Map<GramId, [TakuSize, GramType]> = new Map()
    //pattern,         , index
    let su_type_s: [TakuSize, GramType, GramId][] = []

    const sutype_map = su_type_analyze(slot, gram_resolved)
    const su_type_tuple = sutype_map.get("grams")
    if (su_type_tuple===undefined) return
    [su_type_m, su_type_s] = su_type_tuple
    // console.log('process fn su type m', su_type_m) //ok
    su_type_s.sort((d, f) => f[0] - d[0]) //降順
    // console.log('process fn su type s', su_type_s)
    const gram_used_map: Map<GramId, boolean> = new Map()
    let haitis: Haiti[] = []
    //haiti - gram, - 1zi
    let grams_mw_zi: [GramId, Haiti][][] = []
    const masumes: Map<number, Masume> = new Map() //下の★部からわかるとおり、gramsと長さが異なってよい
    let used_gramsid_list: number[] = []

    for (const su_type of su_type_s) {
        const [takusize, gramtype, gramid] = su_type
        // console.log("su_type", su_type)
        let used = gram_used_map.get(gramid)
        const continue_used = used !== undefined && used
        let resolved = false
        if (gramtype==0){
            const resolvegot = gram_resolved.get(grams[gramid] as GrammarName)
            if (resolvegot!==undefined){
                resolved = true
            }
        }
        if (continue_used || resolved) {
            console.log('continue_used or resolved, so continue')
            console.log(`grammar...`, slot.grams[gramid])
            continue //★
        }
        gram_used_map.set(gramid, true)
        used_gramsid_list.push(gramid)
        const taku = su_type[0]
        if (taku > 20) {
            console.log("wow, ちょっと多すぎるかな")
        } else if (taku > 18) {//19, 20
            let range = (d: number) => d < 20
            if (taku == 19) {
                const jframe = nokos_order[0].map(d => d + 10)
                range = (d: number) => d < 10 || jframe.includes(d)
            }
            const haiti: Haiti = {
                katate: false,
                range,
                classer: (d) => d,
            }
            haitis.push(haiti)
            taku_haiti_map.set(taku, haiti)
            grams_mw_zi.push([
                [gramid, haiti]
            ])
            const msm: Masume = {
                range
                , classer: [
                    [gramid, [d => d, true]]
                ]
                , katate: false
            }
            masumes.set(gramid, msm)
        } else if (taku > shift_num) {//11-18
            const amr = taku - 9
            const i = nokos_order.length - amr
            const range = taku < 18
            ? (d: number) => d < 9 || (
                i >= 0
                && nokos_order[i].includes(d % shift_num)
            )
            : (d:number)=> d%shift_num < 9
            const haiti: Haiti = {
                katate: false
                , range
                , classer: (d) => d,
            }
            haitis.push(haiti)
            taku_haiti_map.set(taku, haiti)
            grams_mw_zi.push([
                [gramid, haiti]
            ])
            const msm: Masume = {
                range
                , classer: [
                    [
                        gramid
                        , [(d: number) => d, true ]
                    ]
                ]
                , katate: false
            }
            masumes.set(gramid, msm)
        } else if (taku > 5) {//6,3 7 8 9 10, 2

            const sho = ~~(key_size / taku)
            const buddy = find_buddy(gram_used_map, su_type_s, sho)

            if (buddy === undefined) {
                const amr = shift_num % taku //4,3,2,1,0
                const range = (d: number) => get_range(amr).includes(d)
                const classer = (d: number) => d
                const katate = true
                const haiti: Haiti = {
                    katate
                    , range
                    , classer
                }
                grams_mw_zi.push([
                    [gramid, haiti]
                ])
                const msm: Masume = {
                    katate
                    , range
                    , classer: [
                        [gramid, [classer, true]]
                    ]
                }
                masumes.set(gramid,msm)
            } else {
                const amr = (key_size - taku * buddy[0]) / 2
                const katate = false
                const range = (d: number) => get_range(amr).includes(d % shift_num)
                let classer: VoidBool = [(d: number) => d % shift_num, false]
                let buddy_classer: VoidBool = [(d: number) => d, false]
                if (buddy[0] === 3) {
                    // classer = [d => d % taku, true]
                    buddy_classer = [d => ~~(d % shift_num / 3), true]
                } else if (buddy[0] === 2) {
                    buddy_classer = [d => d < 10 ? 0 : 1, true]
                }

                gram_used_map.set(buddy[2], true)

                const msm: Masume = {
                    range
                    , katate
                    , classer: [
                        [gramid, classer]
                        , [buddy[2], buddy_classer]
                    ]
                }
                masumes.set(gramid,msm)
            }
        } else if (taku > 0) {//1,2,3,4,5
            // const sho_large = ~~(key_size / taku)
            const sho = ~~(key_size / taku)
            const buddy = find_buddy(gram_used_map, su_type_s, sho)

            const i = nokos_order.length - taku

            if (buddy === undefined) {
                console.log(`buddy undefined, taku: ${taku} nokos_order[i]`, nokos_order[i])
                const range = (d: number) => nokos_order[i].includes(d)
                const classer: VoidBool = [(d: number) => d, true]

                const msm: Masume = {
                    katate: true
                    , range
                    , classer: [[gramid, classer]]
                }
                masumes.set(gramid,msm)
            } else {
                console.log(`taku.${taku}, find buddy.`, buddy)
                const buddy_gramid = buddy[2]
                gram_used_map.set(buddy_gramid, true)
                const real_seki = taku * buddy[0]
                const seki = real_seki%shift_num
                let classer: VoidBool = [(d: number) => d, false]
                let buddy_classer: VoidBool = [(d: number) => d, false]
                const katate = real_seki<=shift_num

                // let range = katate
                // ? (d: number) => 0 <= d && d < 10
                // : (d: number) => 0 <= d%shift_num && d%shift_num < 10
                let range = (d:number) => 0 <= d && d < 10;
                if (real_seki<=shift_num){

                    if (seki === 0) {//5*2, 5*4...xx
                        buddy_classer = [(d:number) => d%shift_num %2, true]
                        // if (real_seki===10) buddy_classer = [d=> (d%shift_num)%2, true]
                        // if (real_seki===20) buddy_classer = [d=> {
                        //     const fj = d < 10
                        //     const di = d%2
                        //     if (fj) {
                        //         return di
                        //     } else {
                        //         return di+2
                        //     }
                        // }, true]

                    }else if (seki === 9) {
                        range = d => 0 <= d && d < 9
                        classer = [d => d % 3, true]
                    } else {
                        console.log("buddy find, range", nokos_order[shift_num - seki - 2])
                        range = d => nokos_order[shift_num - seki - 2].includes(d)

                        switch (seki) {
                            case 8: //4,2
                                buddy_classer = [d => d%shift_num % 2, true]
                                break
                            case 6://3,2
                                classer = [d => d%shift_num % 3, true]
                                break
                            case 4:
                                classer = [d => (d%shift_num === 3 || d%shift_num === 5) ? 1 : 0, true]
                                break
                            default:
                                console.log("impossible seki")
                        }
                    }
                } else {
                    switch (real_seki) {
                        case 16:
                            range = d => nokos_order[0].includes(d%shift_num)
                            if (taku===8){
                                buddy_classer = [(d:number) => d<shift_num? 0: 1, true]
                            }else{
                                classer = [d => d%shift_num % 2+ (d<shift_num? 0: 2), true]
                            }
                            break
                        case 20:
                            range = d => 0 <= d && d < key_size
                            buddy_classer = [d => d%shift_num % 2+ (d<shift_num? 0: 2), true]
                            break
                        case 15:
                            range = d => d < 9 || nokos_order[3].includes(d%shift_num)
                            buddy_classer = [ d=> {
                                    if (d<shift_num){
                                        return d%2
                                    }else{
                                        return 2
                                    }
                                }
                                ,true
                            ]
                            break
                        case 12:
                            range = d => d<9 || nokos_order[5].includes(d%shift_num)
                            classer = [
                                d => {
                                    if (d<shift_num){
                                        return ~~(d/3)
                                    }else{
                                        return 3
                                    }
                                }
                                ,true
                            ]
                            break
                        default:
                            console.log("impossible real seki", real_seki)
                    }
                }
                const msm: Masume = {
                    range
                    , katate
                    , classer: [
                        [gramid, classer]
                        , [buddy_gramid, buddy_classer]
                    ]
                }
                masumes.set(gramid,msm)

            }
            const haiti: Haiti = {
                katate: true,
                range: (d) => d < taku,
                classer: (d) => d,
            }
            haitis.push(haiti)
            taku_haiti_map.set(taku, haiti)
        }
    }

    const code_readers: KatateReaderMap[] = []

    //gramid で並び替え。
    // if (masumes.length > 1) {}
    // masumes.sort((masume1, masume2)=> {
    //     const [i, _] = masume1.classer[0]
    //     const [j, __] = masume2.classer[0]
    //     return i - j
    // })
    // console.log("masumes=", masumes)
    used_gramsid_list.sort()
    console.log('used_gramsid_list', used_gramsid_list)
    const outranges: number[][] = []
    for (const mainid of used_gramsid_list) {
        const masume = masumes.get(mainid)
        const outrange: number[] = []
        if (masume !== undefined) {
            const range: number[] = []
            let i = 0
            let j = 0

            const code_groups: Map<number, KatateAndMap> = new Map()
            let laterid = -1
            const katate = masume.katate
            while (i < def_range[1]) {
                if (masume.range(i)) {
                    range.push(i)
                    for (const [gramid, voidbool] of masume.classer) {
                        const gotgroup = code_groups.get(gramid)
                        const [classer, is_useful] = voidbool
                        if (!is_useful){
                            laterid = gramid
                            continue
                        }
                        const v = classer(katate ? i%shift_num : i)
                        // console.log(`classfying i=${i} => v=${v}`)
                        //const getter = katate? ... の行であとから調整してた
                        // const v = classer(i)
                        if (gotgroup === undefined) {
                            const code_group: Map<GroupId, Code[]> = new Map()
                            code_group.set(v, [i])
                            code_groups.set(gramid, [katate, code_group])
                        } else {
                            const [katate, code_group]: KatateAndMap = gotgroup

                            const codes = code_group.get(v)
                            if (codes === undefined) {
                                code_group.set(v, [i])
                            } else {
                                code_group.set(v, [...codes, i])
                            }
                            code_groups.set(gramid, [katate, code_group])
                        }
                    }

                } else {
                    if (
                        (katate && i < shift_num)
                        || (!katate)
                    ) outrange.push(i)
                }
                i += 1
            }

            // console.log("code_groups=", code_groups)
            if (laterid >=0){
                // console.log("laterid=", laterid)
                for (const [gramid, [katate, code_group]] of code_groups){
                    const other_group: Map<GroupId, Code[]> = new Map()
                    for (const [groupid, codes] of code_group){
                        const codes_ord = codes.sort((d,f)=> {
                            let dscore = easytype_codeorder.findIndex(c=> c===d%shift_num)
                            let fscore = easytype_codeorder.findIndex(c=> c===f%shift_num)
                            return dscore-fscore
                        })
                        codes_ord.forEach((code, code_i)=>{
                            const other_codes = other_group.get(code_i)
                            if (other_codes ===undefined){
                                other_group.set(code_i, [code])
                            }else{
                                other_group.set(code_i, [...other_codes, code])
                            }
                        })
                    }
                    code_groups.set(laterid, [katate, other_group])
                    break
                }
            }
            console.log(`process func, code_groups`, code_groups)//to fix

            const code_reader: ReaderMap = new Map()
            for (const [gramid, [katate, code_group]] of code_groups) {
                let n_shu = 0
                const easy_ord_code_group = easyTypeOrdering(code_group)
                console.log("gramid=",gramid, "easy_ord_code_group=", easy_ord_code_group)
                for (const [groupid, codes] of easy_ord_code_group) {
                    for (const code of codes) {
                        const code_dic = code_reader.get(code)
                        if (code_dic === undefined) {

                            const code_dic: SlotReader =
                                [
                                    [
                                        gramid
                                        , n_shu
                                    ]
                                ]

                            code_reader.set(code, code_dic)
                        } else {
                            const add: [GramId, number] = [
                                gramid
                                , n_shu
                            ]
                            code_reader.set(code, [...code_dic, add])
                        }
                    }
                    n_shu += 1
                }
            }

            code_readers.push([masume.katate, code_reader])
        } else {
            console.log("unexpected masume===undefined")
        }
        outranges.push(outrange)
    }

    // const code_groups_filled: [Katate, ReaderMapFilled][] = fill_group(code_readers, slot, outranges)

    const res = {
        grams
        , reader_map: code_readers
        , su_type_m
        , susutypem: sutype_map
    }
    console.log('process() -> res', res)
    return res
}

type KatateAndMap = [Katate, Map<GroupId, Code[]>]
type Katate = boolean
type SlotId = number
type EndIndex = number
type ZiInfo = Map<EndIndex, SlotReader>
type SlotInfo = Map<SlotId, ZiInfo[]>
type ZiId = number
type GramSetStatus = {
    resolved: boolean
    , which: number
    , value: number
    , which_by: Where
    , value_by: Where
}
type Where = [SetuId, ZiId]
type SomethingsValue = number
type WhichGrammar = number
type SetuId = number
type HandleState = {
    inlength: boolean
    , close: boolean
    , valid: boolean
}
type StringWithStates = [string, HandleState]
type GramResolved = Map<GrammarName, [SomethingsValue, Where]>

function read_kino(kino: string) {
    type SkippedBy = Where

    const gram_sets_status: Map<GrammarSetName, GramSetStatus> = new Map()
    const gram_resolved: GramResolved = new Map()
    let skipped_slots: Map<SlotId, SkippedBy> = new Map()
    let setu_zi_s: Map<string, HandleState>[][] = [] //let for closing gramset

    let looking_i = 1
    let pre_looking_i = 0

    slots.forEach((slot, slot_i) => {
        // console.log(`skipped_slots =`, skipped_slots)
        const skipped_by = skipped_slots.get(slot_i)
        const has_skipped = skipped_by !== undefined
        let grams: Gram[] = []
        let reader_map: KatateReaderMap[] = []
        let susutypem: Map<string, [SuTypeM, SuTypeS]> = new Map()
        // let su_type_m: SuTypeM = new Map()
        if (has_skipped){
            grams = slot.grams
            const susutypem1 = su_type_analyze(slot, gram_resolved)
            const typegot = susutypem1.get("grams")
            if (typegot===undefined) return
            susutypem = susutypem1
            const [su_type_m, su_type_s] = typegot
            const slotreader: SlotReader = []
            grams.forEach((gram, gram_i) => {
                let topush: [GramId, number] = [gram_i, 0]
                const got = su_type_m.get(gram_i)
                if (got!==undefined){
                    const sutype = got[1]
                    if (sutype==0){
                        const gram_name = gram as GrammarName
                        const resolvegot = gram_resolved.get(gram_name)
                        if (resolvegot!==undefined){
                            const [resolved_value, where] = resolvegot
                            topush[1] = resolved_value
                        }
                    }
                }
                slotreader.push(topush)
            })
            const map: ReaderMap = new Map([
                [0, slotreader]
            ])
            const ka: KatateReaderMap = [false, map]
            reader_map.push(ka)
        }else{
            const res = process(slot, gram_resolved)
            if (res !==undefined){
                grams = res.grams
                reader_map = res.reader_map
                // su_type_m = res.su_type_m
                susutypem = res.susutypem
            }
        }
        // console.log(`slot${slot_i} was skipped <-`, has_skipped)
        // console.log(`grams=`, grams)
        // console.log(`reader map=`, reader_map)
        let newsetulist: Map<string, HandleState>[] = []
        let dont_count_setu = false

        reader_map.forEach(([katate, zi_reader], n_zi)=>{ //inscope 1zi target
            let newsetu: Map<string, HandleState> = new Map()
            if (dont_count_setu) return

            let overlength = false
            console.log(`pre_looking_i is`, pre_looking_i)
            if (pre_looking_i > kino.length - 1) {
                overlength = true
            }

            const tar_str = kino.substring(pre_looking_i, looking_i)
            const tar_code = char_code_map.get(tar_str)
            // console.log(`str and code: ${tar_str}, ${tar_code}`)
            // newsetu.push(tar_str)
            const where0: Where = [setu_zi_s.length,
                n_zi //bug? so changed to n_zi
            ]
            const where = has_skipped ? skipped_by : where0

            let slot_reader = undefined
            let is_invalid_char = false

            if (has_skipped){
                // newsetu.set("", {
                //         inlength: !overlength
                //         ,valid: true
                //         ,close: true
                //     }
                // )
                for (const [_, value] of zi_reader) {
                    slot_reader = value
                    break
                }
                // console.log(`has_skipped=true`)
            }else{
                // console.log("not skipped")
                if (tar_code!==undefined){
                    const getter = katate? tar_code%shift_num : tar_code
                    // const getter = tar_code
                    slot_reader = zi_reader.get(getter)
                    if (slot_reader===undefined){
                        // console.log(`'${tar_str}' is invalid char here`)
                        newsetu.set(
                            tar_str, {
                                inlength: !overlength
                                ,close: true
                                ,valid: false
                            }
                        )
                    }
                } else {
                    // console.log("tar_code: undefined, overlength=", overlength)
                    if (overlength && tar_str===""){
                    }else{
                        newsetu.set(
                            tar_str, {
                                inlength: !overlength
                                ,close: true
                                ,valid: false
                            }
                        )
                    }
                }
            }
            let empty_skip: boolean = false
            if (slot_reader !== undefined) {

                // for (const [key, slot_reader_one] of slot_reader){
                //     if (key!=="grams") {
                //         const su_type_m = susutypem.get(key)

                //     }
                // }

                // console.log("tar_str=", tar_str, "valid true. slot_reader:", slot_reader)
                // console.log("tar_str=", tar_str, "valid true. slot_reader_ord:", slot_reader_ord)
                slot_reader.sort((d,f)=> d[0]-f[0])
                for (const [gramid, _gramvalue] of slot_reader) {
                    const gramvalue = has_skipped ? 0 : _gramvalue
                    const [su_type_m, su_type_s]: [SuTypeM, SuTypeS] = susutypem.get("grams") ?? [
                        new Map<number, [number, GramType]>
                        , []
                    ]
                    const about_gram = su_type_m.get(gramid)
                    if (about_gram !== undefined) {
                        const gram_type = about_gram[1]
                        if (gram_type === 0) {
                            const gram_name = grams[gramid] as GrammarName
                            gram_resolved.set(gram_name, [gramvalue, where])
                            // console.log(`---${gram_name}${gramvalue}`)
                            // console.log("735 valid true, str:", tar_str) //bingo
                            newsetu.set(
                                tar_str, {
                                    inlength: !overlength
                                    ,close: true
                                    ,valid: true
                                }
                            )
                        } else if (gram_type === 1) {
                            const gram_set_value = grams[gramid] as GrammarSetValue
                            // console.log(`---GrammarSetValue. `, gram_set_value)
                            const [setname, is_gram_choise] = gram_set_value
                            const status = gram_sets_status.get(setname)
                            // console.log(`is it ok gramsetsstatus`, gram_sets_status)
                            if (status === undefined) {
                                gram_sets_status.set(setname, {
                                    which: is_gram_choise ? gramvalue : -1
                                    , value: is_gram_choise ? -1 : gramvalue
                                    , which_by: is_gram_choise? where: [-1, -1]
                                    , value_by: is_gram_choise? [-1,-1]: where
                                    , resolved: false
                                })
                                // console.log("757 valid true, str:", tar_str) //bingo

                                newsetu.set(
                                    tar_str, {
                                        inlength: !overlength
                                        ,close: false
                                        ,valid: true
                                    }
                                )
                            } else {
                                // console.log(`read kino(), status found`)
                                // const complement = ['which', 'value'].find(d=> status[d as keyof GramSetStatus] < 0)

                                let comple2 = ''
                                if (!status.resolved && status.which < 0) {
                                    comple2 = 'which'
                                } else if (!status.resolved && status.value < 0) {
                                    comple2 = 'value'
                                }
                                let resolved = false
                                if (is_gram_choise && comple2 === 'which') {
                                    gram_sets_status.set(setname, {
                                        ...status
                                        , which: gramvalue
                                        , which_by: where
                                        , resolved: true
                                    })
                                    resolved = true
                                    // console.log("gramset dicide which")
                                    const maps = setu_zi_s[status.value_by[0]]
                                    //ある程度の長さを打つとmapがundefined
                                    if (maps===undefined){
                                        // console.log("map is undefined")
                                        // console.log("status", status)
                                        // console.log("setu zi s: ", setu_zi_s)
                                        // console.log("status.valueby", status.value_by[0])
                                    }else{
                                        const map = maps[status.value_by[1]]
                                        if (map!==undefined){
                                            map.forEach((handlestate, str)=> {
                                                map.set(str, {
                                                    ...handlestate
                                                    , close: true
                                                })
                                            })
                                        }
                                    }
                                } else if (!is_gram_choise && comple2 === 'value') {
                                    gram_sets_status.set(setname, {
                                        ...status
                                        , value: gramvalue
                                        , value_by: where
                                        , resolved: true
                                    })
                                    // console.log("gramset dicide value")
                                    resolved = true
                                    const maps = setu_zi_s
                                    [status.which_by[0]]
                                    if (maps===undefined){
                                        // console.log("map is undefined")
                                        // console.log("status", status)
                                        // console.log("setu zi s: ", setu_zi_s)
                                        // console.log("status.whichby", status.which_by[0])
                                    }else{
                                        const map = maps[status.value_by[1]]
                                        if (map!==undefined){
                                            map.forEach((handlestate, str)=> {
                                                map.set(str, {
                                                    ...handlestate
                                                    , close: true
                                                })
                                            })
                                        }
                                    }
                                } else {
                                    // console.log(`status cant resolved`)
                                }
                                // console.log("804 valid true, str:", tar_str)
                                newsetu.set(
                                    tar_str, {
                                        inlength: !overlength
                                        ,close: resolved
                                        ,valid: true
                                    }
                                )

                            }
                        } else if (gram_type === 2) {
                            newsetu.set(
                                tar_str, {
                                    inlength: !overlength
                                    ,close: true
                                    ,valid: true
                                }
                            )
                            const skips = grams[gramid] as Skip[]
                            // console.log(`read kino, skips`, skips)
                            if (skips.length > 0) {

                                const selected_skip = skips[gramvalue] //最初の文字が右手だとundefined
                                if (selected_skip.length > 0) {
                                    const skipped_justnow: SlotId[] = []
                                    for (const assign of selected_skip) {
                                        if (typeof assign === 'number') {
                                            const skip_slot_i = assign as SkipSlotId
                                            let i = slot_i
                                            while (i < slots.length) {
                                                const abs_slot_i = slot_i + 1 + skip_slot_i
                                                const skipped_by = skipped_slots.get(abs_slot_i)
                                                if (skipped_by === undefined) {
                                                    skipped_justnow.push(abs_slot_i)
                                                }
                                                i += 1
                                            }

                                        } else if (typeof assign[1] === 'number') {
                                            const gram_in = assign as GrammarAssign
                                            if (gram_resolved.get(gram_in[0]) === undefined) gram_resolved.set(gram_in[0], [gram_in[1], where])
                                        } else {
                                            const gram_set_value = assign as GrammarSetValue
                                            const [setname, is_gram_choise] = gram_set_value
                                            const status = gram_sets_status.get(setname)
                                            if (status === undefined) {
                                                gram_sets_status.set(setname, {
                                                    resolved: false
                                                    , which: is_gram_choise ? gramvalue : -1
                                                    , value: is_gram_choise ? -1 : gramvalue
                                                    , which_by: is_gram_choise? where: [-1,-1]
                                                    , value_by: is_gram_choise? [-1,-1]: where
                                                })

                                            } else {
                                                let comple2 = ''
                                                if (!status.resolved && status.which < 0) {
                                                    comple2 = 'value'
                                                } else if (!status.resolved && status.value < 0) {
                                                    comple2 = 'which'
                                                }
                                                if (is_gram_choise && comple2 == 'which') {
                                                    gram_sets_status.set(setname, {
                                                        ...status
                                                        , which: gramvalue
                                                        , which_by: where
                                                        , resolved: true
                                                    })
                                                } else if (!is_gram_choise && comple2 == 'value') {
                                                    gram_sets_status.set(setname, {
                                                        ...status
                                                        , value: gramvalue
                                                        , value_by: where
                                                        , resolved: true
                                                    })
                                                }
                                            }
                                        }
                                    }
                                    for (const skipped_slot_i of skipped_justnow) {
                                        skipped_slots.set(skipped_slot_i, where)
                                    }
                                } else {
                                    empty_skip = true
                                }
                            }
                        }
                    }else{
                        console.log(`about gram was undefined...`)
                    }
                }
            }else{
                console.log(`slot reader why undefined...`) //slot[0] concatanation come here  //
            }

            if (!has_skipped ) {//!empty_skip入れると[]:skipを含むslotのskip以外の文法の指定ができない（looking_iが変わらないまま同じ文字が次の文法の対象に移ってしまう）
                console.log(`looking index incremented, empty_skip=${empty_skip}`)
                pre_looking_i = looking_i
                looking_i += 1
            }
            console.log(`tar_str=${tar_str}\nnewsetu=`, newsetu)
            newsetulist.push(newsetu)
        })
        // if (!has_skipped) setu_zi_s.push(newsetu)
        // if (!dont_count_setu)
        setu_zi_s.push(newsetulist)
        // has skipped: false and

    })

    const amari_zi = kino.substring(pre_looking_i)
    if (amari_zi!==""){
        const amari_m: Map<string, HandleState> = new Map([
            [amari_zi, {
                inlength: false
                ,close: true
                ,valid: true
            }]
        ])
        setu_zi_s.push([amari_m])
    }

    console.log(`read kino func, gram_resolved`, gram_resolved)
    console.log(`read kino func, gram_sets_status`, gram_sets_status)//ok
    const where_m: Map<SetuId, SetuMapValue[]> = new Map()
    for (const [gram_name, [gramvalue, [setu_i, zi_i]]] of gram_resolved) {
        const same_setus = where_m.get(setu_i)
        const setvalue: SetuMapValue = [[false, gram_name], gramvalue, zi_i]
        if (same_setus === undefined) {
            where_m.set(setu_i, [setvalue])
        } else {
            where_m.set(setu_i, [...same_setus, setvalue])
        }
    }
    for (const [gram_set_name, status] of gram_sets_status) {
        const {
            resolved
            , which
            , value
            , which_by
            , value_by
        } = status
        const gram_set = grammar_sets.get(gram_set_name)
        if (gram_set!==undefined){
            if (resolved) {
                const same_setus = where_m.get(value_by[0])


                const setvalue: SetuMapValue = [
                    [
                        false
                        , gram_set[which]
                    ]
                    , value
                    , value_by[1]
                ]

                if (same_setus === undefined) {
                    where_m.set(value_by[0], [setvalue])
                } else {
                    where_m.set(value_by[0], [...same_setus, setvalue])
                }

                const index = which_by[0] //if resolved つけないと-1になるかも
                const same_setus1 = where_m.get(index)
                const setvalue1: SetuMapValue = [
                    [
                        true
                        , gram_set_name
                    ]
                    , which
                    , which_by[1]
                ]

                if (same_setus1 === undefined) {
                    where_m.set(index, [setvalue1])
                } else {
                    where_m.set(index, [...same_setus1, setvalue1])
                }

            } else {
                if (which < 0){
                    const same_setus = where_m.get(value_by[0])
                    const setvalue: SetuMapValue = [
                        [
                            true
                            , gram_set_name
                        ]
                        , value
                        , value_by[1]
                    ]

                    if (same_setus === undefined) {
                        where_m.set(value_by[0], [setvalue])
                    } else {
                        where_m.set(value_by[0], [...same_setus, setvalue])
                    }
                } else if (value < 0){
                    const index = which_by[0]
                    const same_setus1 = where_m.get(index)
                    const setvalue1: SetuMapValue = [
                        [
                            true
                            , gram_set_name
                        ]
                        , which
                        , which_by[1]
                    ]

                    if (same_setus1 === undefined) {
                        where_m.set(index, [setvalue1])
                    } else {
                        where_m.set(index, [...same_setus1, setvalue1])
                    }
                }
            }

        }

    }

    //where_m not sorted by zi_i
    console.log('read_kino() setu zi s', setu_zi_s)
    // const setu_zi_s_trimed = setu_zi_s.filter(d=> d!==``)
    console.log('read_kino() where m', where_m)
    const d: ReadKinoReturn = [setu_zi_s, where_m, gram_sets_status]
    return d
}
type IsSetName = boolean
type SetuMapName = [IsSetName, GrammarName | GrammarSetName]
type SetuMapValue = [SetuMapName, number, ZiId]
type ReadKinoReturn = [
    Map<string, HandleState>[][]
    , Map<number, SetuMapValue[]>
    , Map<GrammarSetName, GramSetStatus>
]

function value_to_name(setu_info: [SetuMapName, number] , value: number){

    return 'value to name'
}

type GlossOptions = {
    or_value_to_name: boolean
    ,hide_each_zi: boolean
}
export function glossPhonetic(word: string) {
    console.log('\n\nglossPhonetic() word', word)

    const options: GlossOptions = {
        or_value_to_name: false
        ,hide_each_zi: false
    }

    const [setu_zi_s, setu_grams_m, gram_sets_status]: ReadKinoReturn = read_kino(word)
    let setus_str = ``
    let setus_list: Glosstsx[] = []

    setu_zi_s.forEach((zi_states_maps, setu_i)=>{
        const grams = setu_grams_m.get(setu_i)
        let zis_str = ``
        let zis_str_list: Glosstsx[] = []
        let overlength_completely = false

        type PreCheckItem = {
            list: string[]
            ,pre: boolean
        }
        type PreChecks = {
            inlength: PreCheckItem
            ,valid: PreCheckItem
            ,close: PreCheckItem
        }
        let pre_check: PreChecks = {
            inlength: {
                list: []
                ,pre: false
            }
            ,valid: {
                list: []
                ,pre: false
            }
            ,close: {
                list: []
                ,pre: false
            }
        }
        let prebool: HandleState = {
            inlength: true
            ,valid: true
            ,close: true
        }
        // let checkmap = new Map()
        // const checkeds: string[] = []
        type ZiStateMap = Map<string, HandleState>
        const zistateM: ZiStateMap = new Map()

        if (zi_states_maps.length === 0) overlength_completely = true
        let before_completely = true
        let setu_denpa = false
        let i = 0
        zi_states_maps.forEach((zi_states, zi_i)=>{
            // console.log("zi_states_maps.forEach(")
            let same_message_zi = ""
            zis_str_list = [
                ...zis_str_list
                ,[Delemeter.keitaiso, "delem", 0]
            ]

            before_completely =
                zi_states.size === 0
                && before_completely


            let overlength_setu: boolean|undefined = undefined
            zi_states.forEach((states, zi)=>{
                overlength_completely = false
                // console.log("zi_states.forEach(")
                let kirikawaris = true
                let nomessage = true
                let zi_close = true
                let show_message = false
                let add_samessage_zi = false
                let checked_states: string[] = []

                Object.entries(states).forEach(([key, value])=>{

                    zistateM.set(zi, states)
                    const state = pre_check[key as keyof PreChecks]
                    const pre = prebool[key as keyof HandleState]

                    if (!value) {
                        if (key==="inlength" || key==="valid") {
                            add_samessage_zi = true
                            if (
                                (value !== pre)
                            ||  (zi_i===zi_states.size-1 && add_samessage_zi)
                            ) {
                                show_message = true
                            }
                            if (key==="inlength"){
                                if (overlength_setu===undefined){
                                    overlength_setu = true
                                }
                            }
                        }
                    } else {
                        if (key==="inlength" || key==="valid") {
                            if (!pre) show_message = true
                            if (key==="inlength"){
                                overlength_setu = false
                            }
                        }
                    }
                    if (show_message) checked_states.push(key)

                })
                // console.log("zi and states: ", zi, states)
                // console.log("show_message", show_message)
                // console.log("overlength_setu", overlength_setu)
                if (add_samessage_zi) same_message_zi+=zi
                if (show_message && zi!==""){
                    // console.log("show message, zi:", zi)
                    // console.log("prebool:", prebool)
                    // console.log("states", states)
                    // console.log("zi_i", zi_i)
                    // console.log("same_message_zi", same_message_zi)
                    let messages: string[] = []
                    for (const state of checked_states) {
                        if (state==="inlength") messages.push("overlength")
                        if (state==="valid") messages.push("invalid at least here")
                    }

                    let messages_x: Glosstsx[] = []
                    for (const message of messages){
                        messages_x = [
                            ...messages_x
                            , [message, "message", 0]
                            , [", ", "delem", 0]
                        ]
                    }
                    messages_x.pop()
                    zis_str_list = [
                        ...zis_str_list
                        , [Kakko.message[0], "kakko", 0]
                        , [Kakko.zi[0], "kakko", 0]
                        , [zi_i===0 ? zi : same_message_zi
                            , "spell", 0]
                        , [Kakko.zi[1], "kakko", 0]
                        , [Delemeter.zi_grammar, "delem", 0]
                        , ...messages_x
                        , [Kakko.message[1], "kakko", 0]
                    ]
                    same_message_zi = ""
                    // prebool.close = states.close
                    // prebool.inlength = states.inlength
                    // prebool.valid = states.valid
                    prebool = states
                    return
                }
                prebool = states
                // prebool.close = states.close
                // prebool.inlength = states.inlength
                // prebool.valid = states.valid

                if (grams!==undefined){
                    // grams.sort((d, f)=> d[2] - f[2])

                    const tar_grams = grams.filter(d=> d[2]=== zi_i)
                    // console.log("tar_grams=", tar_grams)
                    let gramvalues = ``
                    let gramvalues_list: Glosstsx[] = []
                    for (const tar_gram of tar_grams){
                        const [setu_map_name, value_number, zi_ii]: SetuMapValue = tar_gram
                        const [is_set_name, name] = setu_map_name
                        let grammarstr = ``
                        let grammarstr_list: Glosstsx[] = []
                        if (options.or_value_to_name){
                            grammarstr = value_to_name([setu_map_name, value_number], value_number)
                        } else {
                            if (is_set_name){
                                const gram_set = grammar_sets.get(name as GrammarSetName)
                                let str =``
                                let str_list: Glosstsx[] = []
                                if (gram_set!==undefined){
                                    const status = gram_sets_status.get(name as GrammarSetName)
                                    if (status!==undefined){

                                        gram_set.forEach((name, i)=>{
                                            const mark = i===status.which? `*`: ""
                                            str += `, ${mark}${name}`
                                            str_list = [
                                                ...str_list
                                                ,[mark, "other", 0]
                                                ,[name, "attr", 0]
                                                ,[Delemeter.listitem, "delem", 0]
                                            ]
                                        })
                                        str_list.pop()

                                        str = str.substring(2)
                                        grammarstr = `[${str}]`
                                        grammarstr_list = [
                                            [Kakko.gramset[0], "kakko", 0]
                                            , ...str_list
                                            ,[Kakko.gramset[1], "kakko", 0]
                                        ]
                                        if (!status.resolved) {
                                            grammarstr_list = [
                                                ...grammarstr_list
                                                ,[`${status.value}`, "value", 0]
                                            ]
                                        }
                                    }
                                }
                            } else {
                                grammarstr = `${name}${value_number}`
                                grammarstr_list = [
                                    [name, "attr", 0]
                                    ,[`${value_number}`, "value", 0]
                                ]
                            }
                        }

                        gramvalues+= Delemeter.zi +grammarstr
                        gramvalues_list = [
                            ...gramvalues_list
                            ,[Delemeter.zi, "delem", 0]
                            ,...grammarstr_list
                        ]
                    }
                    const zi_inkakko_list: Glosstsx[] = [
                        [Kakko.zi[0], "kakko", 0]
                        ,[zi, "spell", 0]
                        ,[Kakko.zi[1] , "kakko", 0]
                    ]
                    const zi_inkakko = Kakko.zi[0]+zi+Kakko.zi[1]
                    const zi_del = options.hide_each_zi? '': zi_inkakko +Delemeter.zi_grammar
                    const zi_delist: Glosstsx[] = options.hide_each_zi
                    ? []
                    : [
                        ...zi_inkakko_list
                        ,[Delemeter.zi_grammar, "delem", 0]
                    ]
                    zis_str+= zi_del +gramvalues.substring(Delemeter.zi.length) +Delemeter.keitaiso
                    gramvalues_list.shift()

                    const close_x: Glosstsx = ["...", "delem", 0]
                    zis_str_list = [
                        ...zis_str_list
                        ,...zi_delist
                        ,...gramvalues_list
                        ,...(!zi_close
                            ? [close_x]
                            : []
                        )
                    ]
                    zis_str= zis_str.substring(0, zis_str.length-1)
                }
            })
            // console.log("overlength_completely=false, overlength_setu=", overlength_setu)
            // console.log("overlength_completely=false, zi_states=", zi_states)
            // if (!before_completely){

            //     if (i===zi_states_maps.length-1){
            //     }else{
            //         if (overlength_setu!==undefined) {

            //         }
            //     }
            // }
            // if (overlength_setu!==undefined && i===zi_states_maps.length-1 && !before_completely) setu_denpa = overlength_setu

            i++

        })


        if (zi_states_maps.length > 0) zis_str_list.shift()
        setus_str+= zis_str +Delemeter.keitaiso_grammars
        // console.log("before_completely", before_completely)
        // console.log("setu_denpa", setu_denpa)
        // console.log("overlength_completely", overlength_completely)
        if (
            !before_completely && !setu_denpa
         && !overlength_completely
        ){//|| setu_i===setu_zi_s.length-1
            setus_list = [
                ...setus_list
                ,...zis_str_list
                ,[Delemeter.keitaiso_grammars, "delem", 0]
            ]
        } else {
            // console.log("overlength_completely=true, zi_states_maps", zi_states_maps)
        }
    })
    setus_str = setus_str.substring(0, setus_str.length - Delemeter.keitaiso_grammars.length)
    setus_list.pop()
    const re: StrTsx = [setus_str, setus_list]
    return re
}
export type StrTsx = [string, Glosstsx[]]
type GlossSchema = Map<string, GrammarAssign[]>[]


// export const Pattern: React.VFC<OutProps> = ({ res }: OutProps) => <div>Pattern</div>
