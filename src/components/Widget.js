import React from 'react';

function Widget({ widget, onRemove }) {
  return (
    <div style={{ border: '1px solid lightgray', margin: '5px', padding: '5px' }}>
      <h4>{widget.name}</h4>
      <p>{widget.text}</p>
      <button onClick={onRemove}>❌</button>
    </div>
  );
}

export default Widget;
