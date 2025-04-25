import React, { useState } from 'react';

function AdminsPage() {
  const [id, setId] = useState(''); // State to hold the input ID
  const [scores, setScores] = useState(null); // State to hold scores data
  const [error, setError] = useState(''); // State for error messages
  const [editedScores, setEditedScores] = useState({}); // State to track edited DFAC scores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setScores(null); // Clear previous scores
    setEditedScores({}); // Clear the edited scores state

    try {
      const response = await fetch('http://localhost:5000/get-scoring-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the ID to the backend
      });

      const data = await response.json();
      if (response.status === 200 && data.success) {
        setScores(data.scores); // Set scores data from the response
      } else {
        setError(data.message || 'No data found for the provided ID.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleDFACScoreChange = (part, table, value) => {
    // Update the edited DFAC scores state
    setEditedScores((prev) => ({
      ...prev,
      [part]: {
        ...prev[part],
        [table]: value,
      },
    }));
  };

  const handleSaveScores = async () => {
    try {
      const updatedScores = Object.entries(editedScores).map(([part, tables]) => ({
        part,
        tables: Object.entries(tables).map(([table, dfacScore]) => ({
          table,
          dfacScore: Number(dfacScore), // Ensure the score is a number
        })),
      }));

      const response = await fetch('http://localhost:5000/update-dfac-scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updatedScores }), // Send updated scores to the backend
      });

      const data = await response.json();
      if (response.status === 200 && data.success) {
        alert('DFAC scores updated successfully.');
        // Refresh the scores table after saving
        handleSubmit(new Event('submit'));
      } else {
        setError(data.message || 'Failed to update DFAC scores.');
      }
    } catch (err) {
      setError('An error occurred while updating scores. Please try again later.');
    }
  };

  return (
    <div className="admins-page">
      <h1>Admin Dashboard</h1>
      <p>Enter an ID to fetch scores:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)} // Update the ID state
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>

      {/* Display scores in a table if available */}
      {scores && (
        <div className="scores-table">
          <h2>Scores for ID: {id}</h2>
          {Object.keys(scores).map((part) => (
            <div key={part}>
              <h3>{part}</h3>
              {part === 'Part A' ? (
                // Special handling for Part A, which doesn't have tables
                <div>
                  <p>Self Score: {scores[part].selfScore}</p>
                  <p>
                    DFAC Score:{' '}
                    <input
                      type="number"
                      value={
                        editedScores[part]?.['Overall'] !== undefined
                          ? editedScores[part]['Overall']
                          : scores[part].dfacScore
                      }
                      onChange={(e) =>
                        handleDFACScoreChange(part, 'Overall', e.target.value)
                      }
                    />
                  </p>
                </div>
              ) : (
                // For other parts with tables
                <table border="1">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Self Score</th>
                      <th>DFAC Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(scores[part]).map((table) => (
                      <tr key={table}>
                        <td>{table}</td>
                        <td>{scores[part][table].selfScore}</td>
                        <td>
                          <input
                            type="number"
                            value={
                              editedScores[part]?.[table] !== undefined
                                ? editedScores[part][table]
                                : scores[part][table].dfacScore
                            }
                            onChange={(e) =>
                              handleDFACScoreChange(part, table, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
          <button onClick={handleSaveScores}>Save DFAC Scores</button>
        </div>
      )}
    </div>
  );
}

export default AdminsPage;