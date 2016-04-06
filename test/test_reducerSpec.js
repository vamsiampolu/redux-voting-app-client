import {List,Map,fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer',() => {

	it('is not null',() => {
		expect(reducer).to.be.ok;
	});

	it('handles SET_STATE',() => {
		const initialState = Map();
		const action = {
	      type: 'SET_STATE',
	      state: Map({
	        vote: Map({
	          pair: List.of('Trainspotting', '28 Days Later'),
	          tally: Map({Trainspotting: 1})
	        })
	      })
	    };
		const nextState = reducer(initialState,action);
		console.log(nextState.toJSON());
		expect(nextState).to.equal(fromJS({
	      vote: {
	        pair: ['Trainspotting', '28 Days Later'],
	        tally: {Trainspotting: 1}
	      }
	    }));
	});

	it('handles set state with a plain js payload',() => {
		const initialState = Map();
		const action = {
			type:'SET_STATE',
			state:{
				vote:{
					pair:['Trainspotting','28 Days Later'],
					tally:{
						'Trainspotting':1
					}
				}
			}
		};

		const nextState = reducer(initialState,action);
		expect(nextState).to.equal(fromJS({
			vote:{
				pair:['Trainspotting','28 Days Later'],
				tally:{
					'Trainspotting':1
				}
			}
		}));
	});

	it('handles an initial undefined state',() => {
		const action = {
			type:'SET_STATE',
			state:{
				vote:{
					pair:['Trainspotting','28 Days Later'],
					tally:{
						'Trainspotting':1
					}
				}
			}
		};
		const nextState = reducer(undefined,action);
		expect(nextState).to.equal(fromJS({
			vote:{
				pair:['Trainspotting','28 Days Later'],
				tally:{
					'Trainspotting':1
				}
			}
		}));
	});

	it('handles VOTE by setting HAS_VOTED',() => {
		const state = fromJS({
			vote:{
				pair:['Trainspotting','28 Days Later'],
				tally:{
					'Trainspotting':1
				}
			}
		});
		const action = {type:'VOTE',entry:'Trainspotting'};
		const nextState = reducer(state,action);
		expect(nextState).to.equal(fromJS({
		    vote: {
		      pair: ['Trainspotting', '28 Days Later'],
		      tally: {Trainspotting: 1}
		    },
		    hasVoted: 'Trainspotting'
		}));
	});

	it('does not have hasVoted for VOTE on invalid entry',() => {
		const state = fromJS({
			vote:{
				pair:['Trainspotting','28 Days Later'],
				tally:{
					'Trainspotting':1
				}
			}
		});
		const action = {
			type:'VOTE',
			entry:'Sunshine'
		};
		const nextState = reducer(state,action);
		expect(nextState).to.equal(fromJS({
			vote:{
				pair:['Trainspotting','28 Days Later'],
				tally:{
					'Trainspotting':1
				}
			}
		}));
	});

	it('removes hasVoted on SET_STATE if entry changes',() => {
		const initialState = fromJS({
		    vote: {
		      pair: ['Trainspotting', '28 Days Later'],
		      tally: {Trainspotting: 1}
		    },
		    hasVoted: 'Trainspotting'
		  });
	  	const action = {
	    	type: 'SET_STATE',
	    	state: {
	     	 vote: {
	        	pair: ['Sunshine', 'Slumdog Millionaire']
	      	}
	    	}
	  	};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
		    vote: {
		      pair: ['Sunshine', 'Slumdog Millionaire']
		    }
		}));
	});

});
