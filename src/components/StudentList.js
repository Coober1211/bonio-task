import React from 'react';

class StudentList extends React.Component {
	render() {
		const { groups, studentsList, groupRef } = this.props;
		return (
			<div className="student-list">
				<div className="group">
					<select
						className="selector--group"
						ref={groupRef}
						onChange={this.props.changeSelected}
					>
						<option name="all" defaultValue>
							全部
						</option>
						<option name="ungroup">未分類</option>
						{groups.map(g => (
							<option name={g.id} key={g.id}>
								{g.name}
							</option>
						))}
					</select>
				</div>
				<span>搜尋結果：{studentsList.length}</span>
				<ul className="students">
					{studentsList.map(s => {
						return (
							<li key={s.id}>
								{s.name}
								<div className="color" style={s.bgcStyle} />
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default StudentList;
