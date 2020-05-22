"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Text, Color, Box } = require("ink");
const { projects } = require("@nielinjie/multi-repo");
const importJsx = require("import-jsx");

const ProjectUI = importJsx("./projectUI");

const App = ({ basePath }) => {
	const projs = projects(basePath);
	return (
		<Box flexDirection="column">
			{projs.map((project) => {
				return <ProjectUI project={project} key={project.name}/>;
			})}
		</Box>
	);
};

App.propTypes = {
	basePath: PropTypes.string,
};

App.defaultProps = {
	basePath: "Stranger",
};

module.exports = App;
