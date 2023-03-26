import React from 'react'
import _ from 'lodash'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { people, places, transportation } from '../../korean/vocabulary/nouns'
import DictionaryCard from '../../components/dictionary/DictionaryCard'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing(2),
  },
  item: {
    maxWidth: 320,
    minWidth: 320,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))
export default function Home() {
  const classes = useStyles()
  const placesEnglish = _.keys(places)
  
  // TODO: make into a pretty card
  
  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h2">Dictionary</Typography>
      </div>
      <Grid container>
        <Grid item xs className={classes.item}>
          <DictionaryCard
            title="Places"
            englishLst={placesEnglish}
            dictionary={places}
          />
        </Grid>
        <Grid item xs className={classes.item}>
          <DictionaryCard
            title="Transportation"
            englishLst={_.keys(transportation)}
            dictionary={transportation}
          />
        </Grid>
        <Grid item xs className={classes.item}>
          <DictionaryCard
            title="People"
            englishLst={_.keys(people)}
            dictionary={people}
          />
        </Grid>
      </Grid>
    </div>
  )
}