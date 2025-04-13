import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ReportsPage() {
  const [userData, setUserData] = useState({});
  const [id, setid] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    if (!id) {
      setError("Please enter a valid ID");
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/get-user-data', {
        params: { id },
      });
  
      if (response.status === 200 && response.data) {
        setUserData(response.data);
        setError(""); // Clear error message
      } else {
        setUserData({});
        setError("Data not found for this ID");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Something went wrong");
    }
  };
  
 
      
  const generatePDF = () => {
    const input = document.body; // Target the entire page
    const filename = id ? `user_data_${id}.pdf` : 'user_data.pdf'; // Use ID in filename if available
  
    html2canvas(input, {
      scale: 2, // Scale for better resolution
      scrollX: 0,
      scrollY: 0,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4', // Standard A4 size for PDF
        });
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
  
        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;
  
        let currentHeight = 0;
  
        // Add pages as needed
        while (currentHeight < scaledHeight) {
          const portion = canvas.getContext('2d').getImageData(
            0, 
            (currentHeight / ratio), 
            imgWidth, 
            pdfHeight / ratio
          );
  
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = imgWidth;
          tempCanvas.height = pdfHeight / ratio;
  
          const tempCtx = tempCanvas.getContext('2d');
          tempCtx.putImageData(portion, 0, 0);
  
          const tempImgData = tempCanvas.toDataURL('image/png');
          pdf.addImage(tempImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
          currentHeight += pdfHeight;
  
          if (currentHeight < scaledHeight) {
            pdf.addPage(); // Add a new page if content overflows
          }
        }
  
        pdf.save(filename); // Save with dynamic filename
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const renderData = (data, part) => {
    if (!data) return null;
    return (
      <div>
        <h2>{part}</h2>
        {Object.keys(data).map((key, index) => {
          if (key.startsWith('rows') && Array.isArray(data[key]) && data[key].length > 0) {
            return (
              <div key={index}>
                <h3>{index + 1}. {key.replace(/rows(\d+)/, 'Section $1')}</h3>
                <table className="styled-table">
                  <thead>
                    <tr>
                      {Object.keys(data[key][0]).map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data[key].map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((value, id) => (
                          <td key={id}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return (
            <p key={index}>{key}: {data[key]}</p>
          );
        })}
      </div>
    );
  };


  return (
    <div>
       <div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={id}
          onChange={(e) => setid(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        {error && <span style={{ color: 'red', marginLeft: '10px' }}>{error}</span>}
      </div>

      <h1>Reports Page</h1>
      {userData && Object.keys(userData).length > 0 ? (
        <div id="userData">
          {/* Existing data rendering logic */}
        </div>
      ) : (
        !error && <p>No data to display. Please enter a valid ID.</p>
      )}
    </div>

      
      <div id="userData">
         
        {userData.partA && (
          <div>
            <p>1. Personal Details:</p>
            <p>1. Name: {userData.partA.name}</p>
            <p>3. Name of the Department: {userData.partA.department}</p>
            <p>4. Post held: {userData.partA.postHeld}</p>
            <p>5. Employee Identification Number: {userData.partA.id}</p>
            <p>6. Date of Appointment to the present post: {userData.partA.appointmentDate}</p>
            <p>7. Date of birth: {userData.partA.dob}</p>
            <p>8. Address: {userData.partA.address}</p>
            <p>9. Contact details: E-mail: {userData.partA.gmail}, Telephone: {userData.partA.phone}, Mobile: {userData.partA.mobile}</p>
          </div>
        )}

        
        {userData.partB && (
          <div>
            <h2>PART - B</h2>
            <h3>1. Teaching weekly load allotted by Department as per curricular time table and Lectures actually taken as fraction of lectures allocated:</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject Type</th>
                  <th>Subject Code</th>
                  <th>Weekly Load</th>
                  <th>Sem</th>
                  <th>Subject Title</th>
                  <th>Lectures Taken/Lectures Proposed</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows1.map((row, index) => (
                  <tr key={index}>
                    <td>{row.subjectType}</td>
                    <td>{row.subjectCode}</td>
                    <td>{row.weeklyLoad}</td>
                    <td>{row.sem}</td>
                    <td>{row.subjectTitle}</td>
                    <td>{row.lectures}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>2. Course files with the following data have been prepared:</h3>
            <table>
              <thead>
                <tr>
                  <th>Course File Points (Weightage)</th>
                  {userData.partB.rows2[0].checklist && Object.keys(userData.partB.rows2[0].checklist).map(subjectCode => (
                    <th key={subjectCode}>{subjectCode}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows2.map((row, index) => (
                  <tr key={index}>
                    <td>{row.courseFilePoints}</td>
                    {row.checklist && Object.values(row.checklist).map((checked, index) => (
                      <td key={index}>{checked ? '✔' : ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>3. External College exam/ Evaluation duties:</h3>
            <table>
              <thead>
                <tr>
                  <th>Nature of Duty</th>
                  <th>Sem 1 (Number)</th>
                  <th>Sem 2 (Number)</th>
                  <th>Total No. of Duties Performed</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows3.map((row, index) => (
                  <tr key={index}>
                    <td>{row.natureOfDuty}</td>
                    <td>{row.sem1}</td>
                    <td>{row.sem2}</td>
                    <td>{row.totalDuties}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>4. Internal exam / Evaluation duties for continuous assessment:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>No. of Duties in Sem 1 & Sem 2</th>
                  <th>Evaluation done as per Schedule or Not</th>
                  <th>Any Remarks received from DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows4.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.dutiesSem1Sem2}</td>
                    <td>{row.evaluationSchedule}</td>
                    <td>{row.remarksDFAC}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>5. Use of innovating teaching methodologies:</h3>
            <table>
              <thead>
                <tr>
                  <th>Use of Innovating Teaching Methodology</th>
                  <th>Sem 1 Score</th>
                  <th>Sem 2 Score</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows5.map((row, index) => (
                  <tr key={index}>
                    <td>{row.useOfInnovatingTeachingMethodology}</td>
                    <td>{row.sem1Score}</td>
                    <td>{row.sem2Score}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>6. Remedial/Bridge Courses /Content beyond syllabus/Design of new Experiments in the lab related to course outcomes:</h3>
            <table>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Semester 1</th>
                  <th>Score 1</th>
                  <th>Semester 2</th>
                  <th>Score 2</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows6.map((row, index) => (
                  <tr key={index}>
                    <td>{row.item}</td>
                    <td>{row.semester1}</td>
                    <td>{row.score1}</td>
                    <td>{row.semester2}</td>
                    <td>{row.score2}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>7. Counseling with proper records:</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Sem 1</th>
                  <th>Sem 2</th>
                  <th>Total no of Sessions taken</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows7.map((row, index) => (
                  <tr key={index}>
                    <td>{"How many counselling sessions done? for each 5 points"}</td>
                    <td>{row.sem1}</td>
                    <td>{row.sem2}</td>
                    <td>{row.totalSessions}</td>
                    <td>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>8. Percentage of passes:</h3>
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Sem 1</th>
                  <th colSpan="2">Sem 2</th>
                  <th rowSpan="2">Avg%</th>
                </tr>
                <tr>
                  <th>Subjects</th>
                  <th>% Pass</th>
                  <th>Subjects</th>
                  <th>% Pass</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows8.map((row, index) => (
                  <tr key={index}>
                    <td>{row.subjectsSem1}</td>
                    <td>{row.passSem1}</td>
                    <td>{row.subjectsSem2}</td>
                    <td>{row.passSem2}</td>
                    <td>{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>9. Student feedback on teaching (Subject wise and semester wise including Lab):</h3>
            <table>
              <thead>
                <tr>
                  <th>Subjects (Sem 1)</th>
                  <th>Feedback (Sem 1)</th>
                  <th>Subjects (Sem 2)</th>
                  <th>Feedback (Sem 2)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows9.map((row, index) => (
                  <tr key={index}>
                    <td>{row.subjectsSem1}</td>
                    <td>{row.feedbackSem1}</td>
                    <td>{row.subjectsSem2}</td>
                    <td>{row.feedbackSem2}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>10. Project Guidance (Mini project/major project/seminar/term paper):</h3>
            <table>
              <thead>
                <tr>
                  <th>Project Batch No</th>
                  <th>Sem</th>
                  <th>Average Score in a Batch</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows10.map((row, index) => (
                  <tr key={index}>
                    <td>{row.projectBatchNo}</td>
                    <td>{row.sem}</td>
                    <td>{row.averageScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>11. Feedback from students on project guidance after the Project Internal Evaluation:</h3>
            <table>
              <thead>
                <tr>
                  <th>Batch No</th>
                  <th>Sem</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows11.map((row, index) => (
                  <tr key={index}>
                    <td>{row.batchNo}</td>
                    <td>{row.sem}</td>
                    <td>{row.averageScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>12. NPTEL/MIT/COURSERA/edx/UDACITY) lectures:</h3>
            <table>
              <thead>
                <tr>
                  <th>Course Type</th>
                  <th>Attendance</th>
                  <th>End Course Exam Marks</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows12.map((row, index) => (
                  <tr key={index}>
                    <td>{row.courseType}</td>
                    <td>{row.attendance}</td>
                    <td>{row.endCourseExamMarks}</td>
                    <td>{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>13. Involvement of Faculty in syllabus framing:</h3>
            <table>
              <thead>
                <tr>
                  <th>Involvement of Faculty in Syllabus Framing (30)</th>
                  <th>Self Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partB.rows13.map((row, index) => (
                  <tr key={index}>
                    <td>{row.involvement}</td>
                    <td>{row.selfScore}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add blocks for Parts C */}
        {userData.partC && (
          <div>
            <h2>PART - C</h2>
            <h3>6. Student Techno fest (AFOSEC)/Engineers day or other major events:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Events</th>
                  <th>Upload File (less than 100kB)</th>
                  <th>Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partC.rows6.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.event}</td>
                    <td>{row.certificateUrl}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>7. Student innovations; Guidance:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Participation</th>
                  <th>Details</th>
                  <th>Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partC.rows7.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.participation}</td>
                    <td>{row.details}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>8. Consultancy:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Consultancy</th>
                  <th>Details</th>
                  <th>Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partC.rows8.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.consultancy}</td>
                    <td>{row.details}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>9. Arranging Internships for students with proof:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Internship</th>
                  <th>Details</th>
                  <th>Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partC.rows9.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.internship}</td>
                    <td>{row.details}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>10. Knowledge sharing with other departments:</h3>
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Course Duration</th>
                  <th>Feedback</th>
                  <th>Upload File (less than 100kB)</th>
                  <th>Score</th>
                  <th>DFAC</th>
                </tr>
              </thead>
              <tbody>
                {userData.partC.rows10.map((row, index) => (
                  <tr key={index}>
                    <td>{row.sNo}</td>
                    <td>{row.courseDuration}</td>
                    <td>{row.feedback}</td>
                    <td>{row.certificateUrl}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add blocks for Part D */}

        {userData.partD && (
          <div>
            <h2>PART - D</h2>
            <h3>1. Publications:</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>No. of Books/Papers</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows1.map((row, index) => (
                  <tr key={index}>
                    <td>{row.category}</td>
                    <td>{row.type}</td>
                    <td>{row.count}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>2. Sponsored Research projects:</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Sanctioned</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows2.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.sanctioned}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>3. Conferences/ symposia Papers presented/ resource person Outside India:</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows3.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.title}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>4. Patents:</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows4.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.title}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>5. Incubation Centre Established:</h3>
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows5.map((row, index) => (
                  <tr key={index}>
                    <td>{row.role}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>6. Centre of Excellence Established:</h3>
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows6.map((row, index) => (
                  <tr key={index}>
                    <td>{row.role}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>7. Ph.D. Related Activities:</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows7.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>8. Project Guidance to PG Students:</h3>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Score</th>
                  <th>DFAC</th>
                  <th>Upload Certificate (less than 100kB)</th>
                </tr>
              </thead>
              <tbody>
                {userData.partD.rows8.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.score}</td>
                    <td>{row.dfac}</td>
                    <td>{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add blocks for Part E */}
        {userData.partE && (
        <div>
          <h2>PART - E</h2>
          <h3>1. Academic Administration, Institutional duties and extracurricular activities And social responsibility – Asst.Profs.:</h3>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Activity</th>
                <th>SEM-I</th>
                <th>SEM-II</th>
                <th>Total number</th>
                <th>DFAC</th>
              </tr>
            </thead>
            <tbody>
              {userData.partE.rowsTable1.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>{row.activity}</td>
                  <td>{row.sem1}</td>
                  <td>{row.sem2}</td>
                  <td>{row.totalNumber}</td>
                  <td>{row.dfac}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>2. Institutional level administration:</h3>
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
              </tr>
            </thead>
            <tbody>
              {userData.partE.rowsTable2.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>{row.activity}</td>
                  <td>{row.sem1}</td>
                  <td>{row.sem2}</td>
                  <td>{row.totalNumber}</td>
                  <td>{row.dfac}</td>
                  <td>{row.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>3. Institutional Events Organization members, Sports Participants:</h3>
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
              </tr>
            </thead>
            <tbody>
              {userData.partE.rowsTable3.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>{row.activity}</td>
                  <td>{row.sem1}</td>
                  <td>{row.sem2}</td>
                  <td>{row.totalNumber}</td>
                  <td>{row.dfac}</td>
                  <td>{row.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>4. NSS / NCC / Other Service activities:</h3>
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
              </tr>
            </thead>
            <tbody>
              {userData.partE.rowsTable4.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>{row.activity}</td>
                  <td>{row.sem1}</td>
                  <td>{row.sem2}</td>
                  <td>{row.totalNumber}</td>
                  <td>{row.dfac}</td>
                  <td>{row.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>5. Training & other Misc. activities:</h3>
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
              </tr>
            </thead>
            <tbody>
              {userData.partE.rowsTable5.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>{row.activity}</td>
                  <td>{row.sem1}</td>
                  <td>{row.sem2}</td>
                  <td>{row.totalNumber}</td>
                  <td>{row.dfac}</td>
                  <td>{row.certificate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


        {/* Add blocks for Part F */}

        {userData.partF && (
        <div>
          <h2>PART - F</h2>
          <h3>Annual Confidential Report to be filled in by the HOD for Assistant Professor:</h3>
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
              {userData.partF.rows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{row.performance}</td>
                  <td>{row.score}</td>
                  <td>{row.dfac}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>1. Quantitative conversion of qualitative parameters is done to help categorize faculty. These points do not add to the CAS parts 1 -4.</p>
          <p>2. Pen Picture of officer with recommendation of suitability of faculty to draw increment or/ and getting promotion may be given. Adverse remarks if any have to be justified with proof.</p>
          <p>3. Grand Total of above: ____________________________ Signature of HOD with stamp:</p>
          <p>Forwarded to Establishment.: Any remarks in service record (mention date) to be inserted by Establishment Section & signed.</p>
          <p>Principal’s Remarks:</p>
        </div>
      )}

      <button onClick={generatePDF}>Download</button>

      </div>
    </div>
  );
}

export default ReportsPage;