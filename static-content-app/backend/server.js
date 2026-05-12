const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const content = {
    companyName: "Tuio Startup",
    title: "Digital Transformation Solutions",
    description: "Empowering startups with cutting-edge static content management and scalable web architecture.",
    imageUrl: "business-hero.png", 
    features: [
        "High-Performance Rendering",
        "SEO Optimized Structure",
        "Seamless API Integration"
    ]
};

app.get('/api/content', (req, res) => {
    res.json(content);
});

app.listen(3000, () => console.log('Backend running on port 3000'));