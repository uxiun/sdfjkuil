


import {
    grammar_nantaku, GrammarName, OutProps,
    code_key_map, char_code_map, GrammarTaku, Delemeter, Glosstsx
} from "./Out"


const grammar_sets_name = {
    scope_mood: "scope_mood"
    ,nines: "nines"
} as const
type GrammarSetName = typeof grammar_sets_name[keyof typeof grammar_sets_name]
type GrammarSet = GrammarName[]
const grammar_sets: Map<GrammarSetName, GrammarSet> = new Map([
    ["scope_mood", ["casescope", "mood"]]
    ,["nines", ["valence", "phase", "effect", "level"]]
])

const GrammarValues: Map<GrammarName, string[]> = new Map()
type SkipSlotId = number
type GrammarAssign = [GrammarName, number]
type GrammarSetValue = [GrammarSetName, boolean] //boolean? chose which grammar : chose grammar value
type Assign = GrammarAssign | GrammarSetValue | SkipSlotId
type Skip = Assign[]
type Gram = GrammarName | GrammarSetValue | Skip[]
type Slot = {
    grams: Gram[]
}
const slots: Slot[] = [
    {
        grams: [
            "version" //2
            , [
                [//e,s
                    ["configuration", 0]
                ],
                [//d,f
                    0
                ],
            ]//GramId 1
        ]
    },
    {
        grams: [
            "concatenation",//3
            ["scope_mood", false],//6
        ]

    },
    {
        grams: [
            "function",//2
            "specification",//4
        ]
    }
    ,{
        grams: [
            "configuration"
        ]
    },
    {
        grams: [
            "extension"
            ,"affiliation"
        ]
    },
    {
        grams: [
            "perspective"
            ,"essence"
        ]
    },
    {
        grams: [
            ["nines", false]
            ,["nines", true]
        ]
    },
    {
        grams: [
            "context"
            ,["scope_mood", true]//2
        ]
    },
    {
        grams: [
            "illovali"
        ]
    }
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
type SlotReader = [GramId, number][]
type ReaderMap = Map<Code, SlotReader>
type KatateReaderMap = [Katate, ReaderMap]

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

type GramType = 0 | 1 | 2
type GramId = number
type TakuSize = number
type SuTypeS = [TakuSize, GramType, GramId][]
type SuTypeM = Map<GramId, [TakuSize, GramType]>
function su_type_analyze(
    grams: Gram[]
    ,su_type_m: SuTypeM
    , su_type_s: SuTypeS
){

    grams.forEach((gram, i) => {
        if (typeof gram === "string") {//GrammarName
            const name = gram as GrammarName
            const value_su = grammar_nantaku[name as keyof GrammarTaku]
            console.log(`grammar name detected. ${gram}: ${value_su}`)
            su_type_s.push([value_su, 0, i])
            su_type_m.set(i, [value_su, 0])
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
            su_type_s.push([value_su, 1, i])
            su_type_m.set(i, [value_su, 1])
        } else {//Skip[]
            su_type_s.push([gram.length, 2, i])
            su_type_m.set(i, [gram.length, 2])

        }
    })
    const ret: [SuTypeM, SuTypeS] = [su_type_m, su_type_s]
    return ret
}

function process(slot: Slot) {
    console.log(`\nprocess()`)
    const grams = slot.grams
    let su_type_m: Map<GramId, [TakuSize, GramType]> = new Map()
    //pattern,         , index
    let su_type_s: [TakuSize, GramType, GramId][] = []

    const [typem, types] = su_type_analyze(slot.grams, su_type_m, su_type_s)
    su_type_m = typem
    su_type_s = types
    // console.log('process fn su type m', su_type_m) //ok
    su_type_s.sort((d, f) => f[0] - d[0]) //降順
    // console.log('process fn su type s', su_type_s)
    const gram_used_map: Map<GramId, boolean> = new Map()
    let haitis: Haiti[] = []
    //haiti - gram, - 1zi
    let grams_mw_zi: [GramId, Haiti][][] = []
    let masumes: Masume[] = []
    for (const su_type of su_type_s) {
        console.log("su_type", su_type)
        let used = gram_used_map.get(su_type[2])
        if (used !== undefined && used) continue
        gram_used_map.set(su_type[2], true)
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
                [su_type[2], haiti]
            ])
            const msm: Masume = {
                range
                , classer: [
                    [su_type[2], [d => d, true]]
                ]
                , katate: false
            }
            masumes.push(msm)
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
                [su_type[2], haiti]
            ])
            const msm: Masume = {
                range
                , classer: [
                    [
                        su_type[2]
                        , [(d: number) => d, true ]
                    ]
                ]
                , katate: false
            }
            masumes.push(msm)
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
                    [su_type[2], haiti]
                ])
                const msm: Masume = {
                    katate
                    , range
                    , classer: [
                        [su_type[2], [classer, true]]
                    ]
                }
                masumes.push(msm)
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
                        [su_type[2], classer]
                        , [buddy[2], buddy_classer]
                    ]
                }
                masumes.push(msm)
            }
        } else if (taku > 0) {//1,2,3,4,5
            const sho = ~~(shift_num / taku)
            const buddy = find_buddy(gram_used_map, su_type_s, sho)
            const i = nokos_order.length - taku
            const katate = true

            if (buddy === undefined) {
                console.log(`buddy undefined, taku: ${taku} nokos_order[i]`, nokos_order[i])
                const range = (d: number) => nokos_order[i].includes(d)
                const classer: VoidBool = [(d: number) => d, true]

                const msm: Masume = {
                    katate
                    , range
                    , classer: [[su_type[2], classer]]
                }
                masumes.push(msm)
            } else {
                console.log(`taku.${taku}, find buddy.`, buddy)
                const gramid = buddy[2]
                gram_used_map.set(gramid, true)
                const seki = taku * buddy[0]
                let classer: VoidBool = [(d: number) => d, false]
                let buddy_classer: VoidBool = [(d: number) => d, false]
                let range = (d: number) => 0 <= d && d < 10
                if (seki === 9) {
                    range = d => 0 <= d && d < 9
                    classer = [d => d % 3, true]
                } else {
                    console.log("buddy find, range", nokos_order[shift_num - seki - 2])
                    range = d => nokos_order[shift_num - seki - 2].includes(d)

                    switch (seki) {
                        case 8: //4,2
                            buddy_classer = [d => d % 2, true]
                            break
                        case 6://3,2
                            classer = [d => d % 3, true]
                            break
                        case 4:
                            classer = [d => (d === 3 || d === 5) ? 1 : 0, true]
                            break
                        default:
                            console.log("impossible seki")
                    }
                }
                const msm: Masume = {
                    range
                    , katate: true
                    , classer: [
                        [su_type[2], classer]
                        , [buddy[2], buddy_classer]
                    ]
                }
                masumes.push(msm)
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
    for (const masume of masumes) {
        const range: number[] = []
        let i = 0
        let j = 0
        const code_reader: ReaderMap = new Map()

        const code_groups: Map<number, KatateAndMap> = new Map()
        let laterid = -1
        while (i < def_range[1]) {
            if (masume.range(i)) {
                const katate = masume.katate
                range.push(i)
                for (const [gramid, voidbool] of masume.classer) {
                    const gotgroup = code_groups.get(gramid)
                    const [classer, is_useful] = voidbool
                    if (!is_useful){
                        laterid = gramid
                        continue
                    }
                    const v = classer(i)
                    if (gotgroup === undefined) {
                        const code_group: Map<GroupId, Code[]> = new Map()
                        code_group.set(v, [i])
                        code_groups.set(gramid, [katate, code_group])
                    } else {
                        const [_, code_group]: KatateAndMap = gotgroup

                        const codes = code_group.get(v)
                        if (codes === undefined) {
                            code_group.set(v, [i])
                        } else {
                            code_group.set(v, [...codes, i])
                        }
                        code_groups.set(gramid, [katate, code_group])
                    }
                }

            }
            i += 1
        }
        if (laterid >=0){
            for (const [gramid, [katate, code_group]] of code_groups){
                const other_group: Map<GroupId, Code[]> = new Map()
                for (const [groupid, codes] of code_group){
                    codes.forEach((code, code_i)=>{
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
        console.log(`process func, code_groups`, code_groups)
        for (const [gramid, [katate, code_group]] of code_groups) {
            let n_shu = 0
            for (const [groupid, codes] of code_group) {
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
    }

    const res = {
        grams
        , reader_map: code_readers
        , su_type_m
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

function read_kino(kino: string) {
    type SkippedBy = Where

    const gram_sets_status: Map<GrammarSetName, GramSetStatus> = new Map()
    const gram_resolved: Map<GrammarName, [SomethingsValue, Where]> = new Map()
    let skipped_slots: Map<SlotId, SkippedBy> = new Map()
    const setu_zi_s: string[][] = []

    let looking_i = 1
    let pre_looking_i = 0

    slots.forEach((slot, slot_i) => {
        console.log(`skipped_slots =`, skipped_slots)
        const skipped_by = skipped_slots.get(slot_i)
        const has_skipped = skipped_by !== undefined
        let grams: Gram[] = []
        let reader_map: KatateReaderMap[] = []
        let su_type_m: SuTypeM = new Map()
        if (has_skipped){
            grams = slot.grams
            let su_type_s: SuTypeS = []
            const [typem, types] = su_type_analyze(grams, su_type_m, su_type_s)
            su_type_m = typem
            const slotreader: SlotReader = []
            grams.forEach((gram, gram_i) => slotreader.push([gram_i, 0]))
            const map: ReaderMap = new Map([
                [0, slotreader]
            ])
            const ka: KatateReaderMap = [false, map]
            reader_map.push(ka)
        }else{
            const res = process(slot)
            grams = res.grams
            reader_map = res.reader_map
            su_type_m = res.su_type_m
        }
        console.log(`slot${slot_i} was skipped <-`, has_skipped)
        console.log(`grams=`, grams)
        console.log(`reader map=`, reader_map)
        const newsetu: string[] = []
        let dont_count_setu = false
        reader_map.forEach(([katate, zi_reader], n_zi)=>{ //inscope 1zi target
            if (dont_count_setu) return

            let overlength = false
            console.log(`pre_looking_i is`, pre_looking_i)
            if (pre_looking_i > kino.length - 1) overlength = true

            const tar_str = kino.substring(pre_looking_i, looking_i)
            const tar_code = char_code_map.get(tar_str)
            console.log(`str and code: ${tar_str}, ${tar_code}`)
            newsetu.push(tar_str)
            const where0: Where = [setu_zi_s.length, newsetu.length - 1]
            const where = has_skipped ? skipped_by : where0

            let slot_reader = undefined
            let is_invalid_char = false
            if (has_skipped){
                for (const [_, value] of zi_reader) {
                    slot_reader = value
                    console.log(`break`)
                    break
                }
                console.log(`after break`)
            }else{
                if (tar_code!==undefined){
                    const getter = katate? tar_code%shift_num : tar_code
                    slot_reader = zi_reader.get(getter)
                    if (slot_reader===undefined){
                        console.log(`'${tar_str}' is invalid char here`)
                    }
                } else {
                    if (!overlength && tar_str!==``){
                        console.log(`invalid char, continue`)
                        is_invalid_char = true
                    }else if (overlength && tar_str===``) {
                        console.log(`no skip and out of range, continue`)
                        if(n_zi===0) dont_count_setu = true
                    }
                    return
                }
            }
            // if (!has_skipped && tar_code !== undefined) {
            //     const getter = katate? tar_code%shift_num : tar_code
            //     slot_reader = zi_reader.get(getter)
            //     if (slot_reader===undefined){
            //         console.log(`'${tar_str}' is invalid char here`)
            //     }
            // } else if (tar_str === '') {
            //     console.log(`skipped overlength`)
            //     if (has_skipped){
            //         for (const [_, value] of zi_reader) {
            //             slot_reader = value
            //             console.log(`break`)
            //             break
            //         }
            //         console.log(`after break`)
            //     }else{
            //         continue
            //     }
            // } else {
            //     console.log(`invalid char, continue`)
            //     is_invalid_char = true
            //     continue
            // }
            if (slot_reader !== undefined) {
                for (const [gramid, _gramvalue] of slot_reader) {
                    const gramvalue = has_skipped ? 0 : _gramvalue
                    const about_gram = su_type_m.get(gramid)
                    if (about_gram !== undefined) {
                        const gram_type = about_gram[1]
                        if (gram_type === 0) {
                            const gram_name = grams[gramid] as GrammarName
                            gram_resolved.set(gram_name, [gramvalue, where])
                            console.log(`---${gram_name}${gramvalue}`)
                        } else if (gram_type === 1) {
                            const gram_set_value = grams[gramid] as GrammarSetValue
                            console.log(`---GrammarSetValue. `, gram_set_value)
                            const [setname, is_gram_choise] = gram_set_value
                            const status = gram_sets_status.get(setname)
                            console.log(`is it ok gramsetsstatus`, gram_sets_status)
                            if (status === undefined) {
                                gram_sets_status.set(setname, {
                                    which: is_gram_choise ? gramvalue : -1
                                    , value: is_gram_choise ? -1 : gramvalue
                                    , which_by: is_gram_choise? where: [-1, -1]
                                    , value_by: is_gram_choise? [-1,-1]: where
                                    , resolved: false
                                })
                            } else {
                                console.log(`read kino(), status found`)
                                // const complement = ['which', 'value'].find(d=> status[d as keyof GramSetStatus] < 0)

                                let comple2 = ''
                                if (!status.resolved && status.which < 0) {
                                    comple2 = 'which'
                                } else if (!status.resolved && status.value < 0) {
                                    comple2 = 'value'
                                }
                                if (is_gram_choise && comple2 === 'which') {
                                    gram_sets_status.set(setname, {
                                        ...status
                                        , which: gramvalue
                                        , which_by: where
                                        , resolved: true
                                    })
                                } else if (!is_gram_choise && comple2 === 'value') {
                                    gram_sets_status.set(setname, {
                                        ...status
                                        , value: gramvalue
                                        , value_by: where
                                        , resolved: true
                                    })
                                } else {
                                    console.log(`status cant resolved`)
                                }
                            }
                        } else if (gram_type === 2) {
                            const skips = grams[gramid] as Skip[]
                            console.log(`read kino, skips`, skips)
                            const selected_skip = skips[gramvalue]
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
                        }
                    }else{
                        console.log(`about gram was undefined...`)
                    }
                }
            }else{
                console.log(`slot reader why undefined...`) //slot[0] concatanation come here
            }

            if (!has_skipped) {
                pre_looking_i = looking_i
                looking_i += 1
            }
        })
        // if (!has_skipped) setu_zi_s.push(newsetu)
        if (!dont_count_setu) setu_zi_s.push(newsetu)
        // has skipped: false and

    })
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
        if (resolved) {
            const same_setus = where_m.get(value_by[0])
            const gram_set = grammar_sets.get(gram_set_name)
            if (gram_set!==undefined){

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


            // [which_by, value_by].forEach((by, i)=> {
            //     const same_setus = where_m.get(by[0])
            //     const gram_set = grammar_sets.get(gram_set_name)
            //     if (gram_set !== undefined) {
            //         const is_set_name = i===0
            //         if (is_set_name){
            //             const setvalue: SetuMapValue = [
            //                 [
            //                     is_set_name
            //                     , gram_set[by[0]]
            //                 ]
            //                 , value
            //                 , by[1]
            //             ]

            //             if (same_setus === undefined) {
            //                 where_m.set(by[1], [setvalue])
            //             } else {
            //                 where_m.set(by[0], [...same_setus, setvalue])
            //             }
            //         }else{
            //             const setvalue: SetuMapValue = [
            //                 [
            //                     is_set_name
            //                     , gram_set_name
            //                 ]
            //                 , value
            //                 , by[1]
            //             ]

            //         }

            //     }
            // })
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
    string[][]
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
export function gloss(word: string) {
    console.log('\n\ngloss() word', word)

    const options: GlossOptions = {
        or_value_to_name: false
        ,hide_each_zi: false
    }

    const [setu_zi_s, setu_grams_m, gram_sets_status]: ReadKinoReturn = read_kino(word)
    let setus_str = ``
    let setus_list: Glosstsx[] = []
    setu_zi_s.forEach((zi_s, setu_i)=>{
        const grams = setu_grams_m.get(setu_i)
        let zis_str = ``
        let zis_str_list: Glosstsx[] = []

        if (grams!==undefined){
            grams.sort((d, f)=> d[2] - f[2])
            zi_s.forEach((zi, zi_i)=>{
                const tar_grams = grams.filter(d=> d[2]=== zi_i)
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
                                            ,[", ", "delem", 0]
                                        ]
                                    })
                                    str_list.pop()
                                }
                            }
                            str = str.substring(2)
                            grammarstr = `[${str}]`
                            grammarstr_list = [
                                ["[", "kakko", 0]
                                , ...str_list
                                ,["]", "kakko", 0]
                            ]
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
                const zi_del = options.hide_each_zi? '': zi +Delemeter.zi_grammar
                const zi_delist: Glosstsx[] = options.hide_each_zi
                ? []
                : [
                    [zi, "spell", 0]
                    ,[Delemeter.zi_grammar, "delem", 0]
                ]
                zis_str+= zi_del +gramvalues.substring(Delemeter.zi.length) +Delemeter.keitaiso
                gramvalues_list.shift()
                zis_str_list = [
                    ...zis_str_list
                    ,...zi_delist
                    ,...gramvalues_list
                    ,[Delemeter.keitaiso, "delem", 0]
                ]
            })
            zis_str= zis_str.substring(0, zis_str.length-1)
            zis_str_list.pop()
            //invalid string if exists, below code's res may missing that string
            // for (const [name, value_number, zi_i] of grams ){
            //     const grammarstr = options.or_value_to_name? value_to_name(name, value_number) : `${name}${value_number}`
            //     zis_str+=  grammarstr[zi_i] + Delemeter.zi
            // }
        }
        setus_str+= zis_str +Delemeter.keitaiso_grammars
        setus_list = [
            ...setus_list
            ,...zis_str_list
            ,[Delemeter.keitaiso_grammars, "delem", 0]
        ]
    })
    setus_str = setus_str.substring(0, setus_str.length - Delemeter.keitaiso_grammars.length)
    setus_list.pop()
    const re: StrTsx = [setus_str, setus_list]
    return re
}
export type StrTsx = [string, Glosstsx[]]
type GlossSchema = Map<string, GrammarAssign[]>[]


// export const Pattern: React.VFC<OutProps> = ({ res }: OutProps) => <div>Pattern</div>
