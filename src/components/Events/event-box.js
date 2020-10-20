import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class EventBox extends Component {
    render() {
        return (
            <React.Fragment>
                            <div className="avatar-md mb-4">
                                <span className="avatar-title rounded-circle bg-soft-primary">
                                    <i>
                                    <FontAwesomeIcon icon={this.props.icon} className="icon-dual-primary" />
                                    </i>
                                </span>
                            </div>
                            <h5>{this.props.title}</h5>
                            <p className="mb-4">{this.props.desc}</p>

                            <Row>
                                {
                                    this.props.smallEvents.map((sEvent, key) =>
                                        <Col sm={6} key={key} >
                                            <p>
                                                <i>
                                                <FontAwesomeIcon icon="check" className="icon-dual-success mr-2" />
                                                </i>{" "}
                                                {sEvent.title}
                                            </p>
                                        </Col>
                                    )
                                }
                            </Row>

                            <div className="mt-4">
                                <Link to={this.props.link} className="btn btn-primary">Shotgun {" "}
                                <i>
                                    <FontAwesomeIcon icon="arrow-right" className="icons-sm ml-1" />
                                </i>
                                </Link>
                            </div>
            </React.Fragment>
        );
    }
}

export default EventBox;