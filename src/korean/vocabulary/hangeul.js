import _ from 'lodash'

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
  return _.last(Array.from(koreanWord.normalize('NFD')))
}