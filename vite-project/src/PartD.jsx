import React from 'react';
import { useLocation } from 'react-router-dom';
import PartDProfessor from './PartDProfessor';
import PartDAssistantProfessor from './PartDAssistantProfessor';
import PartDAssociativeProfessor from './PartDAssociativeProfessor';

function PartD({ openTab }) {
  const location = useLocation();
  const { category } = location.state || {};

  const renderComponent = () => {
    switch (category) {
      case 'Professor':
        return <PartDProfessor openTab={openTab} />;
      case 'Assistant Professor':
        return <PartDAssistantProfessor openTab={openTab} />;
      case 'Associative Professor':
        return <PartDAssociativeProfessor openTab={openTab} />;
      default:
        return <div>Please select a category</div>;
    }
  };

  return (
    <div className="Part-D">
      {renderComponent()}
    </div>
  );
}

export default PartD;