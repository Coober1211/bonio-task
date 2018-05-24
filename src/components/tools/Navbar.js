import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	renderButton = isClassPage => {
		if (isClassPage) {
			return (
				<div className="button__back">
					<Link to="/">
						<i className="fa fa-chevron-left" />
						<span>返回班級列表</span>
					</Link>
				</div>
			);
		} else {
			return (
				<div className="button__search">
					<i className="fa fa-search" />
				</div>
			);
		}
	};

	render() {
		const { isClassPage, text } = this.props;
		return (
			<div className="navbar">
				{this.renderButton(isClassPage)}
				<div className="button__add" onClick={this.props.openModal}>
					<span>{text}</span>
				</div>
			</div>
		);
	}
}

export default Navbar;
