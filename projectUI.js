"use strict";
const React = require("react");
const { useState, useEffect } = React;
const PropTypes = require("prop-types");
const { Text, Color, Box } = require("ink");
const { ProjectCheckTask } = require("@nielinjie/multi-repo/dist/Project");

const ProjectUI = ({ project }) => {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		new ProjectCheckTask(project).all().then((re) => {
			setTasks(re.map((r) => r[0]));
		});
	}, []);
	return (
		<Box flexDirection="column" paddingBottom={2}>
			<Box flexDirection="row">
				<Text bold>{project.name}</Text>
				<Box paddingLeft={3}>
					<Text>{project.path}</Text>
				</Box>
			</Box>
			<Box flexDirection="column">
				{tasks.map((task) => {
					return (
						<Box key={task.name}>
							<Text>{task.check ? "✅" : "⚠️"}</Text>
							<Text>{task.name}</Text>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

ProjectUI.propTypes = {
	project: PropTypes.object.isRequired,
};

module.exports = ProjectUI;
