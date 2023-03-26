import _ from 'lodash'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Button, Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { placeCategory, transportationCategory } from '../../utility/constants'


const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: 'block',
  },
  checkboxContainer: {
    // display: 'flex',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function Filters(props) {
  const classes = useStyles()
  const { categories, handleApplyCategories } = props
  
  const [tempCategories, setTempCategories] = useState(_.clone(categories))
  const handleChangeTempCategories = e => {
    setTempCategories(prev => {
      return { ...prev, [e.target.name]: e.target.checked }
    })
  }
  
  return (
    <Accordion >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="filters-content"
      id="filters-header"
    >
      <Typography>Filters</Typography>
    </AccordionSummary>
    <AccordionDetails className={classes.detailsContainer}>
      <div className={classes.checkboxContainer}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="primary" checked={_.get(tempCategories, placeCategory)} onChange={handleChangeTempCategories} name={placeCategory} />}
            label="Places"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={_.get(tempCategories, transportationCategory)} onChange={handleChangeTempCategories} name={transportationCategory} />}
            label="How (transportation)"
          />
        </FormGroup>
      </div>
      <div className={classes.buttonsContainer}>
        <Button variant="outlined" onClick={() => handleApplyCategories(tempCategories)}>Apply</Button>
      </div>
    </AccordionDetails>
  </Accordion>
  )
}