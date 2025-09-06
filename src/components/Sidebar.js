import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget } from '../store/dashboardSlice';

function Sidebar({ isOpen, onClose }) {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAdd = () => {
    if (selectedCategoryId && widgetName.trim() && widgetText.trim()) {
      dispatch(addWidget({
        categoryId: selectedCategoryId,
        widget: { name: widgetName, text: widgetText }
      }));
      setWidgetName('');
      setWidgetText('');
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: isOpen ? 0 : '-400px',
      width: '300px',
      height: '100%',
      background: '#fff',
      boxShadow: '-3px 0 5px rgba(0,0,0,0.2)',
      transition: 'right 0.3s ease',
      padding: '20px',
      zIndex: 1000
    }}>
      <button onClick={onClose} style={{ marginBottom: '20px' }}>Close</button>

      <h3>Add New Widget</h3>

      <label>Category</label>
      <select
        value={selectedCategoryId || ''}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <textarea
        placeholder="Widget Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <button onClick={handleAdd} style={{ width: '100%' }}>Add Widget</button>
    </div>
  );
}

export default Sidebar;
