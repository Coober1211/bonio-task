import React from 'react';
import { Link } from 'react-router-dom';

class ClassTile extends React.Component {
	render() {
		const { name, studentsNum, studentMaxNum } = this.props.class;
		const classId = this.props.class.id;
		return (
			<div className="tile">
				<div
					className="icon-trash"
					onClick={() => this.props.removeClass(classId)}
				>
					<i className="fa fa-trash" />
				</div>
				<Link to={`class/${classId}`}>
					<h4>{name}</h4>
					<span>
						{studentsNum} / {studentMaxNum} 位學生
					</span>
				</Link>
			</div>
		);
	}
}

export default ClassTile;
