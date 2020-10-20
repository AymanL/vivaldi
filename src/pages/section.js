import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col
} from "reactstrap";


//Import Images
import homeImg from "../assets/images/home-img.png";
import logoLong from "../assets/images/logo_long.png"


class Section extends Component {

    render() {
        return (
            <React.Fragment>
                <section className="hero-section" id="home">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={5}>
                                <div className="hero-wrapper mb-4">
                                    <h2>Bienvenue au</h2>
                                    <img className="home-logo" src={logoLong}/>
                                    <h3> Le foyer préféré de ton foyer préféré</h3>
                                    <p>Le Pic est le foyer et le coeur de l’UTC. C’est un endroit créé et entretenu au quotidien pour que chacun s’y sente chez lui. Tout le long de la journée, le foyer s’adapte et propose exactement ce dont vous avez besoin pour vous occuper, vous reposer et vous restaurer. En résumé, c’est votre deuxième maison et on vous y attend tout les jours pour vous régaler.
                                    </p>
                                    <div className="buttons mt-4">
                                        <Link to="#" className="btn btn-primary mt-2 mr-2">Qu'est-ce qu'on peut faire au Pic ?</Link>
                                        <Link to="#" className="btn btn-success mt-2 mr-2 ml-1">Events mois de septembref</Link>
                                    </div>
                                </div>

                            </Col>

                            <Col className="home-rightcol" lg={7} sm={8}>
                                <div className="home-img mt-5 mt-lg-0">
                                    <img src={homeImg} alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;