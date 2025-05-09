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


  useEffect(() => {
    const fetchPartDData = async () => {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile && savedProfile.id) {
        try {
          const response = await axios.get(`http://localhost:5000/get-part-data?id=${savedProfile.id}&part=partd`);
          if (response.status === 200 && response.data.success) {
            const partDData = response.data.data;
  
            // Populate the form with fetched data for all 8 tables
            setRows1(partDData.rows1?.data || []);
            setRows2(partDData.rows2?.data || []);
            setRows3(partDData.rows3?.data || []);
            setRows4(partDData.rows4?.data || []);
            setRows5(partDData.rows5?.data || []);
            setRows6(partDData.rows6?.data || []);
            setRows7(partDData.rows7?.data || []);
            setRows8(partDData.rows8?.data || []);
          }
        } catch (error) {
          console.error('Error fetching PartD data:', error);
        }
      }
    };
  
    fetchPartDData();
  }, []);

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
    // Check if the current self-score is 50 or more
    if (totalScore1 >= 50) {
        alert("Maximum self-score of 50 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        category: "",     // Default value for Category
        type: "",         // Default value for Type
        count: 0,         // Default value for No. of Books/Papers
        score: 0,         // Default value for Score
        dfac: "",         // Default value for DFAC
        certificate: null // Default value for Upload Certificate
    };

    setRows1([...rows1, newRow]); // Update the rows state with the new row
};

