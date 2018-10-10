import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import axios from 'axios'
import BeerCard from './BeerCard';

class Beers extends React.Component {
    
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

  mapBeers = () => {
    return(
      <Grid centered>
        <Grid.Row>
        { 
          this.state.beers.length > 0 ? this.state.beers.map( beer => 
            <BeerCard beer={beer} />
          ) 
          : 
          <div>Loading...</div>
        }
        </Grid.Row>
      </Grid>
    )
  }

 
  render() {
    return ( 
      this.mapBeers()
    )
  }
}

export default Beers;
