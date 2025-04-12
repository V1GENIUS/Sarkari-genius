import React from 'react';

const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  spinner: {
    width: '50px',
    
    height: '50px',
    border: '4px solid rgba(60, 222, 19, 0.69)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};


const spinnerAnimation = document.createElement('style');
spinnerAnimation.innerHTML = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(spinnerAnimation);

export default LoadingSpinner;
