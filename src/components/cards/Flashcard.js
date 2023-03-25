import _ from 'lodash'
import clsx from 'clsx'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'
import { colors } from '../../theme/colors'
import { ENGLISH, KOREAN } from '../../utility/constants'


const useStyles = makeStyles((theme) => ({
  flashcard: {
    maxWidth: 400,
    minHeight: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  korean: {
    backgroundColor: colors.UNBLEACHED_SILK_50,
  },
  english: {
    backgroundColor: 'white',
  },
  
  // TODO: flip card, for now i'm just gonna do some stupid shading
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_card

}))
export default function Flashcard(props) {
  const classes = useStyles()
  const { english, korean, handleFlip, flashcardLanguage } = props
  
  
  return (
    <Card
      onClick={handleFlip}
      className={clsx(classes.flashcard, flashcardLanguage === KOREAN ? classes.korean: classes.english)}
    >
      <Typography variant="h4">{flashcardLanguage === KOREAN ? korean : english}</Typography>
    </Card>
  )
}