
import React from 'react'
import { Grid } from 'semantic-ui-react';
import axios from 'axios'
import BreweryCard from './BreweryCard';

class Breweries extends React.Component {
    
  state = { breweries: [], showMore: false }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then(res => {
        this.setState({ breweries: res.data.entries })
        this.forceUpdate()
        }
      )
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

  mapBreweries = () => {
    return(
      <Grid centered>
        <Grid.Row>
        { 
          this.state.breweries.length > 0 ? this.state.breweries.map( brewery => 
            <BreweryCard brewery={brewery} />
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
      this.mapBreweries()
    )
  }

}

export default Breweries;
