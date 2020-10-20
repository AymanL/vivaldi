import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

//Import Section Title
import SectionTitle from "../common/section-title";
import EventBox from "./event-box";

//Import Images
import event1 from "../../assets/images/events/img-1.png";
import event2 from "../../assets/images/events/img-3.png";


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smallEvents1 : [
                { title : "13 novembre" },
                { title : "0€" },
            ],
            smallEvents2 : [
                { title : "20 novembre" },
                { title : "0€" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
        <section className="section" id="events">
            <Container>
            <SectionTitle
                title="Les anims du mois de septembre"
                desc="Venez découvrir les animations du Pic'Asso"
            />               

                <Row>
                    <Col lg={5}>
                        <div>
                            <EventBox icon="paw" title="Lavage de chien" smallEvents={this.state.smallEvents1} desc="Les cousins de Guillermin reviennent du bled, et ils ont apporté la masse de boue sur leurs pattes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lacinia turpis. Mauris facilisis lectus orci, eu pellentesque elit faucibus sit amet. Quisque dapibus nunc et ultrices feugiat. Nulla eget ante at lorem tristique molestie eu eu libero." link="#" />
                        </div>
                    </Col>

                    <Col lg={5} sm={8} className="ml-lg-auto">
                                <div className="box-shadow">
                                    <img src={event1} alt="" className="img-fluid mx-auto d-block"/>
                                </div>
                    </Col>
                </Row>
                

                <Row className="mt-5 pt-5">
                    <Col lg={5} sm={8}>
                                <div className="box-shadow">
                                    <img src={event2} alt="" className="img-fluid mx-auto d-block"/>
                                </div>
                    </Col>
                    <Col lg={5} className="ml-lg-auto">
                        <div className="mt-4 mt-lg-0">
                        <EventBox icon="brain" title="Révisiathon" smallEvents={this.state.smallEvents2} desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lacinia turpis. Mauris facilisis lectus orci, eu pellentesque elit faucibus sit amet. Quisque dapibus nunc et ultrices feugiat. Nulla eget ante at lorem tristique molestie eu eu libero." link="#" />
                        </div>
                    </Col>

                </Row>

                <br/>
                <Row className="mt-4">
                    <Col lg={12}>
                        <div className="text-center">
                            <Link to="#" className="btn btn-success">Voir le calendrier des perms</Link>
                        </div>
                    </Col>
                </Row>
                
            </Container>
            
        </section>
            </React.Fragment>
        );
    }
}

export default Events;