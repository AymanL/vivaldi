import React, { Component } from 'react';
import { Row, Col } from "reactstrap";

class SectionTitle extends Component {
    render() {
        // console.log(this.props.light)
        // if(this.props.light){
        //     this.props.light = "animTitle mb-3"
        // }
        // else{
        //     this.props.light = "mb-3"
        // }
        // console.log(this.props.light);
        return (
            <React.Fragment>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="text-center mb-5">
                            <h5 className="text-primary text-uppercase small-title">{this.props.subtitle}</h5>
                            <h4 className={"mb-3 " + this.props.extraTag }> {this.props.title}</h4>
                            <p>{this.props.desc}</p>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default SectionTitle;