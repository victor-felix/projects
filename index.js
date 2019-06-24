const express = require("express");

const server = express();

server.use(express.json());

let qtyRequests = 0;

server.use((req, res, next) => {
  console.log(++qtyRequests);

  return next();
});

const projects = [
  {
    title: "Avengers: The Initiative",
    tasks: ["Save the World", "Save Asgard"]
  },
  {
    title: "Jedi Academy",
    tasks: ["Train the Force", "Conquering the Empire"]
  }
];

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  if (!projects[id]) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { title } = req.body;
  const { tasks } = req.body;

  projects.push({
    title: title,
    tasks: tasks
  });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id]["title"] = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  projects[id]["tasks"].push(task);

  return res.json(projects);
});

server.listen("3000");
