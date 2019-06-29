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
    id: "1",
    title: "Avengers: The Initiative",
    tasks: ["Save the World", "Save Asgard"]
  },
  {
    id: "2",
    title: "Jedi Academy",
    tasks: ["Train the Force", "Conquering the Empire"]
  }
];

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  projects.map(project => {
    if (project.id === id) {
      return next();
    }
  });

  return res.status(400).json({ error: "Project not found" });
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;

  projects.push({
    id: id,
    title: title,
    tasks: tasks
  });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.map((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
    }
  });

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  projects.map(project => {
    if (project.id === id) {
      project.tasks.push(task);
    }
  });

  return res.json(projects);
});

server.listen("3000");
