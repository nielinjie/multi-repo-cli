"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Text, Color, Box } = require("ink");
const { projects } = require("@nielinjie/multi-repo");
const importJsx = require("import-jsx");
const BigText = require("ink-big-text");
const ProjectUI = importJsx("./projectUI");
//FIXME 似乎当内容大于一屏的时候会乱屏，刷新的新内容不能完全覆盖旧内容。
const App = ({ basePath }) => {
	const projs = projects(basePath);
	return (
    <Box flexDirection="column">
      <BigText font="simple" text="Multi-Repo-Cli" />
      {projs.map((project) => {
        return <ProjectUI project={project} key={project.name} />;
      })}
    </Box>
  );
};

App.propTypes = {
	basePath: PropTypes.string,
};



module.exports = App;
