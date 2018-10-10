import React from 'react'
import { Grid, Card, Divider, Image, Button } from 'semantic-ui-react';
import axios from 'axios'

class BeerCard extends React.Component {

  state = { breweries: [], showMore: false }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then(res => {
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

  handleClick = () => this.setState({ showMore: !this.state.showMore })

  render() {
    const { brewery } = this.props
    return( 
      <div>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Card>
            <Image src={brewery.images ? brewery.images.medium : "https://via.placeholder.com/350x100"} />
            <Card.Content key={brewery.id}>
              <Card.Header>{brewery.name && this.editText(brewery.name)}</Card.Header>
              <Card.Description>{this.state.showMore === false ? this.editText(brewery.description) : brewery.description}</Card.Description>
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
