import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { 
    Icon, 
  } from 'semantic-ui-react'


/**
 *
 * For Diplay more button with action and href
 * @class MoreButton
 * @extends {Component}
 */
class MoreButton extends Component{
    render(){
        return <a href={this.props.href} onClick={this.props.onClick}>
            <Icon name='chevron circle down' />
        </a>;
    }
}
MoreButton.propTypes={
    href:PropTypes.string,
    onClick:PropTypes.func.isRequired
}
export default MoreButton