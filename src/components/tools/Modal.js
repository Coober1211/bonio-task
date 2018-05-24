import React from 'react';

class Modal extends React.Component {
	classTitleRef = React.createRef();
	studentNumRef = React.createRef();
	chairNumRef = React.createRef();

	addClass = () => {
		const id = Date.now();
		const classTitle = this.classTitleRef.current.value;
		const studentNum = this.studentNumRef.current.value;
		this.props.addClass(id, classTitle, studentNum);
		this.props.addClassInfo(id);
		this.props.onClose();
	};

	addStudentMaxNum = () => {
		const classId = this.props.classId;
		const chairNum = this.chairNumRef.current.value;
		this.props.addStudentMaxNum(classId, chairNum);
		this.props.initState();
		this.props.onClose();
	};

	renderBody = forAddStudent => {
		if (forAddStudent) {
			return (
				<div className="modal-body">
					<div className="chair-num">
						<label htmlFor="chairNum">座位數：</label>
						<input
							type="number"
							className="input--text"
							id="chairNum"
							ref={this.chairNumRef}
						/>
					</div>
				</div>
			);
		}
		return (
			<div className="modal-body">
				<div className="class-name">
					<label htmlFor="classTitle">班級名稱：</label>
					<input
						type="text"
						id="classTitle"
						className="input--text"
						ref={this.classTitleRef}
					/>
				</div>
				<div className="class-num">
					<label htmlFor="studentNum">人數：</label>
					<input
						type="number"
						id="studentNum"
						className="input--text"
						ref={this.studentNumRef}
					/>
				</div>
			</div>
		);
	};

	render() {
		const { forAddStudent, show } = this.props;
		if (!show) {
			return null;
		}

		return (
			<div className="modal">
				<div className="modal-content">
					<div className="modal-header">
						<span onClick={this.props.onClose}>&times;</span>
						<h2>{this.props.text}</h2>
					</div>
					{this.renderBody(forAddStudent)}
					<div className="modal-footer">
						<div
							className="button__add"
							onClick={forAddStudent ? this.addStudentMaxNum : this.addClass}
						>
							儲存
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
