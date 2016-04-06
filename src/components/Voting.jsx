import React from 'react';
import Winner from './Winner.jsx'
import Vote from './Vote.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Voting =  React.createClass({
	mixins:[PureRenderMixin],
	render(){
		return <div>
	      {
	      	this.props.winner?
	      		<Winner ref="winner" winner={this.props.winner}/>:
	      		<Vote {...this.props}/>	
		  }   	
	    </div>;
	}
});

function mapStateToProps(state) {
	return {
		pair:state.getIn(['vote','pair']),
		winner:state.get('winner'),
		hasVoted:state.get('hasVoted')
	};
}

export const VotingContainer = connect(mapStateToProps,actionCreators)(Voting);