const handleAddRow2 = () => {
  // Check if the current self-score is 50 or more
  if (totalScore2 >= 80) {
      alert("Maximum self-score of 80 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      type: "",         // Default value for Type
      sanctioned: "",   // Default value for Sanctioned
      score: 0,         // Default value for Score
      dfac: "",         // Default value for DFAC
      certificate: null // Default value for Upload Certificate
  };

  setRows2([...rows2, newRow]); // Update the rows state with the new row
};

const handleAddRow3 = () => {
  // Check if the current self-score is 40 or more
  if (totalScore3 >= 90) {
      alert("Maximum self-score of 90 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      type: '',          // Default value for Type
      title: '',         // Default value for Title
      score: '',         // Default value for Score
      dfac: '',          // Default value for DFAC
      certificate: null  // Default value for Upload Certificate
  };

  setRows3([...rows3, newRow]); // Update the rows state with the new row
};


const handleAddRow4 = () => {
  // Check if the current self-score is 50 or more
  if (totalScore4 >= 50) {
      alert("Maximum self-score of 50 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      type: '',          // Default value for Type
      title: '',         // Default value for Title
      score: '',         // Default value for Score
      dfac: '',          // Default value for DFAC
      certificate: null  // Default value for Upload Certificate
  };

  setRows4([...rows4, newRow]); // Update the rows state with the new row
};

const handleAddRow5 = () => {
  // Check if the current self-score is 50 or more
  if (totalScore5 >= 50) {
      alert("Maximum self-score of 50 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      role: '',          // Default value for Role
      score: '',         // Default value for Score
      dfac: '',          // Default value for DFAC
      certificate: null  // Default value for Upload Certificate
  };

  setRows5([...rows5, newRow]); // Update the rows state with the new row
};


const handleAddRow6 = () => {
  // Check if the current self-score is 50 or more
  if (totalScore6 >= 50) {
      alert("Maximum self-score of 50 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      role: '',          // Default value for Role
      score: '',         // Default value for Score
      dfac: '',          // Default value for DFAC
      certificate: null  // Default value for Upload Certificate
  };

  setRows6([...rows6, newRow]); // Update the rows state with the new row
};


  const handleAddRow7 = () => {
    // Check if the current self-score is 50 or more
    if (totalScore7 >= 50) {
        alert("Maximum self-score of 50 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        type: '',          // Default value for Type
        score: '',         // Default value for Score
        dfac: '',          // Default value for DFAC
        certificate: null  // Default value for Upload Certificate
    };

    setRows7([...rows7, newRow]); // Update the rows state with the new row
  };

const handleAddRow8 = () => {
  // Check if the current self-score is 70 or more
  if (totalScore8 >= 70) {
      alert("Maximum self-score of 70 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      type: '',          // Default value for Type
      score: '',         // Default value for Score
      dfac: '',          // Default value for DFAC
      certificate: null  // Default value for Upload Certificate
  };

  setRows8([...rows8, newRow]); // Update the rows state with the new row
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


  // State for DFAC Score (set as needed)
  const [dfacScore1, setDfacScore1] = useState(0);
  const [dfacScore2, setDfacScore2] = useState(0);
  const [dfacScore3, setDfacScore3] = useState(0);
  const [dfacScore4, setDfacScore4] = useState(0);
  const [dfacScore5, setDfacScore5] = useState(0);
  const [dfacScore6, setDfacScore6] = useState(0);
  const [dfacScore7, setDfacScore7] = useState(0);
  const [dfacScore8, setDfacScore8] = useState(0);

  

  const totalScore1 = Math.min(
    rows1.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),
    50
  );
  const totalScore2 = Math.min(rows2.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),80);
  const totalScore3 = Math.min(rows3.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),40);
  const totalScore4 = Math.min(rows4.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),50);
  const totalScore5 = Math.min(rows5.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),50); 
  const totalScore6 = Math.min(rows6.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),50);
  const totalScore7 = Math.min(rows7.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),50);
  const totalScore8 = Math.min(rows8.reduce((acc, row) => acc + (parseInt(row.score, 10) || 0), 0),80);


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
      rows1: {
        data: rows1,
        selfScore: totalScore1,
        dfacScore: dfacScore1,
      },
      rows2: {
        data: rows2,
        selfScore: totalScore2,
        dfacScore: dfacScore2,
      },
      rows3: {
        data: rows3,
        selfScore: totalScore3,
        dfacScore: dfacScore3,
      },
      rows4: {
        data: rows4,
        selfScore: totalScore4,
        dfacScore: dfacScore4,
      },
      rows5: {
        data: rows5,
        selfScore: totalScore5,
        dfacScore: dfacScore5,
      },
      rows6: {
        data: rows6,
        selfScore: totalScore6,
        dfacScore: dfacScore6,
      },
      rows7: {
        data: rows7,
        selfScore: totalScore7,
        dfacScore: dfacScore7,
      },
      rows8: {
        data: rows8,
        selfScore: totalScore8,
        dfacScore: dfacScore8,
      },
    };

    try {
      const response = await axios.post('http://localhost:5000/save-partd-data', partDData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
      console.error(error);
    }
  };


  return (
    <div className='parts'>
      <h2>R &D RELATED CONTRIBUTIONS</h2>

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
        
        {/* Self-Score and DFAC Score */}
        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore1} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore1} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div>
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

          {/* Self-Score and DFAC Score */}
          <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label>
                      Self Score:
                      <input
                        type="number"
                        value={totalScore2} // Dynamically calculate scaled Self-Score
                        readOnly
                      />
                    </label>
                    <label>
                      DFAC Score:
                      <input
                        type="number"
                        value={dfacScore2} // Static DFAC Score
                        disabled // DFAC Score is disabled
                      />
                    </label>
                  </div>
          </div>
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

        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore3} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore3} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div>       
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

        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore4} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore4} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div> 
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
            
            {/* Self Score and DFAC Score Below the Table */}
            <div style={{ marginTop: "20px" }}>
              <h6>Scores</h6>
              <div style={{ display: "flex", gap: "20px" }}>
                <label>
                  Self Score:
                  <input
                    type="number"
                    value={totalScore5} // Automatically calculate self-score
                    readOnly
                  />
                </label>
                <label>
                  DFAC Score:
                  <input
                    type="number"
                    value={dfacScore5} // Disable DFAC score (static or default value)
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </fieldset>


        {/* table 6 */}
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

        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore6} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore6} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div> 
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

        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore7} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore7} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div> 
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

        <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={totalScore8} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore8} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
        </div> 
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