import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Section Title
import SectionTitle from "../common/section-title";
import ActivityBox from "./activities-box";

class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities : [
                { icon : "coffee", title : "Manger", desc : "Le foyer propose une large gamme de snacks et repas pour vos petites faims (sans être un restaurant non plus). ", button: "Voir les snacks et boissons" },
                { icon : "gamepad", title : "Jeux-vidéos", desc : "Une TV, une PS4, une Switch et un énorme mur blanc avec projecteur. Les jeux les plus populaires sont là: FIFA, Super Smash, Mario Kart, .. Que dire de plus ?" },
                { icon : "chess-knight", title : "Jeux de société", desc : "C'est les copaings c'est rigolo. Au Pic on aime la convivialité et quoi de mieux pour en cultiver que réunir tout le monde autour d'une table pour jouer sur plateau ou avec des cartes. Top1 pour passer un bon moment entre potes", button: "Nos jeux de société" },
                { icon : "user-graduate", title : "Travailler", desc : "C'est pas la BU mais si vous êtes du style à aimer travailler avec de la musique et de l'activité autour, vous trouverez beaucoup de compagnons de travail au Pic pendant les heures creuses." },
                { icon : "bed", title : "Se détendre", desc : "Des fatboys, des transats, des bons copains. Au Pic on aime la sieste et on respecte tout les rythmes de sommeil. Les fatboys sont à libre disposition toute la journée pour vous aider à refaire le plein." },
                { icon : "beer", title : "Boire", desc : "Le dernier quart du Pic, de 18h30 à 21h30 le Pic sert des boissons alcoolisées à consommer de préférence entre amis et avec modération (cf. règles).", button: "Règles" },
            ]
        }
    }
    
    render() {
        return (
            <React.Fragment>
        <section className="section bg-light" id="activities">
            <Container>
            <SectionTitle
                title="Qu'est-ce qu'on peut faire au Pic ?"
                desc="Le Pic propose une myriade d'activités à faire, seul ou en groupe, à toutes les heures de la journée.
                C'est un endroit de détente où il est simple de rencontrer de nouvelles personnes et passer du bon temps avec celles qu'on connaît déjà."
                extraTag="animTitle"
            />

                <Row>
                    <ActivityBox activities={this.state.activities} />
                </Row>
                

                <Row className="mt-4">
                    <Col lg={6}>
                        <div className="text-center">
                            <Link to="#" className="btn btn-success">Les évènements du mois</Link>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="text-center">
                            <Link to="#" className="btn btn-success">Les règles du foyer</Link>
                        </div>
                    </Col>
                </Row>
                
            </Container>
            
        </section>
            </React.Fragment>
        );
    }
}

export default Process;