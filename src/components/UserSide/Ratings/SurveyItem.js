import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Mood from 'material-ui/svg-icons/social/mood';
import MoodBad from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral';


const SurveyItem = (props) => {

	const returnValue = (event) => {
		props.write(event.target.attributes["name"].value, event.target.attributes["value"].value)
	}

	return(
			<div className="surveyItem" >
				<div className="question">
					<h5>{props.question}</h5>
				</div>
				<RadioButtonGroup name={props.group} onChange={returnValue} style={{display: 'flex', flexDirection: 'row', marginTop:'10px'}}>
			      <RadioButton
			        value="1"
			        style={{width: '20%'}}
			        checkedIcon={<MoodBad style={{fill: '#F44336', height: '32px', width:'32px'}} />}
        			uncheckedIcon={<MoodBad style={{fill: '#969696', height: '32px', width:'32px'}} />}
			      />
			      <RadioButton
			        value="2"
			        style={{width: '20%'}}
			        checkedIcon={<Dissatisfied style={{fill: '#F44336', height: '32px', width:'32px'}} />}
        			uncheckedIcon={<Dissatisfied style={{fill: '#969696', height: '32px', width:'32px'}} />}
			      />
			      <RadioButton
			        value="3"
			        style={{width: '20%'}}
			        checkedIcon={<Neutral style={{fill: '#4e6a9a', height: '32px', width:'32px'}} />}
        			uncheckedIcon={<Neutral style={{fill: '#969696', height: '32px', width:'32px'}} />}
			      />
			      <RadioButton
			        value="4"
			        style={{width: '20%'}}
			        checkedIcon={<Satisfied style={{fill: '#43c978', height: '32px', width:'32px'}} />}
        			uncheckedIcon={<Satisfied style={{fill: '#969696', height: '32px', width:'32px'}} />}
			      />
			      <RadioButton
			        value="5"
			        style={{width: '20%'}}
			        checkedIcon={<Mood style={{fill: '#43c978', height: '32px', width:'32px'}} />}
        			uncheckedIcon={<Mood style={{fill: '#969696', height: '32px', width:'32px'}} />}
			      />
			    </RadioButtonGroup>
			</div>
	)
}


export default SurveyItem;