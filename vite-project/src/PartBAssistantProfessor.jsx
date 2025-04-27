import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function PartBAssistantProfessor({ openTab }) {
  const initialRows1 = [{ subjectType: '', subjectCode: '', weeklyLoad: '', sem: '', subjectTitle: '', lectures: '' }];
  const initialRows2 = [
    { courseFilePoints: 'SyllabusPage (1point/Course)', checklist: {} },
    { courseFilePoints: 'LessonPlan (1Point/Course)', checklist: {} },
    { courseFilePoints: 'LectureNotes (3.5Points/Course)', checklist: {} },
    { courseFilePoints: 'QuestionBank (2Points/Course)', checklist: {} },
    { courseFilePoints: 'InternalAssessmentQuestionPapers (1Point/Course)', checklist: {} },
    { courseFilePoints: 'CourseAssessment (4Points/Course)', checklist: {} },
    { courseFilePoints: 'HomeAssessment (1Point/Course)', checklist: {} },
    { courseFilePoints: 'MarksSheetCopy (0.5Point/Course)', checklist: {} },
    { courseFilePoints: 'CourseEndSurvey (1Point/Course)', checklist: {} },
    { courseFilePoints: 'EndSemesterCOAssessmentResults (2Points/Course)', checklist: {} },
    { courseFilePoints: 'SchemeOfEvaluation(SemExam) (3Points/Course)', checklist: {} },
    { courseFilePoints: 'AnyOther (1Point/Course)', checklist: {} }
  ];
  const initialRows3 = [{ natureOfDuty: '', sem1: '', sem2: '', totalDuties: '' }];
  const initialRows4 = [{ sNo: '', dutiesSem1Sem2: '', evaluationSchedule: '', remarksDFAC: '' }];
  const initialRows5 = [{ useOfInnovatingTeachingMethodology: '', sem1Score: '', sem2Score: '' }];
  const initialRows6 = [{ item: '', semester1: '', score1: '', semester2: '', score2: '' }];
  const initialRows7 = [{ item: 'How many counselling sessions done? for each 5 points', sem1: '', sem2: '', totalSessions: '', score: '' }];
  const initialRows8 = [];
  const initialRows9 = [{ subjectsSem1: "", feedbackSem1: "", subjectsSem2: "", feedbackSem2: "", avg: ""}];
  const initialRows10 = [ { batchSem1: "", sem1Score: "", batchSem2: "", sem2Score: "", avg: ""  }];
  const [rows10, setRows10] = useState(initialRows10);
  
  const initialRows12 = [{ courseType: '', attendance: '', endCourseExamMarks: '', score: '' }];
  const initialRows13 = [{ involvement: 'Involvement of Faculty in Syllabus Framing (30)', selfScore: '', dfac: '' }];

  const [profileId, setProfileId] = useState('');

  const [isDataAvailable5, setIsDataAvailable5] = useState(false);
  const [isDataAvailable6, setIsDataAvailable6] = useState(false);
  const [isDataAvailable7, setIsDataAvailable7] = useState(false);
  const [isDataAvailable12, setIsDataAvailable12] = useState(false);
  const [isDataAvailable13, setIsDataAvailable13] = useState(false);

  const [rows1, setRows1] = useState(initialRows1);
  const [rows2, setRows2] = useState(initialRows2);
  const [rows3, setRows3] = useState(initialRows3);
  const [rows4, setRows4] = useState(initialRows4);
  const [rows5, setRows5] = useState(initialRows5);
  const [rows6, setRows6] = useState(initialRows6);
  const [rows7, setRows7] = useState(initialRows7);
  const [rows8, setRows8] = useState(initialRows8);
  const [rows9, setRows9] = useState(initialRows9);
  const [rows11, setRows11] = useState([]);
  const [rows12, setRows12] = useState(initialRows12);
  const [rows13, setRows13] = useState(initialRows13);

  const [subjectCodes, setSubjectCodes] = useState([]);

  // Add this state initialization at the top of your component

  // Add these states at the top of your component
const [averageValues, setAverageValues] = useState({
  avgWeeklyLoad: "0.00",
  avgLecturesTakenProposed: "0.00",
});




useEffect(() => {
  const updatedRows11 = rows10.map((row10) => ({
    batchSem1: row10.batchSem1 || "", // Take Batch.No (Sem1) from rows10
    sem1Feedback: "",
    batchSem2: row10.batchSem2 || "", // Take Batch.No (Sem2) from rows10
    sem2Feedback: "",
    avg: "",
  }));
  setRows11(updatedRows11);
}, [rows10]);


// Update logic for automatic calculations
useEffect(() => {
  const calculateAverages = () => {
    const sem1Subjects = rows1.filter((row) => row.sem === "sem1");
    const sem2Subjects = rows1.filter((row) => row.sem === "sem2");

    let totalWeeklyLoad = 0;
    let countWeeklyLoad = 0;

    let totalLecturesTaken = 0;
    let totalLecturesProposed = 0;

    // Process matching subjects
    sem1Subjects.forEach((sem1Row) => {
      const matchingSem2Row = sem2Subjects.find(
        (sem2Row) => sem2Row.subjectCode === sem1Row.subjectCode
      );

      if (matchingSem2Row) {
        // Calculate weekly load
        const weeklyLoadSem1 = parseFloat(sem1Row.weeklyLoad || 0);
        const weeklyLoadSem2 = parseFloat(matchingSem2Row.weeklyLoad || 0);
        totalWeeklyLoad += weeklyLoadSem1 + weeklyLoadSem2;
        countWeeklyLoad++;

        // Calculate lectures taken/proposed
        const [takenSem1, proposedSem1] = (sem1Row.lectures || "0/0").split("/").map(Number);
        const [takenSem2, proposedSem2] = (matchingSem2Row.lectures || "0/0").split("/").map(Number);

        totalLecturesTaken += takenSem1 + takenSem2;
        totalLecturesProposed += proposedSem1 + proposedSem2;
      }
    });

    // Calculate averages
    const avgWeeklyLoad =
      countWeeklyLoad > 0 ? (totalWeeklyLoad / countWeeklyLoad).toFixed(2) : "0.00";
    const avgLecturesTakenProposed =
      totalLecturesProposed > 0
        ? (totalLecturesTaken / totalLecturesProposed).toFixed(2)
        : "0.00";

    // Update state with calculated values
    setAverageValues({
      avgWeeklyLoad,
      avgLecturesTakenProposed,
    });
  };

  calculateAverages();
}, [rows1]);



  
  
  useEffect(() => {
    const codes = rows1.map(row => row.subjectCode).filter(code => code);
    setSubjectCodes(codes);
  }, [rows1]);

  useEffect(() => {
    const sem1Subjects = rows1.filter(row => row.sem === 'sem1').map(row => ({ subjectsSem1: row.subjectCode, passSem1: '' }));
    const sem2Subjects = rows1.filter(row => row.sem === 'sem2').map(row => ({ subjectsSem2: row.subjectCode, passSem2: '' }));
  
    const maxRows = Math.max(sem1Subjects.length, sem2Subjects.length);
    const newRows8 = Array.from({ length: maxRows }, (_, index) => ({
      subjectsSem1: sem1Subjects[index]?.subjectsSem1 || '',
      passSem1: sem1Subjects[index]?.passSem1 || '',
      subjectsSem2: sem2Subjects[index]?.subjectsSem2 || '',
      passSem2: sem2Subjects[index]?.passSem2 || '',
      avg: ''
    }));
  
    setRows8(newRows8);
  }, [rows1]);

  useEffect(() => {
    const sem1Subjects = rows1.filter(row => row.sem === 'sem1').map(row => ({ subjectsSem1: row.subjectCode, feedbackSem1: '' }));
    const sem2Subjects = rows1.filter(row => row.sem === 'sem2').map(row => ({ subjectsSem2: row.subjectCode, feedbackSem2: '' }));
  
    const maxRows = Math.max(sem1Subjects.length, sem2Subjects.length);
    const newRows9 = Array.from({ length: maxRows }, (_, index) => ({
      subjectsSem1: sem1Subjects[index]?.subjectsSem1 || '',
      feedbackSem1: sem1Subjects[index]?.feedbackSem1 || '',
      subjectsSem2: sem2Subjects[index]?.subjectsSem2 || '',
      feedbackSem2: sem2Subjects[index]?.feedbackSem2 || ''
    }));
  
    setRows9(newRows9);
  }, [rows1]);

  useEffect(() => {
    const newRows11 = rows10.map(row => ({
      batchNo: row.projectBatchNo,
      sem: row.sem,
      averageScore: ''
    }));
    setRows11(newRows11);
  }, [rows10]);

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

  useEffect(() => {
    const fetchPartBData = async () => {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile && savedProfile.id) {
        try {
          const response = await axios.get(`http://localhost:5000/get-part-data?id=${savedProfile.id}&part=partb`);
          if (response.status === 200 && response.data.success) {
            const partBData = response.data.data;
  
            // Populate the form with fetched data or fallback values
            setRows3(partBData?.rows3?.data || []);
            setRows4(partBData?.rows4?.data || []);
            setRows5(partBData?.rows5?.data || []);
            setRows6(partBData?.rows6?.data || []);
            setRows7(partBData?.rows7?.data || []);
            setRows8(partBData?.rows8?.data || []);
            setRows9(partBData?.rows9?.data || []);
            setRows10(partBData?.rows10?.data || []);
            setRows11(partBData?.rows11?.data || []);
            setRows12(partBData?.rows12?.data || []);
            setRows13(partBData?.rows13?.data || []);
          }
        } catch (error) {
          console.error('Error fetching PartB data:', error);
        }
      }
    };
  
    fetchPartBData();
  }, []);

  const handleAddRow1 = () => {
    // Check if the current self-score is 100 or more
    if (calculateSelfScore1(rows1) >= 100) {
        alert("Maximum self-score of 100 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { subjectType: '', subjectCode: '', weeklyLoad: '', sem: '', subjectTitle: '', lectures: '' };

    setRows1([...rows1, newRow]); // Update the rows state with the new row
};

  const handleDeleteRow1 = (index) => {
    const newRows1 = rows1.filter((row, i) => i !== index);
    setRows1(newRows1);
  };

  const handleChange1 = (index, event) => {
    const { name, value } = event.target;
    const newRows1 = [...rows1];
    newRows1[index][name] = value;
    setRows1(newRows1);
  };

 
  const handleAddRow3 = () => {
    // Check if the current self-score is 20 or more
    if (selfScoreCalculation3() >= 20) {
        alert("Maximum self-score of 20 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { natureOfDuty: '', sem1: '', sem2: '', totalDuties: '' };

    setRows3([...rows3, newRow]); // Update the rows state with the new row
};


  const handleDeleteRow3 = (index) => {
    const newRows3 = rows3.filter((row, i) => i !== index);
    setRows3(newRows3);
  };

  const handleChange3 = (index, event) => {
    const { name, value } = event.target;
    const newRows3 = [...rows3];
    newRows3[index][name] = value;
    setRows3(newRows3);
  };

  const handleAddRow4 = () => {
    // Check if the current self-score is 40 or more
    if (selfScoreCalculation4() >= 40) {
        alert("Maximum self-score of 40 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { sNo: '', dutiesSem1Sem2: '', evaluationSchedule: '', remarksDFAC: '' };

    setRows4([...rows4, newRow]); // Update the rows state with the new row
};

  const handleDeleteRow4 = (index) => {
    const newRows4 = rows4.filter((row, i) => i !== index);
    setRows4(newRows4);
  };

  const handleChange4 = (index, event) => {
    const { name, value } = event.target;
    const newRows4 = [...rows4];
    newRows4[index][name] = value;
    setRows4(newRows4);
  };

  const handleAddRow5 = () => {
    // Check if the current self-score is 60 or more
    if (selfScoreCalculation5() >= 60) {
        alert("Maximum self-score of 60 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { useOfInnovatingTeachingMethodology: '', sem1Score: '', sem2Score: '' };

    setRows5([...rows5, newRow]); // Update the rows state with the new row
};

  const handleDeleteRow5 = (index) => {
    const newRows5 = rows5.filter((row, i) => i !== index);
    setRows5(newRows5);
  };

  const handleChange5 = (index, event) => {
    const { name, value } = event.target;
    const newRows5 = [...rows5];
    newRows5[index][name] = value;
    setRows5(newRows5);
  };

  const handleAddRow6 = () => {
    // Check if the current self-score is 50 or more
    if (selfScoreCalculation6() >= 50) {
        alert("Maximum self-score of 50 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { item: '', semester1: '', score1: '', semester2: '', score2: '' };

    setRows6([...rows6, newRow]); // Update the rows state with the new row
};
  
  const handleDeleteRow6 = (index) => {
    const newRows6 = rows6.filter((row, i) => i !== index);
    setRows6(newRows6);
  };

  const handleChange6 = (index, event) => {
    const { name, value } = event.target;
    const newRows6 = [...rows6];
    newRows6[index][name] = value;
    setRows6(newRows6);
  };

  const handleChange7 = (index, event) => {
    const { name, value } = event.target;
    const newRows7 = [...rows7];
    newRows7[index][name] = value;
    setRows7(newRows7);
  };

  const handleChange8 = (index, event) => {
    const { name, value } = event.target;
    const newRows8 = [...rows8];
    newRows8[index][name] = value;
    setRows8(newRows8);
  };

  const handleChange9 = (index, event) => {
    const { name, value } = event.target;
    const newRows9 = [...rows9];
    newRows9[index][name] = value;
    setRows9(newRows9);
  };

  const handleAddRow10 = () => {
    // Check if the current self-score is 60 or more
    if (calculateSelfScore10() >= 60) {
        alert("Maximum self-score of 60 reached. Cannot add more rows.");
        return; // Prevent adding a new row
    }

    // Add a new row with default values
    const newRow = { batchSem1: "", sem1Score: "", batchSem2: "", sem2Score: "", avg: "" };

    setRows10([...rows10, newRow]); // Update the rows state with the new row
};

 const handleDeleteRow10 = (index) => {
    const updatedRows10 = [...rows10];
    updatedRows10.splice(index, 1); // Remove the row at the given index
    setRows10(updatedRows10);
  };


  const handleInputChange10 = (index, field, value) => {
    const updatedRows10 = [...rows10];

    // Ensure that Sem1 Score and Sem2 Score are capped at 100
    if (field === "sem1Score" || field === "sem2Score") {
      value = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
    }

    updatedRows10[index][field] = value;

    // Calculate the average score based on Sem1 and Sem2 scores
    const sem1Score = parseFloat(updatedRows10[index].sem1Score) || null;
    const sem2Score = parseFloat(updatedRows10[index].sem2Score) || null;

    if (sem1Score !== null && sem2Score !== null) {
      // Both Sem1 and Sem2 scores exist
      updatedRows10[index].avg = ((sem1Score + sem2Score) / 2).toFixed(2);
    } else if (sem1Score !== null) {
      // Only Sem1 score exists
      updatedRows10[index].avg = sem1Score.toFixed(2);
    } else if (sem2Score !== null) {
      // Only Sem2 score exists
      updatedRows10[index].avg = sem2Score.toFixed(2);
    } else {
      // Neither score exists
      updatedRows10[index].avg = "";
    }

    setRows10(updatedRows10);
  };




 // Handle input changes
 const handleInputChange11 = (index, field, value) => {
  const updatedRows11 = [...rows11];
  updatedRows11[index][field] = value;

  // Calculate the average feedback based on Sem1 and Sem2 feedback
  const sem1Feedback = parseFloat(updatedRows11[index].sem1Feedback) || null;
  const sem2Feedback = parseFloat(updatedRows11[index].sem2Feedback) || null;

  if (sem1Feedback !== null && sem2Feedback !== null) {
    // Both Sem1 and Sem2 feedback exist
    updatedRows11[index].avg = ((sem1Feedback + sem2Feedback) / 2).toFixed(2);
  } else if (sem1Feedback !== null) {
    // Only Sem1 feedback exists
    updatedRows11[index].avg = sem1Feedback.toFixed(2);
  } else if (sem2Feedback !== null) {
    // Only Sem2 feedback exists
    updatedRows11[index].avg = sem2Feedback.toFixed(2);
  } else {
    // Neither feedback exists
    updatedRows11[index].avg = "";
  }

  setRows11(updatedRows11);
};

const handleAddRow12 = () => {
  // Check if the current self-score is 20 or more
  if (calculateSelfScore12() >= 20) {
      alert("Maximum self-score of 20 reached. Cannot add more rows.");
      return; // Prevent adding a new row
  }

  // Add a new row with default values
  const newRow = { courseType: '', attendance: '', endCourseExamMarks: '', score: '' };

  setRows12([...rows12, newRow]); // Update the rows state with the new row
};
  
  const handleDeleteRow12 = (index) => {
    const newRows12 = rows12.filter((row, i) => i !== index);
    setRows12(newRows12);
  };
  

  
  const handleDeleteRow13 = (index) => {
    const newRows13 = rows13.filter((row, i) => i !== index);
    setRows13(newRows13);
  };
  
  const handleChange13 = (index, event) => {
    const { name, value } = event.target;
    const newRows13 = [...rows13];
    newRows13[index][name] = value;
    setRows13(newRows13);
  };

  //score calculations...!


  // Function 1: Calculate Weekly Load Average
const calculateWeeklyLoadAverage1 = (rows = []) => {
  const sem1Subjects = rows.filter((row) => row.sem === "sem1");
  const sem2Subjects = rows.filter((row) => row.sem === "sem2");

  const minSubjects = Math.min(sem1Subjects.length, sem2Subjects.length);

  let pairedAverage = 0;

  for (let i = 0; i < minSubjects; i++) {
    const sem1Load = parseFloat(sem1Subjects[i]?.weeklyLoad || 0);
    const sem2Load = parseFloat(sem2Subjects[i]?.weeklyLoad || 0);
    pairedAverage += (sem1Load + sem2Load) / 2;
  }

  const remainingSem1Subjects = sem1Subjects.slice(minSubjects);
  const remainingSem2Subjects = sem2Subjects.slice(minSubjects);

  const remainingSum = remainingSem1Subjects.reduce(
    (total, row) => total + (parseFloat(row.weeklyLoad) || 0),
    0
  ) + remainingSem2Subjects.reduce(
    (total, row) => total + (parseFloat(row.weeklyLoad) || 0),
    0
  );

  return pairedAverage + remainingSum;
};

// Function 2: Calculate Fractional Average
const calculateFractionalAverage1 = (rows = []) => {
  let numerator = 0;
  let denominator = 0;

  rows.forEach((row) => {
    const [num, den] = row.lectures.split("/").map((value) => parseFloat(value) || 0);
    numerator += num;
    denominator += den;
  });

  const fractionalAverage = numerator / denominator;
  const result = fractionalAverage * 30;

  // Ensure the result is capped at 30
  return Math.min(result, 30);
};

// Function 3: Calculate Self Score
const calculateSelfScore1 = (rows = []) => {
  const weeklyLoadAverage = isNaN(calculateWeeklyLoadAverage1(rows)) ? 0 : calculateWeeklyLoadAverage1(rows);
  const fractionalAverage = isNaN(calculateFractionalAverage1(rows)) ? 0 : calculateFractionalAverage1(rows);

  const totalScore = weeklyLoadAverage + fractionalAverage;
  return totalScore.toFixed(2); // Ensure the result is a string with 2 decimal places
};

const extractWeightage = (courseFilePoints) => {
  // Extract the numeric weightage from the courseFilePoints string
  const match = courseFilePoints.match(/(\d+\.?\d*)/);
  return match ? parseFloat(match[1]) : 0;
};

const calculateAverageScore1 = (row) => {
  const checklist = row.checklist || {};
  const sem1Subjects = rows1.filter((row1) => row1.sem === "sem1");

  let totalWeightage = 0;
  const numSubjects = sem1Subjects.length;

  // Sum up the weightage of selected checkboxes for Sem1
  sem1Subjects.forEach((subject) => {
    const isChecked = checklist[`sem1-${subject.subjectCode}`];
    if (isChecked) {
      totalWeightage += extractWeightage(row.courseFilePoints);
    }
  });

  return numSubjects > 0 ? (totalWeightage / numSubjects).toFixed(2) : "0.00";
};


const calculateAverageScore2 = (row) => {
  const checklist = row.checklist || {};
  const sem2Subjects = rows1.filter((row1) => row1.sem === "sem2");

  let totalWeightage = 0;
  const numSubjects = sem2Subjects.length;

  // Sum up the weightage of selected checkboxes for Sem2
  sem2Subjects.forEach((subject) => {
    const isChecked = checklist[`sem2-${subject.subjectCode}`];
    if (isChecked) {
      totalWeightage += extractWeightage(row.courseFilePoints);
    }
  });

  return numSubjects > 0 ? (totalWeightage / numSubjects).toFixed(2) : "0.00";
};

const handleChange2 = (index, event, key, fieldName) => {
  const newRows = [...rows2];

  if (fieldName === "checklist") {
    // Update the checklist (checkbox values)
    newRows[index].checklist[key] = event.target.checked;
  } else if (fieldName === "courseFilePoints") {
    // Update courseFilePoints
    newRows[index].courseFilePoints = event.target.value;
  } else if (fieldName === "dfacScore") {
    // Update dfacScore
    newRows[index].dfacScore = event.target.value;
  }

  // Trigger average score recalculation for the row
  newRows[index].averageScore = calculateAverageScore1(newRows[index]);
  newRows[index].averageScore2 = calculateAverageScore2(newRows[index]);

  setRows2(newRows);

  // Log for debugging
  console.log("Updated Rows2:", newRows);
};

const calculateSelfScore2 = () => {
  if (rows2.length === 0) return 0;

  // Calculate the sum of average scores for Sem1 and Sem2 for all rows
  const totalScore = rows2.reduce((total, row) => {
    const avgScore1 = parseFloat(calculateAverageScore1(row)) || 0;
    const avgScore2 = parseFloat(calculateAverageScore2(row)) || 0;
    return total + avgScore1 + avgScore2;
  }, 0);

  // Ensure the self-score does not exceed 60
  const selfScore = Math.min(totalScore, 60);

  return selfScore.toFixed(2); // Round to 2 decimal places
};



 //State for DFAC Score1
const [dfacScore1] = useState(0);

// State for DFAC Score2
const [dfacScore2] = useState(0); // DFAC Score is disabled and non-editable
  // State for DFAC Score3
const [dfacScore3] = useState(0);
// State for DFAC Score for Table 4
const [dfacScore4] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 5
const [dfacScore5] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 6
const [dfacScore6] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 7
const [dfacScore7] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 8
const [dfacScore8] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 9
const [dfacScore9] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 10
const [dfacScore10] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 11
const [dfacScore11] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 12
const [dfacScore12] = useState(0); // DFAC Score is disabled and non-editable

// State for DFAC Score for Table 13
const [dfacScore13] = useState(0); // DFAC Score is disabled and non-editable

 
// Function to calculate Self Score for Table 3
const selfScoreCalculation3 = () => {
  const totalDuties = rows3.reduce((total, row) => total + (row.totalDuties || 0), 0);
  return Math.min(totalDuties, 20); // Cap Self Score at 20
};

// Function to handle changes in "No. of Duties in Sem 1 & Sem 2" and cap at 40
const handleDutiesChange4 = (index, value) => {
  const newRows4 = [...rows4];
  newRows4[index].dutiesSem1Sem2 = Math.min(parseInt(value, 10) || 0, 40); // Cap duties at 40
  setRows4(newRows4);
};

// Function to calculate Self Score for Table 4
const selfScoreCalculation4 = () => {
  const totalDuties = rows4.reduce(
    (total, row) => total + (parseInt(row.dutiesSem1Sem2, 10) || 0),
    0
  );
  return Math.min(totalDuties, 40); // Cap Self Score at 40
};

// Function to handle changes in Teaching Methodology column
const handleMethodologyChange5 = (index, value) => {
  const newRows5 = [...rows5];
  newRows5[index].useOfInnovatingTeachingMethodology = value;

  // Reset scores if the methodology changes
  newRows5[index].sem1Score = 0;
  newRows5[index].sem2Score = 0;

  setRows5(newRows5);
};

// Function to handle changes in Sem 1 and Sem 2 scores and cap them based on the selected methodology
const handleScoreChange5 = (index, column, value) => {
  const newRows5 = [...rows5];
  const methodology = newRows5[index].useOfInnovatingTeachingMethodology;

  let maxScoreSem1 = 0;
  let maxScoreSem2 = 0;

  // Adjust max score limits based on the selected methodology
  if (methodology === "PPT with Annotations and Assesment based on content") {
    maxScoreSem1 = 10; // Cap at 10 for sem1
    maxScoreSem2 = 10; // Cap at 10 for sem2
  } else if (methodology === "Visuals") {
    maxScoreSem1 = 5; // Cap at 5 for sem1
    maxScoreSem2 = 5; // Cap at 5 for sem2
  } else if (methodology === "MOODLE Usage") {
    maxScoreSem1 = 15; // Cap at 15 for sem1
    maxScoreSem2 = 15; // Cap at 15 for sem2
  }

  // Cap the entered score based on the methodology and column
  if (column === "sem1Score") {
    newRows5[index][column] = Math.min(parseInt(value, 10) || 0, maxScoreSem1);
  } else if (column === "sem2Score") {
    newRows5[index][column] = Math.min(parseInt(value, 10) || 0, maxScoreSem2);
  }

  setRows5(newRows5);
};

// Updated Function to calculate Self Score for Table 5
const selfScoreCalculation5 = () => {
  let totalSem1Score = 0;
  let totalSem2Score = 0;

  // Aggregate scores from all rows
  rows5.forEach((row) => {
    totalSem1Score += parseInt(row.sem1Score, 10) || 0;
    totalSem2Score += parseInt(row.sem2Score, 10) || 0;
  });

  // Calculate total self-score and cap at 60
  const totalScore = totalSem1Score + totalSem2Score;
  return Math.min(totalScore, 60);
};


// Function to handle changes in Items column
const handleItemChange6 = (index, value) => {
  const newRows6 = [...rows6];
  newRows6[index].item = value;

  // Reset scores if the item changes
  newRows6[index].score1 = "";
  newRows6[index].score2 = "";

  setRows6(newRows6);
};

// Function to handle changes in Score 1 and Score 2 and cap them at 12.5
const handleScoreChange6 = (index, column, value) => {
  const newRows6 = [...rows6];
  newRows6[index][column] = Math.min(parseFloat(value) || 0, 12.5); // Cap at 12.5
  setRows6(newRows6);
};


// Function to calculate Self Score for Table 6
const selfScoreCalculation6 = () => {
  const totalScore = rows6.reduce(
    (total, row) =>
      total +
      (parseFloat(row.score1) || 0) +
      (parseFloat(row.score2) || 0),
    0
  );

  // Cap the total Self Score at 50
  return Math.min(totalScore, 50);
};

/// Function to handle changes in Sem1 and Sem2 columns, and recalculate Total No. of Sessions Taken
const handleSemChange7 = (index, column, value) => {
  const newRows7 = [...rows7];
  newRows7[index][column] = Math.min(parseInt(value, 10) || 0, 3); // Cap Sem1 and Sem2 at 3

  // Calculate Total No. of Sessions Taken
  const sem1 = parseInt(newRows7[index].sem1, 10) || 0;
  const sem2 = parseInt(newRows7[index].sem2, 10) || 0;
  newRows7[index].totalSessions = Math.min(sem1 + sem2, 6); // Cap Total Sessions at 6

  // Calculate Score
  newRows7[index].score = Math.min(newRows7[index].totalSessions * 5, 30); // Cap at 30

  setRows7(newRows7);
};

// Function to calculate Self Score for Table 7
const selfScoreCalculation7 = () => {
  const totalScore = rows7.reduce(
    (total, row) => total + (parseInt(row.score, 10) || 0),
    0
  );

  // Cap the Self Score at 30
  return Math.min(totalScore, 30);
};


// Function to handle changes in % Pass columns and calculate Avg%
const handlePassChange8 = (index, column, value) => {
  const newRows8 = [...rows8];
  newRows8[index][column] = Math.min(parseFloat(value) || 0, 100); // Cap % Pass at 100

  // Calculate Avg%
  const passSem1 = parseFloat(newRows8[index].passSem1) || null; // Default to null if empty
  const passSem2 = parseFloat(newRows8[index].passSem2) || null; // Default to null if empty

  if (passSem1 !== null && passSem2 !== null) {
    // If both Sem1 and Sem2 are entered, calculate their average
    newRows8[index].avg = ((passSem1 + passSem2) / 2).toFixed(2);
  } else if (passSem1 !== null) {
    // If only Sem1 is entered, Avg% is Sem1
    newRows8[index].avg = passSem1.toFixed(2);
  } else if (passSem2 !== null) {
    // If only Sem2 is entered, Avg% is Sem2
    newRows8[index].avg = passSem2.toFixed(2);
  } else {
    // If neither is entered, Avg% is empty
    newRows8[index].avg = "";
  }

  setRows8(newRows8);
};


// Function to calculate Self Score based on the final average of % Avg
const calculateSelfScore8 = () => {
  if (rows8.length === 0) return 0;

  // Calculate the final average of all rows in the % Avg column
  const totalAvg = rows8.reduce(
    (total, row) => total + (parseFloat(row.avg) || 0),
    0
  );
  const finalAverage = totalAvg / rows8.length;

  // Determine the Self Score based on the final average
  if (finalAverage < 55) return 10;
  if (finalAverage >= 55 && finalAverage <= 65) return 30;
  if (finalAverage >= 66 && finalAverage <= 75) return 40;
  if (finalAverage >= 76 && finalAverage <= 85) return 60;
  if (finalAverage > 85) return 70;

  return 0; // Default fallback
};


// Function to handle changes in feedback columns and calculate Avg
const handleFeedbackChange9 = (index, column, value) => {
  const newRows9 = [...rows9];
  newRows9[index][column] = Math.min(Math.max(parseFloat(value) || 0, 1), 5); // Cap feedback between 1 and 5

  // Calculate Avg
  const feedbackSem1 = parseFloat(newRows9[index].feedbackSem1) || null; // Default to null if empty
  const feedbackSem2 = parseFloat(newRows9[index].feedbackSem2) || null; // Default to null if empty

  if (feedbackSem1 !== null && feedbackSem2 !== null) {
    // If both Sem1 and Sem2 feedback are provided, calculate their average
    newRows9[index].avg = ((feedbackSem1 + feedbackSem2) / 2).toFixed(1);
  } else if (feedbackSem1 !== null) {
    // If only Sem1 feedback is provided, Avg = Sem1 feedback
    newRows9[index].avg = feedbackSem1.toFixed(1);
  } else if (feedbackSem2 !== null) {
    // If only Sem2 feedback is provided, Avg = Sem2 feedback
    newRows9[index].avg = feedbackSem2.toFixed(1);
  } else {
    // If neither feedback is provided, Avg is empty
    newRows9[index].avg = "";
  }

  setRows9(newRows9);
};


// Function to calculate Self Score based on the final average of Avg column
const calculateSelfScore9 = () => {
  if (rows9.length === 0) return 0;

  // Calculate the final average of all rows in the Avg column
  const totalAvg = rows9.reduce(
    (total, row) => total + (parseFloat(row.avg) || 0),
    0
  );
  const finalAverage = totalAvg / rows9.length;

  // Determine the Self Score based on the final average
  if (finalAverage < 3.0) return 10;
  if (finalAverage >= 3.0 && finalAverage <= 3.5) return 30;
  if (finalAverage > 3.5 && finalAverage <= 4.0) return 40;
  if (finalAverage > 4.0 && finalAverage <= 4.5) return 50;
  if (finalAverage > 4.5) return 60;

  return 0; // Default fallback
};



// Calculate the Grand Average
const calculateGrandAverage = () => {
  if (rows10.length === 0) return 0;

  const totalAvg = rows10.reduce(
    (total, row) => total + (parseFloat(row.avg) || 0),
    0
  );
  return (totalAvg / rows10.length).toFixed(2);
};

// Calculate the Self Score based on the Grand Average
const calculateSelfScore10 = () => {
  const grandAverage = parseFloat(calculateGrandAverage());

  if (grandAverage > 90) return 40;
  if (grandAverage >= 81 && grandAverage <= 90) return 35;
  if (grandAverage >= 71 && grandAverage <= 80) return 30;
  return 25; // Default for Grand Average ≤ 70
};


// Calculate Grand Average for Table 11
const calculateGrandAverage11 = () => {
  // Sum all average feedback values from rows11
  const totalAvg = rows11.reduce((total, row) => {
    return total + (parseFloat(row.avg) || 0);
  }, 0);

  // Calculate grand average
  return rows11.length > 0 ? (totalAvg / rows11.length).toFixed(2) : 0;
};

// Calculate Self Score for Table 11 based on Grand Average
const calculateSelfScore11 = () => {
  const grandAverage = parseFloat(calculateGrandAverage11());

  if (grandAverage < 3.0) return 0;
  if (grandAverage >= 3.0 && grandAverage < 3.5) return 5;
  if (grandAverage >= 3.5 && grandAverage < 4.0) return 10;
  if (grandAverage >= 4.0 && grandAverage < 4.5) return 15;
  if (grandAverage >= 4.5 && grandAverage <= 5.0) return 20;

  return 0; // Default fallback
};

// Handle input changes and calculate score for each row
const handleChange12 = (index, e) => {
  const { name, value } = e.target;
  const newRows12 = [...rows12];
  newRows12[index][name] = value;

  // Calculate score based on conditions
  if (newRows12[index].courseType === "Full Course with Online Exam" && newRows12[index].attendance >= 75) {
    const score =
      newRows12[index].endCourseExamMarks >= 75
        ? 60
        : Math.round((newRows12[index].endCourseExamMarks / 100) * 60);
    newRows12[index].score = score;
  } else if (
    newRows12[index].courseType === "Teleconference Mode or Course without Exam" &&
    newRows12[index].attendance >= 75
  ) {
    newRows12[index].score = 30;
  } else {
    newRows12[index].score = 0; // Default score if conditions are not met
  }

  setRows12(newRows12); // Update the state
};

// Calculate Self-Score for Table 12
const calculateSelfScore12 = () => {
  if (!rows12 || rows12.length === 0) return 0;

  // Sum all scores
  return rows12.reduce((total, row) => total + (row.score || 0), 0);
};


const calculateTotalSelfScore13 = () => {
  if (rows13.length === 0) return 0;

  const totalSelfScore = rows13.reduce((total, row) => total + (parseFloat(row.selfScore) || 0), 0);
  return totalSelfScore.toFixed(2); // Round to 2 decimal places
};


const handleSave = async () => {
  const partBData = {
    id: profileId,
    rows1: {
      data: rows1,
      selfScore: calculateSelfScore1(),
      dfacScore: dfacScore1,
    },
    rows2: {
      data: rows2,
      selfScore: calculateSelfScore2(),
      dfacScore: dfacScore2,
    },
    rows3: {
      data: rows3,
      selfScore: selfScoreCalculation3(),
      dfacScore: dfacScore3,
    },
    rows4: {
      data: rows4,
      selfScore: selfScoreCalculation4(),
      dfacScore: dfacScore4,
    },
    rows5: {
      data: rows5,
      selfScore: selfScoreCalculation5(),
      dfacScore: dfacScore5,
    },
    rows6: {
      data: rows6,
      selfScore: selfScoreCalculation6(),
      dfacScore: dfacScore6,
    },
    rows7: {
      data: rows7,
      selfScore: selfScoreCalculation7(),
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
    rows11: {
      data: rows11,
      selfScore: calculateSelfScore11(),
      dfacScore: dfacScore11,
    },
    rows12: {
      data: rows12,
      selfScore: calculateSelfScore12(),
      dfacScore: dfacScore12,
    },
    rows13: {
      data: rows13,
      selfScore: calculateTotalSelfScore13(),
      dfacScore: dfacScore13,
    },
  };

  try {
    const response = await axios.post('http://localhost:5000/save-partb-data', partBData);
    alert(response.data.message);
  } catch (error) {
    alert('Error saving data');
    console.log(error + " Check once..!");
  }
};




 
  return (
    <div className="parts">
      <h2> Curriculum Teaching and Learning Process</h2>
      
     {/* Table 1 */}
      <fieldset>
        <legend>
          <h6>
            1. Teaching weekly load allotted by Department as per curricular time table and Lectures actually taken as a fraction of lectures allocated.
            How many total lecture periods have been taken in the previous two semesters (Enter Number)?
          </h6>
        </legend>

        <div>
          <table>
            <thead>
              <tr>
                <th>Subject Type</th>
                <th>Subject Code</th>
                <th>Weekly Load</th>
                <th>Sem</th>
                <th>Subject Title</th>
                <th>Lectures Taken/Lectures Proposed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows1.map((row, index) => (
                <tr key={index}>
                  <td>
                    <select
                      name="subjectType"
                      value={row.subjectType}
                      onChange={(e) => handleChange1(index, e)}
                    >
                      <option value="">Select an option</option>
                      <option value="Theory">Theory</option>
                      <option value="Lab">Lab</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="TermPaper">Term Paper</option>
                      <option value="MiniProject">Mini Project</option>
                      <option value="MajorProject">Major Project</option>
                      <option value="Seminar">Seminar</option>
                      <option value="AnyOther">Any Other</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="subjectCode"
                      value={row.subjectCode}
                      onChange={(e) => handleChange1(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="weeklyLoad"
                      value={row.weeklyLoad}
                      onChange={(e) => handleChange1(index, e)}
                    />
                  </td>
                  <td>
                    <select
                      name="sem"
                      value={row.sem}
                      onChange={(e) => handleChange1(index, e)}
                    >
                      <option value="">Select an option</option>
                      <option value="sem1">Sem 1</option>
                      <option value="sem2">Sem 2</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="subjectTitle"
                      value={row.subjectTitle}
                      onChange={(e) => handleChange1(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lectures"
                      value={row.lectures}
                      onChange={(e) => handleChange1(index, e)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDeleteRow1(index)}>
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={handleAddRow1}>
            Add Row
          </button>

          {/* Self Score and DFAC Score Below the Table */}
          <div style={{ marginTop: "20px" }}>
            <h6>Scores</h6>
            <div style={{ display: "flex", gap: "20px" }}>
              <label>
                Self Score:
                <input
                  type="number"
                  value={calculateSelfScore1(rows1)} // Automatically calculate self-score
                  readOnly
                />
              </label>
              <label>
                DFAC Score:
                <input
                  type="number"
                  value={dfacScore1} // Display DFAC score
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </fieldset>


       {/* Table 2 */}
      <fieldset>
        <div className="table-container">
          <h6>
            2. Course files with the following data have been prepared by me (tick for compliance and Nil for Non-Compliance). 
            Neatly filed course files (One course file per section/course) authenticated by HOD is required to be presented.
          </h6>
          <table>
            <thead>
              <tr>
                <th>Course File Points (Weightage)</th>
                <th>Sem1</th>
                <th>Sem2</th>
                <th>Average Score 1</th>
                <th>Average Score 2</th>
                <th>DFAC Score</th>
              </tr>
            </thead>
            <tbody>
              {rows2.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="courseFilePoints"
                      value={row.courseFilePoints}
                      onChange={(e) => handleChange2(index, e, null, "courseFilePoints")}
                    />
                  </td>
                  <td className="text-center">
                    {rows1
                      .filter((row1) => row1.sem === "sem1")
                      .map((row1) => (
                        <div key={row1.subjectCode}>
                          <label>{row1.subjectCode}</label>
                          <input
                            type="checkbox"
                            name="checklist"
                            checked={row.checklist[`sem1-${row1.subjectCode}`] || false}
                            onChange={(e) => handleChange2(index, e, `sem1-${row1.subjectCode}`, "checklist")}
                          />
                        </div>
                      ))}
                  </td>
                  <td className="text-center">
                    {rows1
                      .filter((row1) => row1.sem === "sem2")
                      .map((row1) => (
                        <div key={row1.subjectCode}>
                          <label>{row1.subjectCode}</label>
                          <input
                            type="checkbox"
                            name="checklist"
                            checked={row.checklist[`sem2-${row1.subjectCode}`] || false}
                            onChange={(e) => handleChange2(index, e, `sem2-${row1.subjectCode}`, "checklist")}
                          />
                        </div>
                      ))}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="averageScore"
                      value={row.averageScore || "0.00"}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="averageScore2"
                      value={row.averageScore2 || "0.00"}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="dfacScore"
                      value={row.dfacScore || ""}
                      onChange={(e) => handleChange2(index, e, null, "dfacScore")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Self Score and DFAC Score Below the Table */}
          <div style={{ marginTop: "20px" }}>
            <h6>Scores</h6>
            <div style={{ display: "flex", gap: "20px" }}>
              <label>
                Self Score:
                <input
                  type="number"
                  value={calculateSelfScore2()} // Automatically calculate self-score
                  readOnly
                />
              </label>
              <label>
                DFAC Score:
                <input
                  type="number"
                  value={dfacScore2} // Display DFAC score
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </fieldset>


       {/* Table 3 */}
        <fieldset>
          <div>
            <h6>
              3. External College exam/ Evaluation duties: 5 points/subject for evaluation; Invigilation duty = 1 point; How many times this duty has been performed in the previous two semesters?
            </h6>
            <table>
              <thead>
                <tr>
                  <th>Nature of Duty</th>
                  <th>Sem 1 (Number)</th>
                  <th>Sem 2 (Number)</th>
                  <th>Total No. of Duties Performed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows3.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        name="natureOfDuty"
                        value={row.natureOfDuty}
                        onChange={(e) => handleChange3(index, e)}
                      >
                        <option value="">Select an option</option>
                        <option value="ExternalEvaluation">External Evaluation</option>
                        <option value="ExternalInvigilation">External Invigilation</option>
                        <option value="Lab-Internal Member">Lab - Internal Member</option>
                        <option value="Seminar-Internal Member">Seminar - Internal Member</option>
                        <option value="MiniProject-InternalMember">Mini Project - Internal Member</option>
                        <option value="MajorProject-InternalMember">Major Project - Internal Member</option>
                        <option value="TermPaperEval">Term Paper Evaluation</option>
                        <option value="AnyOther">Any Other</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="sem1"
                        value={row.sem1}
                        onChange={(e) => handleSemChange(index, "sem1", Math.min(e.target.value, 10))} // Cap at 10
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="sem2"
                        value={row.sem2}
                        onChange={(e) => handleSemChange(index, "sem2", Math.min(e.target.value, 10))} // Cap at 10
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalDuties"
                        value={Math.min((row.sem1 || 0) + (row.sem2 || 0), 20)} // Cap at 20
                        readOnly
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow3(index)}>
                        Delete Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow3}>
              Add Row
            </button>
          </div>

          {/* Self Score and DFAC Score Below the Table */}
          <div style={{ marginTop: "20px" }}>
            
            <div style={{ display: "flex", gap: "20px" }}>
              <label>
                Self Score:
                <input
                  type="number"
                  value={Math.min(selfScoreCalculation3(), 20)} // Cap at 20
                  readOnly
                />
              </label>
              <label>
                DFAC Score:
                <input
                  type="number"
                  value={dfacScore3} // Disabled and non-editable
                  disabled
                />
              </label>
            </div>
          </div>
        </fieldset>

        
      
        {/* Table 4 */}
        <fieldset>
          <div>
            <h6>
              4. Internal exam / Evaluation duties for continuous assessment:
              Each duty = 1 point /invigilation duty. Each internal evaluation = 1 point 
              (Assignment test, home assignment test, sessionals, and exams).
              <br />
              Max Score: 40
            </h6>
            <table>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>No. of Duties in Sem 1 & Sem 2</th>
                  <th>Evaluation done as per Schedule or Not</th>
                  <th>Any Remarks received from DFAC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows4.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="sNo"
                        value={row.sNo}
                        onChange={(e) => handleChange4(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="dutiesSem1Sem2"
                        value={row.dutiesSem1Sem2}
                        onChange={(e) =>
                          handleDutiesChange4(index, Math.min(e.target.value, 40)) // Cap duties at 40
                        }
                      />
                    </td>
                    <td>
                      <select
                        name="evaluationSchedule"
                        value={row.evaluationSchedule}
                        onChange={(e) => handleChange4(index, e)}
                      >
                        <option value="">Select an option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="remarksDFAC"
                        value={row.remarksDFAC}
                        onChange={(e) => handleChange4(index, e)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteRow4(index)}
                      >
                        Delete Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddRow4}>
              Add Row
            </button>
          </div>

          {/* Self Score and DFAC Score Below the Table */}
          <div style={{ marginTop: "20px" }}>
            <h6>Scores</h6>
            <div style={{ display: "flex", gap: "20px" }}>
              <label>
                Self Score:
                <input
                  type="number"
                  value={Math.min(selfScoreCalculation4(), 40)} // Cap Self Score at 40
                  readOnly
                />
              </label>
              <label>
                DFAC Score:
                <input
                  type="number"
                  value={dfacScore4} // Disabled and non-editable
                  disabled
                />
              </label>
            </div>
          </div>
        </fieldset>

        {/* Table 5 */}
        <fieldset>
          <legend>
            <h6>5. Use of innovating teaching methodologies</h6>
          </legend>
          <label>Is data available?</label>
          <select
            value={isDataAvailable5 ? "Yes" : "No"}
            onChange={(e) => setIsDataAvailable5(e.target.value === "Yes")}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {isDataAvailable5 && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Use of Innovating Teaching Methodology</th>
                    <th>Sem 1 Score</th>
                    <th>Sem 2 Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows5.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          name="useOfInnovatingTeachingMethodology"
                          value={row.useOfInnovatingTeachingMethodology}
                          onChange={(e) =>
                            handleMethodologyChange5(index, e.target.value)
                          }
                        >
                          <option value="">Select an option</option>
                          <option value="PPT with Annotations and Assesment based on content">
                            PPT with Annotations and Assessment based on content
                          </option>
                          <option value="Visuals">Visuals</option>
                          <option value="MOODLE Usage">MOODLE Usage</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="sem1Score"
                          value={row.sem1Score}
                          onChange={(e) =>
                            handleScoreChange5(index, "sem1Score", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="sem2Score"
                          value={row.sem2Score}
                          onChange={(e) =>
                            handleScoreChange5(index, "sem2Score", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteRow5(index)}
                        >
                          Delete Row
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow5}>
                Add Row
              </button>

              {/* Self Score and DFAC Score Below the Table */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={Math.min(selfScoreCalculation5(), 60)} // Cap Self Score at 60
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore5} // Disabled and non-editable
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </fieldset>


        {/* Table 6 */}
        <fieldset>
          <div>
            <h6>
              6. Remedial/Bridge Courses / Content beyond syllabus / Design of new Experiments in the lab related to course outcomes.
            </h6>
            <label>Is data available?</label>
            <select
              value={isDataAvailable6 ? "Yes" : "No"}
              onChange={(e) => setIsDataAvailable6(e.target.value === "Yes")}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {isDataAvailable6 && (
              <>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Items</th>
                        <th>Semester 1</th>
                        <th>Score 1</th>
                        <th>Semester 2</th>
                        <th>Score 2</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows6.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              name="item"
                              value={row.item}
                              onChange={(e) => handleItemChange6(index, e.target.value)}
                            >
                              <option value="">Select an option</option>
                              <option value="Remedial">Remedial</option>
                              <option value="Bridge">Bridge</option>
                              <option value="Career Oriented">Career Oriented</option>
                              <option value="Content Beyond Syllabus">Content Beyond Syllabus</option>
                              <option value="Additional Experiments">Additional Experiments</option>
                              <option value="Job Oriented Certificates">Job Oriented Certificates</option>
                              <option value="AnyOther">Any Other</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="semester1"
                              value={row.semester1}
                              onChange={(e) => handleChange6(index, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="score1"
                              value={row.score1}
                              onChange={(e) =>
                                handleScoreChange6(index, "score1", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="semester2"
                              value={row.semester2}
                              onChange={(e) => handleChange6(index, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="score2"
                              value={row.score2}
                              onChange={(e) =>
                                handleScoreChange6(index, "score2", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDeleteRow6(index)}
                            >
                              Delete Row
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" onClick={handleAddRow6}>
                    Add Row
                  </button>
                </div>

                {/* Self Score and DFAC Score Below the Table */}
                <div style={{ marginTop: "20px" }}>
                  <h6>Scores</h6>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <label>
                      Self Score:
                      <input
                        type="number"
                        value={Math.min(selfScoreCalculation6(), 50)} // Cap Self Score at 50
                        readOnly
                      />
                    </label>
                    <label>
                      DFAC Score:
                      <input
                        type="number"
                        value={dfacScore6} // Disabled and non-editable
                        disabled
                      />
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </fieldset>


          {/* Table 7 */}
          <fieldset>
            <div>
              <h6>7. Counseling with proper records.</h6>
              <label>Is data available?</label>
              <select
                value={isDataAvailable7 ? "Yes" : "No"}
                onChange={(e) => setIsDataAvailable7(e.target.value === "Yes")}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {isDataAvailable7 && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Sem1</th>
                        <th>Sem2</th>
                        <th>Total No. of Sessions Taken</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows7.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              name="item"
                              value={"How many counseling sessions done? for each 5 points"}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="sem1"
                              value={row.sem1}
                              onChange={(e) =>
                                handleSemChange7(index, "sem1", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="sem2"
                              value={row.sem2}
                              onChange={(e) =>
                                handleSemChange7(index, "sem2", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="totalSessions"
                              value={row.totalSessions}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="score"
                              value={row.score}
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Self Score and DFAC Score */}
                  <div style={{ marginTop: "20px" }}>
                    <h6>Scores</h6>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label>
                        Self Score:
                        <input
                          type="number"
                          value={Math.min(selfScoreCalculation7(), 30)} // Cap Self Score at 30
                          readOnly
                        />
                      </label>
                      <label>
                        DFAC Score:
                        <input
                          type="number"
                          value={dfacScore7} // Disabled and non-editable
                          disabled
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </fieldset>
      

          {/* Table 8 */}
          <fieldset>
            <div>
              <h6>
                8. Percentage of passes:
                <br />
                (Less than 55% = 10, 56-65% = 30, 66-75% = 40, 76-85% = 60, Greater than 85% = 70 points)
              </h6>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Sem1</th>
                    <th colSpan="2">Sem2</th>
                    <th rowSpan="2">% Avg</th>
                  </tr>
                  <tr>
                    <th>Subjects</th>
                    <th>% Pass</th>
                    <th>Subjects</th>
                    <th>% Pass</th>
                  </tr>
                </thead>
                <tbody>
                  {rows8.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name="subjectsSem1"
                          value={row.subjectsSem1}
                          onChange={(e) => handleChange8(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="passSem1"
                          value={row.passSem1}
                          onChange={(e) =>
                            handlePassChange8(index, "passSem1", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="subjectsSem2"
                          value={row.subjectsSem2}
                          onChange={(e) => handleChange8(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="passSem2"
                          value={row.passSem2}
                          onChange={(e) =>
                            handlePassChange8(index, "passSem2", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="avg"
                          value={row.avg}
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Self Score and DFAC Score */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScore8()} // Dynamically calculate self-score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore8} // Disabled and non-editable
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Table 9 */}
          <fieldset>
            <div>
              <h6>
                9. Student feedback on teaching (Subject wise and semester wise including Lab).
              </h6>
              <table>
                <thead>
                  <tr>
                    <th>Subjects</th>
                    <th>Feedback in Sem1</th>
                    <th>Subjects</th>
                    <th>Feedback in Sem2</th>
                    <th>Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {rows9.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name="subjectsSem1"
                          value={row.subjectsSem1 || ""} // Provide default value
                          onChange={(e) => handleChange9(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="feedbackSem1"
                          value={row.feedbackSem1 || ""} // Provide default value
                          onChange={(e) =>
                            handleFeedbackChange9(index, "feedbackSem1", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="subjectsSem2"
                          value={row.subjectsSem2 || ""} // Provide default value
                          onChange={(e) => handleChange9(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="feedbackSem2"
                          value={row.feedbackSem2 || ""} // Provide default value
                          onChange={(e) =>
                            handleFeedbackChange9(index, "feedbackSem2", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="avg"
                          value={row.avg || ""} // Provide default value
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Self Score and DFAC Score */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScore9()} // Dynamically calculate self-score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore9} // Disabled and non-editable
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>


          {/* Table 10 */}
          <fieldset>
            <div>
              <h6>10. Project Guidance(Mini project/major project/seminar/term paper)
              If Project work results in a paper publication</h6>
              <table>
                <thead>
                  <tr>
                    <th>Batch No (Sem1)</th>
                    <th>Sem1 Score</th>
                    <th>Batch No (Sem2)</th>
                    <th>Sem2 Score</th>
                    <th>Average Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows10.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={row.batchSem1}
                          onChange={(e) =>
                            handleInputChange10(index, "batchSem1", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.sem1Score}
                          onChange={(e) =>
                            handleInputChange10(index, "sem1Score", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.batchSem2}
                          onChange={(e) =>
                            handleInputChange10(index, "batchSem2", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.sem2Score}
                          onChange={(e) =>
                            handleInputChange10(index, "sem2Score", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input type="text" value={row.avg} readOnly />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleDeleteRow10(index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow10}>
                Add Row
              </button>

              {/* Self Score and DFAC Score */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScore10()} // Dynamically calculate Self Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore10} // Disabled and non-editable
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>


          {/* Table 11 */}
          <fieldset>
            <div>
              <h6>
                11. Feedback from students on project guidance after the Project Internal Evaluation.
              </h6>
              <table>
                <thead>
                  <tr>
                    <th>Batch No (Sem1)</th>
                    <th>Sem1 Feedback</th>
                    <th>Batch No (Sem2)</th>
                    <th>Sem2 Feedback</th>
                    <th>Average Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {rows10.map((row10, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={row10.batchSem1} // Batch.No (Sem1) comes directly from rows10
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={rows11[index]?.sem1Feedback || ""}
                          onChange={(e) => {
                            const value = Math.min(parseFloat(e.target.value) || 0, 5); // Limit to 5
                            handleInputChange11(index, "sem1Feedback", value);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row10.batchSem2} // Batch.No (Sem2) comes directly from rows10
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={rows11[index]?.sem2Feedback || ""}
                          onChange={(e) => {
                            const value = Math.min(parseFloat(e.target.value) || 0, 5); // Limit to 5
                            handleInputChange11(index, "sem2Feedback", value);
                          }}
                        />
                      </td>
                      <td>
                        <input type="text" value={rows11[index]?.avg || ""} readOnly />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Self Score and DFAC Score */}
              <div style={{ marginTop: "20px" }}>
                <h6>Scores</h6>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label>
                    Self Score:
                    <input
                      type="number"
                      value={calculateSelfScore11()} // Dynamically calculate Self Score
                      readOnly
                    />
                  </label>
                  <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore10} // Disabled and non-editable
                      disabled
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>


          {/* Table 12 */}
          <fieldset>
            <div>
              <h6>12. NPTEL/MIT/COURSERA/edx/UDACITY) lectures. </h6>
              <label>Is data available?</label>
              <select
                value={isDataAvailable12 ? "Yes" : "No"}
                onChange={(e) => setIsDataAvailable12(e.target.value === "Yes")}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {isDataAvailable12 && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th colSpan="3">NPTEL/MIT/COURSERA/edx/UDACITY Lectures (60)</th>
                      </tr>
                      <tr>
                        <th>Course Type</th>
                        <th>Attendance</th>
                        <th>End Course Exam Marks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows12.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              name="courseType"
                              value={row.courseType}
                              onChange={(e) => handleChange12(index, e)}
                            >
                              <option value="">Select an option</option>
                              <option value="Full Course with Online Exam">Full Course with Online Exam</option>
                              <option value="Teleconference Mode or Course without Exam">
                                Teleconference Mode or Course without Exam
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="attendance"
                              value={row.attendance}
                              onChange={(e) => {
                                const value = Math.min(parseInt(e.target.value, 10) || 0, 100); // Limit to 100
                                handleChange12(index, { target: { name: "attendance", value } });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="endCourseExamMarks"
                              value={row.endCourseExamMarks}
                              onChange={(e) => {
                                const value = Math.min(parseInt(e.target.value, 10) || 0, 100); // Limit to 100
                                handleChange12(index, { target: { name: "endCourseExamMarks", value } });
                              }}
                            />
                          </td>
                          <td>
                            <button type="button" onClick={() => handleDeleteRow12(index)}>
                              Delete Row
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" onClick={handleAddRow12}>
                    Add Row
                  </button>

                  {/* Self-Score and DFAC Score */}
                  <div style={{ marginTop: "20px" }}>
                    <h6>Scores</h6>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label>
                        Self Score:
                        <input
                          type="number"
                          value={calculateSelfScore12()} // Dynamically calculate Self-Score
                          readOnly
                        />
                      </label>
                      <label>
                    DFAC Score:
                    <input
                      type="number"
                      value={dfacScore12} // Disabled and non-editable
                      disabled
                    />
                  </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </fieldset>

          {/* Table 13 */}
          <fieldset>
            <div>
              <h6>13. Involvement of Faculty in syllabus framing.</h6>
              <label>Is data available?</label>
              <select
                value={isDataAvailable13 ? "Yes" : "No"}
                onChange={(e) => {
                  const isYes = e.target.value === "Yes";
                  setIsDataAvailable13(isYes);

                  // Automatically set Self-Score to 30 for all rows if "Yes" is selected
                  if (isYes) {
                    const updatedRows = rows13.map((row) => ({
                      ...row,
                      selfScore: 30, // Set Self-Score to 30
                    }));
                    setRows13(updatedRows);
                  }
                }}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {isDataAvailable13 && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Involvement of Faculty in Syllabus Framing (30)</th>
                        <th>Self Score</th>
                        <th>DFAC</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows13.map((row, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              name="involvement"
                              value={row.involvement}
                              onChange={(e) => handleChange13(index, e)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="selfScore"
                              value={row.selfScore}
                              readOnly // Make Self-Score read-only
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="dfac"
                              value={row.dfac}
                              disabled // Disable DFAC column
                            />
                          </td>
                          <td>
                            <button type="button" onClick={() => handleDeleteRow13(index)}>
                              Delete Row
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Self Score and DFAC Score Below the Table */}
                  <div style={{ marginTop: "20px" }}>
                    <h6>Scores</h6>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label>
                        Total Self Score:
                        <input
                          type="number"
                          value={calculateTotalSelfScore13()} // Automatically calculate total self-score
                          readOnly
                        />
                      </label>
                      <label>
                        DFAC Score:
                        <input
                          type="number"
                          value={dfacScore13} // Display DFAC score
                          disabled
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </fieldset>

          

        <div className="tab-buttons">
          <button type="button" onClick={() => openTab('Part-A')} >Previous</button>
          <span style={{ margin: '0 5px' }}></span> {/* Gap */}
          <button type="button" onClick={handleSave} style={{ backgroundColor: '#2896a7' }}>Save</button>
          <span style={{ margin: '0 10px' }}></span> {/* Gap */}
          <button type="button" onClick={() => openTab('Part-C')} >Next</button>
        </div>
    </div>


  );
}

export default PartBAssistantProfessor;