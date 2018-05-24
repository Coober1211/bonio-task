import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Header from './tools/Header';
import Navbar from './tools/Navbar';
import StudentList from './StudentList';
import Modal from './tools/Modal';
import AddGroupForm from './AddGroupForm';
import Group from './Group';
import Student from './Student';

class Class extends React.Component {
	groupRef = React.createRef();

	state = {
		isModalOpen: false,
		isGroupFormOpen: false,
		name: '',
		studentMaxNum: 0,
		studentsNum: 0,
		classId: parseInt(this.props.match.params.classId),
		groups: [],
		studentsList: [],
		studentsNoGroup: [],
		allStudentsList: []
	};

	componentWillMount() {
		this.initState();
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};

	toggleGroupForm = () => {
		this.setState({
			isGroupFormOpen: !this.state.isGroupFormOpen
		});
	};

	initState = () => {
		const { classId } = this.state;
		const { name, studentMaxNum, studentsNum } = this.props.classList.filter(
			c => {
				return c.id === classId;
			}
		)[0];
		const { groups, students } = this.props.classInfo.filter(c => {
			return c.id === classId;
		})[0];
		const studentsNoGroup = [...students] || [];
		const allStudents = groups.reduce(
			(studentsList, g) => {
				if (!g.students) return studentsList;
				studentsList.push(
					...g.students.map(s => {
						return {
							id: s.id,
							name: s.name,
							group: g.name,
							bgcStyle: g.bgcStyle || { backgroundColor: '#ccc' }
						};
					})
				);
				return studentsList;
			},
			[...studentsNoGroup]
		);
		this.setState({
			name,
			studentMaxNum,
			studentsNum,
			groups,
			studentsNoGroup,
			studentsList: allStudents,
			allStudentsList: allStudents
		});
	};

	changeSelected = () => {
		const selectedGroup = this.groupRef.current.value;
		const allStudentsList = [...this.state.allStudentsList];
		let selectedStudents = [];
		if (selectedGroup === '全部') {
			selectedStudents = allStudentsList;
		} else if (selectedGroup === '未分類') {
			selectedStudents = allStudentsList.filter(s => {
				if (!s.group) return true;
			});
		} else {
			selectedStudents = allStudentsList.filter(s => {
				if (s.group && s.group === selectedGroup) return true;
			});
		}
		this.setState({
			studentsList: selectedStudents
		});
	};

	updateGroups = groupId => {
		const studentInGroup = this.state.groups.filter(g => g.id === groupId)[0]
			.students;
		const studentsNoGroup = [...this.state.studentsNoGroup, ...studentInGroup];
		const newGroups = this.state.groups.filter(g => g.id !== groupId);
		this.setState({
			groups: newGroups,
			studentsNoGroup
		});
	};

	noGroupStudent = () => {
		const { studentMaxNum, studentsNoGroup, groups, classId } = this.state;
		return studentsNoGroup.map(s => {
			const studentInfo = this.props.studentInfo.filter(
				info => s.id === info.id
			)[0];
			return (
				<Student
					key={s.id}
					name={s.name}
					studentInfo={studentInfo}
					groups={groups}
					classId={classId}
					initState={this.initState}
					removeStudent={this.props.removeStudent}
					minusStudent={this.props.minusStudent}
					updateStudent={this.props.updateStudent}
					updateStudentGroup={this.props.updateStudentGroup}
				/>
			);
		});
	};

	notJoinStudent = () => {
		const { studentMaxNum, studentsNum, groups, classId } = this.state;
		const renderList = [];
		const studentInfo = {};
		for (let i = 0; i < studentMaxNum - studentsNum; i++) {
			renderList.push(
				<Student
					key={i}
					name="尚未加入"
					classId={classId}
					studentInfo={studentInfo}
					addStudentToClass={this.props.addStudentToClass}
					addStudentInfo={this.props.addStudentInfo}
					addStudentNum={this.props.addStudentNum}
					initState={this.initState}
					groups={groups}
				/>
			);
		}
		return renderList;
	};

	render() {
		const {
			isModalOpen,
			isGroupFormOpen,
			classId,
			name,
			groups,
			studentsList,
			studentMaxNum,
			studentsNum
		} = this.state;
		return (
			<div className="main">
				<Header title="班級頁面" />
				<Navbar
					isClassPage={true}
					openModal={this.toggleModal}
					text="新增學生"
				/>
				<Modal
					show={isModalOpen}
					onClose={this.toggleModal}
					text="新增學生"
					forAddStudent={true}
					classId={classId}
					addStudentMaxNum={this.props.addStudentMaxNum}
					initState={this.initState}
				/>
				<AddGroupForm
					show={isGroupFormOpen}
					onClose={this.toggleGroupForm}
					classId={classId}
					saveGroups={this.props.addGroups}
				/>
				<div className="class-page">
					<StudentList
						groups={groups}
						studentsList={studentsList}
						groupRef={this.groupRef}
						changeSelected={this.changeSelected}
					/>
					<div className="top">
						<h2>{name}</h2>
						<div className="icon-user">
							<i className="fa fa-user" />
							<span>
								{studentsNum} / {studentMaxNum}
							</span>
						</div>
						<div className="button__add" onClick={this.toggleGroupForm}>
							新增小組
						</div>
					</div>
					<div className="middle">
						{groups.map(g => (
							<Group
								key={g.id}
								name={g.name}
								groups={groups}
								bgcStyle={g.bgcStyle}
								students={g.students || []}
								groupId={g.id}
								classId={classId}
								removeGroup={this.props.removeGroup}
								updateGroups={this.updateGroups}
								studentInfo={this.props.studentInfo}
								updateStudent={this.props.updateStudent}
								minusStudent={this.props.minusStudent}
								initState={this.initState}
								removeStudent={this.props.removeStudent}
								updateStudentGroup={this.props.updateStudentGroup}
							/>
						))}
					</div>
					<div className="bottom">
						{this.noGroupStudent()}
						{this.notJoinStudent()}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		classList: state.classList,
		classInfo: state.classInfo,
		studentInfo: state.studentInfo
	};
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Class);
