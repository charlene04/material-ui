import React from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Avatar, Drawer, ListItemButton, Toolbar, Typography } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns'

const drawerWidth = 240;
const useStyle = makeStyles( theme => ({
    page: {
        width: '100%',
        backgroundColor: '#f4f4f4!important',
        paddingLeft: 24,
        paddingRight: 24,
        minHeight: '100vh'
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        backgroundColor: '#f4f4f4!important'
    },
    title: {
        padding: 24
    },
    date: {
        flexGrow: 1
    },
    barWidth: {
        width: `calc(100% - ${drawerWidth}px)!important`
    },
    toolbar: {
        marginTop: 80
    },
    avatar: {
        marginLeft: 10
    }
}));

const menuItems = [
    {
        text: 'My Notes',
        path: '/',
        icon: <SubjectOutlined color='secondary'/>
    },
    {
        text: 'New Notes',
        path: '/create',
        icon: <AddCircleOutlineOutlined color='secondary'/>
    }
]
function Layout({ children }) {
    let classes = useStyle();
    const history = useHistory()
    const location = useLocation()

    return (
        <>
            <AppBar elevation={0} className={classes.barWidth}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the { format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Charles
                    </Typography>
                    <Avatar className={classes.avatar}>C</Avatar>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Drawer
                    variant='permanent'
                    className={classes.drawer}
                    anchor='left'
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div>
                        <Typography variant="h5" className={classes.title}>
                            Ninja Notes
                        </Typography>
                    </div>
                    <List>
                        {menuItems.map(item => (
                            <ListItem
                                key={item.text}
                                onClick={() => history.push(item.path)}
                                className={location.pathname === item.path ? classes.active : ''}
                            >
                                <ListItemButton>
                                     <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className={classes.page}>
                    <div className={classes.toolbar}></div>
                    { children }
                </div>
            </div>
        </>
  )
}
export default Layout;
