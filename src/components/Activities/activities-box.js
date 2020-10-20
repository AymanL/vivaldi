import React, { Component } from 'react';
import { Col, Button } from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ActivityBox extends Component {
    render() {
        const renderSeeMoreButton = (text)=>{
            if(text){
              return <Button color="success" className="btn-rounded navbar-btn">{text}</Button>
            } else{
              return null
            }
          }


        return (
            <React.Fragment>
                {
                    this.props.activities.map((activity, key) =>
                    <Col xl={4} sm={6} key={key} >
                        <div className="text-center p-4 mt-3">
                            <div className="avatar-md mx-auto mb-4">
                                <span className="avatar-title rounded-circle bg-soft-primary">
                                    <i>
                                    <FontAwesomeIcon icon={activity.icon} className="icon-dual-primary" />
                                    </i>
                                </span>
                            </div>
                            <h5 className="font-18">{activity.title}</h5>
                            <p className="mb-0">{activity.desc}</p>
                            <br/>
                            {renderSeeMoreButton(activity.button)}
                        </div>
                    </Col>
                    )
                }        
            </React.Fragment>
        );
    }
}

export default ActivityBox;