import {Voting} from '../../src/components/Voting.jsx';
import React from 'react/addons';
import {expect} from 'chai';
import {List} from 'immutable';

const {	
		renderIntoDocument, 
		scryRenderedDOMComponentsWithTag,
		Simulate
	} = React.addons.TestUtils;

describe('voting',() => {
	it('renders a pair of buttons',() => {
		const component = renderIntoDocument( 
			<Voting pair={['Trainspotting', '28 Days Later']} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component,'button');
		expect(buttons.length).to.equal(2);
		expect(buttons[0].getDOMNode().textContent).to.equal('Trainspotting');
		expect(buttons[1].getDOMNode().textContent).to.equal('28 Days Later');
	});

	it('simulates a click when a callback is clicked',() => {
		let votedWith;
		const vote = entry => votedWith = entry;
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', '28 Days Later']} vote={vote}/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component,'button');
		Simulate.click(buttons[0]);
		expect(votedWith).to.equal('Trainspotting');
	});

	it('disables buttons when the user has voted',() => {
		const component = renderIntoDocument(
		    <Voting pair={['Trainspotting', '28 Days Later']}
		            hasVoted="Trainspotting" />
		);
  		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(2);
  		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
  		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry',() => {
		const component = renderIntoDocument(
		    <Voting pair={['Trainspotting' , '28 Days Later' ]} hasVoted="Trainspotting" />);
		const buttons = scryRenderedDOMComponentsWithTag(component,'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders as pure component',() => {
		const pair = ['Trainspotting','28 Days Later'];
		const component = renderIntoDocument(<Voting pair={pair}/>);
		let firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0];

		expect(firstButton.textContent).to.equal('Trainspotting');

		pair[0] = 'Sunshine';
		component.setProps({pair:pair});
		firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');		
	});

	it('does update when the property changes',() => {
		const pair = List.of('Trainspotting','28 Days Later');
		const component = renderIntoDocument(<Voting pair={pair}/>);
	    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	    console.log(firstButton.textContent);
		expect(firstButton.textContent).to.equal('Trainspotting');
		const newPair = pair.set(0,'Sunshine');
		component.setProps({pair:newPair});
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		console.log(firstButton.textContent);
		expect(firstButton.textContent).to.equal('Sunshine');
	});
});