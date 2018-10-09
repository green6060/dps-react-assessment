import React, { Component } from 'react'
import { Grid, Card, Divider } from 'semantic-ui-react';
import axios from 'axios'

class Beers extends React.Component {
    
  state = { beers: [] }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then(res => {
        console.log(res)
        this.setState({ beers: res.data.entries })
        this.forceUpdate()
      })
  }

  editText = (text) => {
    if(typeof(text) === 'undefined') {
      return "Sorry, no text available"
    }

    if(text.length > 25) {
      return text.substring(0,24) + "...";
    } else
      return text
  }

  render() {

    return (
      <Grid centered>
        <Grid.Row>    
        { this.state.beers.length > 0 ? this.state.beers.map( beer =>
          <div>
            <Grid.Column mobile={16} tablet={16} computer={4}>
              <Card>
                <Card.Content key={beer.id}>
                  <Card.Header>{beer.name && this.editText(beer.name)}</Card.Header>
                  <Card.Description>{this.editText(beer.description)}</Card.Description>
                </Card.Content>
              </Card> 
              {/* 
              ternary checking showMore state
                IF state "showMore" === true
                  display full description text
                  button changing displayed info 
                ELSE
                  display sub string text
                  button changing displayed info 
              */}
            </Grid.Column>
            <Divider />
          </div>
          )
          :
          <div>Loading...</div>
        }
        </Grid.Row>
      </Grid>
    )
  }
}

export default Beers;
