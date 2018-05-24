import React from 'react';
import ColorPicker from './tools/ColorPicker';

class AddGroupForm extends React.Component {
	nameRef = React.createRef();

	state = {
		groups: [],
		bgcStyle: { backgroundColor: 'rgb(165, 57, 230)' }
	};

	updateBgcStyle = bgcStyle => {
		this.setState({
			bgcStyle
		});
	};

	addGroup = () => {
		const groups = [...this.state.groups];
		const group = {
			id: parseInt(Date.now()),
			name: this.nameRef.current.value,
			bgcStyle: this.state.bgcStyle
		};
		groups.push(group);
		this.setState({
			groups
		});
		this.nameRef.current.value = '';
	};

	saveGroups = () => {
		const { classId } = this.props;
		const { groups } = this.state;
		if (groups.length === 0) return;
		this.props.saveGroups(classId, groups);
		this.setState({ groups: [] });
		this.props.onClose();
	};

	render() {
		const { show } = this.props;
		const { groups } = this.state;
		if (!show) {
			return null;
		}

		return (
			<div className="modal">
				<div className="modal-content">
					<div className="modal-header">
						<span onClick={this.props.onClose}>&times;</span>
						<h2>新增小組</h2>
					</div>
					<div className="modal-body">
						<div className="input--name">
							<label htmlFor="groupName">小組名稱</label>
							<input type="text" id="groupName" ref={this.nameRef} />
						</div>
						<ColorPicker updateBgcStyle={this.updateBgcStyle} />
					</div>
					<div className="new--groups">
						{groups.map(g => {
							return (
								<div className="group" key={g.id}>
									<div className="color" style={g.bgcStyle} />
									<div className="name--group">{g.name}</div>
								</div>
							);
						})}
						<div className="button__add --group" onClick={this.addGroup}>
							＋增加小組
						</div>
					</div>
					<div className="modal-footer">
						<div className="button__add" onClick={this.saveGroups}>
							儲存
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddGroupForm;
