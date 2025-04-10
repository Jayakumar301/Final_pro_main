// PartAAssistantProfessor.jsx
import React from 'react';
import PartAForm from './PartAForm';

function PartAAssistantProfessor({ category, openTab }) {
  return <PartAForm category={category} openTab={openTab} title="Part A - Assistant Professor Personal Information" />;
}

export default PartAAssistantProfessor;