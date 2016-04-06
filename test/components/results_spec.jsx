import React from 'react/addons';
import {List,Map} from 'immutable';
import {Results} from '../../src/components/Results.jsx';
import {expect} from 'chai';

const {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate} = React.addons.TestUtils;

describe('routes',() => {
	it('renders entries with vote count or zero',() => {
		let nextInvoked = false;
		const next = () => nextInvoked = true;

		const pair = List.of('Trainspotting', '28 Days Later');
	    const tally = Map({'Trainspotting': 5});
	    const component = renderIntoDocument(
	      <Results pair={pair} tally={tally} next={next}/>
	    );

	    const entries = scryRenderedDOMComponentsWithClass(component,'entry');
	    const [train,days] = entries.map(e => e.textContent);
	    expect(entries.length).to.equal(2);
	    expect(train).to.contain('Trainspotting');
	    expect(train).to.contain('5');
	    expect(days).to.contain('28 Days Later');
	    expect(days).to.contain('0');
	
	    Simulate.click(React.findDOMNode(component.refs.next));
	    expect(nextInvoked).to.equal(true);
	});

	it('renders winner when there is one',() => {
		const component = renderIntoDocument(<Results
				pair={List.of('Trainspotting','28 Days Later')}
				tally = {Map({})}
				winner="Trainspotting"
			/>);
		const winner = React.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});
});

