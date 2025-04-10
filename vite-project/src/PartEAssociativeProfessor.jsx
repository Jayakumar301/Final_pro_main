import React from 'react';

function PartEAssociativeProfessor({ openTab }) {
  return (
    <div>
      <h5>Academic Administration,Institutional Duties and Extra Curricular Activities of Associative Professor</h5>
      <p>This is Part E content for Associative Professor.</p>
      <button type="button" onClick={() => openTab('Part-D')}>Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-F')}>Next</button>
    </div>
  );
}

export default PartEAssociativeProfessor;