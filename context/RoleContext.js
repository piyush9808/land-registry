import React, { createContext, useState, useEffect} from "react";

const RoleContext = createContext();

const RoleProvider = ({ children }) => {
// const localvalue =   localStorage.getItem("role");

  // let localValue;
  const [role, setRole] = useState(null);


  useEffect(() => {
    // Get the stored value from localStorage
    const stored = localStorage.getItem('role');

    // If there's a stored value, set it in the component state
    if (stored) {
      setRole(stored);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export { RoleProvider, RoleContext};
