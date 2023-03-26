import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider, Typography } from '@material-ui/core'
import { ENGLISH, KOREAN, peopleCategory, placeCategory, transportationCategory } from '../../utility/constants'
import { howYouGettinThere, whereYouGoin, whoYouGoinWith } from '../../korean/vocabulary/questions'
import { people, places, transportation } from '../../korean/vocabulary/nouns'
import { I_TOPIC } from '../../korean/vocabulary/commonPhrases'
import { LOCATION_PARTICLE_GENERAL, BY_PARTICLE, getWithParticle } from '../../korean/vocabulary/particles'
import { TO_GO } from '../../korean/vocabulary/verbs'
import Flashcard from '../cards/Flashcard'
import TranslateIconStyled from '../cards/TranslateIconStyled'
import Filters from './Filters'

const useStyles = makeStyles((theme) => ({
  lessonHeader: {
    paddingBottom: theme.spacing(4),
  },
  filtersContainer: {
    paddingBottom: theme.spacing(4),
    maxWidth: 670,
  },
  header: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  instructions: {
    paddingBottom: theme.spacing(2),
  },
  button: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  questionText: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    display: 'block',
    maxWidth: 670,
  },
  question: {
    display: 'flex',
    paddingRight: theme.spacing(4),
  },
  text: {
    paddingLeft: theme.spacing(1),
  },
  flashcard: {
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    display: 'block',
  },
  flashcardPadding: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(2),
    },
    paddingBottom: theme.spacing(2),
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
    paddingTop: theme.spacing(2),
    display: 'flex',
  },
  shuffle: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(10),
  },
}))

