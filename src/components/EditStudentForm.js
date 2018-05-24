import React from 'react';

class EditStudentForm extends React.Component {
	nameRef = React.createRef();
	accountRef = React.createRef();
	groupRef = React.createRef();

	handleInfoChange = event => {
		const value = event.currentTarget.value;
		const name = event.currentTarget.name;
		const studentId = this.props.studentInfo.id;
		this.props.updateStudent(studentId, name, value);
	};

	handleGroupChange = event => {
		const groupId = parseInt(event.currentTarget.value);
		const studentId = this.props.studentInfo.id;
		const classId = this.props.classId;
		const oldGroupName = this.props.groupName;
		this.props.updateStudentGroup(classId, studentId, groupId, oldGroupName);
		this.props.initState();
	};

	removeStudent = () => {
		const studentId = this.props.studentInfo.id;
		const classId = this.props.classId;
		this.props.removeStudent(classId, studentId);
		this.props.minusStudent(classId);
		this.props.initState();
		this.props.onClose();
	};

	addStudent = () => {
		const nickname = this.nameRef.current.value;
		const account = this.accountRef.current.value;
		const groupId = this.groupRef.current.id;
		const classId = this.props.classId;
		const studentId = Date.now();
		if (!nickname || !account || !groupId) return;
		this.props.addStudentToClass(classId, studentId, nickname, groupId);
		this.props.addStudentInfo(studentId, account, nickname, groupId);
		this.props.addStudentNum(classId);
		this.props.initState();
		this.props.onClose();
	};

	render() {
		const {
			show,
			studentInfo,
			name,
			groups,
			groupName,
			isNewStudent
		} = this.props;
		if (!show) {
			return null;
		}
		return (
			<div className="modal">
				<div className="modal-content">
					<div className="modal-header">
						<span onClick={this.props.onClose}>&times;</span>
						<h2>{name}</h2>
					</div>
					<div className="modal-body">
						<div className="input--name">
							<div className="name">
								<label htmlFor="name">暱稱 </label>
								<input
									type="text"
									id="name"
									name="nickname"
									ref={this.nameRef}
									className="input--text"
									onChange={isNewStudent ? null : this.handleInfoChange}
									value={studentInfo.nickname}
								/>
							</div>
							<div className="account">
								<label htmlFor="email">帳號 </label>
								<input
									type="email"
									name="account"
									id="email"
									ref={this.accountRef}
									className="input--text"
									onChange={isNewStudent ? null : this.handleInfoChange}
									value={studentInfo.account}
								/>
							</div>
							<div className="tags">
								{groups.map(g => {
									return (
										<div key={g.id} id={g.id} className="tag">
											<input
												type="radio"
												name="group"
												value={g.id}
												id={g.id}
												ref={this.groupRef}
												onChange={isNewStudent ? null : this.handleGroupChange}
												checked={groupName && groupName === g.name}
											/>
											<label htmlFor={g.id} style={g.bgcStyle}>
												{g.name}
											</label>
										</div>
									);
								})}
								<h4>選擇小組</h4>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<div
							className="button__add"
							onClick={isNewStudent ? this.addStudent : this.removeStudent}
							style={isNewStudent ? {} : { backgroundColor: '#CB4042' }}
						>
							{isNewStudent ? '儲存' : '刪除'}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditStudentForm;
