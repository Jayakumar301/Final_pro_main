import React from 'react';
import { useLocation } from 'react-router-dom';
import PartCProfessor from './PartCProfessor';
import PartCAssistantProfessor from './PartCAssistantProfessor';
import PartCAssociativeProfessor from './PartCAssociativeProfessor';

function PartC({ openTab }) {
  const location = useLocation();
  const { category } = location.state || {};

  const renderComponent = () => {
    switch (category) {
      case 'Professor':
        return <PartCProfessor openTab={openTab} />;
      case 'Assistant Professor':
        return <PartCAssistantProfessor openTab={openTab} />;
      case 'Associative Professor':
        return <PartCAssociativeProfessor openTab={openTab} />;
      default:
        return <div>Please select a category</div>;
    }
  };

  return (
    <div className="Part-C">
      {renderComponent()}
    </div>
  );
}

export default PartC;