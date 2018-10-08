import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { Card} from 'semantic-ui-react';
import axios from 'axios'

class Beers extends React.Component {
    
  state = { beers: []}

  componentDidMount() {
    axios.get('/api/all_beers')
      .then(res => {
        console.log(res)
        this.setState({ beers: res.data.entries })
        this.forceUpdate()
      })
  }

  render() { 
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4} >
            <Card>
              { this.state.beers.length > 0 ? this.state.beers.map( beer =>
                  <Card.Content key={beer.id}>
                    <Card.Header>{beer.name}</Card.Header>
                    <Card.Description>{beer.description}</Card.Description>
                  </Card.Content>
                )
                :
                <div>Loading...</div>
              }
            </Card> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Beers;
