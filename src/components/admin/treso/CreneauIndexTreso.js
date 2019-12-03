import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ajaxGet } from '../../../utils/Ajax';

class CreneauIndexTreso extends Component{
 
    
    constructor(props) {
        super(props)

        this.state = {
            creneau : [],
            loading: true
        }
    }

    componentDidMount(){
        this.loadCreneau();
    }

    loadCreneau(){
        ajaxGet('creneau/').then(res => {
            this.setState({creneau: res.data, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }


    goToCreneau(creneau_id){
        window.open(window.location.pathname + "treso/perm/" + creneau_id, "_blank");
    }

    render(){
        
        const { classes } = this.props;

        const {creneau, loading} = this.state;


        if(loading){
            return (
                <Grid 
                    container 
                    className={classes.loader}
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
                <Typography variant="h5" noWrap className={classes.subTitle}>
                    <ChevronRightIcon className={classes.subTitleIcon}/>
                    Liste des perms
                </Typography>
                <Paper className={classes.rootTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headcell}>
                                    Nom
                                </TableCell>
                                <TableCell className={classes.headcell}>
                                    Date
                                </TableCell>
                                <TableCell className={classes.headcell}>
                                    Période
                                </TableCell>
                                <TableCell className={classes.headcell}>
                                    Type
                                </TableCell>
                                <TableCell className={classes.headcell}>
                                    Responsable
                                </TableCell>
                                <TableCell className={classes.headcell}>
                                    État
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {creneau.map((row, index) => (
                                <TableRow 
                                    hover 
                                    key={index} 
                                    className={classes.row}
                                    onClick={() => this.goToCreneau(row.id)}
                                >
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.perm.nom}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.date}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.creneau === "M" && <span>Matin</span>}
                                        {row.creneau === "D" && <span>Midi</span>}
                                        {row.creneau === "S" && <span>Soir</span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.perm.asso && <span>Association</span>}
                                        {!row.perm.asso && <span>Groupe de potes</span>}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.perm.nom_resp}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={classes.cell}>
                                        {row.state === "N" && 
                                            <Chip
                                                size="small"
                                                label="Non traitée"
                                                color="secondary"
                                            />
                                        }
                                        {row.state === "T" &&
                                            <Chip
                                                size="small"
                                                label="Traitée"
                                                color="primary"
                                            />
                                        }
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
    loader: {
        marginTop: 200,
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
    headcell: {
        textAlign: 'center'
    },
    row: {
        cursor: 'pointer'
    }
});

export default withStyles (styles) (CreneauIndexTreso)