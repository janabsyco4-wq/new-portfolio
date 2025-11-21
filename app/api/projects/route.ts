import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

// GET all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    // Ensure featured field exists (for backward compatibility)
    const projectsWithFeatured = projects.map(project => ({
      ...project.toObject(),
      featured: project.featured === true, // Convert null/undefined to false
    }));
    
    return NextResponse.json(
      { success: true, data: projectsWithFeatured },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export const revalidate = 60;

// POST create new project
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('POST - Received featured:', body.featured, 'Type:', typeof body.featured);
    
    const project = await Project.create(body);
    
    console.log('POST - Saved featured:', project.featured, 'Type:', typeof project.featured);
    
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
