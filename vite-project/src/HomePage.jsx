import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function HomePage() {
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [profile, setProfile] = useState({
    id: '',
    username: '',
    name: '',
    gmail: '',
    phone: '',
    address: '',
    photo: ''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (storedProfile && storedProfile.id) {
      setProfile({ ...profile, id: storedProfile.id });
      fetchProfileDetails(storedProfile.id);
    }
  }, []);

  const fetchProfileDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/get-profile?username=${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Profile not found');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleGenerate = () => {
    if (academicYear && category && department) {
      navigate('/parts', { state: { category, department } });
    } else {
      alert('Please select the academic year, category, and department.');
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const openModal = () => {
    setModalIsOpen(true);
    setMessage('');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setMessage('');
  };

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true);
    setMessage('');
  };

  const closePasswordModal = () => {
    setPasswordModalIsOpen(false);
    setOldPassword('');
    setNewPassword('');
    setMessage('');
  };

  const saveProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        const result = await response.json();
        setMessage('Profile saved successfully');
        alert('Profile saved successfully:', result);
        console.log('Profile saved successfully:', result);
        closeModal();
      } else {
        const errorData = await response.text();
        setMessage(`Error saving profile: ${errorData}`);
        console.error('Error saving profile:', errorData);
      }
    } catch (error) {
      setMessage('Error saving profile');
      console.error('Error saving profile:', error);
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profile.id, oldPassword, newPassword }),
      });
      const result = await response.json();
      if (result.success) {
        setMessage('Password changed successfully');
        closePasswordModal();
      } else {
        setMessage('Old password is incorrect');
      }
    } catch (error) {
      setMessage('Error changing password');
      console.error('Error changing password:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={`container d-flex flex-column align-items-center justify-content-center min-vh-100 ${modalIsOpen || passwordModalIsOpen ? 'blurred-content' : ''}`}>
      <div className="background-container"></div>
      <div className="content-container">
        <h1 className="text-primary my-4 text-center">Performance based Appraisal System for Faculty Members (PBAS)</h1>
        <h2 className="text-secondary mb-4 text-center">PBAS Home</h2>
        <div className="profile-circle" onClick={openModal}>
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">P</div>
          )}
        </div>
        <form className="w-100" style={{ maxWidth: '500px' }}>
          <div className="form-group">
            <label htmlFor="academicYear">Academic Year:</label>
            <select id="academicYear" name="academicYear" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="form-control">
              <option value="">Select an option</option>
              <option value="2021-22">2021-22</option>
              <option value="2022-23">2022-23</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
              <option value="">Select an option</option>
              <option value="Professor">Professor</option>
              <option value="Associative Professor">Associative Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="form-control">
              <option value="">Select an option</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </select>
          </div>
          <button type="button" onClick={handleGenerate} className="btn btn-primary btn-block">Generate</button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Modal"
        className="profile-modal"
        overlayClassName="overlay"
      >
        <button className="close-button" onClick={closeModal}>&times;</button>
        <h2>Profile</h2>
        <form>
          <div className="form-group">
            <label htmlFor="id">ID:</label> {/* Add ID field in the form */}
            <input type="text" id="id" name="id" value={profile.id} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={profile.username} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={profile.name} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="gmail">Gmail:</label>
            <input type="email" id="gmail" name="gmail" value={profile.gmail} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={profile.address} onChange={handleProfileChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo:</label>
            <input type="file" id="photo" name="photo" onChange={handlePhotoChange} className="form-control" />
          </div>
          <button type="button" onClick={saveProfile} className="btn btn-primary btn-block">Save</button>
          <button type="button" onClick={closeModal} className="btn btn-secondary btn-block">Close</button>
          <div className="d-flex flex-column mt-3">
            <button type="button" onClick={openPasswordModal} className="btn btn-warning mb-2">Change Password</button>
            <button type="button" onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={passwordModalIsOpen}
        onRequestClose={closePasswordModal}
        contentLabel="Change Password Modal"
        className="profile-modal"
        overlayClassName="overlay"
      >
        <button className="close-button" onClick={closePasswordModal}>&times;</button>
        <h2>Change Password</h2>
        <form>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password:</label>
            <input type="password" id="oldPassword" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" />
          </div>
          <button type="button" onClick={handleChangePassword} className="btn btn-primary btn-block">Change Password</button>
          <button type="button" onClick={closePasswordModal} className="btn btn-secondary btn-block">Close</button>
        </form>
      </Modal>
    </div>
  );
}

export default HomePage;