import React, { Component } from 'react'
import { Grid, Card, Divider, Image} from 'semantic-ui-react';
import axios from 'axios'

class Breweries extends React.Component {
    
  state = { breweries: [] }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then(res => {
        console.log(res)
        this.setState({ breweries: res.data.entries })
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
        { this.state.breweries.length > 0 ? this.state.breweries.map( brewery =>
          <div>
            <Grid.Column mobile={16} tablet={16} computer={4}>
              <Card>
                <Image src={brewery.images ? brewery.images.medium : "https://via.placeholder.com/350x100"} />
                <Card.Content key={brewery.id}>
                  <Card.Header>{brewery.name && this.editText(brewery.name)}</Card.Header>
                  <Card.Description>{this.editText(brewery.description)}</Card.Description>
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

export default Breweries;
