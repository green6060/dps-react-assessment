import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const Breweries = ({ breweries }) => (
  <>
    <Card>
      { breweries.map( brewery =>
        <>
          <Image src={brewery.images.square_medium} />
          <Card.Content key={brewery.id}>
            <Card.Header>{brewery.name}</Card.Header>
            <Card.Description>{brewery.description}</Card.Description>
          </Card.Content>
        </>
      )}
    </Card>
  </>
)

export default Breweries;