import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState, removeWidget, addWidget } from '../store/dashboardSlice';
import Sidebar from './Sidebar';
import '../App.css';

function Dashboard() {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/dashboard.json')
      .then(response => response.json())
      .then(data => dispatch(setInitialState(data.categories)))
      .catch(err => console.error(err));
  }, [dispatch]);

  const openAddWidgetModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const handleAddWidget = () => {
    if (widgetName.trim() && widgetText.trim()) {
      dispatch(addWidget({
        categoryId: selectedCategoryId,
        widget: { name: widgetName, text: widgetText }
      }));
      setWidgetName('');
      setWidgetText('');
      setShowModal(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>CNAPP Dashboard</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setIsSidebarOpen(true)}>Add Widget +</button>
      </div>

      {categories.map(category => (
        <div key={category.id} className="category-card">
          <h2>{category.name}</h2>
          <div className="widgets-grid">
            {category.widgets
              .filter(widget =>
                widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                widget.text.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(widget => (
                <div key={widget.id} className="widget">
                  <h4>{widget.name}</h4>
                  <p>{widget.text}</p>
                  <button onClick={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}>
                    Remove
                  </button>
                </div>
              ))
            }

            <div
              className="widget add-widget"
              onClick={() => openAddWidgetModal(category.id)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <p style={{ textAlign: 'center', color: '#666' }}>+ Add Widget</p>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h3>Add New Widget</h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
            <textarea
              placeholder="Widget Text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleAddWidget}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}

export default Dashboard;
