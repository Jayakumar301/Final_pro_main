import React from 'react';
import { useLocation } from 'react-router-dom';
import PartFProfessor from './PartFProfessor';
import PartFAssistantProfessor from './PartFAssistantProfessor';
import PartFAssociativeProfessor from './PartFAssociativeProfessor';

function PartF({ openTab }) {
  const location = useLocation();
  const { category } = location.state || {};

  const renderComponent = () => {
    switch (category) {
      case 'Professor':
        return <PartFProfessor openTab={openTab} />;
      case 'Assistant Professor':
        return <PartFAssistantProfessor openTab={openTab} />;
      case 'Associative Professor':
        return <PartFAssociativeProfessor openTab={openTab} />;
      default:
        return <div>Please select a category</div>;
    }
  };

  return (
    <div className="Part-F">
      {renderComponent()}
    </div>
  );
}

export default PartF;
