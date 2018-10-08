import React, { Component } from 'react'
import axios from 'axios'
import { Grid } from 'semantic-ui-react';
import MapBreweries from './MapBreweries';

class Beers extends React.Component {

  state = {breweries: []};
  
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4} >
            <MapBreweries Breweries={this.state.breweries} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default withRouter(NavBar);
