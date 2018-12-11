import React from 'react'
import PropTypes from 'prop-types';

import { 
    Header,
    Icon,
  } from 'semantic-ui-react'
/**
 *
 * Show Siple error
 * @class Notice
 * @extends {React.Component}
 */
class Notice extends React.Component{
    render(){
        return <Header as='h2' icon textAlign='center'>
            <Icon name='bell' circular />
            <Header.Content>{this.props.text}</Header.Content>
        </Header>
    }
}
Notice.propTypes={
    text:PropTypes.string.isRequired,
}
export default Notice