import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests

function PartDAssistantProfessor({ openTab }) {
  const [dataAvailable1, setDataAvailable1] = useState(false);
  const [dataAvailable2, setDataAvailable2] = useState(false);
  const [dataAvailable3, setDataAvailable3] = useState(false);
  const [dataAvailable4, setDataAvailable4] = useState(false);
  const [dataAvailable5, setDataAvailable5] = useState(false);
  const [dataAvailable6, setDataAvailable6] = useState(false);
  const [dataAvailable7, setDataAvailable7] = useState(false);
  const [dataAvailable8, setDataAvailable8] = useState(false);
  const [profileId, setProfileId] = useState('');

  const [rows1, setRows1] = useState([
    { category: '', type: '', count: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows2, setRows2] = useState([
    { type: '', sanctioned: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows3, setRows3] = useState([
    { type: '', title: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows4, setRows4] = useState([
    { type: '', title: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows5, setRows5] = useState([
    { role: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows6, setRows6] = useState([
    { role: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows7, setRows7] = useState([
    { type: '', score: '', dfac: '', certificate: null }
  ]);
  const [rows8, setRows8] = useState([
    { type: '', score: '', dfac: '', certificate: null }
  ]);  

  const handleDataAvailableChange1 = (event) => {
    setDataAvailable1(event.target.value === 'Yes');
  };

  const handleDataAvailableChange2 = (event) => {
    setDataAvailable2(event.target.value === 'Yes');
  };

  const handleDataAvailableChange3 = (event) => {
    setDataAvailable3(event.target.value === 'Yes');
  };

  const handleDataAvailableChange4 = (event) => {
    setDataAvailable4(event.target.value === 'Yes');
  };

  const handleDataAvailableChange5 = (event) => {
    setDataAvailable5(event.target.value === 'Yes');
  };

  const handleDataAvailableChange6 = (event) => {
    setDataAvailable6(event.target.value === 'Yes');
  };

  const handleDataAvailableChange7 = (event) => {
  setDataAvailable7(event.target.value === 'Yes');
  };

  const handleDataAvailableChange8 = (event) => {
    setDataAvailable8(event.target.value === 'Yes');
  };


  const handleAddRow1 = () => {
    setRows1([...rows1, { category: '', type: '', count: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow2 = () => {
    setRows2([...rows2, { type: '', sanctioned: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow3 = () => {
    setRows3([...rows3, { type: '', title: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow4 = () => {
    setRows4([...rows4, { type: '', title: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow5 = () => {
    setRows5([...rows5, { role: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow6 = () => {
    setRows6([...rows6, { role: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow7 = () => {
    setRows7([...rows7, { type: '', score: '', dfac: '', certificate: null }]);
  };

  const handleAddRow8 = () => {
    setRows8([...rows8, { type: '', score: '', dfac: '', certificate: null }]);
  };
   

  const handleDeleteRow1 = (index) => {
    const newRow = rows1.filter((row, i) => i !== index);
    setRows1(newRow);
  };

  const handleDeleteRow2 = (index) => {
    const newRow = rows2.filter((row, i) => i !== index);
    setRows2(newRow);
  };

  const handleDeleteRow3 = (index) => {
    const newRow = rows3.filter((row, i) => i !== index);
    setRows3(newRow);
  };

  const handleDeleteRow4 = (index) => {
    const newRow = rows4.filter((row, i) => i !== index);
    setRows4(newRow);
  };

  const handleDeleteRow5 = (index) => {
    const newRow = rows5.filter((row, i) => i !== index);
    setRows5(newRow);
  };

  const handleDeleteRow6 = (index) => {
    const newRow = rows6.filter((row, i) => i !== index);
    setRows6(newRow);
  };

  const handleDeleteRow7 = (index) => {
    const newRow = rows7.filter((row, i) => i !== index);
    setRows7(newRow);
  };
  
  const handleDeleteRow8 = (index) => {
    const newRow = rows8.filter((row, i) => i !== index);
    setRows8(newRow);
  };
  


  const calculateScore1 = (type) => {
    let score = 0;
    if (type === 'Whole Book solo') score = 50;
    else if (type === 'Joint author') score = 30;
    else if (type === 'Book chapter') score = 20;
    else if (type === 'Scopus/Sci indexed/Springer/Elsivier') score = 30;
    else if (type === 'IEEE, ASME, ASCE') score = 20;
    else if (type === 'National Institutions') score = 15;
    else if (type === 'Others') score = 10;
    else if (type === 'IEEE Transactions or equivalent') score = 50;
    else if (type === 'SCI indexed/ IEEE/ACM/ASME/ASCE') score = 40;
    else if (type === 'SCOPUS indexed') score = 30;
    else if (type === 'Others (including Joint Author Papers with Outside Institutions)') score = 15;
    return score;
  };

  const calculateScore2 = (type) => {
    let score = 0;
    if (type === 'More than Rs.10 Lakhs') score = 80;
    else if (type === 'Rs.5 Lakhs – 10 Lakhs') score = 50;
    else if (type === 'Rs.2 Lakhs - 4 Lakhs') score = 40;
    else if (type === '< Rs.2 Lakhs') score = 30;
    else if (type === 'Applied but awaiting sanction (AICTE/UGC/DST)') score = 80 * 0.2;
    else if (type === 'Applied but awaiting sanction (DRDO/ISRO/National R&D)') score = 80 * 0.4;
    return score;
  };

  const calculateScore3 = (type) => {
    let score = 0;
    if (type === 'International outside country') score = 40;
    else if (type === 'International within India') score = 20;
    else if (type === 'National within India') score = 10;
    else if (type === 'Chairing sessions abroad') score = 30;
    else if (type === 'Chairing sessions in India') score = 15;
    else if (type === 'Chairing sessions others') score = 5;
    else if (type === 'Invited speaker abroad') score = 40;
    else if (type === 'Invited speaker in India') score = 20;
    else if (type === 'Invited speaker others') score = 10;
    else if (type === 'Key note speaker international') score = 20;
    else if (type === 'Key note speaker national/international in India') score = 10;
    return score;
  };

  const calculateScore4 = (type) => {
    let score = 0;
    if (type === 'Patent obtained') score = 50;
    else if (type === 'Patent filed with Number allotted') score = 25;
    else if (type === 'First Examination Report response filed') score = 35;
    else if (type === 'Hearing/post hearing') score = 40;
    return score;
  };

  const calculateScore5 = (role) => {
    let score = 0;
    if (role === 'Principal coordinator') score = 50;
    else if (role === 'Others if active participation') score = 50 * 0.8;
    return score;
  };

  const calculateScore6 = (role) => {
    let score = 0;
    if (role === 'Principal coordinator') score = 50;
    else if (role === 'Others if active participation') score = 50 * 0.8;
    return score;
  };

  const calculateScore7 = (type) => {
    let score = 0;
    if (type === 'Ph.D. Registered') score = 15;
    else if (type === 'Ph.D. Thesis submission') score = 30;
    else if (type === 'Ph.D. Thesis Awarded') score = 40;
    else if (type === 'Ph.D. Thesis submission and award same year') score = 50;
    return score;
  };

  const calculateScore8 = (type) => {
    let score = 0;
    if (type === 'SCI indexed/ IEEE/ACM/ASME/ASCE') score = 70;
    else if (type === 'SCOPUS') score = 40;
    else if (type === 'Patent application') score = 60;
    return score;
  };
  
  

  const handleRowChange1 = (index, field, value) => {
    const newRow = [...rows1];
    newRow[index][field] = value;

    if (field === 'type') {
      newRow[index].score = calculateScore1(newRow[index].type);
    }

    setRows1(newRow);
  };

  const handleRowChange2 = (index, field, value) => {
    const newRow = [...rows2];
    newRow[index][field] = value;

    if (field === 'type') {
      newRow[index].score = calculateScore2(newRow[index].type);
    }

    setRows2(newRow);
  };

  const handleRowChange3 = (index, field, value) => {
    const newRow = [...rows3];
    newRow[index][field] = value;
  
    if (field === 'type') {
      newRow[index].score = calculateScore3(newRow[index].type);
    }
  
    setRows3(newRow);
  };

  const handleRowChange4 = (index, field, value) => {
    const newRow = [...rows4];
    newRow[index][field] = value;
  
    if (field === 'type') {
      newRow[index].score = calculateScore4(newRow[index].type);
    }
  
    setRows4(newRow);
  };

  const handleRowChange5 = (index, field, value) => {
    const newRow = [...rows5];
    newRow[index][field] = value;
  
    if (field === 'role') {
      newRow[index].score = calculateScore5(newRow[index].role);
    }
  
    setRows5(newRow);
  };

  const handleRowChange6 = (index, field, value) => {
    const newRow = [...rows6];
    newRow[index][field] = value;
  
    if (field === 'role') {
      newRow[index].score = calculateScore6(newRow[index].role);
    }
  
    setRows6(newRow);
  };

  const handleRowChange7 = (index, field, value) => {
    const newRow = [...rows7];
    newRow[index][field] = value;
  
    if (field === 'type') {
      newRow[index].score = calculateScore7(newRow[index].type);
    }
  
    setRows7(newRow);
  };

  const handleRowChange8 = (index, field, value) => {
    const newRow = [...rows8];
    newRow[index][field] = value;
  
    if (field === 'type') {
      newRow[index].score = calculateScore8(newRow[index].type);
    }
  
    setRows8(newRow);
  };
  


  const handleCertificateChange1 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows1];
      newRow[index].certificate = file;
      setRows1(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange2 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows2];
      newRow[index].certificate = file;
      setRows2(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange3 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows3];
      newRow[index].certificate = file;
      setRows3(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange4 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows4];
      newRow[index].certificate = file;
      setRows4(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange5 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows5];
      newRow[index].certificate = file;
      setRows5(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange6 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows6];
      newRow[index].certificate = file;
      setRows6(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange7 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows7];
      newRow[index].certificate = file;
      setRows7(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };

  const handleCertificateChange8 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100000) {
      const newRow = [...rows8];
      newRow[index].certificate = file;
      setRows8(newRow);
    } else {
      alert("File size should be less than 100kB");
    }
  };
  
  

  const totalScore1 = rows1.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore2 = rows2.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore3 = rows3.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore4 = rows4.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore5 = rows5.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore6 = rows6.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore7 = rows7.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);
  const totalScore8 = rows8.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0);


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
    const partDData = {

      id: profileId,
      rows1,
      rows2,
      rows3,
      rows4,
      rows5,
      rows6,
      rows7,
      rows8
    };
    try {
      const response = await axios.post('http://localhost:5000/save-partd-data', partDData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
    }
  };


  return (
    <div className='parts'>
      <h4>R &D RELATED CONTRIBUTIONS</h4>

      {/* table 1 */}
      <fieldset>
        <legend><h5>1. Publications</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange1}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable1 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>No. of Books/Papers</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows1.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.category} onChange={(event) => handleRowChange1(index, 'category', event.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Books">Books</option>
                        <option value="Conference proceedings">Conference proceedings</option>
                        <option value="Refereed Journals">Refereed Journals</option>
                        <option value="Others">Others</option>
                      </select>
                    </td>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange1(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        {/* Options for Books */}
                        <option value="Whole Book solo">Whole Book solo</option>
                        <option value="Joint author">Joint author</option>
                        <option value="Book chapter">Book chapter</option>
                        {/* Options for Conference proceedings */}
                        <option value="Scopus/Sci indexed/Springer/Elsivier">Scopus/Sci indexed/Springer/Elsivier</option>
                        <option value="IEEE, ASME, ASCE">IEEE, ASME, ASCE</option>
                        <option value="National Institutions">National Institutions</option>
                        <option value="Others">Others</option>
                        {/* Options for Refereed Journals */}
                        <option value="IEEE Transactions or equivalent">IEEE Transactions or equivalent</option>
                        <option value="SCI indexed/ IEEE/ACM/ASME/ASCE">SCI indexed/ IEEE/ACM/ASME/ASCE</option>
                        <option value="SCOPUS indexed">SCOPUS indexed</option>
                        {/* Options for Others */}
                        <option value="Others (including Joint Author Papers with Outside Institutions)">Others (including Joint Author Papers with Outside Institutions)</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.count}
                        onChange={(event) => handleRowChange1(index, 'count', event.target.value)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange1(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-1-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-1-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange1(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow1(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow1} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore1}</h5>
      </fieldset>


        {/* table 2 */}
      <fieldset>
        <legend><h5>2. Sponsored Research projects </h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange2}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable2 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Sanctioned</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows2.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange2(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        <option value="More than Rs.10 Lakhs">More than Rs.10 Lakhs</option>
                        <option value="Rs.5 Lakhs – 10 Lakhs">Rs.5 Lakhs – 10 Lakhs</option>
                        <option value="Rs.2 Lakhs - 4 Lakhs">Rs.2 Lakhs - 4 Lakhs</option>
                        <option value="< Rs.2 Lakhs">More than Rs.2 Lakhs</option>
                        <option value="Applied but awaiting sanction (AICTE/UGC/DST)">Applied but awaiting sanction (AICTE/UGC/DST)</option>
                        <option value="Applied but awaiting sanction (DRDO/ISRO/National R&D)">Applied but awaiting sanction (DRDO/ISRO/National R&D)</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.sanctioned}
                        onChange={(event) => handleRowChange2(index, 'sanctioned', event.target.value)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange2(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-2-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-2-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange2(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow2(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow2} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore2}</h5>
      </fieldset>

      {/* table 3 */}
      <fieldset>
        <legend><h5>3.	Conferences/ symposia  Papers presented/ resource  person Outside India*Reputed such as IEEE, IEE, ASME, ASCE, SCI, Scopus Supported)			Max Score
40/Chairing sessions on invitation 
</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange3}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable3 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows3.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange3(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        <option value="International outside country">International outside country</option>
                        <option value="International within India">International within India</option>
                        <option value="National within India">National within India</option>
                        <option value="Chairing sessions abroad">Chairing sessions abroad</option>
                        <option value="Chairing sessions in India">Chairing sessions in India</option>
                        <option value="Chairing sessions others">Chairing sessions others</option>
                        <option value="Invited speaker abroad">Invited speaker abroad</option>
                        <option value="Invited speaker in India">Invited speaker in India</option>
                        <option value="Invited speaker others">Invited speaker others</option>
                        <option value="Key note speaker international">Key note speaker international</option>
                        <option value="Key note speaker national/international in India">Key note speaker national/international in India</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.title}
                        onChange={(event) => handleRowChange3(index, 'title', event.target.value)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange3(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-3-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-3-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange3(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow3(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow3} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore3}</h5>
      </fieldset>

      {/* table 4 */}
      <fieldset>
        <legend><h5>4. Patents</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange4}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable4 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows4.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange4(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        <option value="Patent obtained">Patent obtained</option>
                        <option value="Patent filed with Number allotted">Patent filed with Number allotted</option>
                        <option value="First Examination Report response filed">First Examination Report response filed</option>
                        <option value="Hearing/post hearing">Hearing/post hearing</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.title}
                        onChange={(event) => handleRowChange4(index, 'title', event.target.value)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange4(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-4-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-4-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange4(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow4(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow4} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore4}</h5>
      </fieldset>

      {/* table 5 */}
      <fieldset>
        <legend><h5>5. Incubation Centre Established</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange5}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable5 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows5.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.role} onChange={(event) => handleRowChange5(index, 'role', event.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Principal coordinator">Principal coordinator</option>
                        <option value="Others if active participation">Others if active participation</option>
                      </select>
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange5(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-5-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-5-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange5(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow5(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow5} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore5}</h5>
      </fieldset>

      <fieldset>
        <legend><h5>6. Centre of Excellence Established</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange6}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable6 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows6.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.role} onChange={(event) => handleRowChange6(index, 'role', event.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Principal coordinator">Principal coordinator</option>
                        <option value="Others if active participation">Others if active participation</option>
                      </select>
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange6(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-6-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-6-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange6(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow6(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow6} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore6}</h5>
      </fieldset>

      {/* table 7 */}
      <fieldset>
        <legend><h5>7. Ph.D. Related Activities</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange7}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable7 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows7.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange7(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        <option value="Ph.D. Registered">Ph.D. Registered</option>
                        <option value="Ph.D. Thesis submission">Ph.D. Thesis submission</option>
                        <option value="Ph.D. Thesis Awarded">Ph.D. Thesis Awarded</option>
                        <option value="Ph.D. Thesis submission and award same year">Ph.D. Thesis submission and award same year</option>
                      </select>
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange7(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-7-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-7-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange7(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow7(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow7} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore7}</h5>
      </fieldset>

        {/* table 8 */}
      <fieldset>
        <legend><h5>8. Project Guidance to PG Students</h5></legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange8}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable8 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows8.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select value={row.type} onChange={(event) => handleRowChange8(index, 'type', event.target.value)}>
                        <option value="">Select Type</option>
                        <option value="SCI indexed/ IEEE/ACM/ASME/ASCE">SCI indexed/ IEEE/ACM/ASME/ASCE</option>
                        <option value="SCOPUS">SCOPUS</option>
                        <option value="Patent application">Patent application</option>
                      </select>
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleRowChange8(index, 'dfac', event.target.value)}
                      />
                    </td>
                    <td>
                      <div className="file-upload-container">
                        <label htmlFor={`file-upload-8-${index}`} className="file-upload-label">Upload File</label>
                        <input
                          id={`file-upload-8-${index}`}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) => handleCertificateChange8(index, event)}
                          className="file-upload-input"
                        />
                      </div>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow8(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow8} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
        <h5>Total Score: {totalScore8}</h5>
      </fieldset>

      <button type="button" onClick={() => openTab('Part-C')} className="btn btn-secondary">Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={handleSave} style={{ backgroundColor: '#2896a7' }}>Save</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-E')}>Next</button>
    </div>
  );
}

export default PartDAssistantProfessor;