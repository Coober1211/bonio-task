import React from 'react';

class Slider extends React.Component {
	render() {
		return (
			<div>
				<input
					ref="input"
					value={this.props.val}
					type="range"
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					onChange={this.props.update}
				/>
				<span>
					{this.props.col}: {this.props.children}
				</span>
			</div>
		);
	}
}

export default Slider;
