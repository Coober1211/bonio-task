// add class
export function addClass(id, classTitle, studentNum) {
	return {
		type: 'ADD_CLASS',
		id,
		classTitle,
		studentNum
	};
}

export function addClassInfo(id) {
	return {
		type: 'ADD_CLASS_INFO',
		id
	};
}

// remove class
export function removeClass(classId) {
	return {
		type: 'REMOVE_CLASS',
		classId
	};
}

export function removeClassInfo(classId) {
	return {
		type: 'REMOVE_CLASS_INFO',
		classId
	};
}

// add student
export function addStudentToClass(classId, studentId, nickname, groupId) {
	return {
		type: 'ADD_STUDENT_TO_CLASS',
		classId,
		studentId,
		groupId,
		nickname
	};
}

export function addStudentInfo(studentId, account, nickname, groupId) {
	return {
		type: 'ADD_STUDENT_INFO',
		studentId,
		account,
		nickname,
		groupId
	};
}

export function addStudentNum(classId) {
	return {
		type: 'ADD_STUDENT_NUM',
		classId
	};
}

export function addStudentMaxNum(classId, chairNum) {
	return {
		type: 'ADD_STUDENT_MAX_NUM',
		classId,
		chairNum
	};
}

// update student

export function updateStudent(studentId, name, value) {
	return {
		type: 'UPDATE_STUDENT',
		studentId,
		name,
		value
	};
}

export function updateStudentGroup(classId, studentId, groupId, oldGroupName) {
	return {
		type: 'UPDATE_STUDENT_GROUP',
		classId,
		studentId,
		groupId,
		oldGroupName
	};
}

// remove student
export function removeStudent(classId, studentId) {
	return {
		type: 'REMOVE_STUDENT',
		classId,
		studentId
	};
}

export function minusStudent(classId) {
	return {
		type: 'MINUS_STUDENT',
		classId
	};
}
// add groups

export function addGroups(classId, groups) {
	return {
		type: 'ADD_GROUPS',
		classId,
		groups
	};
}

// remove group

export function removeGroup(classId, groupId) {
	return {
		type: 'REMOVE_GROUP',
		classId,
		groupId
	};
}
