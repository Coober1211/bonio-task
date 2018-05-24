import React from 'react';
import EditStudentForm from './EditStudentForm';

class Student extends React.Component {
	itemRef = React.createRef();
	state = {
		isStudentFormOpen: false
	};

	toggleStudentForm = () => {
		this.setState({
			isStudentFormOpen: !this.state.isStudentFormOpen
		});
	};

	render() {
		const { studentInfo, name, groups, groupName, classId } = this.props;
		return (
			<div className="student--single" ref={this.itemRef}>
				<EditStudentForm
					show={this.state.isStudentFormOpen}
					onClose={this.toggleStudentForm}
					studentInfo={studentInfo}
					groups={groups}
					groupName={groupName}
					classId={classId}
					removeStudent={this.props.removeStudent}
					minusStudent={this.props.minusStudent}
					addStudentToClass={this.props.addStudentToClass}
					initState={this.props.initState}
					addStudentInfo={this.props.addStudentInfo}
					addStudentNum={this.props.addStudentNum}
					isNewStudent={Object.keys(studentInfo).length === 0 ? true : false}
					updateStudent={this.props.updateStudent}
					updateStudentGroup={this.props.updateStudentGroup}
					name={name || '尚未加入'}
				/>
				<div className="icon--user" onClick={this.toggleStudentForm}>
					{Object.keys(studentInfo).length === 0 ? (
						<i className="fa fa-user-plus" />
					) : (
						<i className="fa fa-pencil" />
					)}
				</div>
				<h4>{this.props.name}</h4>
			</div>
		);
	}
}

export default Student;
