// ═════════════════════════════════════════════════════════════════════════════
// JAVASCRIPT JUNK
// ═════════════════════════════════════════════════════════════════════════════

// ⋯ NOTE ⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯
// This module is an all-inclusive readme and library containing all sorts of
// (terrible?) javascript that I have either written myself or found over the
// years. Many of these functions and snippets have been found on StackOverflow
// and remain completely un-attributed. If one of these is stolen from you or
// someone you know, please open an issue and I will attempt to un-steal it. :)
//
// The tests shown here are in place of examples and can be run with `yarn test`
// These tests are by no means extensive, but many of these functions have been
// tested in production environments by professional testers elsewhere.

// ⋯ USAGE ⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯
// To use these functions in module form - just clone the repo and run `yarn`.

// ⋯ CONTENTS ⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯⋯
// ──── NUMBERS, STRINGS & OTHER THINGS
// ──── HEX-Y SO SEXY
// ──── OBJECTS & ARRAYS UNPHASED
// ──── MISCELLANEOUS BUT NEVER PLAIN-EOUS

// ═════════════════════════════════════════════════════════════════════════════
// NUMBERS, STRINGS & OTHER THINGS
// ═════════════════════════════════════════════════════════════════════════════

// - IS 32 Bit -----------------------------------------------------------------

export const is32Bit = c => c.codePointAt(0) > 0xFFFF

// - TEST / EXAMPLE
test('is32Bit', () => {
    expect(is32Bit('𠮷')).toBe(true)
    expect(is32Bit('a')).toBe(false)
})

// - CHARACTER TO CHARACTER CODE -----------------------------------------------
// Convert a character into its representative character code(number).

export const charToCharCode = char => char.charCodeAt(0)

// - TEST / EXAMPLE
test('charToCharCode', () => {
    expect(charToCharCode('h')).toEqual(104)
})

// - STRING TO NUMBER ----------------------------------------------------------
// Converts a string into a number based on each character's code.
// DEPENDS ON: charToCharCode

export const stringToNumber = str => {
    const baseString = String(str) //> 'hello'
    const stringArray = baseString.split('') //> ['h', 'e' ...]
    const charCodeArray = stringArray.map(charToCharCode) //> ['104', '101' ...]
    const charCodeString = charCodeArray.join('') //> '104101108108111'

    return parseInt(charCodeString)
}

// - TEST / EXAMPLE
test('stringToNumber', () => {
    expect(stringToNumber('h')).toEqual(104)
    expect(stringToNumber('hello')).toEqual(104101108108111)
})

// - RANDOM STRING -------------------------------------------------------------
// Generate an 8 character random string.

export const randomString = () => Math.random().toString(36).substr(2, 8)

// - TEST / EXAMPLE
test('randomString', () => {
    expect(randomString(8).length).toEqual(8)
})

// - RANDOM NUMBER BETWEEN (INCLUSIVE) -----------------------------------------
// Generate a random whole number between two whole numbers.

const randomNumberBetween = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from

// - TEST / EXAMPLE
test('randomNumberBetween', () => {
    console.log(randomNumberBetween(21, 42));
    expect(randomNumberBetween(21, 42)).toBeGreaterThan(42)
})

// - RANGES ----------------------------------------------------------------------------

const eRange = x => [...Array(x).keys()];

// ═════════════════════════════════════════════════════════════════════════════
// HEX-Y SO SEXY
// ═════════════════════════════════════════════════════════════════════════════

// - SEEDED HEX ----------------------------------------------------------------
//  Generate a consistent hexadecimal code based on an input value.
//  Don't forget to add a hash '#' at the start.
//  DEPENDS ON: stringToNumber > charToCharCode

export const seededHex = (val) =>
    Math.sin(parseInt(stringToNumber(val.toString()), 10))
        .toString()
        .substr(6)
        .slice(0, 6)

// - TEST / EXAMPLE
test('seededHex', () => {
    expect(seededHex(26286)).toEqual('326336')
    expect(seededHex('hello')).toEqual('219933')
})

// - RANDOM HEX ----------------------------------------------------------------
// Generate a random hexidecimal value.

const randomHex = () => {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    if (hex.length !== 6) { return randomHex() }
    return hex
}

// - TEST / EXAMPLE
test('randomHex', () => {
    expect(randomHex().length).toEqual(6)
})

// - CONVERT HEX TO/FROM NUMBER-------------------------------------------------
// Functions to convert a hex value into a regular number and back.

export const hexAsNumber = hex => parseInt(hex, 16)
export const numberAsHex = num => (num).toString(16)

// - TEST / EXAMPLE
test('hexAsNumber', () => {
    expect(hexAsNumber('123f54')).toEqual(1195860)
})
test('numberAsHex', () => {
    expect(numberAsHex(1195860)).toEqual('123f54')
})

// - IS DARK (RGB) -------------------------------------------------------------

export const isDark = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000 < 125 / 2

// ═════════════════════════════════════════════════════════════════════════════
// OBJECTS AND ARRAYS UNPHASED
// ═════════════════════════════════════════════════════════════════════════════
// Wrangle the tangle in the land of objects and arrays.

// - CHECK IF ARRAYS ARE EQUAL -------------------------------------------------
export const arraysAreEqual = (a1, a2) =>
    a1.length > 0 &&
    a2.length > 0 &&
    a1.length === a2.length &&
    !(a1.sort() > a2.sort() || a1.sort() < a2.sort())

test('arraysAreEqual', () => {
    expect(arraysAreEqual(['a', 'b', 'c'], ['c', 'b', 'a'])).toEqual(true)
})

// - RECURSE OBJECT BY STRING --------------------------------------------------
// Ooooo, searching JS objects for deeply nested values - our favourite
// nightmare. We've all seen it implemented a million different ways... well,
// I like this one and so will you.

export const recurseByString = (obj, str, char = '.') =>
    (!!str || null) &&
    !(str.split(char).forEach((k) => (obj = obj[k]))) && obj || null

// - TEST / EXAMPLE
test('recurseByString', () => {
    expect(recurseByString({ a: { b: { c: 2 } } }, 'a.b.c')).toEqual(2)
})

// ═════════════════════════════════════════════════════════════════════════════
// - MISCELLANEOUS BUT NEVER PLAIN-EOUS
// ═════════════════════════════════════════════════════════════════════════════
// Functions that do things - just not necessarily useful things.

// - INFINITE LOOP -------------------------------------------------------------
// Just hate on your computer for a bit and run this function.
export const infiniteLoop = (fn) => {
    for (; ;) {
        fn()
    }
}

// - TEST / EXAMPLE - N/A