import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChevronRight } from '@material-ui/icons';
import { TextField, MenuItem } from '@material-ui/core';
import { ajaxGet } from '../../../utils/Ajax';
import { asset_url } from '../../../utils/Config';
import { compareDjangoDate, getCurrentDate } from '../../../utils/Date';

class PermsIndex extends Component{
    constructor(props) {
        super(props)

        this.state = {
            notations : [],
            semesters: [],
            current_semester : '',
            loading: true
        }
        this.consultNotation = this.consultNotation.bind(this)

    }

    componentDidMount(){
        this.loadSemester();
        ajaxGet('perms/notation/all').then(res => {
            let notations = res.data.perms
            notations = notations.sort(function(a,b){
                if (a.mean_note < b.mean_note) {
                    return 1
                }
                return -1
            })
            this.setState({notations: notations, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    loadSemester(){
        ajaxGet('semesters').then(res => {
            this.setState({semesters:res.data}) 
        })
        ajaxGet('current/semester').then(res => {
            this.setState({current_semester:res.data.id}) 
        })
 
    }

    loadOtherSemester(event){
        const semestre_id = event.target.value;
        this.setState({loading: true, current_semester: semestre_id})
        ajaxGet('perms/notation/all?semestre=' + semestre_id).then(res => {
            let notations = res.data.perms
            notations = notations.sort(function(a,b){
                if (a.mean_note < b.mean_note) {
                    return 1
                }
                return -1
            })
            this.setState({notations: notations, loading: false})
        })
        .catch(error => {
            console.log(error)
        })

    }

    consultNotation(notation_id){
        window.open(asset_url('/admin/perm/details?id=' + notation_id));
    }

    render(){


        
        const { classes } = this.props;

        const { notations, loading, current_semester, semesters } = this.state;
        const current_date = getCurrentDate()
        let perm_soir = false;

        if(loading){
            return (
                <Grid 
                    container 
                    className="admin_loader"
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            )
        }


        return (
            <div className={classes.container}>
                <Grid container style={{marginBottom: 30}}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            <ChevronRight className={classes.subTitleIcon}/>
                            Charger un autre semestre
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <TextField
                            select
                            className={classes.textField}
                            value={current_semester || ''}
                            autoComplete="off"
                            margin="dense"
                            fullWidth
                            variant="outlined"
                            onChange={(event) => this.loadOtherSemester(event)}
                        >
                            {semesters.map(semesters => (
                                <MenuItem key={semesters.id} value={semesters.id}>
                                    {semesters.periode+semesters.annee}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid> 
                </Grid>
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Notation des perms
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellLeft}>
                                    Perm
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Perm du soir
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Organisation
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Décoration
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Menu
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Ambiance
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    Notation
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notations.map((row, index) => (
                                <TableRow hover key={index} className={classes.row} onClick={(event) => this.consultNotation(row.id)}>
                                    <TableCell component="th" scope="row" className={classes.cellLeft}>
                                        {row.nom} - {row.nom_resp} 
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        { perm_soir = false }
                                        {row.creneau.map((cren, index) => (
                                            <div key={index}>
                                                {cren.creneau==="S" && perm_soir === false && compareDjangoDate(current_date, cren.date) && <span>✓</span>}
                                                {cren.creneau==="S" && perm_soir === false && compareDjangoDate(current_date, cren.date) ? perm_soir = true : null}
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_orga === 0 && <span className={classes.dot}></span>}
                                        {row.note_orga < 2 && row.note_orga > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_orga < 3 && row.note_orga >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_orga < 4 && row.note_orga >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_orga >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_deco === 0 && <span className={classes.dot}></span>}
                                        {row.note_deco < 2 && row.note_deco > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_deco < 3 && row.note_deco >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_deco < 4 && row.note_deco >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_deco >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_menu === 0 && <span className={classes.dot}></span>}
                                        {row.note_menu < 2 && row.note_menu > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_menu < 3 && row.note_menu >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_menu < 4 && row.note_menu >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_menu >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.note_anim === 0 && <span className={classes.dot}></span>}
                                        {row.note_anim < 2 && row.note_anim > 0 &&<span className={classes.dot_red}></span>}
                                        {row.note_anim < 3 && row.note_anim >= 2 &&<span className={classes.dot_orange}></span>}
                                        {row.note_anim < 4 && row.note_anim >= 3 &&<span className={classes.dot_lgreen}></span>}
                                        {row.note_anim >= 4 && <span className={classes.dot_green}></span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.nb_note_orga}/{row.nb_astreintes}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    };

}

const styles = theme => ({
    rootTable : {
        width: '100%',
        overflowX: 'auto'
    },
    cell : {
        textAlign : 'center'
    },
    cellLeft : {
        textAlign : 'left'
    },
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "1.5px solid #B22132",
    },
    subTitle: {
        marginBottom: 40,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },

    dot : {
      height: "25px",
      width: "25px",
      backgroundColor: "#bbb",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_red : {
      height: "25px",
      width: "25px",
      backgroundColor: "#E34242",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_orange : {
      height: "25px",
      width: "25px",
      backgroundColor: "#F4B528",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_lgreen : {
      height: "25px",
      width: "25px",
      backgroundColor: "#56BA2A",
      borderRadius: "50%",
      display: "inline-block"
    },
    dot_green : {
      height: "25px",
      width: "25px",
      backgroundColor: "#285507",
      borderRadius: "50%",
      display: "inline-block"
    }
});

export default withStyles (styles) (PermsIndex)