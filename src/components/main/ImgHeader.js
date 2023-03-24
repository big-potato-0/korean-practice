import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import seoulBanner from '../../../public/images/seoul.jpg'

const IMG_HEIGHT_LG = '300px'
const IMG_HEIGHT_XL = '400px'

const useStyles = makeStyles((theme) => ({
	imgContainer: {
		[theme.breakpoints.up('lg')]: {
			height: IMG_HEIGHT_LG,
		},
		[theme.breakpoints.up('xl')]: {
			height: IMG_HEIGHT_XL,
		},
	},
	topImage: {
		width: '100%',
		[theme.breakpoints.up('lg')]: {
			height: IMG_HEIGHT_LG,
		},
		[theme.breakpoints.up('xl')]: {
			height: IMG_HEIGHT_XL,
		},
	},
}))

export default function ImgHeader(props) {
	const classes = useStyles()
	// TODO: look at this: https://beta.nextjs.org/docs/upgrade-guide#image-component
	return (
		<Grid item xs={12} className={classes.imgContainer}>
			<img src={seoulBanner.src}  alt="Seoul" className={classes.topImage}/>
		</Grid>
	)
}