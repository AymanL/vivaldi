import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

class FooterLinks extends Component {
    render() {
        return (
            <React.Fragment>
        <section className="bg-primary py-3">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="float-sm-left">
                        Pour toute question relative au Pic'Asso contactez nous : 
                            <a href="mailto: picasso@assos.utc.fr">
                                picasso@assos.utc.fr
                            </a>
                        </div>
                        <div className="float-sm-right mt-4 mt-sm-0">
                            <p className="copyright-desc text-white mb-0">{new Date().getFullYear()} Pic'Asso Automne 20</p>
                        </div>
                    </Col>
                </Row>
                
            </Container>
            
        </section>
            </React.Fragment>
        );
    }
}

export default FooterLinks;