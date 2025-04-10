import React from 'react';

function PartBAssociativeProfessor({ openTab }) {
  return (
    <div>
      <h5>Curriculum - Teaching & Learning Process of Associative Professor</h5>
      <p>This is Part B content for Associative Professor.</p>
      <button type="button" onClick={() => openTab('Part-A')}>Previous</button>
          <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-C')}>Next</button>
    </div>
  );
}

export default PartBAssociativeProfessor;