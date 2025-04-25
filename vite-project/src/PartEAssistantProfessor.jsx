import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function PartEAssistantProfessor({ openTab }) {
  const [dataAvailableTable1, setDataAvailableTable1] = useState(false);
  const [dataAvailableTable2, setDataAvailableTable2] = useState(false);
  const [dataAvailableTable3, setDataAvailableTable3] = useState(false);
  const [dataAvailableTable4, setDataAvailableTable4] = useState(false);
  const [dataAvailableTable5, setDataAvailableTable5] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [rows1, setRows1] = useState([
    { sNo: 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '' }
  ]);
  const [rows2, setRows2] = useState([
    { sNo: 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '', certificate: '' }
  ]);
  const [rows3, setRows3] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);
  const [rows4, setRows4] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);
  const [rows5, setRows5] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);


  const handleDataAvailableChangeTable3 = (event) => {
    setDataAvailableTable3(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable4 = (event) => {
    setDataAvailableTable4(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable5 = (event) => {
    setDataAvailableTable5(event.target.value === 'Yes');
  };
  

  const handleAddRow1 = () => {
    // Calculate the current self-score
    const totalScore1 = rows1.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );
  
    // Check if the current self-score is 40 or more
    if (totalScore1 >= 40) {
      alert("Maximum self-score of 40 reached. Cannot add more rows.");
      return; // Prevent adding a new row
    }
  
    // Add a new row with default values
    const newRow = {
      sNo: rows1.length + 1, // Increment S.No.
      activity: '',          // Default value for Activity
      sem1: '',              // Default value for SEM-I
      sem2: '',              // Default value for SEM-II
      totalNumber: '',       // Default value for Total Number
      dfac: ''               // Default value for DFAC
    };
  
    setRows1([...rows1, newRow]); // Update the rows state with the new row
  };

  const handleAddRow2 = () => {
    // Calculate the current self-score
    const totalScore2 = rows2.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );
  
    // Check if the current self-score is 20 or more
    if (totalScore2 >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
    }
  
    // Add a new row with default values
    const newRow = {
      sNo: rows2.length + 1, // Increment S.No.
      activity: '',          // Default value for Activity
      sem1: '',              // Default value for SEM-I
      sem2: '',              // Default value for SEM-II
      totalNumber: '',       // Default value for Total Number
      dfac: '',              // Default value for DFAC
      certificate: ''        // Default value for Certificate
    };
  
    setRows2([...rows2, newRow]); // Update the rows state with the new row
  };


  const handleDeleteRow1 = (index) => {
    const newRow = rows1.filter((row, i) => i !== index);
    setRows1(newRow);
  };

  const handleDeleteRow2 = (index) => {
    const newRow = rows2.filter((row, i) => i !== index);
    setRows2(newRow);
  };

  const handleAddRow3 = () => {
    // Calculate the current self-score
    const totalScore3 = rows3.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );

    // Check if the current self-score is 30 or more
    if (totalScore3 >= 30) {
      alert("Maximum self-score of 30 reached. Cannot add more rows.");
      return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
      sNo: rows3.length + 1, // Increment S.No.
      activity: '',          // Default value for Activity
      sem1: 0,               // Default value for SEM-I
      sem2: 0,               // Default value for SEM-II
      totalNumber: 0,        // Default value for Total Number
      dfac: '',              // Default value for DFAC
      certificate: ''        // Default value for Certificate
    };

    setRows3([...rows3, newRow]); // Update the rows state with the new row
  };


  const handleDeleteRow3 = (index) => {
    const newRow = rows3.filter((row, i) => i !== index);
    setRows3(newRow);
  };

  const handleAddRow4 = () => {
    // Calculate the current self-score
    const totalScore4 = rows4.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );
  
    // Check if the current self-score is 20 or more
    if (totalScore4 >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
    }
  
    // Add a new row with default values
    const newRow = {
      sNo: rows4.length + 1, // Increment S.No.
      activity: '',          // Default value for Activity
      sem1: 0,               // Default value for SEM-I
      sem2: 0,               // Default value for SEM-II
      totalNumber: 0,        // Default value for Total Number
      dfac: '',              // Default value for DFAC
      certificate: ''        // Default value for Certificate
    };
  
    setRows4([...rows4, newRow]); // Update the rows state with the new row
  };

  const handleDeleteRow4 = (index) => {
    const newRow = rows4.filter((row, i) => i !== index);
    setRows4(newRow);
  };

  const handleAddRow5 = () => {
    // Calculate the current self-score
    const totalScore5 = rows5.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );
  
    // Check if the current self-score is 50 or more
    if (totalScore5 >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
    }
  
    // Add a new row with default values
    const newRow = {
      sNo: rows5.length + 1, // Increment S.No.
      activity: '',          // Default value for Activity
      sem1: 0,               // Default value for SEM-I
      sem2: 0,               // Default value for SEM-II
      totalNumber: 0,        // Default value for Total Number
      dfac: '',              // Default value for DFAC
      certificate: ''        // Default value for Certificate
    };
  
    setRows5([...rows5, newRow]); // Update the rows state with the new row
  };

  const handleDeleteRow5 = (index) => {
    const newRow = rows5.filter((row, i) => i !== index);
    setRows5(newRow);
  };

  


  const [isCoordinatorTable3, setIsCoordinatorTable3] = useState("No"); // Default to "No"

  const handleCoordinatorChangeTable3 = (event) => {
    setIsCoordinatorTable3(event.target.value);
  };


  const handleActivityChangeTable3 = (index, event) => {
    const newRow = [...rows3];
    newRow[index].activity = event.target.value;
  
    // Base score calculation
    const baseScore = isCoordinatorTable3 === "Yes" ? 5 : 2.5; // 5 points if Coordinator, 2.5 otherwise
    const totalScore = baseScore * 2;
  
    newRow[index].sem1 = baseScore;
    newRow[index].sem2 = baseScore;
    newRow[index].totalNumber = totalScore;
  
    setRows3(newRow);
  };

  const calculateSelfScoreTable3 = () => {
    if (rows3.length === 0) return 0;
  
    // Calculate the total score by summing up all "Total Number" values
    const totalScore = rows3.reduce(
      (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
      0
    );
  
    // Cap the score at 30
    const cappedScore = Math.min(totalScore, 30);
  
    return cappedScore.toFixed(2); // Return the score with 2 decimal places
  };

  const handleActivityChangeTable4 = (index, event) => {
    const newRow = [...rows4];
    newRow[index].activity = event.target.value;
  
    // Calculate scores based on activity
    const score = event.target.value.includes('Coordinator') ? 5 : 5;
    newRow[index].sem1 = score;
    newRow[index].sem2 = score;
    newRow[index].totalNumber = score * 2;
  
    setRows4(newRow);
  };


  const [dfacScoreTable1 ] = useState(0);
  const [dfacScoreTable2 ] = useState(0);
  const [dfacScoreTable3 ] = useState(0);
  const [dfacScoreTable4 ] = useState(0);
  const [dfacScoreTable5 ] = useState(0);


  const calculateSelfScoreTable4 = () => {
    return rows4.reduce((total, row) => total + (parseInt(row.totalNumber) || 0), 0);
  };


  const handleCertificateChangeTable5 = (index, event) => {
    const newRow = [...rows5];
    newRow[index].certificate = event.target.files[0];
    setRows5(newRow);
  };

  const calculateSelfScoreTable5 = () => {
    // Calculate the total score by summing up all "Total Number" values
    const totalScore = rows5.reduce((total, row) => total + (parseInt(row.totalNumber) || 0), 0);
  
    // Cap the score at 20
    return Math.min(totalScore, 20); // Return the score, capped at 20
  };
   

  const handleCertificateChangeTable2 = (index, event) => {
    const newRow = [...rows2];
    newRow[index].certificate = event.target.files[0];
    setRows2(newRow);
  };

  
  const handleCertificateChangeTable3 = (index, event) => {
    const newRow = [...rows3];
    newRow[index].certificate = event.target.files[0];
    setRows3(newRow);
  };

  const handleCertificateChangeTable4 = (index, event) => {
    const newRow = [...rows4];
    newRow[index].certificate = event.target.files[0];
    setRows4(newRow);
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



const handleDataAvailableChangeTable1 = (event) => {
  setDataAvailableTable1(event.target.value === 'Yes');
};

const calculateSelfScoreTable1 = () => {
  if (rows1.length === 0) return 0;
  // Calculate the total score by summing up all "Total Number" values
  const totalScore = rows1.reduce(
    (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
    0
  );

  // Cap the score at 100
  const cappedScore = Math.min(totalScore, 100);

  return cappedScore.toFixed(2); // Return the score with 2 decimal places
};

const [isCoordinator1, setIsCoordinator1] = useState("No"); // Default to "No"

const handleCoordinatorChangeTable1 = (event) => {
  setIsCoordinator1(event.target.value);
};


const handleCertificateChangeTable1 = (index, event) => {
  const file = event.target.files[0]; // Get the selected file
  const newRow = [...rows1]; // Make a copy of the rows1 state
  newRow[index].certificate = file; // Update the certificate field for the specific row
  setRows1(newRow); // Update the state with the modified rows
};

const handleActivityChangeTable1 = (index, event) => {
  const newRow = [...rows1];
  newRow[index].activity = event.target.value;

  // Base score calculation
  const baseScore = 2.5; // Each activity/sem = 2.5 points
  const semScore = isCoordinator1 === "Yes" ? baseScore : baseScore / 2; // 100% if Coordinator, 50% otherwise
  const totalScore = semScore * 2;

  newRow[index].sem1 = semScore;
  newRow[index].sem2 = semScore;
  newRow[index].totalNumber = totalScore;

  setRows1(newRow);
};

const handleDataAvailableChangeTable2 = (event) => {
  setDataAvailableTable2(event.target.value === 'Yes');
};

const calculateSelfScoreTable2 = () => {
  if (rows2.length === 0) return 0;
  // Calculate the total score by summing up all "Total Number" values
  const totalScore = rows2.reduce(
    (acc, row) => acc + (parseFloat(row.totalNumber) || 0),
    0
  );

  // Cap the score at 20
  const cappedScore = Math.min(totalScore, 20);

  return cappedScore.toFixed(2); // Return the score with 2 decimal places
};

const [isCoordinator2, setIsCoordinator2] = useState("No"); // Default to "No"

const handleCoordinatorChangeTable2 = (event) => {
  setIsCoordinator2(event.target.value);
};

  const handleActivityChangeTable2 = (index, event) => {
    const newRow = [...rows2];
    newRow[index].activity = event.target.value;

    // Base score calculation
    const baseScore = 5; // Each activity/sem = 5 points
    const semScore = isCoordinator2 === "Yes" ? baseScore : baseScore / 2; // 100% if Coordinator, 50% otherwise
    const totalScore = semScore * 2;

    newRow[index].sem1 = semScore;
    newRow[index].sem2 = semScore;
    newRow[index].totalNumber = totalScore;

    setRows2(newRow);
  };


  const [isCoordinator5, setIsCoordinator5] = useState("No"); // Default to "No"

const handleCoordinatorChangeTable5 = (event) => {
  setIsCoordinator5(event.target.value);
};


const handleActivityChangeTable5 = (index, event) => {
  const newRow = [...rows5];
  newRow[index].activity = event.target.value;

  // Base score calculation
  const baseScore = 5; // Each activity/sem = 5 points
  const semScore = isCoordinator5 === "Yes" ? baseScore : baseScore / 2; // 100% if Coordinator, 50% otherwise
  const totalScore = semScore * 2;

  newRow[index].sem1 = semScore;
  newRow[index].sem2 = semScore;
  newRow[index].totalNumber = totalScore;

  setRows5(newRow);
};



  const handleSave = async () => {
    const partEData = {
      id: profileId,
      rows1: {
        data: rows1,
        selfScore: calculateSelfScoreTable1(),
        dfacScore: dfacScoreTable1,
      },
      rows2: {
        data: rows2,
        selfScore: calculateSelfScoreTable2(),
        dfacScore: dfacScoreTable2,
      },
      rows3: {
        data: rows3,
        selfScore: calculateSelfScoreTable3(),
        dfacScore: dfacScoreTable3,
      },
      rows4: {
        data: rows4,
        selfScore: calculateSelfScoreTable4(),
        dfacScore: dfacScoreTable4,
      },
      rows5: {
        data: rows5,
        selfScore: calculateSelfScoreTable5(),
        dfacScore: dfacScoreTable5,
      },
    };

    try {
      const response = await axios.post('http://localhost:5000/save-parte-data', partEData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };
  
  return (
    <div className='parts'>
      <h2> Academic,Institutional and Extra Curricular Activities </h2>
     
      {/* Table 1 */}
      <fieldset>
        <legend>
          <h5>
            Academic Administration, Institutional duties and extracurricular activities And
            social responsibility – Asst.Profs.
          </h5>
        </legend>
        <h6>Maximum API Score: 100 (Over previous two semesters)</h6>
        <p>
          Each activity = 5 points : 2.5 points per sem; Coordinator = 100%; others = 50%.
          All activities to be supported by documentary proof certified by HOD.
        </p>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable1}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable1 && (
          <div>
            {/* Ask if the user is a Coordinator */}
            <label>Are you a Coordinator?</label>
            <select onChange={handleCoordinatorChangeTable1}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>SEM-I</th>
                    <th>SEM-II</th>
                    <th>Total number</th>
                    <th>Certificate (less than 100kB)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows1.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select
                          value={row.activity}
                          onChange={(event) => handleActivityChangeTable1(index, event)}
                        >
                          <option value="">Select Activity</option>
                          <option value="In-charge of time tables">In-charge of time tables</option>
                          <option value="Attendance in-charge">Attendance in-charge</option>
                          <option value="Internal marks in-charge">Internal marks in-charge</option>
                          <option value="Mini / Major Project Coordinator/Review Members">
                            Mini / Major Project Coordinator/Review Members
                          </option>
                          <option value="Exams In-charge">Exams In-charge</option>
                          <option value="Library in-charge">Library in-charge</option>
                          <option value="Lab In-charge">Lab In-charge</option>
                          <option value="Discipline(class teacher)">Discipline(class teacher)</option>
                          <option value="Professional Society Related Coordinators">
                            Professional Society Related Coordinators
                          </option>
                          <option value="Module / Course Coordinator">Module / Course Coordinator</option>
                          <option value="Departmental R&D Coordinator">
                            Departmental R&D Coordinator
                          </option>
                          <option value="Media Coordinator">Media Coordinator</option>
                          <option value="Departmental News Letter Editor/Members">
                            Departmental News Letter Editor/Members
                          </option>
                          <option value="ISO (Coordinator)">ISO (Coordinator)</option>
                          <option value="TEQIP Coordinator">TEQIP Coordinator</option>
                          <option value="Alumni Coordinator">Alumni Coordinator</option>
                          <option value="NBA/NAAC Participation">NBA/NAAC Participation</option>
                          <option value="Grievance cell">Grievance cell</option>
                          <option value="Anti-ragging Committee">Anti-ragging Committee</option>
                          <option value="Vigilance">Vigilance</option>
                          <option value="Programme Coordinator">Programme Coordinator</option>
                          <option value="Answer script in-charge">Answer script in-charge</option>
                          <option value="Induction day">Induction day</option>
                          <option value="Farewell day">Farewell day</option>
                          <option value="Any Other">Any Other</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={row.sem1} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.sem2} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.totalNumber} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChangeTable1(index, event)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow1(index)}>Delete Row</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow1}
                style={{ width: "100%", marginTop: "10px" }}
              >
                Add Row
              </button>

              {/* Self Score */}
              <div style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScoreTable1()} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScoreTable1} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {/* Table 2 */}
      <fieldset>
        <legend>
          <h5>Institutional level administration (Each activity/sem = 5 points)</h5>
        </legend>
        <h6>Coordinator=100%; others=50%</h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable2}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable2 && (
          <div>
            {/* Ask if the user is a Coordinator */}
            <label>Are you a Coordinator?</label>
            <select onChange={handleCoordinatorChangeTable2}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>SEM-I</th>
                    <th>SEM-II</th>
                    <th>Total number</th>
                    <th>Certificate (less than 100kB)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows2.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select
                          value={row.activity}
                          onChange={(event) => handleActivityChangeTable2(index, event)}
                        >
                          <option value="">Select Activity</option>
                          <option value="NBA Participation">NBA Participation</option>
                          <option value="NAAC">NAAC</option>
                          <option value="Autonomous/Examination Section">Autonomous/Examination Section</option>
                          <option value="R&D Committee Member/Paper Incentive Member">R&D Committee Member/Paper Incentive Member</option>
                          <option value="Maintenance of Central facilities">Maintenance of Central facilities</option>
                          <option value="Career Guidance Cell">Career Guidance Cell</option>
                          <option value="Grievance cell anti ragging">Grievance cell anti ragging</option>
                          <option value="ISO Co-ordinator">ISO Co-ordinator</option>
                          <option value="Any other such as Hostel Warden etc.">Any other such as Hostel Warden etc.</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={row.sem1} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.sem2} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.totalNumber} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChangeTable2(index, event)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow2(index)}>Delete Row</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow2}
                style={{ width: '100%', marginTop: '10px' }}
              >
                Add Row
              </button>

              {/* Self-Score and DFAC Score */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScoreTable2()} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScoreTable2} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {/* Table 3 */}
      <fieldset>
        <legend>
          <h5>Institutional Events Organization members, Sports Participants (Each activity = 5 Points)</h5>
        </legend>
        <h6>*Coordinator = 5 points per SEM; Others = 2.5 points per SEM</h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable3}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable3 && (
          <div>
            {/* Ask if the user is a Coordinator */}
            <label>Are you a Coordinator?</label>
            <select onChange={handleCoordinatorChangeTable3}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>SEM-I</th>
                    <th>SEM-II</th>
                    <th>Total number</th>
                    <th>Certificate (less than 100kB)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows3.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select
                          value={row.activity}
                          onChange={(event) => handleActivityChangeTable3(index, event)}
                        >
                          <option value="">Select Activity</option>
                          <option value="BECTAGON">BECTAGON</option>
                          <option value="Engineer’s Day">Engineer’s Day</option>
                          <option value="Cultural activities">Cultural activities</option>
                          <option value="Sports participation">Sports participation</option>
                          <option value="Any Other as approved by Chairman CAS and by Principal approved">
                            Any Other as approved by Chairman CAS and by Principal approved
                          </option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={row.sem1} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.sem2} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.totalNumber} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChangeTable3(index, event)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow3(index)}>Delete Row</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow3}
                style={{ width: '100%', marginTop: '10px' }}
              >
                Add Row
              </button>

              {/* Self-Score and DFAC Score */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScoreTable3()} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScoreTable3} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {/* Table 4 */}
        <fieldset>
          <legend><h5>NSS / NCC / Other Service activities Max Score 20 (Each activity = 5 points)</h5></legend>
          <label>Is data available?</label>
          <select onChange={handleDataAvailableChangeTable4}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {dataAvailableTable4 && (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>SEM-I</th>
                    <th>SEM-II</th>
                    <th>Total number</th>
                    <th>Certificate (less than 100kB)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows4.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select value={row.activity} onChange={(event) => handleActivityChangeTable4(index, event)}>
                          <option value="">Select Activity</option>
                          <option value="NCC / NSS activities">NCC / NSS activities</option>
                          <option value="NSS/ NCC Coordinator">NSS/ NCC Coordinator</option>
                          <option value="Women grievance cell activities">Women grievance cell activities</option>
                          <option value="Health camps">Health camps</option>
                          <option value="Blood camps">Blood camps</option>
                          <option value="Service to poor">Service to poor</option>
                          <option value="Service to Disabled">Service to Disabled</option>
                          <option value="Charity camps etc.">Charity camps etc.</option>
                          <option value="Any Other as approved by Chairman CAS and by Principal approved">Any Other as approved by Chairman CAS and by Principal approved</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={row.sem1} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.sem2} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.totalNumber} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChangeTable4(index, event)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow4(index)}>Delete Row</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow4} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
              
              {/* Self Score and DFAC Score Below the Table */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScoreTable4()} // Automatically calculate self-score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScoreTable4} // Display DFAC score
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </fieldset>

      {/* Table 5 */}
      <fieldset>
        <legend><h5>Training & other Misc. activities: Max Score 20</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable5}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable5 && (
          <div>
            {/* Ask if the user is a Coordinator */}
            <label>Are you a Coordinator?</label>
            <select onChange={handleCoordinatorChangeTable5}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>SEM-I</th>
                    <th>SEM-II</th>
                    <th>Total number</th>
                    <th>Certificate (less than 100kB)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows5.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select value={row.activity} onChange={(event) => handleActivityChangeTable5(index, event)}>
                          <option value="">Select Activity</option>
                          <option value="Training and placements- Departmental T&P Coordinator">Training and placements- Departmental T&P Coordinator</option>
                          <option value="Institute News letter Editorial board">Institute News letter Editorial board</option>
                          <option value="Material contribution to news letter/Annual Day Report/House Journal from Department">Material contribution to news letter/Annual Day Report/House Journal from Department</option>
                          <option value="Any Other as approved by Chairman CAS and by Principal approved">Any Other as approved by Chairman CAS and by Principal approved</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={row.sem1} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.sem2} readOnly />
                      </td>
                      <td>
                        <input type="text" value={row.totalNumber} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChangeTable5(index, event)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow5(index)}>Delete Row</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow5} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
              
              {/* Self Score and DFAC Score Below the Table */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScoreTable5()} // Automatically calculate self-score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScoreTable5} // Display DFAC score
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </fieldset>


      <button type="button" onClick={() => openTab('Part-D')} className="btn btn-secondary">Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={handleSave} style={{ backgroundColor: '#2896a7' }}>Save</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-F')}>Next</button>
    </div>
  );
}

export default PartEAssistantProfessor;