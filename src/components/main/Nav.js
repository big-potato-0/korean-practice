import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Grid, Toolbar, Typography, Divider, IconButton, Drawer, Button, Tooltip } from '@material-ui/core'
import { colors } from '../../theme/colors'
import NavItem from './NavItem'
import GithubIcon from '../../../public/icons/github-mark.png'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  navDivider: {
    backgroundColor: colors.UNBLEACHED_SILK,
    width: '100%',
    height: theme.spacing(1),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hamburger: {
    display: 'flex',
  },
  codeLink: {
    cursor: 'pointer',
    height: 30,
    width: 30,
  },
  lessonsLabel: {
    paddingTop: theme.spacing(1),
  },
  appBar: {
    position: 'sticky',
    backgroundColor: 'white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '&.MuiAppBar-positionFixed': {
      top: 'auto',
    },
    borderBottom: `2px solid ${colors.BRIGHT_GREY}`,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // // TODO: i shouldn't have to do this what the heck, only for home dir...
    // [theme.breakpoints.up('sm')] : {
    //   marginLeft: -drawerWidth,
    // },
    // marginLeft: 0,
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  //   // TODO: same here ^^
  //   [theme.breakpoints.up('md')] : {
  //     marginLeft: 0,
  //   },
  //   marginLeft: drawerWidth,
      marginLeft: 0,
    },
  }
))

export default function Nav({ children }) {
  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()
  
  const [open, setOpen] = React.useState(false)
  const currentPage = router.pathname
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }
  
  return (
    <Grid container>
      <Grid item xs={12}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.hamburger}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.lessonsLabel} variant='h6' noWrap>
              Lessons
            </Typography>
          </div>
          <Tooltip title="see my shitty code lol">
            <a href="https://github.com/big-potato-0/korean-practice">
              <img src={GithubIcon.src}  alt="Github" className={classes.codeLink} />
            </a>
          </Tooltip>
        </Toolbar>
      </Grid>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider className={classes.navDivider} />
        <NavItem page="/" text="Home" onClick={handleDrawerClose} currentPage={currentPage}/>
        <NavItem page="/togo" text="To Go" onClick={handleDrawerClose} currentPage={currentPage}/>
        <Divider />
        <NavItem page="/dictionary" text="Dictionary" onClick={handleDrawerClose} currentPage={currentPage}/>
      </Drawer>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader}>
          {children}
        </div>
      </div>
    </Grid>
  )
}