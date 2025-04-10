import React from 'react';

function PartCProfessor({ openTab }) {
  return (
    <div>
      <h5>Co-Curricular Teaching& Learning Process of Professor</h5>
      <p>This is Part C content for Professor.</p>
      <button type="button" onClick={() => openTab('Part-B')} className="btn btn-secondary">Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-D')}>Next</button>
    </div>
  );
}

export default PartCProfessor;