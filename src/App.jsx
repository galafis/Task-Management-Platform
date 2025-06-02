import React, { useState, useEffect } from 'react'
import { Plus, Calendar, Clock, User, CheckCircle, Circle, Trash2, Edit3, Filter, Search } from 'lucide-react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Initialize with sample data
  useEffect(() => {
    const sampleProjects = [
      { id: 1, name: 'Website Redesign', color: '#3B82F6', description: 'Complete overhaul of company website' },
      { id: 2, name: 'Mobile App', color: '#10B981', description: 'Develop new mobile application' },
      { id: 3, name: 'Marketing Campaign', color: '#F59E0B', description: 'Q4 marketing initiatives' }
    ]

    const sampleTasks = [
      {
        id: 1,
        title: 'Design Homepage Mockup',
        description: 'Create wireframes and mockups for the new homepage design',
        projectId: 1,
        priority: 'high',
        status: 'in-progress',
        dueDate: '2024-01-15',
        assignee: 'John Doe',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Set up Development Environment',
        description: 'Configure React Native development environment',
        projectId: 2,
        priority: 'medium',
        status: 'completed',
        dueDate: '2024-01-10',
        assignee: 'Jane Smith',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Content Strategy Planning',
        description: 'Develop content calendar and strategy for Q4',
        projectId: 3,
        priority: 'low',
        status: 'todo',
        dueDate: '2024-01-20',
        assignee: 'Mike Johnson',
        createdAt: new Date().toISOString()
      }
    ]

    setProjects(sampleProjects)
    setTasks(sampleTasks)
  }, [])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'todo',
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
    setShowTaskForm(false)
  }

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    const newStatus = task.status === 'completed' ? 'todo' : 'completed'
    updateTask(taskId, { status: newStatus })
  }

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    }
    setProjects([...projects, newProject])
    setShowProjectForm(false)
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getProject = (projectId) => projects.find(p => p.id === projectId)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'todo': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Management Platform</h1>
              <p className="text-gray-600 mt-1">Organize your projects and boost productivity</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowProjectForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
              <div className="space-y-3">
                {projects.map(project => (
                  <div key={project.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">{tasks.filter(t => t.projectId === project.id).length} tasks</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-semibold">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">{tasks.filter(t => t.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-semibold text-blue-600">{tasks.filter(t => t.status === 'in-progress').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To Do</span>
                    <span className="font-semibold text-gray-600">{tasks.filter(t => t.status === 'todo').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Tasks
                  </button>
                  <button
                    onClick={() => setFilter('todo')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'todo' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    To Do
                  </button>
                  <button
                    onClick={() => setFilter('in-progress')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map(task => {
                const project = getProject(task.projectId)
                return (
                  <div key={task.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                              {task.status.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{task.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {project && (
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: project.color }}
                                ></div>
                                <span>{project.name}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Circle className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500">Create a new task to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          projects={projects}
          onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
          onClose={() => {
            setShowTaskForm(false)
            setEditingTask(null)
          }}
        />
      )}

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm
          onSubmit={addProject}
          onClose={() => setShowProjectForm(false)}
        />
      )}
    </div>
  )
}

// Task Form Component
function TaskForm({ task, projects, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    projectId: task?.projectId || projects[0]?.id || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    assignee: task?.assignee || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({...formData, projectId: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({...formData, assignee: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {task ? 'Update' : 'Create'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Project Form Component
function ProjectForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App

