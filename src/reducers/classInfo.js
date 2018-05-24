function addClassInfo(state, action) {
	const classInfoList = [...state];
	const newClassInfo = {
		id: action.id,
		groups: [],
		students: []
	};
	classInfoList.push(newClassInfo);
	return classInfoList;
}

function addStudent(state, action) {
	const { classId, studentId, groupId, nickname } = action;
	const classInfo = state.filter(c => c.id === action.classId)[0];
	const student = {
		id: studentId,
		name: nickname
	};
	if (groupId) {
		classInfo.groups.forEach(g => {
			if (g.id === parseInt(groupId)) {
				g.students ? g.students.push(student) : (g['students'] = [student]);
			}
		});
	} else {
		classInfo.students.push(student);
	}
	const classInfoList = state.map(c => {
		if (c.id === classId) return classInfo;
		return c;
	});
	return classInfoList;
}

function removeClassInfo(state, action) {
	const classInfoList = state.filter(c => c.id !== action.classId);
	return classInfoList;
}

function addGroups(state, action) {
	const classInfoList = state.map(c => {
		if (c.id === action.classId) {
			c.groups.push(...action.groups);
		}
		return c;
	});
	return classInfoList;
}

function removeGroup(state, action) {
	const classInfo = state.filter(c => c.id === action.classId)[0];
	const studentsInGroup =
		classInfo.groups.filter(g => g.id === action.groupId)[0].students || [];
	const newClassInfo = {
		id: classInfo.id,
		groups: classInfo.groups.filter(g => g.id !== action.groupId),
		students: [...classInfo.students, ...studentsInGroup]
	};
	const classInfoList = state.map(c => {
		if (c.id === action.classId) {
			return newClassInfo;
		}
		return c;
	});
	return classInfoList;
}

function updateStudentGroup(state, action) {
	const { classId, studentId, groupId, oldGroupName } = action;
	const classInfo = state.filter(c => c.id === classId)[0];
	const newGroup = classInfo.groups.filter(g => g.id === groupId)[0];
	const oldGroup = classInfo.groups.filter(g => g.name === oldGroupName)[0];
	let student = [];
	if (oldGroup) {
		student = oldGroup.students.filter(s => s.id === studentId)[0];
		oldGroup.students = oldGroup.students.filter(s => s.id !== studentId);
	} else {
		student = classInfo.students.filter(s => s.id === studentId)[0];
		classInfo.students = classInfo.students.filter(s => s.id !== studentId);
	}
	const updatedNewGroup = newGroup.students
		? newGroup.students.push(student)
		: (newGroup['students'] = [student]);
	classInfo.groups.forEach(g => {
		if (g.id === oldGroup && oldGroup.id) g = oldGroup;
		if (g.id === updatedNewGroup.id) g = updatedNewGroup;
	});
	const classInfoList = state.map(c => {
		if (c.id === classInfo.id) return classInfo;
		return c;
	});
	return classInfoList;
}

function removeStudent(state, action) {
	const { classId, studentId } = action;
	const classInfo = state.filter(c => c.id === classId)[0];
	classInfo.students = classInfo.students.filter(s => s.id !== studentId);
	classInfo.groups.forEach(g => {
		g.students = g.students.filter(s => s.id !== studentId);
	});
	return state;
}

function classInfo(state = [], action) {
	switch (action.type) {
		case 'ADD_CLASS_INFO':
			return addClassInfo(state, action);
		case 'ADD_STUDENT_TO_CLASS':
			return addStudent(state, action);
		case 'REMOVE_CLASS_INFO':
			return removeClassInfo(state, action);
		case 'ADD_GROUPS':
			return addGroups(state, action);
		case 'REMOVE_GROUP':
			return removeGroup(state, action);
		case 'UPDATE_STUDENT_GROUP':
			return updateStudentGroup(state, action);
		case 'REMOVE_STUDENT':
			return removeStudent(state, action);
		default:
			return state;
	}
}

export default classInfo;
