import React, { Component } from 'react';
import SurveyItem from './SurveyItem';
import FlatButton from 'material-ui/FlatButton';
import buttonStyles from '../../../styles/buttonStyles';


class Survey extends Component {

	render() {
		return(
			<div className="survey">
				<SurveyItem 
					question={"Molimo vas označite u kojoj meri ste zadovoljni vremenskim aspektom "+ this.props.word1 +" (kašnjenje, čekanje...)"}
					group="timeAspect"
					write={this.props.write}
				/>

				<SurveyItem 
					question={"Molimo vas označite u kojoj meri ste zadovoljni komunikacijom s " + this.props.word2 }
					group="commAspect"
					write={this.props.write}
				/>

				<SurveyItem 
					question={"Molimo vas označite u kojoj meri ste zadovoljni " + this.props.word3}
					group="moneyAspect"
					write={this.props.write}
				/>
				
				<FlatButton
				  label="POŠALJI"
				  backgroundColor="#43c978"
				  hoverColor="#24b35d"
				  fullWidth= {true}
				  labelStyle={buttonStyles.headerLabel}
				  style={buttonStyles.formButton}
				  onClick={() => this.props.send()}
			  />

			</div>
		)
	}
}


export default Survey;