import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Grid, Menu, MenuItem, Paper } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { ajaxGet, ajaxPost } from '../../../utils/Ajax';


class Semesters extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            new_semester : {
                periode : '',
                annee : '',
                start_date : new Date(),
                end_date : new Date()
            },
            current_semester : {
                id : null,
                periode : '',
                annee : null,
                start_date : null,
                end_date : null
            },
            selectedDate: null,
            semesters : [],
            
        }

        this.handleDateDebutChange = this.handleDateDebutChange.bind(this);
        this.handleDateFinChange = this.handleDateFinChange.bind(this);
        this.loadSemester = this.loadSemester.bind(this);
        this.handleChangeNewSemester = this.handleChangeNewSemester.bind(this);
        this.handleChangeCurrentSemester = this.handleChangeCurrentSemester.bind(this);
        this.saveNewSemester = this.saveNewSemester.bind(this);
        this.changeSemester = this.changeSemester.bind(this);    
    }


    componentDidMount(){
        this.loadSemester();
        this.loadDefaultNewSemesterValue();
    }


    loadDefaultNewSemesterValue(){
        const date = new Date();
        const current_year = date.getFullYear();
        const month_number = date.getMonth();
        let period = 'A';
        if (month_number >= 1 && month_number <= 5) {
            period = 'P';
        }
        const new_semester = {
            periode : period,
            annee : current_year,
            start_date : this.formatDate(new Date()),
            end_date : this.formatDate(new Date())
        }
        this.setState({new_semester: new_semester});
    }


    formatDate(date){
        const day = ("0" + (date.getDate())).slice(-2);
        const month_number = ("0" + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear();
        return year + "-" + month_number + "-" + day;
    }

    handleDateDebutChange(date) {
        const date_format = this.formatDate(date)
        this.setState({
            new_semester: {
                ...this.state.new_semester,
                start_date: date_format
            }
        })
    }

    handleDateFinChange(date) {
        console.log(date)
        const date_format = this.formatDate(date)
        this.setState({
            new_semester: {
                ...this.state.new_semester,
                end_date: date_format
            }
        })
    }


    loadSemester(){
        ajaxGet('semesters').then(res => {
            this.setState({semesters:res.data}) 
        })
        ajaxGet('current/semester').then(res => {
            this.setState({current_semester:res.data}) 
        })
 
    }

    handleChangeCurrentSemester(event){
        this.setState({
            current_semester: {
                ...this.state.current_semester,
                [event.target.name]: event.target.value
            }
        })
    }

    handleChangeNewSemester(event){
        this.setState({
            new_semester: {
                ...this.state.new_semester,
                [event.target.name]: event.target.value
            }
        })
    }

    saveNewSemester(){
        ajaxPost('semesters/',this.state.new_semester).then(res => {
            console.log(res) 
        })
        .catch(res => {
            console.log(res)  
        })

    }

    changeSemester(){

        ajaxPost('current/semester',{new_current_semester: this.state.current_semester.id}).then(res => {
            console.log(res) 
        })
        .catch(res => {
            console.log(res)  
        })

    }

    render() {
        const { classes } = this.props;
        const { semesters, current_semester, new_semester } = this.state;
        const periode = [
        {
            value : 'Automne',
            key : 'A'
        },
        {
            value : 'Printemps',
            key : 'P'
        }
        ]

        return (
            <div className={classes.container}>
                

                <Grid container className={classes.section}>
                    <Typography variant="h5" noWrap className={classes.subTitle}>
                        <ChevronRight className={classes.subTitleIcon}/>
                        Changer de semestre
                    </Typography>
                    <Grid container className={classes.note}>
                        Ce menu vous permet de choisir le semestre en cours, c'est à dire le semestre qui apparaîtra aux utilisateurs de Picsous.<br/> <br/>
                        A partir du moment où vous changez un semestre, les perms des autres semestres n'apparaîtront plus aux utilisateurs de Picsous - 
                        pour les administrateurs, le système n'affichera par défaut que les factures du semestre en cours. Ils peuvent cependant naviguer 
                        entre les semestres grâce au menu déroulant en haut de l'écran.<br/> <br/>
                        Ne changez pas de semestre si vous souhaitez juste consulter les informations d'un semestre ! Pour cela, utilisez le menu déroulant.
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                className={classes.textField}
                                name="id"
                                value={current_semester.id || ''}
                                autoComplete="off"
                                margin="dense"
                                variant="outlined"
                                onChange={this.handleChangeCurrentSemester}
                                margin="dense"
                                variant="outlined"
                            >
                                {semesters.map(semesters => (
                                <MenuItem key={semesters.id} value={semesters.id}>
                                    {semesters.periode+semesters.annee}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid> 
                        <Grid>
                            <Button variant="outlined" color="primary" className={classes.addButton} onClick={this.changeSemester}> 
                                Changer
                            </Button>
                        </Grid>             
                    </Grid>
                </Grid>

                <Grid container className={classes.section}>
                    <Typography variant="h5" noWrap className={classes.subTitle}>
                        <ChevronRight className={classes.subTitleIcon}/>
                        Créer un semestre
                    </Typography>
                    <Grid container className={classes.note}>
                        Attention ! Cette action n'est pas réversible.
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                className={classes.textField}
                                name="periode"
                                value={new_semester.periode || ''}
                                autoComplete="off"
                                onChange={this.handleChangeNewSemester}
                                margin="normal"
                                
                            >
                                {periode.map(periode => (
                                <MenuItem key={periode.key} value={periode.key}>
                                    {periode.value}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="standard-number"
                                name="annee"
                                type="number"
                                value={new_semester.annee}
                                className={classes.textField}
                                onChange={this.handleChangeNewSemester}
                                margin="normal"
                              />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="DD/MM/YYYY"
                              name="start_date"
                              margin="normal"
                              label="Date de début"
                              value={new_semester.start_date}
                              onChange={this.handleDateDebutChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              name="end_date"
                              format="DD/MM/YYYY"
                              margin="normal"
                              label="Date de fin"
                              id="date-picker-inline"
                              value={new_semester.end_date}
                              onChange={this.handleDateFinChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                        </Grid>

                        <Grid>
                            <Button variant="outlined" color="primary" className={classes.addButton} onClick={this.saveNewSemester}> 
                                Ajouter
                            </Button>
                        </Grid>
                                     
                    </Grid>
                </Grid>
                
            </div>
        );
    };

}

const styles = theme => ({
    container: {
        padding: 20,
        margin: 30,
        marginTop: 100,
        border: "2px solid #B22132",
    },
    section:{
        paddingBottom :70,
    },
    paper: {
        padding: 10
    },
    note: {
        backgroundColor: 'rgba(0,0,0, 0.05)',
        padding: 10,
        border: 'thin solid grey',
        marginTop: 16,
        marginBottom: 8,
    },
    textField: {
        marginTop: 16,
        paddingRight: 15,
        width: "100%",
    },
    suggestions: {
        zIndex: 100,
        position: 'absolute',
        maxHeight: 200,
        overflowY: 'scroll',
        marginRight: 15,
    },
    suggestionItem: {
        paddingLeft: 15,
        paddingBottom: 0,
        paddingTop: 0,
        fontSize: 14,
        minHeight: 30,
    },
    addButton: {
        marginTop: 16,
        marginBottom: 8,
        height: 49,
        width: "100%",
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    row: {
        height: 40,
    },
    cell: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    },
});

export default withStyles (styles) (Semesters)