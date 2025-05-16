import React, { useState, useRef, useEffect } from 'react';
import './ActionMenu.css'; // You'll style it later

function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="action-menu" ref={menuRef}>
      <button onClick={() => setOpen(prev => !prev)} className="three-dot-btn">⋮</button>
      {open && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={onView}>View</div>
          <div className="dropdown-item" onClick={onEdit}>Edit</div>
          <div className="dropdown-item" onClick={onDelete}>Delete</div>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
