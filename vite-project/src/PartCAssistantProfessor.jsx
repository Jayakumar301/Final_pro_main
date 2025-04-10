import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function PartCAssistantProfessor({ openTab }) {
  const [dataAvailable6, setDataAvailable6] = useState(false);
  const [dataAvailable7, setDataAvailable7] = useState(false);
  const [rows6, setRows6] = useState([{ sNo: 1, event: '', certificateUrl: '', score: 0, dfac: '' }]);
  const [rows7, setRows7] = useState([{ sNo: 1, participation: '', details: '', score: 0, dfac: '' }]);
  const [dataAvailable8, setDataAvailable8] = useState(false);
  const [rows8, setRows8] = useState([{ sNo: 1, consultancy: '', details: '', score: 0, dfac: '' }]);
  const [dataAvailable9, setDataAvailable9] = useState(false);
  const [rows9, setRows9] = useState([{ sNo: 1, internship: '', details: '', score: 0, dfac: '' }]);
  const [dataAvailable10, setDataAvailable10] = useState(false);
  const [rows10, setRows10] = useState([{ sNo: 1, courseDuration: '', feedback: '', score: 0, dfac: '' }]);
  const [profileId, setProfileId] = useState(''); // State to store the profile ID

 

  const handleDataAvailableChange6 = (event) => {
    setDataAvailable6(event.target.value === 'Yes');
  };

  const handleDataAvailableChange7 = (event) => {
    setDataAvailable7(event.target.value === 'Yes');
  };

  const handleDataAvailableChange8 = (event) => {
    setDataAvailable8(event.target.value === 'Yes');
  };

  const handleDataAvailableChange9 = (event) => {
    setDataAvailable9(event.target.value === 'Yes');
  };

  const handleDataAvailableChange10 = (event) => {
    setDataAvailable10(event.target.value === 'Yes');
  };
  
  
  

  const handleAddRow6 = () => {
    setRows6([...rows6, { sNo: rows6.length + 1, event: '', certificateUrl: '', score: 0, dfac: '' }]);
  };

  const handleAddRow7 = () => {
    setRows7([...rows7, { sNo: rows7.length + 1, participation: '', details: '', score: 0, dfac: '' }]);
  };

  const handleDeleteRow6 = (index) => {
    const newRow = rows6.filter((row, i) => i !== index);
    setRows6(newRow);
  };

  const handleDeleteRow7 = (index) => {
    const newRow = rows7.filter((row, i) => i !== index);
    setRows7(newRow);
  };

  const handleAddRow8 = () => {
    setRows8([...rows8, { sNo: rows8.length + 1, consultancy: '', details: '', score: 0, dfac: '' }]);
  };
  
  const handleDeleteRow8 = (index) => {
    const newRow = rows8.filter((row, i) => i !== index);
    setRows8(newRow);
  };

  const handleAddRow9 = () => {
    setRows9([...rows9, { sNo: rows9.length + 1, internship: '', details: '', score: 0, dfac: '' }]);
  };
  
  const handleDeleteRow9 = (index) => {
    const newRow = rows9.filter((row, i) => i !== index);
    setRows9(newRow);
  };

  const handleAddRow10 = () => {
    setRows10([...rows10, { sNo: rows10.length + 1, courseDuration: '', feedback: '', score: 0, dfac: '' }]);
  };
  
  const handleDeleteRow10 = (index) => {
    const newRow = rows10.filter((row, i) => i !== index);
    setRows10(newRow);
  };

  

  const handleEventChange = (index, event) => {
    const newRow = [...rows6];
    newRow[index].event = event.target.value;
    newRow[index].score = calculateScore6(event.target.value);
    setRows6(newRow);
  };

  const handleParticipationChange = (index, event) => {
    const newRow = [...rows7];
    newRow[index].participation = event.target.value;
    newRow[index].score = calculateScore7(event.target.value);
    setRows7(newRow);
  };

  const handleCertificateUrlChange = (index, event) => {
    const newRow = [...rows6];
    newRow[index].certificateUrl = event.target.value;
    setRows6(newRow);
  };

  const handleDetailsChange = (index, event) => {
    const newRow = [...rows7];
    newRow[index].details = event.target.value;
    setRows7(newRow);
  };

  const handleDfacChange6 = (index, event) => {
    const newRow = [...rows6];
    newRow[index].dfac = event.target.value;
    setRows6(newRow);
  };

  const handleDfacChange7 = (index, event) => {
    const newRow = [...rows7];
    newRow[index].dfac = event.target.value;
    setRows7(newRow);
  };

  const handleConsultancyChange = (index, event) => {
    const newRow = [...rows8];
    newRow[index].consultancy = event.target.value;
    newRow[index].score = calculateScore8(event.target.value);
    setRows8(newRow);
  };
  
  const handleDetailsChange8 = (index, event) => {
    const newRow = [...rows8];
    newRow[index].details = event.target.value;
    setRows8(newRow);
  };
  
  const handleDfacChange8 = (index, event) => {
    const newRow = [...rows8];
    newRow[index].dfac = event.target.value;
    setRows8(newRow);
  };

  const handleInternshipChange = (index, event) => {
    const newRow = [...rows9];
    newRow[index].internship = event.target.value;
    newRow[index].score = calculateScore9(event.target.value);
    setRows9(newRow);
  };
  
  const handleDetailsChange9 = (index, event) => {
    const newRow = [...rows9];
    newRow[index].details = event.target.value;
    setRows9(newRow);
  };
  
  const handleDfacChange9 = (index, event) => {
    const newRow = [...rows9];
    newRow[index].dfac = event.target.value;
    setRows9(newRow);
  };

  const handleCourseDurationChange = (index, event) => {
    const newRow = [...rows10];
    newRow[index].courseDuration = event.target.value;
    newRow[index].score = calculateScore10(event.target.value, newRow[index].feedback);
    setRows10(newRow);
  };
  
  const handleFeedbackChange = (index, event) => {
    const newRow = [...rows10];
    newRow[index].feedback = event.target.value;
    newRow[index].score = calculateScore10(newRow[index].courseDuration, event.target.value);
    setRows10(newRow);
  };
  
  const handleDfacChange10 = (index, event) => {
    const newRow = [...rows10];
    newRow[index].dfac = event.target.value;
    setRows10(newRow);
  };
  



  const calculateScore6 = (event) => {
    switch (event) {
      case 'Event Participation':
        return 20;
      case 'Department Coordinators':
        return 20;
      case 'Event Coordinators':
        return 10;
      case 'Other Contributions':
        return 5;
      default:
        return 0;
    }
  };

  const calculateScore7 = (participation) => {
    switch (participation) {
      case 'Participation in state/national events with models':
        return 10;
      case 'First 3 Prizes winning':
        return 20;
      case 'Other Prizes':
        return 15;
      case 'Motivating Students':
        return 10;
      case 'Organize Student innovation sessions':
        return 3;
      case 'Brain teasing / Brain storming Sessions':
        return 3;
      default:
        return 0;
    }
  };

  const calculateScore8 = (consultancy) => {
    if (consultancy < 25000) return 5;
    if (consultancy >= 25000 && consultancy <= 50000) return 10;
    if (consultancy > 50000 && consultancy <= 100000) return 30;
    if (consultancy > 100000) return 40;
    return 0;
  };

  const calculateScore9 = (internship) => {
    switch (internship) {
      case 'At Industry/ R & D Organisations per each student':
        return 5;
      case 'Identification of New Industry / Company / R&D Lab':
        return 10;
      default:
        return 0;
    }
  };

  const calculateScore10 = (courseDuration, feedback) => {
    let baseScore = 0;
  
    switch (courseDuration) {
      case '1-3 Days':
        baseScore = 7.5;
        break;
      case '4-6 Days':
        baseScore = 15;
        break;
      case '7-10 Days':
        baseScore = 20;
        break;
      case '>10 Days':
        baseScore = 30;
        break;
      default:
        baseScore = 0;
    }
  
    let feedbackMultiplier = 0;
  
    if (feedback >= 4.5) {
      feedbackMultiplier = 1;
    } else if (feedback >= 4.0) {
      feedbackMultiplier = 0.9;
    } else if (feedback >= 3.6) {
      feedbackMultiplier = 0.7;
    } else if (feedback >= 3.0) {
      feedbackMultiplier = 0.5;
    } else {
      feedbackMultiplier = 0;
    }
  
    return baseScore * feedbackMultiplier;
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


  {/*1 to 5 tables 8*/}

  
  const [dataAvailable11, setDataAvailable11] = useState(false);
  const [rows11, setRows11] = useState([{ sNo: 1, membership: '', score: 0, dfac: '' }]);

  // State for Section 2
  const [dataAvailableFacilities, setDataAvailableFacilities] = useState(false);
  const [rowsFacilities, setRowsFacilities] = useState([
    { sNo: 1, activity: '', semester: '', role: '', score: 0, certificate: null },
  ]);
  const [totalScoreFacilities, setTotalScoreFacilities] = useState(0);

  // State for Section 3a
  const [dataAvailable3a, setDataAvailable3a] = useState(false);
  const [rows3a, setRows3a] = useState([
    { sNo: 1, from: '', to: '', days: 0, title: '', place: '', score: 0, certificate: null },
  ]);
  const [totalScore, setTotalScore] = useState(0);

  // State for Section 3b
  const [dataAvailable3b, setDataAvailable3b] = useState(false);
  const [rows3b, setRows3b] = useState([
    { sNo: 1, from: '', to: '', days: 0, title: '', activityType: '', role: '', sponsorship: 'No', score: 0, certificate: null },
  ]);
  const [totalScore3b, setTotalScore3b] = useState(0);

  // State for Section 4
  const [dataAvailable4, setDataAvailable4] = useState(false);
  const [rows4, setRows4] = useState([
    { sNo: 1, type: '', points: 0, dfac: '', certificate: null },
  ]);

  // State for Section 5
  const [dataAvailable5, setDataAvailable5] = useState(false);
  const [rows5, setRows5] = useState([
    { sNo: 1, date: '', place: '', type: '', duration: '', score: 0, dfac: '', certificate: null },
  ]);

  // Handlers for Section 1
  const handleMembershipChange = (index, event) => {
    const newRow = [...rows11];
    newRow[index].membership = event.target.value;
    newRow[index].score = calculateScore11(event.target.value);
    setRows11(newRow);
  };

  const handleDfacChange11 = (index, event) => {
    const newRow = [...rows11];
    newRow[index].dfac = event.target.value;
    setRows11(newRow);
  };

  const handleAddRow11 = () => {
    setRows11([...rows11, { sNo: rows11.length + 1, membership: '', score: 0, dfac: '' }]);
  };

  const handleDeleteRow11 = (index) => {
    const newRow = rows11.filter((_, i) => i !== index);
    setRows11(newRow);
  };

  const calculateScore11 = (membership) => {
    switch (membership) {
      case 'International Membership':
        return 10;
      case 'National Membership':
        return 5;
      default:
        return 0;
    }
  };

  // Handlers for Section 2
  const handleRowChangeFacilities = (index, field, value) => {
    const newRow = [...rowsFacilities];
    newRow[index][field] = value;

    if (field === 'role') {
      const role = value;
      newRow[index].score = role === 'Principal Participant' ? 5 : role === 'Other' ? 2.5 : 0;
    }

    setRowsFacilities(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScoreFacilities(total > 20 ? 20 : total); // Cap the total score at 20
  };

  const handleFileUploadFacilities = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const newRow = [...rowsFacilities];
      newRow[index].certificate = file;
      setRowsFacilities(newRow);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  };

  const handleAddRowFacilities = () => {
    setRowsFacilities([
      ...rowsFacilities,
      { sNo: rowsFacilities.length + 1, activity: '', semester: '', role: '', score: 0, certificate: null },
    ]);
  };

  const handleDeleteRowFacilities = (index) => {
    const newRow = rowsFacilities.filter((_, i) => i !== index);
    setRowsFacilities(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScoreFacilities(total > 20 ? 20 : total); // Cap the total score at 20
  };

  // Handlers for Section 3a
  const handleRowChange3a = (index, field, value) => {
    const newRow = [...rows3a];
    newRow[index][field] = value;

    if (field === 'from' || field === 'to') {
      const fromDate = new Date(newRow[index].from);
      const toDate = new Date(newRow[index].to);
      newRow[index].days = fromDate && toDate && fromDate <= toDate ? Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1 : 0;
    }

    if (['days', 'place', 'from', 'to'].includes(field)) {
      const days = newRow[index].days || 0;
      const place = newRow[index].place;
      let baseScore = 0;

      if (place === 'Foreign Countries') baseScore = 50;
      else if (place === 'Premier Institutions') baseScore = days > 10 ? 30 : days >= 7 ? 25 : days >= 4 ? 20 : days >= 1 ? 10 : 0;
      else if (place === 'Universities/Autonomous Institutions') baseScore = days > 10 ? 25 : days >= 7 ? 20 : days >= 4 ? 15 : days >= 1 ? 7.5 : 0;
      else if (place === 'Within College/Proximity') baseScore = days > 10 ? 20 : days >= 7 ? 15 : days >= 4 ? 10 : days >= 1 ? 5 : 0;

      newRow[index].score = baseScore;
    }

    setRows3a(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore(total > 50 ? 50 : total); // Cap the total score at 50
  };

  const handleFileUpload3a = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const newRow = [...rows3a];
      newRow[index].certificate = file;
      setRows3a(newRow);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  };

  const handleAddRow3a = () => {
    setRows3a([
      ...rows3a,
      { sNo: rows3a.length + 1, from: '', to: '', days: 0, title: '', place: '', score: 0, certificate: null },
    ]);
  };

  const handleDeleteRow3a = (index) => {
    const newRow = rows3a.filter((_, i) => i !== index);
    setRows3a(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore(total > 50 ? 50 : total); // Cap the total score at 50
  };

  // Handlers for Section 3b
  const handleRowChange3b = (index, field, value) => {
    const newRow = [...rows3b];
    newRow[index][field] = value;

    if (field === 'from' || field === 'to') {
      const fromDate = new Date(newRow[index].from);
      const toDate = new Date(newRow[index].to);
      newRow[index].days = fromDate && toDate && fromDate <= toDate ? Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1 : 0;
    }

    if (['activityType', 'role', 'sponsorship', 'from', 'to'].includes(field)) {
      const days = newRow[index].days || 0;
      const activityType = newRow[index].activityType;
      const role = newRow[index].role;
      const sponsorship = newRow[index].sponsorship;
      let baseScore = 0;

      if (activityType === 'National Conference') baseScore = 25;
      else if (activityType === 'International Conference') baseScore = 50;
      else if (activityType === 'FDP/STC/Seminar/Workshop') baseScore = days > 10 ? 30 : days >= 7 ? 25 : days >= 4 ? 20 : days >= 1 ? 10 : 0;
      else if (activityType === 'Training Industry Personnel') baseScore = days > 10 ? 25 : days >= 7 ? 20 : days >= 4 ? 15 : days >= 1 ? 7.5 : 0;

      if (sponsorship === 'Yes') baseScore += 10;
      if (role === 'Other') baseScore *= 0.5;

      newRow[index].score = baseScore;
    }

    setRows3b(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore3b(total);
  };

  const handleFileUpload3b = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const newRow = [...rows3b];
      newRow[index].certificate = file;
      setRows3b(newRow);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  };

  const handleAddRow3b = () => {
    setRows3b([
      ...rows3b,
      { sNo: rows3b.length + 1, from: '', to: '', days: 0, title: '', activityType: '', role: '', sponsorship: 'No', score: 0, certificate: null },
    ]);
  };

  const handleDeleteRow3b = (index) => {
    const newRow = rows3b.filter((_, i) => i !== index);
    setRows3b(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore3b(total);
  };

  // Handlers for Section 4
  const handleRowChange4 = (index, field, value) => {
    const newRow = [...rows4];
    newRow[index][field] = value;

    if (field === 'type') {
      switch (value) {
        case 'Guest Lectures Attended':
          newRow[index].points = 3;
          break;
        case 'Guest Lectures Organized':
          newRow[index].points = 6;
          break;
        case 'Guest Lectures Delivered (Premiere Institutions/National Level Industries)':
          newRow[index].points = 20;
          break;
        case 'Guest Lectures Delivered (Local Institutions)':
          newRow[index].points = 10;
          break;
        case 'Invited Lecture (Abroad - IEEE/ASME/ASCE/Sci/Scopus Supported)':
          newRow[index].points = 40;
          break;
        case 'Invited Lecture (Within Country - IEEE/ASME/ASCE/Sci/Scopus Supported)':
          newRow[index].points = 25;
          break;
        case 'Invited Lecture (Others)':
          newRow[index].points = 10;
          break;
        default:
          newRow[index].points = 0;
      }
    }

    setRows4(newRow);
    const total = newRow.reduce((sum, row) => sum + row.points, 0);
    setTotalScore(total);
  };

  const handleFileUpload4 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const newRow = [...rows4];
      newRow[index].certificate = file;
      setRows4(newRow);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  };

  const handleAddRow4 = () => {
    setRows4([
      ...rows4,
      { sNo: rows4.length + 1, type: '', points: 0, dfac: '', certificate: null },
    ]);
  };

  const handleDeleteRow4 = (index) => {
    const newRow = rows4.filter((_, i) => i !== index);
    setRows4(newRow);
    const total = newRow.reduce((sum, row) => sum + row.points, 0);
    setTotalScore(total);
  };

  // Handlers for Section 5
  const handleRowChange5 = (index, field, value) => {
    const newRow = [...rows5];
    newRow[index][field] = value;

    if (field === 'duration') {
      newRow[index].score = value === 'One Day' ? 10 : value === 'More Than One Day' ? 15 : value === '7 Days or More' ? 25 : 0;
    }

    setRows5(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore(total);
  };

  const handleFileUpload5 = (index, event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const newRow = [...rows5];
      newRow[index].certificate = file;
      setRows5(newRow);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  };

  const handleAddRow5 = () => {
    setRows5([
      ...rows5,
      { sNo: rows5.length + 1, date: '', place: '', type: '', duration: '', score: 0, dfac: '', certificate: null },
    ]);
  };

  const handleDeleteRow5 = (index) => {
    const newRow = rows5.filter((_, i) => i !== index);
    setRows5(newRow);
    const total = newRow.reduce((sum, row) => sum + row.score, 0);
    setTotalScore(total);
  };



  const handleSave = async () => {
    const partCData = {
      id: profileId,
      rows6,
      rows7,
      rows8,
      rows9,
      rows10
    };
    try {
      const response = await axios.post('http://localhost:5000/save-partc-data', partCData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
      console.log(error + "Check once..!");
    }
  };

  



  return (
    <div className='parts'>
      <h5>Co-Curricular Teaching& Learning Process of Assistant Professor</h5>
      <p>This is Part C content for Assistant Professor.</p>

      {/*table 6 */}
      <fieldset>
        <legend><h5>6. Student Techno fest (AFOSEC)/Engineers day or other major events</h5></legend>
        <h6>
          mention number of events here like 1,2,3…. Over previous two semesters max (20), Department coordinators(20), others (5), Event coordinators(10). Enclose details clearly certified and authenticated by HOD. (Put in your Co-Curricular file – see note above)
          Max Score 20
          *As defined by Chairman, CAS committee and approved by the Principal
          Self Score
        </h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange6}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable6 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Events</th>
                  <th>Certificate URL</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows6.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.event} onChange={(event) => handleEventChange(index, event)}>
                        <option value="">Select Event</option>
                        <option value="Event Participation">Event Participation</option>
                        <option value="Department Coordinators">Department Coordinators</option>
                        <option value="Event Coordinators">Event Coordinators</option>
                        <option value="Other Contributions">Other Contributions</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.certificateUrl}
                        onChange={(event) => handleCertificateUrlChange(index, event)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChange6(index, event)}
                      />
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
      </fieldset>

      {/*table 7 */}
      <fieldset>
        <legend><h5>7. Student innovations; Guidance</h5></legend>
        <h6>
          Max Score 20
          (a) Participation in state/national events with models (Participation -10 points, First 3 Prizes winning – 20 points; other Prizes – 15 points)
          (b) Motivating Students 10 Points
          (i) Organize Student innovation sessions -3 points each session with participation of at least 10 students with record signed by students and authenticated by HOD leading to application of at least 2 Minor/Major projects or one Patent application within the Academic year.
          OR
          (ii) Brain teasing / Brain storming Sessions - 3 points each session with participation of at least 10 students with the participation of HoD and with record authenticated by HOD leading to application of at least 2 Minor/Major projects or one Patent application within the Academic year.
          Give details with dates below:
        </h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange7}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable7 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Participation</th>
                  <th>Details</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows7.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.participation} onChange={(event) => handleParticipationChange(index, event)}>
                        <option value="">Select Participation</option>
                        <option value="Participation in state/national events with models">Participation in state/national events with models</option>
                        <option value="First 3 Prizes winning">First 3 Prizes winning</option>
                        <option value="Other Prizes">Other Prizes</option>
                        <option value="Motivating Students">Motivating Students</option>
                        <option value="Organize Student innovation sessions">Organize Student innovation sessions</option>
                        <option value="Brain teasing / Brain storming Sessions">Brain teasing / Brain storming Sessions</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.details}
                        onChange={(event) => handleDetailsChange(index, event)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChange7(index, event)}
                      />
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
      </fieldset>

        {/*table 8 */}
      <fieldset>
      <legend><h5>8. Consultancy</h5></legend>
      <h6>
        (participation) Give details with dates below authenticated by HOD: Include this in Co-Curricular File.
        Less than Rs. 25000/- 05 points ; 25000 to 50000 – 10 points ; 50000 to 100000 – 30 points ; greater than 100000 – 40 points
        Max Score 40
      </h6>
      <label>Is data available?</label>
      <select onChange={handleDataAvailableChange8}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {dataAvailable8 && (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Consultancy</th>
                <th>Details</th>
                <th>Score</th>
                <th>DFAC</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows8.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>
                    <input
                      type="number"
                      value={row.consultancy}
                      onChange={(event) => handleConsultancyChange(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.details}
                      onChange={(event) => handleDetailsChange8(index, event)}
                    />
                  </td>
                  <td>{row.score}</td>
                  <td>
                    <input
                      type="text"
                      value={row.dfac}
                      onChange={(event) => handleDfacChange8(index, event)}
                    />
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
      </fieldset>


          {/*table 9 */}
      <fieldset>
        <legend><h5>9. Arranging Internships for students with proof</h5></legend>
        <h6>
          At Industry/ R & D Organisations per each student = 5 points
          Identification of New Industry / Company / R&D Lab =10 points per industry
          Max Score 30
        </h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange9}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable9 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Internship</th>
                  <th>Details</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows9.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.internship} onChange={(event) => handleInternshipChange(index, event)}>
                        <option value="">Select Internship</option>
                        <option value="At Industry/ R & D Organisations per each student">At Industry/ R & D Organisations per each student</option>
                        <option value="Identification of New Industry / Company / R&D Lab">Identification of New Industry / Company / R&D Lab</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.details}
                        onChange={(event) => handleDetailsChange9(index, event)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChange9(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow9(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow9} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>

       {/*table 10 */}
       <fieldset>
        <legend><h5>10. Knowledge sharing with other departments</h5></legend>
        <h6>
          Short term training courses both theoretical and experimental for faculty and students of other departments in our college:
          1-3 Days – 7.5 points; 4-6 days – 15 points; 7-10 days – 20 points; gretaer than 10 days – 30 points.
          Student/faculty feedback to be taken:
          (&lt;3.0=0, 3.0-3.5=50%, 3.6-4.0=70%, 4.0-4.5=90%, 4.5-5.0=100% of the above points points)
          HOD to certify
          Max=30 points
        </h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange10}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable10 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Course Duration</th>
                  <th>Feedback</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows10.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select value={row.courseDuration} onChange={(event) => handleCourseDurationChange(index, event)}>
                        <option value="">Select Duration</option>
                        <option value="1-3 Days">1-3 Days</option>
                        <option value="4-6 Days">4-6 Days</option>
                        <option value="7-10 Days">7-10 Days</option>
                        <option value=">10 Days">greater than 10 Days</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={row.feedback}
                        onChange={(event) => handleFeedbackChange(index, event)}
                      />
                    </td>
                    <td>{row.score}</td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChange10(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow10(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow10} style={{ width: '100%', marginTop: '10px' }}>Add Row</button>
          </div>
        )}
      </fieldset>
      <button type="button" onClick={() => openTab('Part-B')} className="btn btn-secondary">Previous</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={handleSave} style={{ backgroundColor: '#2896a7' }}>Save</button>
      <span style={{ margin: '0 10px' }}></span> {/* Gap */}
      <button type="button" onClick={() => openTab('Part-D')}>Next</button>
    </div>
  );
}

export default PartCAssistantProfessor;