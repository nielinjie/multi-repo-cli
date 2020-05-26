"use strict";

const React = require("react");
const { useState, useEffect } = React;
const PropTypes = require("prop-types");
const { Text, Color, Box } = require("ink");
const { ProjectCheckTask } = require("@nielinjie/multi-repo");

const Spinner = require("ink-spinner").default;
const ProjectUI = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const pt = new ProjectCheckTask(project);
    setTasks(pt.tasks);
    pt.tasks.forEach((checkTask) => {
      checkTask.then(
        (completedTask) => {
          setTasks((preTasks) =>
            preTasks.map((preTask) =>
              preTask.name === completedTask.name ? completedTask : preTask
            )
          );
        },
        (failedTask) => {
          setTasks((preTasks) =>
            preTasks.map((preTask) =>
              preTask.name === failedTask.name ? failedTask : preTask
            )
          );
        }
      );
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
            <Box key={task.name} flexDirection="column">
              <Box>
                {task.state === "done" ? (
                  <Text>{task.check ? "✅" : "❗️"}</Text>
                ) : task.state === "pending" ? (
                  <Color green>
                    <Spinner type="dots" />
                  </Color>
                ) : (
                  <Text>{"❓"}</Text>
                )}
                <Text>{task.name}</Text>
              </Box>
              {task.state === "done" && !task.check ? (
                <Box paddingLeft={4}>
                  {task.actions.map((action) => {
                    return (
                      <>
                        <Box>
                          <Text>⭐️</Text>
                        </Box>
                        <Text>{action.suggestion}</Text>
                      </>
                    );
                  })}
                </Box>
              ) : undefined}
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
