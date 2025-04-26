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


  useEffect(() => {
    const fetchPartCData = async () => {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile && savedProfile.id) {
        try {
          const response = await axios.get(`http://localhost:5000/get-part-data?id=${savedProfile.id}&part=partc`);
          if (response.status === 200 && response.data.success) {
            const partCData = response.data.data;
  
            // Populate rows with fetched data or fallback to default values
            setRows11(partCData.rows11?.data || []); // Table 1
            setRows2(partCData.rows2?.data || []); // Table 2
            setRowsEvents(partCData.rowsEvents?.data || []); // Table 3
            setRows4(partCData.rows4?.data || []); // Table 4
            setRows5(partCData.rows5?.data || []); // Table 5
            setRows6(partCData.rows6?.data || []); // Table 6
            setRows7(partCData.rows7?.data || []); // Table 7
            setRows8(partCData.rows8?.data || []); // Table 8
            setRows9(partCData.rows9?.data || []); // Table 9
            setRows10(partCData.rows10?.data || []); // Table 10
          }
        } catch (error) {
          console.error('Error fetching PartC data:', error);
        }
      }
    };
  
    fetchPartCData();
  }, []);


  
  

  const handleAddRow6 = () => {
    // Check if the current self-score is 20 or more
    if (calculateTotalScore6() >= 20) {
        alert("Maximum self-score of 20 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        sNo: rows6.length + 1,  // Increment S.No.
        event: "",              // Default value for Event
        certificateUrl: null,   // Default value for Certificate URL
        dfac: "",               // Default value for DFAC
    };

    setRows6([...rows6, newRow]); // Update the rows state with the new row
  };

  const handleAddRow7 = () => {
    // Check if the current self-score is 20 or more
    if (calculateSelfScore7() >= 20) {
        alert("Maximum self-score of 20 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        sNo: rows7.length + 1,  // Increment S.No.
        participation: "",      // Default value for Participation
        details: null,          // Default value for Details (file input)
        dfac: "",               // Default value for DFAC
    };

    setRows7([...rows7, newRow]); // Update the rows state with the new row
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
    // Check if the current self-score is 40 or more
    if (calculateSelfScore8() >= 40) {
        alert("Maximum self-score of 40 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        sNo: rows8.length + 1,  // Increment S.No.
        consultancy: 0,         // Default value for Consultancy
        details: null,          // Default value for Details (file input)
        dfac: "",               // Default value for DFAC
    };

    setRows8([...rows8, newRow]); // Update the rows state with the new row
};

  const handleDeleteRow8 = (index) => {
    const newRow = rows8.filter((row, i) => i !== index);
    setRows8(newRow);
  };

  const handleAddRow9 = () => {
    // Check if the current self-score is 30 or more
    if (calculateSelfScore9() >= 30) {
        alert("Maximum self-score of 30 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        sNo: rows9.length + 1,  // Increment S.No.
        internship: "",         // Default value for Internship
        details: null,          // Default value for Details (file input)
        score: 0,               // Default value for Score
        dfac: "",               // Default value for DFAC
    };

    setRows9([...rows9, newRow]); // Update the rows state with the new row
};
  
  const handleDeleteRow9 = (index) => {
    const newRow = rows9.filter((row, i) => i !== index);
    setRows9(newRow);
  };

  const handleAddRow10 = () => {
    // Check if the current self-score is 30 or more
    if (calculateSelfScore10() >= 30) {
        alert("Maximum self-score of 30 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = {
        sNo: rows10.length + 1,  // Increment S.No.
        courseDuration: "",      // Default value for Course Duration
        feedback: 0,             // Default value for Feedback
        dfac: "",                // Default value for DFAC
    };

    setRows10([...rows10, newRow]); // Update the rows state with the new row
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
    const updatedRows = [...rows7];
    updatedRows[index].participation = event.target.value;

    // Dynamically calculate score for the row based on participation
    updatedRows[index].score = calculateScore7(event.target.value);

    setRows7(updatedRows); // Update the state with the modified rows
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
    const updatedRows = [...rows9];
    updatedRows[index].internship = event.target.value;

    // Dynamically calculate score for the row based on the internship value
    updatedRows[index].score = calculateScore9(updatedRows[index].internship);

    setRows9(updatedRows); // Update the state with the modified rows
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
        return 5;
      case 'Department Coordinators':
        return 5;
      case 'Event Coordinators':
        return 5;
      case 'Other Contributions':
        return 5;
      default:
        return 0;
    }
  };

  const calculateTotalScore6 = () => {
    const totalScore = rows6.reduce((total, row) => total + calculateScore6(row.event), 0);
    return Math.min(totalScore, 20); // Cap the total score to 20
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

  const calculateSelfScore7 = () => {
    if (rows7.length === 0) return 0; // If no rows, return 0

    // Sum up the values in the "Score" column
    const totalScore = rows7.reduce((total, row) => total + parseFloat(row.score || 0), 0);

    // Ensure the total score is capped at 20
    const cappedScore = Math.min(totalScore, 20);

    return cappedScore.toFixed(2); // Return the score with 2 decimal places
};


  const calculateScore8 = (consultancy) => {
    if (consultancy < 25000) return 5;
    if (consultancy >= 25000 && consultancy <= 50000) return 10;
    if (consultancy > 50000 && consultancy <= 100000) return 30;
    if (consultancy > 100000) return 40;
    return 0;
  };

  const calculateSelfScore8 = () => {
    if (rows8.length === 0) return 0;
  
    // Calculate the total score by summing up all row scores
    const totalScore = rows8.reduce(
      (total, row) => total + calculateScore8(row.consultancy),
      0
    );
  
    // Calculate the average score
    const averageScore = totalScore / rows8.length;
  
    // Scale the average score to ensure it is capped at 40
    const scaledScore = Math.min((averageScore / 40) * 40, 40);
  
    return scaledScore.toFixed(2); // Return the score with 2 decimal places
  };

  const calculateScore9 = (internship) => {
    switch (internship) {
        case "At Industry/ R & D Organisations per each student":
            return 10; // Example score
        case "Identification of New Industry / Company / R&D Lab":
            return 15; // Example score
        default:
            return 0; // Default score
    }
};

  const calculateSelfScore9 = () => {
    if (rows9.length === 0) return 0; // If no rows, return 0

    // Sum up the values in the "Score" column
    const totalScore = rows9.reduce((total, row) => total + parseFloat(row.score || 0), 0);

    // Ensure the total score is capped at 30
    const cappedScore = Math.min(totalScore, 30);

    return cappedScore.toFixed(2); // Return the score with 2 decimal places
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

  const calculateSelfScore10 = () => {
    if (rows10.length === 0) return 0;
  
    // Calculate the total score by summing up all row scores
    const totalScore = rows10.reduce(
      (total, row) => total + calculateScore10(row.courseDuration, row.feedback),
      0
    );
  
    // Cap the score at 30
    const cappedScore = Math.min(totalScore, 30);
  
    return cappedScore.toFixed(2); // Return the capped score with 2 decimal places
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


  {/*1 to 5 tables */}

  
  const [dataAvailable11, setDataAvailable11] = useState(false);
  const [rows11, setRows11] = useState([{ sNo: 1, membership: '', score: 0, dfac: '' }]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDataAvailableChange11 = (event) => {
    setDataAvailable11(event.target.value === 'Yes');
  };


// Add a new row
const handleAddRowEvents = () => {
  // Check if the current self-score is 50 or more
  if (totalScoreEvents >= 50) {
      alert("Maximum self-score of 50 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      sNo: rowsEvents.length + 1,  // Increment S.No.
      activity: "",               // Default value for Activity
      fromDate: "",               // Default value for From Date
      toDate: "",                 // Default value for To Date
      noOfDays: "",               // Default value for No. of Days
      title: "",                  // Default value for Title
      score: 0,                   // Default score
      certificate: null,          // Default value for Certificate
  };

  setRowsEvents([...rowsEvents, newRow]); // Update the rows state with the new row
};

// Handle input changes
const handleRowChangeEvents = (index, field, value) => {
  const updatedRows = [...rowsEvents];
  updatedRows[index][field] = value;

  if (field === 'activity' || field === 'noOfDays') {
    calculateScore(index);
  }

  setRowsEvents(updatedRows);
};

// Delete a row
const handleDeleteRowEvents = (index) => {
  const updatedRows = rowsEvents.filter((_, rowIndex) => rowIndex !== index);
  setRowsEvents(updatedRows);
  calculateTotalScoreEvents(updatedRows); // Recalculate total score
};

// Calculate score for a specific row
const calculateScore = (index) => {
  const updatedRows = [...rowsEvents];
  const row = updatedRows[index];
  let score = 0;

  const noOfDays = parseInt(row.noOfDays || 0, 10);
  if (row.activity === 'Attending') {
    if (noOfDays <= 3) score = 10;
    else if (noOfDays <= 6) score = 20;
    else if (noOfDays <= 10) score = 25;
    else score = 30;
  } else if (row.activity === 'Organizing') {
    if (noOfDays <= 3) score = 10;
    else if (noOfDays <= 6) score = 20;
    else if (noOfDays <= 10) score = 25;
    else score = 30;
  }

  updatedRows[index].score = score;
  setRowsEvents(updatedRows);
  calculateTotalScoreEvents(updatedRows); // Recalculate total score
};

// Calculate total score for all rows
const calculateTotalScoreEvents = (rows) => {
  const totalScore = rows.reduce((sum, row) => sum + (row.score || 0), 0);
  const cappedScore = Math.min(totalScore, 50);
  setTotalScoreEvents(cappedScore);
};


// State variables
const [rows2, setRows2] = useState([]);
const [dataAvailable2, setDataAvailable2] = useState(false);
const [totalScore2, setTotalScore2] = useState(0);

// Calculate total score for all rows
const calculateTotalScore2 = (rows) => {
  const totalScore = rows.reduce((sum, row) => sum + (row.score || 0), 0);
  // Cap the total score to a maximum of 20
  const cappedScore = Math.min(totalScore, 20);
  setTotalScore2(cappedScore);
};


// Add a new row
const handleAddRow2 = () => {
  // Check if the current self-score is 20 or more
  if (totalScore2 >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      sNo: rows2.length + 1,  // Increment S.No.
      activity: "",           // Default value for Activity
      semester: "",           // Default value for Semester
      role: "",               // Default value for Role
      score: 0,               // Default score
      certificate: null,      // Default value for Certificate
  };

  setRows2([...rows2, newRow]); // Update the rows state with the new row
};

// Handle input changes
const handleRowChange2 = (index, field, value) => {
  const updatedRows = [...rows2];
  updatedRows[index][field] = value;

  if (field === 'role') {
    calculateScore2(index); // Update score if role is changed
  }

  setRows2(updatedRows);
};

// Delete a row
const handleDeleteRow2 = (index) => {
  const updatedRows = rows2.filter((_, rowIndex) => rowIndex !== index);
  setRows2(updatedRows);
  calculateTotalScore2(updatedRows); // Recalculate total score
};

// Calculate score for a specific row
const calculateScore2 = (index) => {
  const updatedRows = [...rows2];
  const row = updatedRows[index];
  let score = 0;

  if (row.role === 'Principal Participant') {
    score = 5; // Principal participant score
  } else if (row.role === 'Other') {
    score = 2.5; // Other participants score
  }

  updatedRows[index].score = score;
  setRows2(updatedRows);
  calculateTotalScore2(updatedRows); // Recalculate total score
};


// Handle file upload
const handleFileUpload2 = (index, event) => {
  const updatedRows = [...rows2];
  updatedRows[index].certificate = event.target.files[0];
  setRows2(updatedRows);
};

//Handle file upload for events
const handleFileUploadEvents = (index, event) => {
  const updatedRows = [...rowsEvents];
  updatedRows[index].certificate = event.target.files[0];
  setRowsEvents(updatedRows);
};

  // State variables
const [rows4, setRows4] = useState([]);
const [dataAvailable4, setDataAvailable4] = useState(false);
const [totalPoints4, setTotalPoints4] = useState(0);

// Add a new row
const handleAddRow4 = () => {
  // Check if the current self-score is 20 or more
  if (totalPoints4 >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      sNo: rows4.length + 1,    // Increment S.No.
      activity: "",             // Default value for Activity
      details: "",              // Default value for Details
      points: 0,                // Default points
      certificate: null,        // Default value for Certificate
  };

  setRows4([...rows4, newRow]); // Update the rows state with the new row
};

// Handle input changes
const handleRowChange4 = (index, field, value) => {
  const updatedRows = [...rows4];
  updatedRows[index][field] = value;

  if (field === 'activity') {
    calculateScore4(index); // Update points if activity is changed
  }

  setRows4(updatedRows);
};

// Delete a row
const handleDeleteRow4 = (index) => {
  const updatedRows = rows4.filter((_, rowIndex) => rowIndex !== index);
  setRows4(updatedRows);
  calculateTotalPoints4(updatedRows); // Recalculate total points
};

// Calculate points for a specific row
const calculateScore4 = (index) => {
  const updatedRows = [...rows4];
  const row = updatedRows[index];
  let points = 0;

  switch (row.activity) {
    case 'Guest Lecture Attended':
      points = 3; // 3 points per lecture
      break;
    case 'Guest Lecture Organized':
      points = 6; // 6 points per lecture
      break;
    case 'Guest Lecture Delivered (Premier Instns)':
      points = 20; // 20 points per lecture
      break;
    case 'Guest Lecture Delivered (Local Instns)':
      points = 10; // 10 points per lecture
      break;
    case 'Invited Lecture (Abroad)':
      points = 40; // 40 points
      break;
    case 'Invited Lecture (Within Country)':
      points = 25; // 25 points
      break;
    case 'Invited Lecture (Others)':
      points = 10; // 10 points
      break;
    default:
      points = 0;
  }

  updatedRows[index].points = points;
  setRows4(updatedRows);
  calculateTotalPoints4(updatedRows); // Recalculate total points
};

// Calculate total points for all rows
const calculateTotalPoints4 = (rows) => {
  const totalPoints = rows.reduce((sum, row) => sum + (row.points || 0), 0);
  setTotalPoints4(totalPoints);
};

// Handle file upload
const handleFileUpload4 = (index, event) => {
  const updatedRows = [...rows4];
  updatedRows[index].certificate = event.target.files[0];
  setRows4(updatedRows);
};

// State variables
const [rows5, setRows5] = useState([]);
const [dataAvailable5, setDataAvailable5] = useState(false);
const [totalPoints5, setTotalPoints5] = useState(0);

// Add a new row
const handleAddRow5 = () => {
  // Check if the current self-score is 15 or more
  if (totalPoints5 >= 15) {
      alert("Maximum self-score of 15 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      sNo: rows5.length + 1,    // Increment S.No.
      date: "",                 // Default value for Date
      place: "",                // Default value for Place
      localOutside: "",         // Default value for Local/Outside
      duration: "",             // Default value for Duration
      points: 0,                // Default points
      certificate: null,        // Default value for Certificate
  };

  setRows5([...rows5, newRow]); // Update the rows state with the new row
};

// Handle input changes
const handleRowChange5 = (index, field, value) => {
  const updatedRows = [...rows5];
  updatedRows[index][field] = value;

  if (field === 'duration') {
    calculateScore5(index); // Update points if duration is changed
  }

  setRows5(updatedRows);
};

// Delete a row
const handleDeleteRow5 = (index) => {
  const updatedRows = rows5.filter((_, rowIndex) => rowIndex !== index);
  setRows5(updatedRows);
  calculateTotalPoints5(updatedRows); // Recalculate total points
};

// Calculate points for a specific row
const calculateScore5 = (index) => {
  const updatedRows = [...rows5];
  const row = updatedRows[index];
  let points = 0;

  const duration = parseInt(row.duration || 0, 10);

  if (duration > 1) {
    points = 15; // More than 1 day trip
    if (duration >= 7) {
      points += 10; // Add 10 points for tours of duration equal to or more than 7 days
    }
  } else if (duration === 1) {
    points = 10; // One day trip
  }

  updatedRows[index].points = points;
  setRows5(updatedRows);
  calculateTotalPoints5(updatedRows); // Recalculate total points
};

// Calculate total points for all rows
const calculateTotalPoints5 = (rows) => {
  const totalPoints = rows.reduce((sum, row) => sum + (row.points || 0), 0);
  setTotalPoints5(totalPoints);
};

// Handle file upload
const handleFileUpload5 = (index, event) => {
  const updatedRows = [...rows5];
  updatedRows[index].certificate = event.target.files[0];
  setRows5(updatedRows);
};



  
    
  {/* un wanted */}

  const handleMembershipChange = (index, event) => {
    const newRows11 = [...rows11];
    newRows11[index].membership = event.target.value;
  
    // Calculate score based on membership type
    if (event.target.value === 'International Membership') {
      newRows11[index].score = 10;
    } else if (event.target.value === 'National Membership') {
      newRows11[index].score = 5;
    } else {
      newRows11[index].score = 0; // Default score
    }
  
    setRows11(newRows11);
  };


  const handleDfacChange11 = (index, event) => {
    const newRow = [...rows11];
    newRow[index].dfac = event.target.value;
    setRows11(newRow);
  };

  // Function to add a new row to the table
const handleAddRow11 = () => {
  // Check if adding a new row would exceed the maximum self-score of 15
  const currentSelfScore = calculateSelfScore1();
  if (currentSelfScore >= 15) {
      alert("Maximum score of 15 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = {
      sNo: rows11.length + 1,
      membership: "", // Default value
      score: 0,       // Default score
      dfac: "",       // Default value for DFAC
  };
  setRows11([...rows11, newRow]);
};


  const handleDeleteRow11 = (index) => {
    const newRow = rows11.filter((_, i) => i !== index);
    setRows11(newRow);
  };


  const [rowsEvents, setRowsEvents] = useState([]);
  const [dataAvailableEvents, setDataAvailableEvents] = useState(false);
  const [totalScoreEvents, setTotalScoreEvents] = useState(0);

  const calculateSelfScore1 = () => {
    return rows11.reduce((total, row) => total + (parseInt(row.score) || 0), 0);
  };

  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      setUploadedFile(file);
    } else {
      alert('File size must be less than or equal to 100 KB.');
      event.target.value = null;
    }
  }


 

  
  
  // Self-score and DFAC-score states for all tables
const [dfacScore1, setDfacScore1] = useState(0);
const [dfacScore2, setDfacScore2] = useState(0);
const [dfacScore3, setDfacScore3] = useState(0);
const [dfacScore4, setDfacScore4] = useState(0);
const [dfacScore5, setDfacScore5] = useState(0);
const [dfacScore6, setDfacScore6] = useState(0);
const [dfacScore7, setDfacScore7] = useState(0);
const [dfacScore8, setDfacScore8] = useState(0);
const [dfacScore9, setDfacScore9] = useState(0);
const [dfacScore10, setDfacScore10] = useState(0);


 

  const handleSave = async () => {
    const partCData = {
      id: profileId,
      rows1: {
        data: rows11,
        selfScore: calculateSelfScore1(), // Automatically calculate self-score for Table 1
        dfacScore: dfacScore1, // DFAC score for Table 1
      },
      rows2: {
        data: rows2,
        selfScore: totalScore2,
        dfacScore: dfacScore2,
      },
      rows3: {
        data: rowsEvents,
        selfScore:  totalScoreEvents,
        dfacScore: dfacScore3,
      },
      rows4: {
        data: rows4,
        selfScore: totalPoints4,
        dfacScore: dfacScore4,
      },
      rows5: {
        data: rows5,
        selfScore: totalPoints5,
        dfacScore: dfacScore5,
      },
      rows6: {
        data: rows6,
        selfScore: calculateTotalScore6(),
        dfacScore: dfacScore6,
      },
      rows7: {
        data: rows7,
        selfScore: calculateSelfScore7(),
        dfacScore: dfacScore7,
      },
      rows8: {
        data: rows8,
        selfScore: calculateSelfScore8(),
        dfacScore: dfacScore8,
      },
      rows9: {
        data: rows9,
        selfScore: calculateSelfScore9(),
        dfacScore: dfacScore9,
      },
      rows10: {
        data: rows10,
        selfScore: calculateSelfScore10(),
        dfacScore: dfacScore10,
      },
    };
  
    try {
      const response = await axios.post('http://localhost:5000/save-partc-data', partCData);
      alert(response.data.message);
    } catch (error) {
      alert('Error saving data');
      console.log(error + " Check once..!");
    }
  };
  



  return (
    <div className='parts'>
      <h2>Co-curricular Teaching & Learning Process</h2>
      

     {/*table 1 */}
      <fieldset>
        <legend><h5>1. Membership of Professional Societies</h5></legend>
        <h6>
          Mention memberships (Each Membership = 5 points). International = 10 points; National = 5 points.
          *Online memberships – no weightage. Max Score: 15
        </h6>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange11}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable11 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Membership</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows11.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <select
                        value={row.membership}
                        onChange={(event) => handleMembershipChange(index, event)}
                      >
                        <option value="">Select Membership</option>
                        <option value="International Membership">International Membership</option>
                        <option value="National Membership">National Membership</option>
                      </select>
                    </td>
                    <td>
                      {row.score}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac}
                        onChange={(event) => handleDfacChange11(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow11(index)}>Delete Row</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
                type="button"
                onClick={handleAddRow11}
                style={{ width: "100%", marginTop: "10px" }}
            >
                Add Row
            </button>
            
            {/* Self Score and DFAC Score Below the Table */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <label>
                  Self Score:
                  <input
                    type="number"
                    value={calculateSelfScore1()} // Automatically calculate self-score
                    readOnly
                  />
                </label>
                <label>
                  DFAC Score:
                  <input
                    type="number"
                    value={dfacScore1} // Disable DFAC score (static or default value)
                    disabled
                  />
                </label>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label>Upload Certified PDF (Max: 100 KB): </label>
              <input type="file" accept=".pdf" onChange={handleFileUpload} />
              {uploadedFile && <p>Uploaded File: {uploadedFile.name}</p>}
            </div>
          </div>
        )}
      </fieldset>

      {/*table 2 */} 
      <div>
        {/* Section 2: Departmental Development of Facilities */}
        <fieldset>
          <legend>
            <h5>2. Departmental Development of Facilities</h5>
          </legend>
          <label>Is data available?</label>
          <select onChange={(event) => setDataAvailable2(event.target.value === 'Yes')}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {dataAvailable2 && (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>Semester</th>
                    <th>Role</th>
                    <th>Score</th>
                    <th>Certificate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows2.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select
                          value={row.activity || ''}
                          onChange={(event) => handleRowChange2(index, 'activity', event.target.value)}
                        >
                          <option value="">Select Activity</option>
                          <option value="Laboratory infrastructure upgradation">Laboratory infrastructure upgradation</option>
                          <option value="Common student facilities">Common student facilities</option>
                          <option value="Addition & use of new software">Addition & use of new software</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={row.semester || ''}
                          onChange={(event) => handleRowChange2(index, 'semester', event.target.value)}
                        >
                          <option value="">Select Semester</option>
                          <option value="SEM-I">SEM-I</option>
                          <option value="SEM-II">SEM-II</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={row.role || ''}
                          onChange={(event) => {
                            handleRowChange2(index, 'role', event.target.value);
                            calculateScore2(index); // Auto-calculate score
                          }}
                        >
                          <option value="">Select Role</option>
                          <option value="Principal Participant">Principal Participant</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td>
                        <input type="number" value={row.score || 0} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(event) => handleFileUpload2(index, event)}
                        />
                        {row.certificate && <p>{row.certificate.name}</p>}
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow2(index)}>
                          Delete Row
                        </button>
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
               <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label>
                        Self Score:
                        <input
                          type="number"
                          value={totalScore2} // Dynamically calculate Self-Score
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
            </div>
          )}
        </fieldset>
      </div>


     {/*table 3 */}
      <>
        <div>
          {/* Section 3: Attending/Organizing Events */}
          <fieldset>
            <legend>
              <h5>3. Attending/Organizing Events</h5>
            </legend>
            <label>Is data available?</label>
            <select onChange={(event) => setDataAvailableEvents(event.target.value === 'Yes')}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {dataAvailableEvents && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '5%', textAlign: 'center', padding: '10px' }}>S.No.</th>
                      <th style={{ width: '15%', textAlign: 'center', padding: '10px' }}>Activity</th>
                      <th style={{ width: '20%', textAlign: 'center', padding: '10px' }}>Dates</th>
                      <th style={{ width: '10%', textAlign: 'center', padding: '10px' }}>No. of Days</th>
                      <th style={{ width: '25%', textAlign: 'center', padding: '10px' }}>Title, Place, Month & Year</th>
                      <th style={{ width: '10%', textAlign: 'center', padding: '10px' }}>Score</th>
                      <th style={{ width: '10%', textAlign: 'center', padding: '10px' }}>Certificate</th>
                      <th style={{ width: '5%', textAlign: 'center', padding: '10px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsEvents.map((row, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: 'center', padding: '10px' }}>{row.sNo}</td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <select
                            value={row.activity || ''}
                            onChange={(event) => handleRowChangeEvents(index, 'activity', event.target.value)}
                            style={{ width: '100%', padding: '5px' }}
                          >
                            <option value="">Select Activity</option>
                            <option value="Attending">Attending</option>
                            <option value="Organizing">Organizing</option>
                          </select>
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <input
                            type="date"
                            value={row.fromDate || ''}
                            onChange={(event) => handleRowChangeEvents(index, 'fromDate', event.target.value)}
                            style={{ width: '45%', padding: '5px' }}
                          />{' '}
                          to{' '}
                          <input
                            type="date"
                            value={row.toDate || ''}
                            onChange={(event) => handleRowChangeEvents(index, 'toDate', event.target.value)}
                            style={{ width: '45%', padding: '5px' }}
                          />
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <input
                            type="number"
                            value={row.noOfDays || ''}
                            onChange={(event) => {
                              handleRowChangeEvents(index, 'noOfDays', event.target.value);
                              calculateScore(index); // Auto-calculate score
                            }}
                            style={{ width: '100%', padding: '5px' }}
                          />
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <input
                            type="text"
                            value={row.title || ''}
                            onChange={(event) => handleRowChangeEvents(index, 'title', event.target.value)}
                            style={{ width: '100%', padding: '5px' }}
                          />
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <input
                            type="number"
                            value={row.score || ''}
                            readOnly
                            style={{ width: '100%', padding: '5px' }}
                          />
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(event) => handleFileUploadEvents(index, event)}
                            style={{ width: '100%', padding: '5px' }}
                          />
                          {row.certificate && (
                            <p style={{ fontSize: '12px', margin: '5px 0 0' }}>{row.certificate.name}</p>
                          )}
                        </td>
                        <td style={{ textAlign: 'center', padding: '10px' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteRowEvents(index)}
                            style={{ padding: '5px 10px' }}
                          >
                            Delete Row
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={handleAddRowEvents}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '10px',
                    
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                  }}
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
                        value={totalScoreEvents} // Dynamically calculate Self-Score
                        readOnly
                        style={{ padding: '5px', width: '100px' }}
                      />
                    </label>
                    <label>
                      DFAC Score:
                      <input
                        type="number"
                        value={dfacScore3} // Static DFAC Score
                        disabled // DFAC Score is disabled
                        style={{ padding: '5px', width: '100px' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </>

      {/*table 4 */}
      <div>
        {/* Section 4: Guest Lectures Attended or Delivered */}
        <fieldset>
          <legend>
            <h5>4. Guest Lectures Attended or Delivered</h5>
          </legend>
          <label>Is data available?</label>
          <select onChange={(event) => setDataAvailable4(event.target.value === 'Yes')}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {dataAvailable4 && (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Activity</th>
                    <th>Details</th>
                    <th>Points</th>
                    <th>Certificate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows4.map((row, index) => (
                    <tr key={index}>
                      <td>{row.sNo}</td>
                      <td>
                        <select
                          value={row.activity || ''}
                          onChange={(event) => {
                            handleRowChange4(index, 'activity', event.target.value);
                            calculateScore4(index); // Auto-calculate score
                          }}
                        >
                          <option value="">Select Activity</option>
                          <option value="Guest Lecture Attended">Guest Lecture Attended</option>
                          <option value="Guest Lecture Organized">Guest Lecture Organized</option>
                          <option value="Guest Lecture Delivered (Premier Instns)">Guest Lecture Delivered (Premier Instns)</option>
                          <option value="Guest Lecture Delivered (Local Instns)">Guest Lecture Delivered (Local Instns)</option>
                          <option value="Invited Lecture (Abroad)">Invited Lecture (Abroad)</option>
                          <option value="Invited Lecture (Within Country)">Invited Lecture (Within Country)</option>
                          <option value="Invited Lecture (Others)">Invited Lecture (Others)</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.details || ''}
                          onChange={(event) => handleRowChange4(index, 'details', event.target.value)}
                        />
                      </td>
                      <td>
                        <input type="number" value={row.points || 0} readOnly />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(event) => handleFileUpload4(index, event)}
                        />
                        {row.certificate && <p>{row.certificate.name}</p>}
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow4(index)}>
                          Delete Row
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow4}
                style={{ width: '100%', marginTop: '10px' }}
              >
                Add Row
              </button>

              {/* Self-Score and DFAC Score */}
              <div style={{ marginTop: "20px" }}>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <label>
                          Self Score:
                          <input
                            type="number"
                            value={totalPoints4} // Dynamically calculate Self-Score
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
            </div>
          )}
        </fieldset>
      </div>

      {/*table 5 */}
      <div>
      {/* Section 5: Accompanied Students on Industrial Tours */}
      <fieldset>
        <legend>
          <h5>5. Accompanied Students on Industrial Tours</h5>
        </legend>
        <label>Is data available?</label>
        <select onChange={(event) => setDataAvailable5(event.target.value === 'Yes')}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable5 && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Date</th>
                  <th>Place</th>
                  <th>Local/Outside</th>
                  <th>Duration (Days)</th>
                  <th>Points</th>
                  <th>Certificate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows5.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>
                      <input
                        type="date"
                        value={row.date || ''}
                        onChange={(event) => handleRowChange5(index, 'date', event.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.place || ''}
                        onChange={(event) => handleRowChange5(index, 'place', event.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={row.localOutside || ''}
                        onChange={(event) => handleRowChange5(index, 'localOutside', event.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Local">Local</option>
                        <option value="Outside">Outside</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.duration || ''}
                        onChange={(event) => {
                          handleRowChange5(index, 'duration', event.target.value);
                          calculateScore5(index); // Auto-calculate points
                        }}
                      />
                    </td>
                    <td>
                      <input type="number" value={row.points || 0} readOnly />
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(event) => handleFileUpload5(index, event)}
                      />
                      {row.certificate && <p>{row.certificate.name}</p>}
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow5(index)}>
                        Delete Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleAddRow5}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Add Row
            </button>

            {/* Self-Score and DFAC Score */}
            <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label>
                        Self Score:
                        <input
                          type="number"
                          value={totalPoints5} // Dynamically calculate Self-Score
                          readOnly
                        />
                      </label>
                      <label>
                        DFAC Score:
                        <input
                          type="number"
                          value={dfacScore5} // Static DFAC Score
                          disabled // DFAC Score is disabled
                        />
                      </label>
                    </div>
            </div>
          </div>
        )}
      </fieldset>
      </div>



    
    {/* Table 6 */}
    <fieldset>
      <legend>
        <h5>6. Student Techno fest (AFOSEC)/Engineers day or other major events</h5>
      </legend>
      <label>Is data available?</label>
      <select onChange={handleDataAvailableChange6}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {dataAvailable6 && (
        <div style={{ overflowX: 'auto' }}>
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
                    <select
                      value={row.event}
                      onChange={(event) => handleEventChange(index, event)}
                    >
                      <option value="">Select Event</option>
                      <option value="Event Participation">Event Participation</option>
                      <option value="Department Coordinators">Department Coordinators</option>
                      <option value="Event Coordinators">Event Coordinators</option>
                      <option value="Other Contributions">Other Contributions</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(event) => handleCertificateUrlChange(index, event)}
                    />
                  </td>
                  <td>{calculateScore6(row.event)}</td>
                  <td>
                    <input
                      type="text"
                      value={row.dfac}
                      onChange={(event) => handleDfacChange6(index, event)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDeleteRow6(index)}>
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddRow6}
            style={{ width: '100%', marginTop: '10px' }}
          >
            Add Row
          </button>

          {/* Self-Score and DFAC Score - Properly Nested */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
            <label>
              Self Score:
              <input
                type="number"
                value={calculateTotalScore6()} // Dynamically calculate Self-Score
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
      )}
    </fieldset>



    {/* Table 7 */}
      <fieldset>
        <legend>
          <h5>7. Student innovations; Guidance</h5>
        </legend>
        <label>Is data available?</label>
        <select onChange={handleDataAvailableChange7}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {dataAvailable7 && (
          <div style={{ overflowX: 'auto' }}>
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
                      <select
                        value={row.participation || ""} // Ensure controlled input
                        onChange={(event) => handleParticipationChange(index, event)}
                      >
                        <option value="">Select Participation</option>
                        <option value="Participation in state/national events with models">
                          Participation in state/national events with models
                        </option>
                        <option value="First 3 Prizes winning">First 3 Prizes winning</option>
                        <option value="Other Prizes">Other Prizes</option>
                        <option value="Motivating Students">Motivating Students</option>
                        <option value="Organize Student innovation sessions">
                          Organize Student innovation sessions
                        </option>
                        <option value="Brain teasing / Brain storming Sessions">
                          Brain teasing / Brain storming Sessions
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(event) => handleDetailsChange(index, event)}
                      />
                    </td>
                    <td>
                      {calculateScore7(row.participation)} {/* Dynamically calculated score */}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.dfac || ""} // Ensure controlled input
                        onChange={(event) => handleDfacChange7(index, event)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow7(index)}>
                        Delete Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleAddRow7}
              style={{ width: '100%', marginTop: '10px' }}
            >
              Add Row
            </button>

            {/* Self-Score and DFAC Score - Properly Nested */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
              <label>
                Self Score:
                <input
                  type="number"
                  value={calculateSelfScore7()} // Dynamically calculated scaled Self-Score
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
        )}
      </fieldset>

    {/* Table 8 */}
    <fieldset>
      <legend>
        <h5>8. Consultancy</h5>
      </legend>
      <label>Is data available?</label>
      <select onChange={handleDataAvailableChange8}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {dataAvailable8 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
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
                      type="file"
                      value={row.details}
                      onChange={(event) => handleDetailsChange8(index, event)}
                    />
                  </td>
                  <td>{calculateScore8(row.consultancy)}</td>
                  <td>
                    <input
                      type="text"
                      value={row.dfac}
                      onChange={(event) => handleDfacChange8(index, event)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow8(index)}
                    >
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddRow8}
            style={{ width: '100%', marginTop: '10px' }}
          >
            Add Row
          </button>

          {/* Self-Score and DFAC Score - Properly Nested */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
            <label>
              Self Score:
              <input
                type="number"
                value={calculateSelfScore8()} // Dynamically calculate scaled Self-Score
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
      )}
    </fieldset>


  {/* Fixed Table 9 */}
    <fieldset>
      <legend>
        <h5>9. Arranging Internships for students with proof</h5>
      </legend>
      <label>Is data available?</label>
      <select onChange={handleDataAvailableChange9}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
      {dataAvailable9 && (
        <div style={{ overflowX: 'auto' }}>
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
                    <select
                      value={row.internship || ""} // Ensure controlled input
                      onChange={(event) => handleInternshipChange(index, event)}
                    >
                      <option value="">Select Internship</option>
                      <option value="At Industry/ R & D Organisations per each student">
                        At Industry/ R & D Organisations per each student
                      </option>
                      <option value="Identification of New Industry / Company / R&D Lab">
                        Identification of New Industry / Company / R&D Lab
                      </option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(event) => handleDetailsChange9(index, event)}
                    />
                  </td>
                  <td>{row.score || "0"}</td>
                  <td>
                    <input
                      type="text"
                      value={row.dfac || ""} // Ensure controlled input
                      onChange={(event) => handleDfacChange9(index, event)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow9(index)}
                    >
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddRow9}
            style={{ width: '100%', marginTop: '10px' }}
          >
            Add Row
          </button>

          {/* Self-Score and DFAC Score - Properly Nested */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
            <label>
              Self Score:
              <input
                type="number"
                value={calculateSelfScore9()} // Dynamically calculate scaled Self-Score
                readOnly
              />
            </label>
            <label>
              DFAC Score:
              <input
                type="number"
                value={dfacScore9} // Static DFAC Score
                disabled // DFAC Score is disabled
              />
            </label>
          </div>
        </div>
      )}
    </fieldset>


       {/* Table 10 */}
        <fieldset>
          <legend>
            <h5>10. Knowledge sharing with other departments</h5>
          </legend>
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
                        <select
                          value={row.courseDuration}
                          onChange={(event) => handleCourseDurationChange(index, event)}
                        >
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
                      <td>{calculateScore10(row.courseDuration, row.feedback)}</td>
                      <td>
                        <input
                          type="text"
                          value={row.dfac}
                          onChange={(event) => handleDfacChange10(index, event)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow10(index)}
                        >
                          Delete Row
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={handleAddRow10}
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
                      value={calculateSelfScore10()} // Dynamically calculate scaled Self-Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore10} // Static DFAC Score
                      disabled // DFAC Score is disabled
                    />
                  </label>
                </div>
              </div>
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