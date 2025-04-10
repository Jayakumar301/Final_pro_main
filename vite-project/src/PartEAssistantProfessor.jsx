import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function PartEAssistantProfessor({ openTab }) {
  const [dataAvailableTable1, setDataAvailableTable1] = useState(false);
  const [dataAvailableTable2, setDataAvailableTable2] = useState(false);
  const [dataAvailableTable3, setDataAvailableTable3] = useState(false);
  const [dataAvailableTable4, setDataAvailableTable4] = useState(false);
  const [dataAvailableTable5, setDataAvailableTable5] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [rowsTable1, setRowsTable1] = useState([
    { sNo: 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '' }
  ]);
  const [rowsTable2, setRowsTable2] = useState([
    { sNo: 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '', certificate: '' }
  ]);
  const [rowsTable3, setRowsTable3] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);
  const [rowsTable4, setRowsTable4] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);
  const [rowsTable5, setRowsTable5] = useState([
    { sNo: 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }
  ]);

  const handleDataAvailableChangeTable1 = (event) => {
    setDataAvailableTable1(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable2 = (event) => {
    setDataAvailableTable2(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable3 = (event) => {
    setDataAvailableTable3(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable4 = (event) => {
    setDataAvailableTable4(event.target.value === 'Yes');
  };

  const handleDataAvailableChangeTable5 = (event) => {
    setDataAvailableTable5(event.target.value === 'Yes');
  };
  

  const handleAddRowTable1 = () => {
    setRowsTable1([...rowsTable1, { sNo: rowsTable1.length + 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '' }]);
  };

  const handleAddRowTable2 = () => {
    setRowsTable2([...rowsTable2, { sNo: rowsTable2.length + 1, activity: '', sem1: '', sem2: '', totalNumber: '', dfac: '', certificate: '' }]);
  };

  const handleDeleteRowTable1 = (index) => {
    const newRow = rowsTable1.filter((row, i) => i !== index);
    setRowsTable1(newRow);
  };

  const handleDeleteRowTable2 = (index) => {
    const newRow = rowsTable2.filter((row, i) => i !== index);
    setRowsTable2(newRow);
  };

  const handleAddRowTable3 = () => {
    setRowsTable3([...rowsTable3, { sNo: rowsTable3.length + 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }]);
  };
  
  const handleDeleteRowTable3 = (index) => {
    const newRow = rowsTable3.filter((row, i) => i !== index);
    setRowsTable3(newRow);
  };

  const handleAddRowTable4 = () => {
    setRowsTable4([...rowsTable4, { sNo: rowsTable4.length + 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }]);
  };
  
  const handleDeleteRowTable4 = (index) => {
    const newRow = rowsTable4.filter((row, i) => i !== index);
    setRowsTable4(newRow);
  };

  const handleAddRowTable5 = () => {
    setRowsTable5([...rowsTable5, { sNo: rowsTable5.length + 1, activity: '', sem1: 0, sem2: 0, totalNumber: 0, dfac: '', certificate: '' }]);
  };
  
  const handleDeleteRowTable5 = (index) => {
    const newRow = rowsTable5.filter((row, i) => i !== index);
    setRowsTable5(newRow);
  };
  

  const handleActivityChangeTable1 = (index, event) => {
    const newRow = [...rowsTable1];
    newRow[index].activity = event.target.value;
    setRowsTable1(newRow);
  };

  const handleActivityChangeTable2 = (index, event) => {
    const newRow = [...rowsTable2];
    newRow[index].activity = event.target.value;
  
    // Calculate scores based on activity
    const score = event.target.value.includes('Coordinator') ? 5 : 2.5;
    newRow[index].sem1 = score;
    newRow[index].sem2 = score;
    newRow[index].totalNumber = score * 2;
  
    setRowsTable2(newRow);
  };

  const handleActivityChangeTable3 = (index, event) => {
    const newRow = [...rowsTable3];
    newRow[index].activity = event.target.value;
  
    // Calculate scores based on activity
    const score = event.target.value.includes('Coordinator') ? 30 : 15;
    newRow[index].sem1 = score;
    newRow[index].sem2 = score;
    newRow[index].totalNumber = score * 2;
  
    setRowsTable3(newRow);
  };

  const handleActivityChangeTable4 = (index, event) => {
    const newRow = [...rowsTable4];
    newRow[index].activity = event.target.value;
  
    // Calculate scores based on activity
    const score = event.target.value.includes('Coordinator') ? 20 : 5;
    newRow[index].sem1 = score;
    newRow[index].sem2 = score;
    newRow[index].totalNumber = score * 2;
  
    setRowsTable4(newRow);
  };

  const handleActivityChangeTable5 = (index, event) => {
    const newRow = [...rowsTable5];
    newRow[index].activity = event.target.value;
  
    // Calculate scores based on activity
    let score = 0;
    if (event.target.value.includes('Coordinator')) {
      score = 20;
    } else if (event.target.value.includes('Editorial board')) {
      score = 10;
    } else if (event.target.value.includes('ArticleContributors')) {
      score = 5;
    } else {
      score = 10;
    }
    newRow[index].sem1 = score;
    newRow[index].sem2 = score;
    newRow[index].totalNumber = score * 2;
  
    setRowsTable5(newRow);
  };
  
  


  const handleSem1ChangeTable1 = (index, event) => {
    const newRow = [...rowsTable1];
    newRow[index].sem1 = event.target.value;
    setRowsTable1(newRow);
  };

 

  const handleSem2ChangeTable1 = (index, event) => {
    const newRow = [...rowsTable1];
    newRow[index].sem2 = event.target.value;
    setRowsTable1(newRow);
  };

  

  const handleTotalNumberChangeTable1 = (index, event) => {
    const newRow = [...rowsTable1];
    newRow[index].totalNumber = event.target.value;
    setRowsTable1(newRow);
  };



  const handleDfacChangeTable1 = (index, event) => {
    const newRow = [...rowsTable1];
    newRow[index].dfac = event.target.value;
    setRowsTable1(newRow);
  };

  const handleDfacChangeTable2 = (index, event) => {
    const newRow = [...rowsTable2];
    newRow[index].dfac = event.target.value;
    setRowsTable2(newRow);
  };

  const handleDfacChangeTable3 = (index, event) => {
    const newRow = [...rowsTable3];
    newRow[index].dfac = event.target.value;
    setRowsTable3(newRow);
  };

  const handleDfacChangeTable4 = (index, event) => {
    const newRow = [...rowsTable4];
    newRow[index].dfac = event.target.value;
    setRowsTable4(newRow);
  };

  const handleDfacChangeTable5 = (index, event) => {
    const newRow = [...rowsTable5];
    newRow[index].dfac = event.target.value;
    setRowsTable5(newRow);
  };

  const handleCertificateChangeTable5 = (index, event) => {
    const newRow = [...rowsTable5];
    newRow[index].certificate = event.target.files[0];
    setRowsTable5(newRow);
  };
   

  const handleCertificateChangeTable2 = (index, event) => {
    const newRow = [...rowsTable2];
    newRow[index].certificate = event.target.files[0];
    setRowsTable2(newRow);
  };

  
  const handleCertificateChangeTable3 = (index, event) => {
    const newRow = [...rowsTable3];
    newRow[index].certificate = event.target.files[0];
    setRowsTable3(newRow);
  };

  const handleCertificateChangeTable4 = (index, event) => {
    const newRow = [...rowsTable4];
    newRow[index].certificate = event.target.files[0];
    setRowsTable4(newRow);
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
    const partEData = {
      id: profileId,
      rowsTable1,
      rowsTable2,
      rowsTable3,
      rowsTable4,
      rowsTable5
    };
    try {
      const response = await axios.post('http://localhost:5000/save-parte-data', partEData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
    }
  };

  
  return (
    <div className='parts'>
      <h5>PART-4: Academic Administration, Institutional Duties and Extra Curricular Activities of Assistant Professor</h5>
      <p>This is Part E content for Assistant Professor.</p>

      <fieldset>
        <legend><h5>Academic Administration, Institutional duties and extracurricular activities And social responsibility – Asst.Profs.</h5></legend>
        <h6>Maximum API Score: 100 (Over previous two semesters)</h6>
        <p>Each activity = 5 points : 2.5 points per sem; Coordinator =100%; others = 50% All activities to be supported by documentary proof certified by HOD.</p>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable1}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable1 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Activity</th>
                  <th>SEM-I</th>
                  <th>SEM-II</th>
                  <th>Total number</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rowsTable1.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.activity} onChange={(event) => handleActivityChangeTable1(index, event)}>
                        <option value="">Select Activity</option>
                        <option value="In-charge of time tables">In-charge of time tables</option>
                        <option value="Attendance in-charge">Attendance in-charge</option>
                        <option value="Internal marks in-charge">Internal marks in-charge</option>
                        <option value="Mini / Major Project Coordinator/Review Members">Mini / Major Project Coordinator/Review Members</option>
                        <option value="Exams In-charge">Exams In-charge</option>
                        <option value="Library in-charge">Library in-charge</option>
                        <option value="Lab In-charge">Lab In-charge</option>
                        <option value="Discipline(class teacher)">Discipline(class teacher)</option>
                        <option value="Professional Society Related Coordinators">Professional Society Related Coordinators</option>
                        <option value="Module / Course Coordinator">Module / Course Coordinator</option>
                        <option value="Departmental R&D Coordinator">Departmental R&D Coordinator</option>
                        <option value="Media Coordinator">Media Coordinator</option>
                        <option value="Departmental News Letter Editor/Members">Departmental News Letter Editor/Members</option>
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
                      <input
                        type="text"
                        value={row.sem1}
                        onChange={(event) => handleSem1ChangeTable1(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.sem2}
                        onChange={(event) => handleSem2ChangeTable1(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.totalNumber}
                        onChange={(event) => handleTotalNumberChangeTable1(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChangeTable1(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRowTable1(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRowTable1} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend><h5>Institutional level administration (Each activity/sem = 5 points)</h5></legend>
        <h6>Coordinator=100%; others=50%</h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable2}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable2 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Activity</th>
                  <th>SEM-I</th>
                  <th>SEM-II</th>
                  <th>Total number</th>
                  <th>DFAC</th>
                  <th>Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {rowsTable2.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>
                    <select value={row.activity} onChange={(event) => handleActivityChangeTable2(index, event)}>
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
                      type="text"
                      value={row.dfac}
                      onChange={(event) => handleDfacChangeTable2(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(event) => handleCertificateChangeTable2(index, event)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDeleteRowTable2(index)}>Delete Row</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            <button type="button" onClick={handleAddRowTable2} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend><h5>Institutional Events Organization members, Sports Participants (Each activity = 5 Points)</h5></legend>
        <h6>*Coordinator = 30 points; Others = 15</h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable3}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable3 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Activity</th>
                  <th>SEM-I</th>
                  <th>SEM-II</th>
                  <th>Total number</th>
                  <th>DFAC</th>
                  <th>Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rowsTable3.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.activity} onChange={(event) => handleActivityChangeTable3(index, event)}>
                        <option value="">Select Activity</option>
                        <option value="BECTAGON">BECTAGON</option>
                        <option value="Engineer’s Day">Engineer’s Day</option>
                        <option value="Cultural activities">Cultural activities</option>
                        <option value="Sports participation">Sports participation</option>
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
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChangeTable3(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) => handleCertificateChangeTable3(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRowTable3(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRowTable3} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>

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
                  <th>DFAC</th>
                  <th>Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rowsTable4.map((row, index) => (
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
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChangeTable4(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) => handleCertificateChangeTable4(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRowTable4(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRowTable4} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend><h5>Training & other Misc. activities: Max Score 20</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChangeTable5}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailableTable5 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Activity</th>
                  <th>SEM-I</th>
                  <th>SEM-II</th>
                  <th>Total number</th>
                  <th>DFAC</th>
                  <th>Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rowsTable5.map((row, index) => (
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
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChangeTable5(index, event)}
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) => handleCertificateChangeTable5(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRowTable5(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRowTable5} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
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