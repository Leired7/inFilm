import React from 'react';
import styled from 'styled-components';

export const VisuallyHidden = ({ children, label, ...props }) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const handleKeyDown = (event) => {
        if (event.key === 'Shift') {
          setForceShow(true);
        }
      };

      const handleKeyUp = (event) => {
        if (event.key === 'Shift') {
          setForceShow(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  if (label) {
    return <LabelHiddenStyles {...props}>{children}</LabelHiddenStyles>;
  }

  return <HiddenStyles {...props}>{children}</HiddenStyles>;
};

const HiddenStyles = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const LabelHiddenStyles = styled.label`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;
