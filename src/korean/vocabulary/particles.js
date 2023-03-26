import { getLastCharacter, vowels } from './hangeul'

export const LOCATION_PARTICLE_GENERAL = '에'

export const BY_PARTICLE = '로'
export const WITH_PARTICLE_V = '랑'
export const WITH_PARTICLE_C = `이${WITH_PARTICLE_V}`

export const getWithParticle = koreanWord => {
  const lastChar = getLastCharacter(koreanWord)
  console.log('last ', lastChar)
  const isVowel = vowels.includes(lastChar)
  console.log('vowels.includes(lastChar)', vowels.includes(lastChar))
  return isVowel ? WITH_PARTICLE_V : WITH_PARTICLE_C
}
