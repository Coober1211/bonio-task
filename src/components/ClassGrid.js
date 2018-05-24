import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './tools/Header';
import ClassTile from './ClassTile';
import Navbar from './tools/Navbar';
import Modal from './tools/Modal';

class ClassGrid extends React.Component {
	state = {
		isModalOpen: false
	};

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};

	render() {
		return (
			<div className="main">
				<Header title="班級列表" />
				<Navbar text="新增班級" openModal={this.toggleModal} />
				<Modal
					show={this.state.isModalOpen}
					onClose={this.toggleModal}
					text={'新增班級'}
					forAddStudent={false}
					addClass={this.props.addClass}
					addClassInfo={this.props.addClassInfo}
				/>
				<div className="tiles">
					{this.props.classList.map(c => (
						<ClassTile
							key={c.id}
							class={c}
							history={this.props.history}
							removeClass={this.props.removeClass}
						/>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		classList: state.classList,
		classInfo: state.classInfo
	};
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ClassGrid);
