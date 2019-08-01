import React, { Component } from 'react'
import { FunctionCard, InfoCard } from './InfoCard'
import { Grid } from 'semantic-ui-react'

class WithCard extends Component {
  render () {
    const { children } = this.props;
    return (
      <Grid stackable columns='equal' padded>
        <Grid.Column width={12}>
          {children}
        </Grid.Column>
        <Grid.Column width={4} only={'computer mobile'}>
          <InfoCard/>
          <FunctionCard/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default WithCard;