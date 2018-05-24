import React from 'react';
import Student from './Student';

class Group extends React.Component {
	removeGroup = () => {
		const { classId, groupId } = this.props;
		this.props.removeGroup(classId, groupId);
		this.props.updateGroups(groupId);
	};

	render() {
		const {
			name,
			bgcStyle,
			students,
			studentInfo,
			groups,
			classId
		} = this.props;
		return (
			<div className="group--box">
				<div className="top">
					<h4>{name}</h4>
					<div
						className="color"
						style={bgcStyle || { backgroundColor: '#ccc' }}
					/>
					<div className="icon-trash" onClick={this.removeGroup}>
						<i className="fa fa-trash" />
					</div>
				</div>
				<div className="body">
					{students.map(s => {
						const info = studentInfo.filter(info => s.id === info.id)[0] || {};
						return (
							<Student
								key={s.id}
								groupName={name}
								name={s.name}
								studentInfo={info}
								groups={groups}
								classId={classId}
								initState={this.props.initState}
								updateStudent={this.props.updateStudent}
								removeStudent={this.props.removeStudent}
								minusStudent={this.props.minusStudent}
								updateStudentGroup={this.props.updateStudentGroup}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Group;
