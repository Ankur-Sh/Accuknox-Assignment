import React, { useState } from 'react';
import Widget from './Widget';

function Category({ category, onAddWidget, onRemoveWidget, searchTerm }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const filteredWidgets = category.widgets.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <h3>{category.name}</h3>

      <input
        placeholder="Widget Name"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      <input
        placeholder="Widget Text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />
      <button onClick={() => {
        onAddWidget({ name: widgetName, text: widgetText });
        setWidgetName('');
        setWidgetText('');
      }}>
        + Add Widget
      </button>

      {filteredWidgets.map(widget => (
        <Widget key={widget.id} widget={widget} onRemove={() => onRemoveWidget(widget.id)} />
      ))}
    </div>
  );
}

export default Category;
