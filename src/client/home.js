import React from "react";
import { Grid, Row, Col, Well, Image } from "react-bootstrap";
import { BlocksList } from "./blocks-list";
import { NewComponent } from "./newcomponent";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onBlockSelected = this.onBlockSelected.bind(this);
  }
  
  onBlockSelected(block) {
    this.props.history.push('/'+block);
    console.log(block);
  }

  render() {
    return (
      <Grid>
          <Row>
            <Col sm={6}>
              <Well>
                <h2>Edit</h2>
                <br/>
                <BlocksList cachedData={this.props.cachedData} onBlockSelected = {this.onBlockSelected}/>
              </Well>
            </Col>
            <Col sm={6}>
              <Well>
                <h2>Create</h2>
                <br/>
                <NewComponent/>
              </Well>
            </Col>
          </Row>
          
          
          <Row>
            <Col sm={12}>
              <Well>
                <h1>Getting Started</h1>
                These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.  
                <br/>
                <br/>
                <Image src="https://res.cloudinary.com/circuito/image/upload/v1545820007/Circuito_4_Entities_1.png" responsive />
                <br/>
                <br/>
                <div className="youtube-container">
                  <img src="http://placehold.it/16x9"/>
                  <iframe src="https://www.youtube.com/embed/9YffrCViTVk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </Well>
            </Col>
          </Row>
        </Grid>
    );
  }
}
