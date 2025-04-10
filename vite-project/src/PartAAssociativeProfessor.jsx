// PartAAssociativeProfessor.jsx
import React from 'react';
import PartAForm from './PartAForm';

function PartAAssociativeProfessor({ category, openTab }) {
  return <PartAForm category={category} openTab={openTab} title="Part A - Associative Professor Personal Information" />;
}

export default PartAAssociativeProfessor;