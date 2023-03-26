import _ from 'lodash'
import * as Hangul from 'hangul-js'

export const vowels = [
  'ㅏ',
  'ㅑ',
  'ㅓ',
  'ㅕ',
  'ㅗ',
  'ㅛ',
  'ㅜ',
  'ㅠ',
  'ㅡ',
  'ㅣ',
]

export const getLastCharacter = koreanWord => {
  const arr = Hangul.disassemble(koreanWord)
  return _.last(arr)
}