import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { ENGLISH, KOREAN } from '../../utility/constants'
import { whereYouGoin } from '../../korean/vocabulary/questions'
import { places } from '../../korean/vocabulary/nouns'
import { I_TOPIC } from '../../korean/vocabulary/commonPhrases'
import { LOCATION_PARTICLE_GENERAL } from '../../korean/vocabulary/particles'
import { TO_GO } from '../../korean/vocabulary/verbs'
import Flashcard from '../../components/cards/Flashcard'

const useStyles = makeStyles((theme) => ({
  lessonHeader: {
    paddingBottom: theme.spacing(4),
  },
  filtersContainer: {
    paddingBottom: theme.spacing(4),
    maxWidth: 1000,
  },
  header: {
    paddingTop: theme.spacing(4),
    display: 'flex',
  },
  button: {
    paddingRight: theme.spacing(2),
  },
  flashcard: {
    paddingTop: theme.spacing(5),
  },
  icon: {
    paddingLeft: theme.spacing(5),
    cursor: 'pointer',
  },
  fullSentenceContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  fullSentence: {
    paddingTop: theme.spacing(4),
    display: 'flex',
  },
}))
// TODO this component got kinda big
export default function WhereYouGoin() {
  const classes = useStyles()
  // v1 places, people, transportation, time
  // v2 include time option as to-from, have an option for going to from a location
  const placeCategory = 'placeCategory'
  const placesEnglish = _.keys(places)
  const [questionLanguage, setQuestionLanguage] = useState(KOREAN)
  const [fullSentenceLanguage, setFullSentenceLanguage] = useState(ENGLISH)
  const [placesLanguage, setPlacesLanguage] = useState(ENGLISH)

    const handlePlacesFlip = () => {
      setPlacesLanguage(placesLanguage === ENGLISH ? KOREAN : ENGLISH)
    }
  
  const [categories, setCategories] = useState([placeCategory])
  // i guess setting this initially with a random int gives a hydration error because it renders multiple times? idfk
  const [initialLoad, setInitialLoad] = useState(true)
  const [placesIndex, setPlacesIndex] = useState()
  
  useEffect(() => {
    if (initialLoad) {
      setPlacesIndex(getRandomIndex(placesEnglish))
      setInitialLoad(false)
    }
  }, [initialLoad, placesEnglish])
  const getFullSentenceEnglish = () => {
    // todo add other categories
    const placeStr = categories.includes(placeCategory) ? `the ${placesEnglish[placesIndex]}` : ''
    const endStr = placeStr
    return `I go to ${endStr}.`
  }
  
  const getFullSentenceKorean = () => {
    // todo add other categories
    const placeStr = categories.includes(placeCategory) ? `${places[placesEnglish[placesIndex]]}${LOCATION_PARTICLE_GENERAL}` : ''
    const middleStr = placeStr
    return `${I_TOPIC} ${middleStr} ${TO_GO.presentTense}.`
  }
  const getFullSentence = () => {
    return fullSentenceLanguage === KOREAN ? getFullSentenceKorean() : getFullSentenceEnglish()
  }
  const handleQuestionTranslate = () => {
    if (questionLanguage === ENGLISH) {
      setQuestionLanguage(KOREAN)
    } else {
      setQuestionLanguage(ENGLISH)
    }
  }
  const handleSentenceTranslate = () => {
    if (fullSentenceLanguage === ENGLISH) {
      setFullSentenceLanguage(KOREAN)
    } else {
      setFullSentenceLanguage(ENGLISH)
    }
  }
  
  const questionButtonText = questionLanguage === ENGLISH ? KOREAN : ENGLISH
  const sentenceButtonText = fullSentenceLanguage === ENGLISH ? KOREAN : ENGLISH
  
  const handleRefresh = () => {
    setPlacesIndex( prev => {
      setQuestionLanguage(KOREAN)
      setFullSentenceLanguage(ENGLISH)
      setPlacesLanguage(ENGLISH)
      return getRandomIndex(placesEnglish)
    })
  }

  return (
    <>
      <Typography className={classes.lessonHeader} variant="h2">To Go</Typography>
      {/* NEXT FEATURE */}
      {/* <div className={classes.filtersContainer}> */}
      {/*  <Accordion > */}
      {/*    <AccordionSummary */}
      {/*      expandIcon={<ExpandMoreIcon />} */}
      {/*      aria-controls="filters-content" */}
      {/*      id="filters-header" */}
      {/*    > */}
      {/*      <Typography>Filters</Typography> */}
      {/*    </AccordionSummary> */}
      {/*    <AccordionDetails> */}
      {/*      <div> */}
      {/*        <Typography>TODO</Typography> */}
      {/*      </div> */}
      {/*    </AccordionDetails> */}
      {/*  </Accordion> */}
      {/* </div> */}
       <Divider/>
      <div className={classes.header}>
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleQuestionTranslate}>TRANSLATE TO {questionButtonText}</Button>
        </div>
        <Typography variant="h5">{whereYouGoin[questionLanguage]}</Typography>
        <div className={classes.icon}>
          <RefreshIcon onClick={handleRefresh}/>
        </div>
      </div>
      <div className={classes.flashcard}>
        <Flashcard
          english={placesEnglish[placesIndex]}
          korean={places[placesEnglish[placesIndex]]}
          flashcardLanguage={placesLanguage}
          handleFlip={handlePlacesFlip}
        />
      </div>
      <div className={classes.fullSentenceContainer}>
        <Typography>Translate the full sentence before clicking translate!</Typography>
        <div className={classes.fullSentence}>
          <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={handleSentenceTranslate}>TRANSLATE TO {sentenceButtonText}</Button>
          </div>
          <Typography variant="h5">{getFullSentence()}</Typography>
        </div>
      </div>
    </>
  )
}

const getRandomIndex = lst => {
  return _.random(0, lst.length - 1)
}
