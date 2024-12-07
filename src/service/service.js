import React, { useEffect, useState } from "react";

const Service = ({ service, children }) => {
  const [isAccessible, setIsAccessible] = useState(true);

  useEffect(() => {
    const now = new Date();
    if (now >= new Date(service)) {
      setIsAccessible(false);
    }
  }, [service]);

  if (!isAccessible) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        <h1>⚠️ Access Denied</h1>
        <p>The system isn't paid yet.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Service;
