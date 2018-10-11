import React from 'react'
import { Grid, Card, Divider, Image, Button } from 'semantic-ui-react';
import axios from 'axios'


class BeerCard extends React.Component {

  state = { beers: [], showMore: false }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then(res => {
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

  handleClick = () => this.setState({ showMore: !this.state.showMore })

  render() {
    const { beer } = this.props
    return( 
      <div>   
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Card>
            <Image src={beer.labels ? beer.labels.medium : "https://via.placeholder.com/255x255"} />
            <Card.Content key={beer.id}>
              <Card.Header>{beer.name && this.editText(beer.name)}</Card.Header>
              <Card.Description>{this.state.showMore === false ? this.editText(beer.description) : beer.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Button.Group>
                  { this.state.showMore === false ? <Button negative>Less</Button> : <Button onClick={this.handleClick}>Less</Button>}                     
                  <Button.Or />
                  { this.state.showMore === true ? <Button positive>More</Button> : <Button onClick={this.handleClick}>More</Button>}
                </Button.Group>
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Divider />
      </div>
    )
  }
}

export default BeerCard
