import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ajaxGet, ajaxPost } from '../../../utils/Ajax';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { asset_url } from '../../../utils/Config';
import { formateFromDjangoDate } from '../../../utils/Date';

class CurrentPerm extends Component{
 
    
    constructor(props) {
        super(props)
        this.state = {
            current_creneau : {},
            loading: true,
            new_article: {
                nom: '',
                tva: 0,
                stock: '',
                prix: '',
                creneau: '',
            },
            invoice_checked: false,
            saving: true
        }

        this.addArticleToPayutc = this.addArticleToPayutc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        this.changeSavingState = this.changeSavingState.bind(this);
    }

    componentDidMount(){
        this.loadCurrentPerm();
    }

    loadCurrentPerm(){
        ajaxGet('perms/current/creneau').then(res => {
            if (res.data.article_set){
                for (let index = 0; index < res.data.article_set.length; index++) {
                    const date = new Date(res.data.article_set[index].ventes_last_update);
                    res.data.article_set[index].ventes_last_formatted_update = this.formateDate(date);
                }
                let new_article = this.state.new_article;
                new_article.creneau = res.data.id;
                if (!res.data.perm.asso) {
                    new_article.tva = 5.5;
                }
                this.setState({current_creneau: res.data, new_article: new_article})
                this.loadCreneauSignature(res.data.id);
                setInterval(() => this.loadCreneauSignature(res.data.id), 30*1000);
            }      
            this.setState({loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    loadCreneauSignature(id){
        ajaxGet('perms/signature/' + id).then(res => {
            this.setState({
                current_creneau : {
                    ...this.state.current_creneau,
                    signature: res.data.signature_count
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }


    formateDate(date){
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = ("0" + (date.getHours())).slice(-2);
        const minutes = ("0" + (date.getMinutes())).slice(-2);
        ("0" + (date.getDate())).slice(-2)
        const formatted_date = day + '/' + month + '/' + year + ' à ' + hours + ':' + minutes;
        return formatted_date;
    }


    handleChange(event){
        this.setState({
            new_article: {
                ...this.state.new_article,
                [event.target.name]: event.target.value
            }
        })
    }


    handleCheckChange(event){
        const checked = this.state.invoice_checked;
        this.setState({invoice_checked: !checked})
    }


    redirectToMenu(event, article){
        window.open(asset_url("/menu?selected_article=" + article.id));
    }

    changeSavingState(){
        let initial_state = this.state.saving ;
        this.setState({ saving: !initial_state })
    }

    saveArticle(){
        let new_article = this.state.new_article;
        this.changeSavingState();
        ajaxPost('perm/articles/', new_article).then(res => {
            let current_creneau = this.state.current_creneau;
            current_creneau.article_set.push(res.data);
            new_article.nom = '';
            new_article.stock = '';
            new_article.prix = '';
            this.setState({
                current_creneau: current_creneau,
                new_article: new_article,
                invoice_checked: false,
                saving: true
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({ saving: true })
        })
    }


    addArticleToPayutc(article, index){
        ajaxGet('perms/payutc/article/' + article.id).then(res => {
            article.id_payutc = res.data;
            let current_creneau  = this.state.current_creneau;
            current_creneau.article_set[index] = article;
            this.setState({current_creneau: current_creneau});
        })
        .catch(error => {
            console.log(error);
        })
    }

    updateArticleSales(article, index){
        ajaxGet('perms/sales/article/' + article.id).then(res => {
            article.ventes = res.data.sales;
            article.ventes_last_update = new Date();
            article.ventes_last_formatted_update = this.formateDate(article.ventes_last_update);
            let current_creneau = this.state.current_creneau;
            current_creneau.article_set[index] = article;
            this.setState({current_creneau: current_creneau});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){

        const { current_creneau, loading, new_article, invoice_checked } = this.state;
        const date = current_creneau.date
        
        const { classes } = this.props;

        let signature_message = "Chargement des signatures..."
        if (current_creneau.signature !== null) {
            if (current_creneau.signature > 0) {
                signature_message = current_creneau.signature + " signature(s) de la charte"
            } else {
                signature_message = "Pas de signature de la charte"
            }
        }


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
            <div className="admin_container">
                {current_creneau.id? (
                    <div>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            {current_creneau.perm.nom}
                        </Typography>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1" gutterBottom>
                                    Responsable: {current_creneau.perm.nom_resp} ({current_creneau.perm.mail_resp})<br/>
                                    Date : {formateFromDjangoDate(date)}<br/>
                                    {signature_message}
                                </Typography> 
                            </Grid>
                        </Grid>
                        <Typography variant="h6" className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Articles
                        </Typography>
                        <div className="responsive_table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.cell}>
                                            Nom
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            Prix TTC
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            TVA
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            Ventes
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            Dernière mise à jour
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            PayUTC
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {current_creneau.article_set.map((article, index) => (
                                        <TableRow hover key={index} className={classes.row}>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.nom}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.prix.toFixed(2)}€
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.tva}%
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.ventes}/{article.stock}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                { article.id_payutc ? (
                                                    <div>
                                                        Le {article.ventes_last_formatted_update}
                                                        <Button 
                                                            variant="contained"
                                                            size="small"
                                                            color="primary"
                                                            className={classes.btn} 
                                                            onClick={(e) => this.updateArticleSales(article, index)}
                                                        >
                                                            Mettre à jour
                                                        </Button> 
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Pas synchronisé à PayUTC !
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.id_payutc? (
                                                    <div>
                                                        Ajouté !
                                                    </div>
                                                ):(
                                                    <Button 
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"
                                                        className={classes.btn} 
                                                        onClick={(e) => this.addArticleToPayutc(article, index)}
                                                    >
                                                        Ajouter à PayUTC
                                                    </Button> 
                                                )}
                                            </TableCell>
                                            <TableCell component="th" scope="row" className={classes.cell}>
                                                {article.menu.length > 0 &&
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="secondary"
                                                        className={classes.btn} 
                                                        onClick={(e) => this.redirectToMenu(e, article)}
                                                    >
                                                        Consulter
                                                    </Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <Typography variant="h6" className={classes.subTitle}>
                            <ChevronRightIcon className={classes.subTitleIcon}/>
                            Ajouter un article
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={2}>
                                <TextField
                                    label="Nom"
                                    className={classes.textField}
                                    name="nom"
                                    value={new_article.nom}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <TextField
                                    label="Prix TTC"
                                    className={classes.textField}
                                    name="prix"
                                    type="number"
                                    value={new_article.prix}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={2} md={2}>
                                <TextField
                                    label="TVA"
                                    disabled
                                    className={classes.textField}
                                    value={new_article.tva}
                                    type="number"
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <TextField
                                    label="Stock"
                                    className={classes.textField}
                                    name="stock"
                                    value={new_article.stock}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    type="number"
                                    margin="dense"
                                    variant="outlined"
                                    InputProps={{ style: { fontSize: 12 } }}
                                />
                            </Grid>
                            {!current_creneau.perm.asso &&
                                <Grid item xs={8} sm={4} md={3} lg={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoice_checked}
                                                onChange={this.handleCheckChange}
                                                color="primary"
                                            />
                                        }
                                        labelPlacement="start"
                                        label="Facture demandée ?"
                                    />
                                </Grid>
                            }
                            <Grid item xs={4} sm={2}>
                                <Button 
                                    variant="contained"
                                    size="small"
                                    disabled={(!invoice_checked && !current_creneau.perm.asso) && true}
                                    color="primary"
                                    className={classes.saving_btn} 
                                    onClick={this.saveArticle}
                                    disabled={!this.state.saving}
                                >
                                    Ajouter
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                ): (
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Pas de perm en cours ...
                    </Typography>
                )}
            </div>
        );
    };

}

const styles = theme => ({
    loader: {
        marginTop: 200,
    },
    title: {
        textAlign: 'center',
    },
    subTitle: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitleIcon: {
        marginRight: 8,
        paddingTop: 5,
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        textTransform: 'None',
        fontSize: 10,
    },
    saving_btn: {
        margin: 10,
    },
    textField: {
        maring: 10,
        width: '100%',
        fontSize: 12,
        paddingRight: 5,
        paddingLeft: 5,
    },
    cell: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
});

export default withStyles (styles) (CurrentPerm)