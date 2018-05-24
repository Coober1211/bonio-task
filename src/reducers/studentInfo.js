function addStudentInfo(state, action) {
	const { studentId, account, nickname, groupId } = action;
	const student = {
		id: studentId,
		nickname,
		account,
		groupId
	};
	const studentInfoList = [...state, student];
	return studentInfoList;
}

function updateStudentInfo(state, action) {
	const { studentId, name, value } = action;
	const studentInfoList = state.map(s => {
		if (s.id === studentId) {
			return {
				...s,
				[name]: value
			};
		}
		return s;
	});
	return studentInfoList;
}

function studentInfo(state = [], action) {
	switch (action.type) {
		case 'UPDATE_STUDENT':
			return updateStudentInfo(state, action);
		case 'ADD_STUDENT_INFO':
			return addStudentInfo(state, action);
		default:
			return state;
	}
}

export default studentInfo;
