import React from 'react'
import { Grid } from 'semantic-ui-react';
import axios from 'axios'
import BeerCard from './BeerCard';
import InfiniteScroll from 'react-infinite-scroller';

const styles = {
  scroller: { height: '100vh', overflow: 'auto' }
}

class Beers extends React.Component {
    
  state = { beers: [], showMore: false, page: 1, total_pages: 0  }

  componentDidMount() {
    this.axiosCallBeers()
  }

  axiosCallBeers() {
    axios.get('/api/all_beers')
      .then(res => {
        this.setState({ beers: res.data.entries, total_pages: res.data.total_pages })
      })  
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/all_beers?page=${page}`)
      .then(res => {
        this.setState({ beers: res.data.entries, total_pages: res.data.total_pages })
      })
      .catch( err => {
        console.log(err)
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
    const { page, total_pages } = this.state;
    return( 
      <InfiniteScroll 
        pageStart={page} 
        loadMore={this.loadMore} 
        hasMore={true} 
        useWindow={false}
      >
        <Grid centered> 
          <Grid.Row>
            {
              this.state.beers.length > 0 ? this.state.beers.map( beer =>
                  <BeerCard beer={beer}/>
              ) 
            : 
              <div>Loading...</div>
            }
          </Grid.Row>
        </Grid>
      </InfiniteScroll>
    )
  }

 
  render() {
    return (
      <div style={styles.scroller}>
        {this.mapBeers()}
      </div>
      )
  }
}

export default Beers;
