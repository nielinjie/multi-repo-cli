#!/usr/bin/env node
"use strict";
const path = require("path");
const process = require("process");
const { projects } = require("@nielinjie/multi-repo");
const { ProjectCheckTask } = require("@nielinjie/multi-repo");

const base = path.resolve(process.cwd(), "..");
const projs = projects(base);
projs.forEach((project) => {
  const pt = new ProjectCheckTask(project);
  pt.tasks.forEach((task) => {
    task.task
      .then(() => console.log(task.name + " succ"))
      .catch((err) => console.log(task.name + " failed-----" + err));
  });
});
