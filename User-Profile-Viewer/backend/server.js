const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const users = [
    {
        id: "USR-001",
        name: "Alexander Bennett",
        role: "Senior Project Manager",
        email: "a.bennett@corporate.com",
        bio: "Over 10 years of experience in agile methodologies and team leadership.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        skills: ["Agile", "Scrum", "Jira"]
    },
    {
        id: "USR-002",
        name: "Sophia Rodriguez",
        role: "UI/UX Designer",
        email: "sophia.design@creative.io",
        bio: "Specialized in creating user-centric designs and interactive prototypes.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        skills: ["Figma", "Adobe XD", "User Research"]
    },
    {
        id: "USR-003",
        name: "Liam O'Connor",
        role: "DevOps Engineer",
        email: "liam.devops@techstack.net",
        bio: "Expert in cloud infrastructure and CI/CD pipeline automation.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        skills: ["Docker", "Kubernetes", "AWS"]
    },
    {
        "id": "USR-004",
        "name": "Elena Volkov",
        "role": "Mobile App Developer",
        "email": "elena.v@techstack.net",
        "bio": "Specialized in building high-performance cross-platform mobile applications using Flutter and React Native.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        "skills": ["Flutter", "Dart", "Firebase", "State Management"]
},
{
        "id": "USR-005",
        "name": "Marcus Chen",
        "role": "Backend Engineer",
        "email": "m.chen@techstack.net",
        "bio": "Expert in designing scalable microservices and database optimization using PostgreSQL and Redis.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        "skills": ["Python", "Django", "PostgreSQL", "Redis"]
},
{
        "id": "USR-006",
        "name": "Sarah Jenkins",
        "role": "Cyber Security Analyst",
        "email": "s.jenkins@techstack.net",
        "bio": "Dedicated to securing enterprise cloud environments and implementing robust encryption protocols.",
        avatar: `http://localhost:${PORT}/assets/USER.png`,
        "skills": ["Security+", "Ethical Hacking", "Cloud Security", "SIEM"]
}
];

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
});

app.listen(PORT, () => {
    console.log(`Service running at http://localhost:${PORT}`);
});