export default function WhereYouGoin() {
  const classes = useStyles()
  // v1 places, people, transportation, time
  // v1.5 include time option as to-from, have an option for going to from a location
  const placesEnglish = _.keys(places)
  const transportationEnglish = _.keys(transportation)
  const peopleEnglish = _.keys(people)
  
  const initialQuestionState = {
    [placeCategory]: KOREAN,
    [transportationCategory]: KOREAN ,
    [peopleCategory]: KOREAN,
  }
  const initialFilterState = {
    [placeCategory]: true,
    [transportationCategory]: true,
    [peopleCategory]: true,
  }
  const initialFlashcardState = {
    [placeCategory]: ENGLISH,
    [transportationCategory]: ENGLISH,
    [peopleCategory]: ENGLISH,
  }
  
  const [questionLanguage, setQuestionLanguage] = useState(initialQuestionState)
  const [fullSentenceLanguage, setFullSentenceLanguage] = useState(ENGLISH)
  const [flashcardLanguage, setFlashcardLanguage] = useState(initialFlashcardState)
  
  const [categories, setCategories] = useState(initialFilterState)
  // setting this initially with a random int gives a hydration error because it renders multiple times? idfk
  const [flashcardIndexes, setFlashcardIndexes] = useState({})
  
  const [initialLoad, setInitialLoad] = useState(true)
  
  useEffect(() => {
    if (initialLoad) {
      setFlashcardIndexes(prev => {
        setInitialLoad(false)
        return {
          ...prev,
          [placeCategory]: getRandomIndex(placesEnglish),
          [transportationCategory]: getRandomIndex(transportationEnglish),
          [peopleCategory]: getRandomIndex(peopleEnglish),
        }
      })
    }
  }, [initialLoad, placesEnglish, transportationEnglish, peopleEnglish])
  
  const handleFlashcardFlip = key => {
    let nextLanguage = ENGLISH
    if (flashcardLanguage[key] === ENGLISH) {
      nextLanguage = KOREAN
    }
    setFlashcardLanguage(prev => {
      return { ...prev, [key]: nextLanguage }
    })
  }
  
  const handleApplyCategories = updatedCategories => {
    setCategories(updatedCategories)
  }
  
  const getFullSentenceEnglish = () => {
    // todo add other categories
    const placeStr = categories[placeCategory] ? ` to the ${placesEnglish[flashcardIndexes[placeCategory]]}` : ''
    const transportStr = categories[transportationCategory] ? ` by ${transportationEnglish[flashcardIndexes[transportationCategory]]}` : ''
    const peopleStr = categories[peopleCategory] ? ` with ${peopleEnglish[flashcardIndexes[peopleCategory]]}` : ''
    const endStr = placeStr + transportStr + peopleStr
    return `I go${endStr}.`
  }
  
  const getFullSentenceKorean = () => {
    // todo add other categories
    // todo these long lines are a nightmare, pls shorten
    const placeStr = categories[placeCategory] ? ` ${places[placesEnglish[flashcardIndexes[placeCategory]]]}${LOCATION_PARTICLE_GENERAL}` : ''
    const transportStr = categories[transportationCategory] ? ` ${transportation[transportationEnglish[flashcardIndexes[transportationCategory]]]}${BY_PARTICLE}` : ''
    const peopleStr = categories[peopleCategory] ? ` ${people[peopleEnglish[flashcardIndexes[peopleCategory]]]}${getWithParticle(people[peopleEnglish[flashcardIndexes[peopleCategory]]])}` : ''
    const middleStr = peopleStr + transportStr + placeStr
    return `${I_TOPIC}${middleStr} ${TO_GO.presentTense}.`
  }
  const getFullSentence = () => {
    return fullSentenceLanguage === KOREAN ? getFullSentenceKorean() : getFullSentenceEnglish()
  }
  const handleQuestionTranslate = key => {
    let nextLanguage = ENGLISH
    if (questionLanguage[key] === ENGLISH) {
      nextLanguage = KOREAN
    }
    setQuestionLanguage(prev => {
      return { ...prev, [key]: nextLanguage }
    })
  }
  const handleSentenceTranslate = () => {
    if (fullSentenceLanguage === ENGLISH) {
      setFullSentenceLanguage(KOREAN)
    } else {
      setFullSentenceLanguage(ENGLISH)
    }
  }
  
  const handleRefresh = () => {
    setFlashcardIndexes( prev => {
      setQuestionLanguage(initialQuestionState)
      setFullSentenceLanguage(ENGLISH)
      setFlashcardLanguage(initialFlashcardState)
      return {
        ...prev,
        [placeCategory]: getRandomIndex(placesEnglish),
        [transportationCategory]: getRandomIndex(transportationEnglish),
        [peopleCategory]: getRandomIndex(peopleEnglish),
      }
    })
  }

  return (
    <>
      <Typography className={classes.lessonHeader} variant="h2">To Go</Typography>
       <div className={classes.filtersContainer}>
        <Filters categories={categories} handleApplyCategories={handleApplyCategories}/>
       </div>
       <Divider/>
      <div className={classes.header}>
        <Typography className={classes.instructions}>Use the individual flashcards to study before answering the following question(s) in a full sentence</Typography>
        <div className={classes.questionText}>
          { categories[transportationCategory] && (
            <div className={classes.question}>
              <TranslateIconStyled language={questionLanguage[transportationCategory]} onClick={() => handleQuestionTranslate(transportationCategory)}/>
              <Typography className={classes.text} variant="h5">{howYouGettinThere[questionLanguage[transportationCategory]]}</Typography>
            </div>
          )}
          { categories[peopleCategory] && (
            <div className={classes.question}>
              <TranslateIconStyled language={questionLanguage[peopleCategory]} onClick={() => handleQuestionTranslate(peopleCategory)}/>
              <Typography className={classes.text} variant="h5">{whoYouGoinWith[questionLanguage[peopleCategory]]}</Typography>
            </div>
          )}
          { categories[placeCategory] && (
            <div className={classes.question}>
              <TranslateIconStyled language={questionLanguage[placeCategory]} onClick={() => handleQuestionTranslate(placeCategory)}/>
              <Typography className={classes.text} variant="h5">{whereYouGoin[questionLanguage[placeCategory]]}</Typography>
            </div>
          )}
        </div>
      </div>
      <Divider/>
      <div className={classes.flashcard}>
        { _.every(categories, (v, k) => v === false) && (
          <Typography>Please select a category to practice with the verb to go</Typography>
        )}
        { categories[transportationCategory] && (
          <div className={classes.flashcardPadding}>
            <Flashcard
              english={transportationEnglish[flashcardIndexes[transportationCategory]]}
              korean={transportation[transportationEnglish[flashcardIndexes[transportationCategory]]]}
              flashcardLanguage={flashcardLanguage[transportationCategory]}
              handleFlip={() => handleFlashcardFlip(transportationCategory)}
            />
          </div>
        )}
        { categories[peopleCategory] && (
          <div className={classes.flashcardPadding}>
            <Flashcard
              english={peopleEnglish[flashcardIndexes[peopleCategory]]}
              korean={people[peopleEnglish[flashcardIndexes[peopleCategory]]]}
              flashcardLanguage={flashcardLanguage[peopleCategory]}
              handleFlip={() => handleFlashcardFlip(peopleCategory)}
            />
          </div>
        )}
        { categories[placeCategory] && (
          <div className={classes.flashcardPadding}>
            <Flashcard
              english={placesEnglish[flashcardIndexes[placeCategory]]}
              korean={places[placesEnglish[flashcardIndexes[placeCategory]]]}
              flashcardLanguage={flashcardLanguage[placeCategory]}
              handleFlip={() => handleFlashcardFlip(placeCategory)}
            />
          </div>
        )}
      </div>
      <div className={classes.fullSentenceContainer}>
        <Typography>Try to say the full sentence out loud before clicking the translate icon!</Typography>
        <div className={classes.fullSentence}>
          <TranslateIconStyled language={fullSentenceLanguage} onClick={handleSentenceTranslate}/>
          <Typography className={classes.text} variant="h5">{getFullSentence()}</Typography>
        </div>
      </div>
      <div className={classes.shuffle}>
        <Button variant="contained" color="primary" onClick={handleRefresh}>Shuffle Flashcards</Button>
      </div>
    </>
  )
}

const getRandomIndex = lst => {
  return _.random(0, lst.length - 1)
}
