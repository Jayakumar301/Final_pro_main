import React, { useState } from 'react';
import Description from './Description';
import Instructions from './Instructions';
import LoginPage from './LoginPage';

function LandingPage() {
  const [content, setContent] = useState(<div>
    <h2>Welcome to PBAS</h2>
    <div className="content">
      <h2>Introduction:</h2>
      <p>PBAS is a systematic evaluation tool that measures employees' or faculty members' contributions based on predefined criteria.</p>

      <h2>Purpose:</h2>
      <p>Ensures a fair, data-driven, and unbiased performance assessment.</p>

      <h2>Need for PBAS in Present Times:</h2>
      <p>Organizations and institutions require automated evaluation to replace manual, error-prone appraisal methods.</p>

      <h2>Efficiency:</h2>
      <p>PBAS reduces time-consuming paperwork and speeds up performance reviews.</p>

      <h2>Accuracy:</h2>
      <p>Uses data analytics to minimize human errors and biases.</p>

      <h2>Transparency:</h2>
      <p>Employees can track their performance and understand appraisal criteria.</p>

      <h2>Encourages Productivity:</h2>
      <p>Provides a clear goal-oriented framework, motivating employees to perform better.</p>

      <h2>Modern-Day Use in Education:</h2>
      <p>Academic institutions use PBAS to assess faculty performance, research output, and student engagement.</p>

      <h2>Corporate Sector Applications:</h2>
      <p>Used for employee evaluation, promotions, and performance-based bonuses.</p>

      <h2>Flexible and Customizable:</h2>
      <p>Can be tailored to fit the specific needs of organizations.</p>

      <h2>Technology Integration:</h2>
      <p>Uses AI, machine learning, and cloud computing for performance analysis.</p>

      <h2>Remote Work Adaptability:</h2>
      <p>Helps organizations evaluate employees working in hybrid or remote environments.</p>

      <h2>Reduces Subjectivity:</h2>
      <p>Objective scoring ensures fair treatment for all employees.</p>

      <h2>Performance Metrics:</h2>
      <p>Evaluates aspects like teaching, research, leadership, and administration.</p>

      <h2>Data Security:</h2>
      <p>Uses encrypted storage to protect sensitive information.</p>

      <h2>Automated Report Generation:</h2>
      <p>Provides instant appraisal reports for review and decision-making.</p>

      <h2>Better Employee Satisfaction:</h2>
      <p>Employees feel valued when their performance is fairly recognized.</p>

      <h2>Encourages Skill Development:</h2>
      <p>Helps individuals identify strengths and areas for improvement.</p>

      <h2>Paperless Process:</h2>
      <p>Supports eco-friendly digital transformation by eliminating paper usage.</p>

      <h2>Multi-Level Review System:</h2>
      <p>Ensures fair evaluation through review committees and hierarchy approvals.</p>
    </div>
  </div>);
  const [showModal, setShowModal] = useState(false);

  const handleContentChange = (component) => {
    setContent(component);
    setShowModal(false); // Close modal if open
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <header>
        <h1>Performance Based Appraisal System for Faculty Members</h1>
      </header>
      <aside>
        <nav>
          <ul>
            <li onClick={() => handleContentChange(<Instructions />)}>Instructions</li>
            <li onClick={() => handleContentChange(<Description />)}>Description</li>
            <li onClick={handleLoginClick}>Login</li>
            <li>Extra Option 1</li>
            <li>Extra Option 2</li>
          </ul>
        </nav>
      </aside>
      <main className={showModal ? 'blur' : ''}>
        <section>
          {content}
        </section>
      </main>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <LoginPage />
            <button className="close-modal" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;