import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PartA({ category, openTab }) {
  const [educationRows, setEducationRows] = useState([]);
  const location = useLocation();
  const department = location.state?.department || '';
  const [formData, setFormData] = useState({
    name: '',
    postHeld: '',
    id: '',
    appointmentDate: '',
    address: '',
    contact: '',
    gmail: '',
    dob: ''

  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [experienceRows, setExperienceRows] = useState([]);

  const calculateSelfScore = () => {
    let totalScore = 0;
  
    experienceRows.forEach((row) => {
      const institution = row.institution || '';
      const fromDate = new Date(row.from);
      const toDate = new Date(row.to || new Date());
      const experienceInYears = (toDate - fromDate) / (1000 * 60 * 60 * 24 * 365.25); // Convert ms to years

      // Convert years with decimal precision for months
      const yearsWithMonths = parseFloat(experienceInYears.toFixed(1)); // Example: 5 years 4 months -> 5.3
  
      const normalizedInstitution = institution.toLowerCase();
      const bapatlaInstitutions = [
        'bapatla engineering college',
        'bapatlaengineeringcollege',
        'bapatlaEngineeringcollege',
        'BapatlaEngineeringcollege',
        'BapatlaEngineeringCollege',
        'bec',"BEC","Bec","Bapatla Engineering College","Bapatla Engineering college",
      ];

      if (bapatlaInstitutions.includes(normalizedInstitution)) {
        totalScore += yearsWithMonths * 5;
      } else {
        totalScore += yearsWithMonths * 2.5;
      }
    });
  
    totalScore = Math.min(totalScore, 50); // Cap the score at 50
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      selfScore: totalScore.toFixed(2), // Round to 2 decimal places
    }));
  };

  const handleExperienceInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...experienceRows];
    updatedRows[index][name] = value;
    setExperienceRows(updatedRows);
    calculateSelfScore(); // Recalculate the score whenever experience data changes
  };

  const addExperienceRow = () => {
    setExperienceRows([...experienceRows, { institution: '', from: '', to: '' }]);
  };

  const deleteExperienceRow = (index) => {
    const updatedRows = [...experienceRows];
    updatedRows.splice(index, 1);
    setExperienceRows(updatedRows);
    calculateSelfScore(); // Recalculate the score whenever experience data changes
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile && savedProfile.id) {
        try {
          const response = await axios.get(`http://localhost:5000/get-profile?username=${savedProfile.id}`);
          if (response.status === 200) {
            const profileData = response.data;
            setFormData({
              ...formData,
              name: profileData.name || '',
              gmail: profileData.gmail || '',
              contact: profileData.phone || '',
              address: profileData.address || '',
              id: savedProfile.id, // Set id from profile id
            });
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchPartAData = async () => {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile && savedProfile.id) {
        try {
          const response = await axios.get(`http://localhost:5000/get-part-data?id=${savedProfile.id}&part=parta`);
          if (response.status === 200 && response.data.success) {
            const partAData = response.data.data;
  
            // Format the date fields for input type="date"
            const formattedAppointmentDate = partAData.appointmentDate
              ? new Date(partAData.appointmentDate).toISOString().split('T')[0]
              : '';
            const formattedDOB = partAData.dob
              ? new Date(partAData.dob).toISOString().split('T')[0]
              : '';
  
            // Populate the form with fetched data
            setFormData({
              ...formData,
              name: partAData.name || '',
              postHeld: partAData.postHeld || '',
              id: partAData.id || '',
              appointmentDate: formattedAppointmentDate,
              address: partAData.address || '',
              contact: partAData.contact || '',
              gmail: partAData.email || '',
              dob: formattedDOB,
              selfScore: partAData.selfScore || '',
              dfacScore: partAData.dfacScore || '',
            });
  
            setEducationRows(partAData.educationRows || []);
            setExperienceRows(partAData.experienceRows || []);
          }
        } catch (error) {
          console.error('Error fetching PartA data:', error);
        }
      }
    };
  
    fetchPartAData();
  }, []);
  const addEducationRow = () => {
    setEducationRows([...educationRows, { programme: '', periodOfStudy: '', university: '', marksCGPA: '', classObtained: '' }]);
  };

  const handleEducationInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...educationRows];
    newRows[index][name] = value;
    setEducationRows(newRows);
  };

  const deleteEducationRow = (index) => {
    const newRows = [...educationRows];
    newRows.splice(index, 1);
    setEducationRows(newRows);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    // Validate id format
    const idRegex = /^(BEC|bec|Bec)\d{6}$/;
    if (!idRegex.test(formData.id)) {
      newErrors.id = 'Please enter a valid Identification Number';
    }

    // Validate Gmail format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(formData.gmail)) {
      newErrors.gmail = 'Please enter a valid Gmail address';
    }

    // Validate education details
    educationRows.forEach((row, index) => {
      Object.keys(row).forEach((key) => {
        if (!row[key]) {
          newErrors[`education-${index}-${key}`] = 'This field is required';
        }
      });
    });

    // Validate experience details
    experienceRows.forEach((row, index) => {
      Object.keys(row).forEach((key) => {
        if (!row[key]) {
          newErrors[`experience-${index}-${key}`] = 'This field is required';
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please fill all the required fields.');
    }

    return Object.keys(newErrors).length === 0;
  };

  const saveFormData = async () => {
    if (!validateForm()) {
      setIsFormValid(false);
      return;
    }

    const data = {
      ...formData,
      department,
      category,
      educationRows,
      experienceRows,
      selfScore: formData.selfScore, // Include selfScore
      dfacScore: formData.dfacScore || '', // Include dfacScore
    };

    try {
      const response = await fetch('http://localhost:5000/save-parta-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert('PartA Data saved Successfully');
      setIsFormValid(true);

      // Update profile in localStorage
      const updatedProfile = {
        ...JSON.parse(localStorage.getItem('profile')),
        name: formData.name,
        gmail: formData.gmail,
        phone: formData.contact,
        address: formData.address,
      };
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='parts'>
      <h2>Personal Information</h2>
      
      <fieldset>
        <legend>Personal Details</legend>
        <div>
          <label
            htmlFor="name"
            style={{ color: errors.name ? 'red' : 'black' }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="designation">AICTE Designation:</label>
          <input type="text" id="designation" name="designation" value={category} readOnly />
        </div>

        <div>
          <label htmlFor="department">Name of Department:</label>
          <input type="text" id="department" name="department" value={department} readOnly />
        </div>

        <div>
          <label
            htmlFor="postHeld"
            style={{ color: errors.postHeld ? 'red' : 'black' }}
          >
            Post Held:
          </label>
          <input
            type="text"
            id="postHeld"
            name="postHeld"
            value={formData.postHeld}
            onChange={handleInputChange}
            required
          />
          {errors.postHeld && <span className="error-message">{errors.postHeld}</span>}
        </div>

        <div>
          <label
            htmlFor="id"
            style={{ color: errors.id ? 'red' : 'black' }}
          >
            Employee Identification Number:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
          {errors.id && <span className="error-message">{errors.id}</span>}
        </div>

        <div>
          <label
            htmlFor="appointmentDate"
            style={{ color: errors.appointmentDate ? 'red' : 'black' }}
          >
            Date of Appointment to Present Post:
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            required
          />
          {errors.appointmentDate && <span className="error-message">{errors.appointmentDate}</span>}
        </div>

        <div>
          <label
            htmlFor="dob"
            style={{ color: errors.dob ? 'red' : 'black' }}
          >
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
            required
          />
          {errors.dob && <span className="error-message">{errors.dob}</span>}
        </div>

        <div>
          <label
            htmlFor="address"
            style={{ color: errors.address ? 'red' : 'black' }}
          >
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          ></textarea>
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div>
          <label
            htmlFor="contact"
            style={{ color: errors.contact ? 'red' : 'black' }}
          >
            Contact Details:
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>
        <div>
          <label
            htmlFor="gmail"
            style={{ color: errors.gmail ? 'red' : 'black' }}
          >
            Gmail:
          </label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            value={formData.gmail}
            onChange={handleInputChange}
            required
          />
          {errors.gmail && <span className="error-message">{errors.gmail}</span>}
        </div>
      </fieldset>

      <fieldset>
        <legend>Education Qualification</legend>
        <table>
          <thead>
            <tr>
              <th>Programme</th>
              <th>Period of Study</th>
              <th>University</th>
              <th>Marks/CGPA</th>
              <th>Class Obtained</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {educationRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="programme"
                    value={row.programme}
                    onChange={(e) => handleEducationInputChange(index, e)}
                    required
                  />
                  {errors[`education-${index}-programme`] && <span className="error-message">{errors[`education-${index}-programme`]}</span>}
                </td>
                <td>
                  <input
                    type="text"
                    name="periodOfStudy"
                    value={row.periodOfStudy}
                    onChange={(e) => handleEducationInputChange(index, e)}
                    required
                  />
                  {errors[`education-${index}-periodOfStudy`] && <span className="error-message">{errors[`education-${index}-periodOfStudy`]}</span>}
                </td>
                <td>
                  <input
                    type="text"
                    name="university"
                    value={row.university}
                    onChange={(e) => handleEducationInputChange(index, e)}
                    required
                  />
                  {errors[`education-${index}-university`] && <span className="error-message">{errors[`education-${index}-university`]}</span>}
                </td>
                <td>
                  <input
                    type="text"
                    name="marksCGPA"
                    value={row.marksCGPA}
                    onChange={(e) => handleEducationInputChange(index, e)}
                    required
                  />
                  {errors[`education-${index}-marksCGPA`] && <span className="error-message">{errors[`education-${index}-marksCGPA`]}</span>}
                </td>
                <td>
                  <input
                    type="text"
                    name="classObtained"
                    value={row.classObtained}
                    onChange={(e) => handleEducationInputChange(index, e)}
                    required
                  />
                  {errors[`education-${index}-classObtained`] && <span className="error-message">{errors[`education-${index}-classObtained`]}</span>}
                </td>
                <td>
                  <button type="button" onClick={() => deleteEducationRow(index)}>Delete Row</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addEducationRow}>Create Row</button>
      </fieldset>

      <fieldset className="fieldset-table">
        <legend>Experience</legend>
        <h6>Note: If your institution is Bapatla Engineering College then Please enter BEC or Bec</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Designation</th>
                <th>Institution</th>
                <th>From</th>
                <th>To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {experienceRows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="designation"
                      value={row.designation}
                      onChange={(e) => handleExperienceInputChange(index, e)}
                      required
                    />
                    {errors[`experience-${index}-designation`] && <span className="error-message">{errors[`experience-${index}-designation`]}</span>}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="institution"
                      value={row.institution}
                      onChange={(e) => handleExperienceInputChange(index, e)}
                      required
                    />
                    {errors[`experience-${index}-institution`] && <span className="error-message">{errors[`experience-${index}-institution`]}</span>}
                  </td>
                  <td>
                    <input
                      type="date"
                      name="from"
                      value={row.from}
                      onChange={(e) => handleExperienceInputChange(index, e)}
                      required
                    />
                    {errors[`experience-${index}-from`] && <span className="error-message">{errors[`experience-${index}-from`]}</span>}
                  </td>
                  <td>
                    <input
                      type="date"
                      name="to"
                      value={row.to}
                      onChange={(e) => handleExperienceInputChange(index, e)}
                      required
                    />
                    {errors[`experience-${index}-to`] && <span className="error-message">{errors[`experience-${index}-to`]}</span>}
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteExperienceRow(index)}>
                      Delete Row
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={addExperienceRow}>
          Create Row
        </button>
      </fieldset>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <label htmlFor="selfScore">Self-Score:</label>
          <input type="text" id="selfScore" name="selfScore" value={formData.selfScore} readOnly />
        </div>
        <div>
          <label htmlFor="dfacScore">DFAC Score:</label>
          <input type="text" id="dfacScore" name="dfacScore" value={formData.dfacScore || ''} readOnly disabled />
        </div>
      </div>

      <div className="tab-buttons">
        <button type="button" onClick={saveFormData} style={{ backgroundColor: isFormValid ? '#2896a7' : 'red' }}>
          Save
        </button>
        <span style={{ margin: '0 10px' }}></span> {/* Gap */}
        <button
          type="button"
          onClick={() => {
            if (validateForm()) {
              openTab('Part-B');
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PartA;