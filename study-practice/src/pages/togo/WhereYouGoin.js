import React, { useState } from 'react'
import _ from 'lodash'
import { Typography, Button } from '@material-ui/core'
import { ENGLISH, KOREAN } from '../../utility/constants'
import { whereYouGoin } from '../../korean/vocabulary/questions'
import { makeStyles } from '@material-ui/core/styles'
import { places } from '../../korean/vocabulary/nouns'
import Flashcard from '../../components/cards/Flashcard'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
  },
  button: {
    paddingRight: theme.spacing(2),
  },
  flashcard: {
    paddingTop: theme.spacing(5),
  },

}))
export default function WhereYouGoin() {
  const classes = useStyles()
  const placesEnglish = _.keys(places)
  const [questionLanguage, setQuestionLanguage] = useState(KOREAN)
  const [placesIndex, setPlacesIndex] = useState(getRandomIndex(placesEnglish.length))
  
  const handleQuestionTranslate = () => {
    if (questionLanguage === ENGLISH) {
      setQuestionLanguage(KOREAN)
    } else {
      setQuestionLanguage(ENGLISH)
    }
  }
  const questionButtonText = questionLanguage === ENGLISH ? KOREAN : ENGLISH
  
  const handleNewPlace = () => {
    setPlacesIndex(getRandomIndex(placesEnglish.length))
  }
  
  return (
    <>
      <div className={classes.header}>
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleQuestionTranslate}>TRANSLATE TO {questionButtonText}</Button>
        </div>
        <Typography variant="h5">{whereYouGoin[questionLanguage]}</Typography>
      </div>
      <div className={classes.flashcard}>
        <Flashcard english={placesEnglish[placesIndex]} korean={places[placesEnglish[placesIndex]]} />
      </div>
    </>
  )
}

const getRandomIndex = lst => {
  return _.random(lst.length)
}