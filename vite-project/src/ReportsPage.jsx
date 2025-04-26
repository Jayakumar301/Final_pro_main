import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ReportsPage() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id; // Extract the ID passed from previous page

  useEffect(() => {
    if (id) {
      fetchAllData(id);
    }
  }, [id]);

  const fetchAllData = async (profileId) => {
    try {
      const response = await axios.get('http://localhost:5000/get-all-data', {
        params: { id: profileId },
      });

      if (response.status === 200 && response.data) {
        setUserData(response.data); // Combine all parts' data
        setError(""); // Clear any previous errors
      } else {
        setUserData({});
        setError("Data not found for this ID");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Something went wrong");
    }
  };

  const handleDownload = () => {
    const input = document.querySelector('.reports-page'); // Select the specific container of the reports page
    const filename = id ? `report_${id}.pdf` : 'report.pdf';

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pdfWidth;
      const totalPages = Math.ceil(canvasHeight / (pdfHeight * ratio));

      for (let page = 0; page < totalPages; page++) {
        const yOffset = -(pdfHeight * ratio * page);
        pdf.addImage(
          imgData,
          'PNG',
          0,
          yOffset / ratio,
          pdfWidth,
          canvasHeight / ratio
        );

        if (page < totalPages - 1) pdf.addPage();
      }

      pdf.save(filename);
    }).catch((err) => {
      console.error('Error generating PDF:', err);
    });
  };

  const handleHome = () => {
    navigate('/');
  };

  const renderTable = (title, rows) => {
    if (!rows || rows.length === 0) return null;
  
    const headers = Object.keys(rows[0]); // Extract table headers from the first row
    return (
      <div className="table-container" key={title}>
        <h3 className="table-title">{title}</h3>
        <table className="styled-table">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={`header-${idx}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={`row-${rowIdx}`}>
                {Object.values(row).map((value, cellIdx) => (
                  <td key={`cell-${rowIdx}-${cellIdx}`}>
                    {typeof value === "object"
                      ? JSON.stringify(value) // Convert objects to strings
                      : value || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <div className="reports-page">
      <h1 className="reports-title">Reports Page</h1>
      {error && <p className="error-message">{error}</p>}
      {userData && Object.keys(userData).length > 0 ? (
        <div>
          <h2 className="section-title">Saved Data for ID: {id}</h2>

          {userData.partA && (
            <div className="part-section">
              <h2 className="part-title">Part A</h2>
              <p><strong>Name:</strong> {userData.partA.name || "N/A"}</p>
              <p><strong>Department:</strong> {userData.partA.department || "N/A"}</p>
              <p><strong>Post Held:</strong> {userData.partA.postHeld || "N/A"}</p>
              <p><strong>Employee ID:</strong> {userData.partA.id || "N/A"}</p>
              <p><strong>Appointment Date:</strong> {formatDate(userData.partA.appointmentDate)}</p>
              <p><strong>Address:</strong> {userData.partA.address || "N/A"}</p>
              <p><strong>Contact:</strong> {userData.partA.contact || "N/A"}</p>
              <p><strong>Email:</strong> {userData.partA.email || "N/A"}</p>
              {renderTable("Educational Details", userData.partA.educationRows)}
              {renderTable("Experience Details", userData.partA.experienceRows)}
            </div>
          )}

          {userData.partB && (
            <div className="part-section">
              <h2 className="part-title">Part B</h2>
              {Object.keys(userData.partB).map((key, idx) => (
                userData.partB[key]?.data
                  ? renderTable(`Table ${idx + 1}`, userData.partB[key].data)
                  : null
              ))}
            </div>
          )}

          {userData.partC && (
            <div className="part-section">
              <h2 className="part-title">Part C</h2>
              {Object.keys(userData.partC).map((key, idx) => (
                userData.partC[key]?.data
                  ? renderTable(`Table ${idx + 1}`, userData.partC[key].data)
                  : null
              ))}
            </div>
          )}

          {userData.partD && (
            <div className="part-section">
              <h2 className="part-title">Part D</h2>
              {Object.keys(userData.partD).map((key, idx) => (
                userData.partD[key]?.data
                  ? renderTable(`Table ${idx + 1}`, userData.partD[key].data)
                  : null
              ))}
            </div>
          )}

          {userData.partE && (
            <div className="part-section">
              <h2 className="part-title">Part E</h2>
              {Object.keys(userData.partE).map((key, idx) => (
                userData.partE[key]?.data
                  ? renderTable(`Table ${idx + 1}`, userData.partE[key].data)
                  : null
              ))}
            </div>
          )}

          {userData.partF && (
            <div className="part-section">
              <h2 className="part-title">Part F</h2>
              {renderTable("Annual Confidential Report", userData.partF.rows)}
            </div>
          )}
        </div>
      ) : (
        !error && <p className="no-data-message">No data to display. Please enter a valid ID.</p>
      )}

      <div className="button-container">
        <button onClick={handleDownload} className="download-button">Download</button>
        <button onClick={handleHome} className="home-button">Home</button>
      </div>
    </div>
  );
}

export default ReportsPage;