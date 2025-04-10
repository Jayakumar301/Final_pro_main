// PartAProfessor.jsx
import React from 'react';
import PartAForm from './PartAForm';

function PartAProfessor({ category, openTab }) {
  return <PartAForm category={category} openTab={openTab} title="Part A - Professor Personal Information" />;
}

export default PartAProfessor;