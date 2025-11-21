const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');
envLines.forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    process.env[key.trim()] = valueParts.join('=').trim();
  }
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  images: [String],
  tags: [String],
  description: String,
  tools: [String],
  outcomes: [String],
  pdfUrl: String,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date,
}, { strict: false });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const projects = [
  {
    title: 'Hydraulic Press Design & Analysis',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=80'
    ],
    tags: ['Mechanical Design', 'FEA', 'Manufacturing'],
    description: 'Designed and analyzed a 500-ton hydraulic press system for industrial metal forming operations. Conducted comprehensive FEA simulations to optimize structural integrity and ensure safety compliance.',
    tools: ['SolidWorks', 'ANSYS', 'AutoCAD', 'MATLAB'],
    outcomes: [
      'Achieved 30% weight reduction while maintaining structural integrity',
      'Reduced manufacturing costs by 25% through design optimization',
      'Passed all safety certifications on first submission',
      'Improved operational efficiency by 40%'
    ],
    pdfUrl: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Automotive Suspension System Optimization',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'
    ],
    tags: ['Automotive', 'Dynamics', 'Simulation'],
    description: 'Redesigned double-wishbone suspension system for improved ride comfort and handling. Performed dynamic analysis and road testing to validate performance improvements.',
    tools: ['CATIA', 'Adams', 'MATLAB/Simulink', 'LabVIEW'],
    outcomes: [
      'Improved ride comfort by 35% based on passenger feedback',
      'Enhanced cornering stability by 28%',
      'Reduced unsprung mass by 15%',
      'Successfully tested on 10,000+ km road trials'
    ],
    pdfUrl: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Industrial Robot Gripper Mechanism',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
      'https://images.unsplash.com/photo-1563207153-f403bf289096?w=1200&q=80',
      'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=1200&q=80'
    ],
    tags: ['Robotics', 'Automation', 'Mechatronics'],
    description: 'Developed an adaptive gripper mechanism for industrial robots capable of handling objects of varying shapes and sizes. Integrated force sensors and pneumatic actuation for precise control.',
    tools: ['SolidWorks', 'Arduino', 'Python', 'Fusion 360'],
    outcomes: [
      'Achieved 99.5% pick-and-place accuracy',
      'Reduced cycle time by 40%',
      'Handled objects ranging from 50g to 5kg',
      'Implemented in 3 production lines'
    ],
    pdfUrl: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Heat Exchanger Thermal Analysis',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=80'
    ],
    tags: ['Thermal Engineering', 'CFD', 'Energy Systems'],
    description: 'Designed and optimized a shell-and-tube heat exchanger for industrial cooling applications. Performed CFD analysis to maximize heat transfer efficiency while minimizing pressure drop.',
    tools: ['ANSYS Fluent', 'SolidWorks', 'MATLAB', 'Excel'],
    outcomes: [
      'Increased heat transfer efficiency by 32%',
      'Reduced pressure drop by 18%',
      'Achieved 95% effectiveness rating',
      'Annual energy savings of $50,000'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: '3D Printed Prosthetic Hand',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80'
    ],
    tags: ['Biomedical', '3D Printing', 'Product Design'],
    description: 'Designed an affordable, customizable prosthetic hand using additive manufacturing. Incorporated tendon-driven mechanism for natural finger movement and grip functionality.',
    tools: ['Fusion 360', 'Cura', 'Arduino', 'SolidWorks'],
    outcomes: [
      'Reduced production cost by 85% compared to traditional prosthetics',
      'Achieved 6 different grip patterns',
      'Weight reduced to 450g for improved comfort',
      'Helped 15+ patients in pilot program'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Wind Turbine Blade Structural Analysis',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80',
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80'
    ],
    tags: ['Renewable Energy', 'Composite Materials', 'FEA'],
    description: 'Performed structural analysis and optimization of 45-meter wind turbine blades using composite materials. Evaluated fatigue life and aerodynamic performance under various wind conditions.',
    tools: ['ANSYS', 'CATIA', 'MATLAB', 'Bladed'],
    outcomes: [
      'Extended blade lifespan by 25 years',
      'Improved energy capture efficiency by 12%',
      'Reduced material costs by 20%',
      'Withstood wind speeds up to 70 m/s in testing'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'CNC Machine Tool Path Optimization',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80'
    ],
    tags: ['Manufacturing', 'CNC', 'Optimization'],
    description: 'Developed optimized tool paths for 5-axis CNC machining operations. Implemented algorithms to minimize machining time while maintaining surface finish quality and tool life.',
    tools: ['Mastercam', 'Python', 'MATLAB', 'G-code'],
    outcomes: [
      'Reduced machining time by 35%',
      'Improved surface finish quality by 40%',
      'Extended tool life by 50%',
      'Saved $120,000 annually in production costs'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Drone Frame Design & Testing',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1200&q=80'
    ],
    tags: ['Aerospace', 'Lightweight Design', 'Testing'],
    description: 'Designed a lightweight carbon fiber drone frame for aerial photography applications. Conducted vibration analysis and flight testing to ensure stability and payload capacity.',
    tools: ['SolidWorks', 'ANSYS', 'MATLAB', 'ArduPilot'],
    outcomes: [
      'Achieved 45-minute flight time with 2kg payload',
      'Reduced frame weight to 380g',
      'Withstood 15 m/s wind speeds',
      'Successfully completed 200+ test flights'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Gearbox Design for Electric Vehicle',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80'
    ],
    tags: ['Electric Vehicles', 'Powertrain', 'Gear Design'],
    description: 'Designed a compact single-speed gearbox for electric vehicle applications. Optimized gear geometry for efficiency, noise reduction, and thermal management.',
    tools: ['KISSsoft', 'SolidWorks', 'ANSYS', 'Romax'],
    outcomes: [
      'Achieved 97% transmission efficiency',
      'Reduced noise levels by 15 dB',
      'Compact design saved 30% space',
      'Tested for 100,000 km durability'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Pressure Vessel Design & Certification',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80'
    ],
    tags: ['Pressure Vessels', 'ASME', 'Safety Engineering'],
    description: 'Designed a 10,000-liter pressure vessel for chemical processing industry. Ensured compliance with ASME Section VIII standards and performed comprehensive stress analysis.',
    tools: ['SolidWorks', 'ANSYS', 'PV Elite', 'AutoCAD'],
    outcomes: [
      'ASME U-stamp certification achieved',
      'Operating pressure: 150 bar',
      'Safety factor of 4:1 maintained',
      'Passed hydrostatic testing at 225 bar'
    ],
    pdfUrl: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedProjects() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Deleting existing projects...');
    const deleteResult = await Project.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} projects`);

    console.log('Adding new projects...');
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Successfully added ${insertedProjects.length} projects!`);

    console.log('\nProjects added:');
    insertedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (Featured: ${project.featured})`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed. Seeding complete!');
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
