import React from 'react';
import { useLocation } from 'react-router-dom';
import PartEProfessor from './PartEProfessor';
import PartEAssistantProfessor from './PartEAssistantProfessor';
import PartEAssociativeProfessor from './PartEAssociativeProfessor';

function PartE({ openTab }) {
  const location = useLocation();
  const { category } = location.state || {};

  const renderComponent = () => {
    switch (category) {
      case 'Professor':
        return <PartEProfessor openTab={openTab} />;
      case 'Assistant Professor':
        return <PartEAssistantProfessor openTab={openTab} />;
      case 'Associative Professor':
        return <PartEAssociativeProfessor openTab={openTab} />;
      default:
        return <div>Please select a category</div>;
    }
  };

  return (
    <div className="Part-E">
      {renderComponent()}
    </div>
  );
}

export default PartE;