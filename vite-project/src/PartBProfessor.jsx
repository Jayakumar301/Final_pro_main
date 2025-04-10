import React from 'react';

function PartBProfessor({ openTab }) {
  return (
    <div>
      <h5>Curriculum - Teaching & Learning Process of Professor</h5>
      <form>
        {/* Removed Research and Publications, Projects, and Conferences Attended sections */}
        <div className="tab-buttons">
          <button type="button" onClick={() => openTab('Part-A')}>Previous</button>
          <span style={{ margin: '0 10px' }}></span> {/* Gap */}
          <button type="button" onClick={() => openTab('Part-C')}>Next</button>
        </div>
      </form>
    </div>
  );
}

export default PartBProfessor;