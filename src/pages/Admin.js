import React, {Component} from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AdminNav from '../components/admin/AdminNav';
import Dashboard from '../components/admin/Dashboard';
import Semesters from '../components/admin/administrations/Semesters';
import Settings from '../components/admin/administrations/Settings';
import TeamManagement from '../components/admin/administrations/TeamManagement';
import Users from '../components/admin/administrations/Users';
import Astreintes from '../components/admin/perms/Astreintes';
import CalendarManagement from '../components/admin/perms/CalendarManagement';
import CurrentPerm from '../components/admin/perms/CurrentPerm';
import Perms from '../components/admin/perms/Perms';
import GoodiesManagement from '../components/admin/website_management/GoodiesManagement';
import PollsManagement from '../components/admin/website_management/PollsManagement';
import Charte from '../components/admin/Charte';
import Error404 from '../pages/Error404';
import ProtectedRoute from '../utils/ProtectedRoute';


class Admin extends Component {

	constructor(props) {
		super(props);
	}
	

	displayScreenName(){
		switch (window.location.pathname) {
			case "/admin":
				return "Dashboard";
			case "/admin/goodies":
				return "Goodies";
			case "/admin/polls":
				return "Sondages";
			case "/admin/current/perm":
				return "Perm en cours";
			case "/admin/calendar":
				return "Planning du semestre";
			case "/admin/astreintes":
				return "Astreintes";
			case "/admin/perms":
				return "Perms";
			case "/admin/charte":
				return "Charte";
			case "/admin/users":
				return "Utilisateurs";
			case "/admin/team":
				return "Team";
			case "/admin/semesters":
				return "Semestres";
			case "/admin/settings":
				return "Paramètres";
			default:
				break;
		}
	}
	
  	render(){


		const { classes } = this.props;
		const base_url = this.props.match.url;

	
		return (
			<div 
				className={classes.root}
			>
				<CssBaseline />
				<AppBar 
					position="fixed" 
					  className={classes.appBar}
					>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={this.handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h4" noWrap className={classes.windowTitle}>
							{/* Utilisateurs */}
							{this.displayScreenName()}
						</Typography>
					</Toolbar>
				</AppBar>
				<AdminNav/>
				<main 
					className={classes.content}
				>
					
					<Switch>
						<ProtectedRoute only="member" path={`${base_url}/`} exact component={Dashboard}/>
						<ProtectedRoute only="member" path={`${base_url}/goodies`} exact component={GoodiesManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/polls`} exact component={PollsManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/current/perm`} exact component={CurrentPerm}/>
						<ProtectedRoute only="member" path={`${base_url}/calendar`} exact component={CalendarManagement}/>
						<ProtectedRoute only="member" path={`${base_url}/astreintes`} exact component={Astreintes}/>
						<ProtectedRoute only="member" path={`${base_url}/perms`} exact component={Perms}/>
						<ProtectedRoute only="member" path={`${base_url}/charte`} exact component={Charte}/>
						<ProtectedRoute only="admin" path={`${base_url}/users`} exact component={Users}/>
						<ProtectedRoute only="admin" path={`${base_url}/team`} exact component={TeamManagement}/>
						<ProtectedRoute only="admin" path={`${base_url}/semesters`} exact component={Semesters}/>
						<ProtectedRoute only="admin" path={`${base_url}/settings`} exact component={Settings}/>
						<Route component={Error404}/>
					</Switch>
				</main>
			</div>
		);
	}
}

const drawerWidth = 240;




const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
		width: `calc(100% - ${drawerWidth}px)`,
		},
		backgroundColor : "white",
		color : "#000223"
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		// padding: theme.spacing(2),
		maxWidth : "None"
	},

	windowTitle : {
		textDecoration : 'underline #B22132',
		fontSize: 24,
	},

	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
		display: 'none',
		},
	},
	  
});

export default withStyles (styles) (Admin)
