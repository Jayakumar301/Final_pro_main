import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

function PartFAssistantProfessor({ openTab }) {
  const navigate = useNavigate();

  const [rows, setRows] = useState(
    Array(20).fill({ performance: '', score: 0, dfac: '' })
  );

  const [profileId, setProfileId] = useState(''); // State to store profile ID

  const handlePerformanceChange = (index, event) => {
    const newRows = [...rows];
    const performance = event.target.value;
    let score = 0;

    switch (performance) {
      case 'Outstanding':
        score = 10;
        break;
      case 'Excellent':
        score = 9;
        break;
      case 'Very Good':
        score = 8;
        break;
      case 'Good':
        score = 7;
        break;
      case 'Average':
        score = 6;
        break;
      case 'Poor':
        score = 5;
        break;
      default:
        score = 0;
    }

    newRows[index] = { ...newRows[index], performance, score };
    setRows(newRows);
  };

  const handleDfacChange = (index, event) => {
    const newRows = [...rows];
    newRows[index].dfac = event.target.value;
    setRows(newRows);
  };

  const finishForm = () => {
    alert('Form Submitted!');
    navigate('/reports'); // Redirect to login page after form submission
  };

  useEffect(() => {
    const fetchProfileId = async () => {
      try {
        const savedProfile = JSON.parse(localStorage.getItem('profile'));
        if (savedProfile && savedProfile.id) {
          const response = await axios.get(`http://localhost:5000/get-profile-id?id=${savedProfile.id}`);
          if (response.status === 200) {
            setProfileId(response.data.id);
          }
        }
      } catch (error) {
        console.error('Error fetching profile ID:', error);
      }
    };

    fetchProfileId();
  }, []);

  const handleSave = async () => {
    const partFData = { 

        id: profileId,
        rows 
      };
    try {
      const response = await axios.post('http://localhost:5000/save-partf-data', partFData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
    }
  };

  return (
    <div className='parts'>
      <h5>Annual Confidential Report to be filled in by the HOD for Assistant Professor</h5>
      <p>This is Part F content for Assistant Professor.</p>

      <fieldset>
        <legend>
        <p>Outstanding= 10; Excellent=9; Very Good=8; Good = 7; Average=6; Poor = 5</p>
        </legend>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Faculty Attributes</th>
              <th>Performance</th>
              <th>Score</th>
              <th>DFAC</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Motivational levels as a teacher',
              'Intellectual abilities',
              'Works hard',
              'Adequacy of Domain Knowledge',
              'Ability to learn about related topics quickly and deliver',
              'Voracious reader of technical papers/Books',
              'Working in a group',
              'Working Solo',
              'General Disposition towards students',
              'General Disposition towards colleagues',
              'General Disposition towards superiors',
              'Welcomes to shoulder additional responsibilities',
              'Initiative',
              'Emotionally attached to the college and takes pride in the college',
              'Punctuality',
              'Methodical and organized',
              'Made for teaching',
              'R&D orientation',
              'Understanding of Outcome based education',
              'Corrects oneself upon advise'
            ].map((attribute, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{attribute}</td>
                <td>
                  <select
                    value={rows[index].performance}
                    onChange={(event) => handlePerformanceChange(index, event)}
                  >
                    <option value="">Select Performance</option>
                    <option value="Outstanding">Outstanding</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </td>
                <td><input type="text" value={rows[index].score} readOnly /></td>
                <td>
                  <input
                    type="text"
                    value={rows[index].dfac}
                    onChange={(event) => handleDfacChange(index, event)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">Total marks</td>
              <td colSpan="3"><input type="text"/></td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <p>1. Quantitative conversion of qualitative parameters is done to help categorize faculty. These points do not add to the CAS parts 1 -4.</p>
      <p>2. Pen Picture of officer with recommendation of suitability of faculty to draw increment or/ and getting promotion may be given. Adverse remarks if any have to be justified with proof</p>
      <p>3. Grand Total of above: ____________________________ Signature of HOD with stamp:</p>
      <p>Forwarded to Establishment.: Any remarks in service record (mention date) to be inserted by Establishment Section & signed.</p>
      <p>Principal’s Remarks:</p>

      <button type="button" onClick={() => openTab('Part-E')}>Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={handleSave} style={{ backgroundColor: '#2896a7' }}>Save</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={finishForm}>Finish</button>
    </div>
  );
}

export default PartFAssistantProfessor;