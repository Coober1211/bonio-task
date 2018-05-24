function addClass(state, action) {
	const classList = [...state];
	const newClass = {
		id: action.id,
		name: action.classTitle,
		studentMaxNum: action.studentNum,
		studentsNum: 0
	};
	classList.push(newClass);
	return classList;
}

function addStudentMaxNum(state, action) {
	const classList = state.map(c => {
		if (c.id === action.classId) {
			c.studentMaxNum += parseInt(action.chairNum);
		}
		return c;
	});
	return classList;
}

function removeClass(state, action) {
	const classList = state.reduce((newList, c) => {
		if (c.id !== action.classId) {
			newList.push(c);
		}
		return newList;
	}, []);
	return classList;
}

function minusStudent(state, action) {
	const classList = state.map(c => {
		if (c.id === action.classId) {
			c.studentsNum--;
		}
		return c;
	});
	return classList;
}

function addStudentNum(state, action) {
	const classList = state.map(c => {
		if (c.id === action.classId) {
			c.studentsNum++;
		}
		return c;
	});
	return classList;
}

function classList(state = [], action) {
	switch (action.type) {
		case 'ADD_CLASS':
			return addClass(state, action);
		case 'ADD_STUDENT_MAX_NUM':
			return addStudentMaxNum(state, action);
		case 'REMOVE_CLASS':
			return removeClass(state, action);
		case 'MINUS_STUDENT':
			return minusStudent(state, action);
		case 'ADD_STUDENT_NUM':
			return addStudentNum(state, action);
		default:
			return state;
	}
}

export default classList;
