import React from 'react';

function PartDAssociativeProfessor({ openTab }) {
  return (
    <div>
      <h5>R&D Related Contributions of Associative Professor</h5>
      <p>This is Part D content for Associative Professor.</p>
      <button type="button" onClick={() => openTab('Part-C')}>Previous</button>
          <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-E')}>Next</button>
    </div>
  );
}

export default PartDAssociativeProfessor;