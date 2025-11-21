'use client';

import { useState, useEffect, useRef } from 'react';

interface Project {
  _id?: string;
  title: string;
  image: string;
  images: string[];
  tags: string[];
  description: string;
  tools: string[];
  outcomes: string[];
  pdfUrl?: string;
  featured?: boolean;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [formData, setFormData] = useState<Project>({
    title: '',
    image: '',
    images: [],
    tags: [],
    description: '',
    tools: [],
    outcomes: [],
    pdfUrl: '',
    featured: false,
  });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        console.log('Fetched projects:', data.data.map((p: Project) => ({ title: p.title, featured: p.featured })));
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProject?._id 
        ? `/api/projects/${editingProject._id}`
        : '/api/projects';
      
      const method = editingProject?._id ? 'PUT' : 'POST';

      // Ensure featured is explicitly set as boolean
      const dataToSend = {
        ...formData,
        featured: formData.featured === true,
      };

      console.log('Submitting project - featured value:', dataToSend.featured);

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingProject?._id ? 'Project updated!' : 'Project created!');
        fetchProjects();
        resetForm();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error saving project');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        alert('Project deleted!');
        fetchProjects();
      }
    } catch (error) {
      alert('Error deleting project');
      console.error(error);
    }
  };

  // Edit project
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    // Ensure featured has a boolean value
    const featuredValue = project.featured === true;
    console.log('Editing project:', project.title, 'Featured:', project.featured, 'Converted to:', featuredValue);
    setFormData({
      ...project,
      featured: featuredValue,
    });
    setIsEditing(true);
    
    // Scroll to form smoothly after state updates
    setTimeout(() => {
      formRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      images: [],
      tags: [],
      description: '',
      tools: [],
      outcomes: [],
      pdfUrl: '',
      featured: false,
    });
    setEditingProject(null);
    setIsEditing(false);
  };

  // Handle file upload
  const handleFileUpload = async (file: File, type: 'image' | 'pdf' | 'gallery') => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        if (type === 'image') {
          setFormData(prev => ({ ...prev, image: data.url }));
        } else if (type === 'pdf') {
          setFormData(prev => ({ ...prev, pdfUrl: data.url }));
        } else if (type === 'gallery') {
          setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
        }
        alert('File uploaded successfully!');
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      alert('Error uploading file');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Add item to array field
  const addArrayItem = (field: keyof Project, value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value.trim()],
    }));
  };

  // Remove item from array field
  const removeArrayItem = (field: keyof Project, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Project Management
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full sm:w-auto px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
        >
          {isEditing ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {/* Form */}
      {isEditing && (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6 sm:mb-8 p-3 sm:p-6 rounded-lg sm:rounded-xl w-full max-w-full overflow-x-hidden scroll-mt-4" style={{ background: 'var(--bg-secondary)' }}>
          <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--text-primary)' }}>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Main Image */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Main Image *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Paste image URL or upload file below"
                className="flex-1 p-3 rounded-lg"
                style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <label className="px-4 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2">
                <span>📤</span>
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'image');
                  }}
                />
              </label>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Paste a URL or upload an image from your computer (JPG, PNG, WEBP)
            </p>
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Gallery Images (Multiple)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="gallery-image"
                placeholder="Paste image URL or upload"
                className="flex-1 p-3 rounded-lg"
                style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('gallery-image') as HTMLInputElement;
                  addArrayItem('images', input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg"
              >
                Add URL
              </button>
              <label className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2">
                <span>📤</span>
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'gallery');
                  }}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('images', index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg"
              style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Tags, Tools, and Outcomes in Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="tag-input"
                  placeholder="Enter tag"
                  className="flex-1 p-3 rounded-lg"
                  style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('tag-input') as HTMLInputElement;
                    addArrayItem('tags', input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)' }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tags', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                Tools Used
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="tool-input"
                  placeholder="Enter tool"
                  className="flex-1 p-3 rounded-lg"
                  style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('tool-input') as HTMLInputElement;
                    addArrayItem('tools', input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg whitespace-nowrap"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    {tool}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tools', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Key Outcomes
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="outcome-input"
                placeholder="Enter outcome"
                className="flex-1 p-3 rounded-lg"
                style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('outcome-input') as HTMLInputElement;
                  addArrayItem('outcomes', input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {formData.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2 p-2 rounded" style={{ background: 'var(--bg-primary)' }}>
                  <span className="flex-1">{outcome}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('outcomes', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF and Featured in Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* PDF URL */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                PDF Documentation (Optional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  placeholder="Paste PDF URL or upload file"
                  className="flex-1 p-3 rounded-lg"
                  style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <label className="px-3 py-3 bg-red-600 text-white rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap">
                  <span>📄</span>
                  <span className="hidden sm:inline">{uploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'pdf');
                    }}
                  />
                </label>
              </div>
              {formData.pdfUrl && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ PDF attached: {formData.pdfUrl.split('/').pop()}
                </p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <div className="w-full p-4 rounded-lg" style={{ background: 'var(--bg-primary)', border: '2px solid var(--border)' }}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured === true}
                    onChange={(e) => {
                      console.log('Checkbox changed to:', e.target.checked);
                      setFormData({ ...formData, featured: e.target.checked });
                      console.log('FormData will be:', { ...formData, featured: e.target.checked });
                    }}
                    className="w-5 h-5 rounded cursor-pointer flex-shrink-0"
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  <div>
                    <span className="text-sm sm:text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                      ⭐ Featured Project
                    </span>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Show on homepage
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 w-full max-w-full">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-3"
            style={{ 
              background: 'var(--bg-secondary)', 
              boxShadow: '0 25px 50px var(--shadow)'
            }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
              />
              {project.featured === true && (
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-yellow-500 text-black backdrop-blur-sm shadow-lg">
                  ⭐ FEATURED
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs"
                    style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id!)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !isEditing && (
        <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-lg mb-4">No projects yet</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg font-semibold"
          >
            Create Your First Project
          </button>
        </div>
      )}
    </div>
  );
}
