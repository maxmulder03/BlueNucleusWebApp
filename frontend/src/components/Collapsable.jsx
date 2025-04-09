import React, { useState } from "react";

export default function Collapsable({ title, description }) {
  const [collapsed, setcollapsed] = useState(false);

  return (
    <div className="flex-column1">
      <button
        onClick={() => setcollapsed(!collapsed)}
        style={{ cursor: "pointer" }}
      >
        {title}
      </button>
      {collapsed && (
        <>
          <div>{description}</div>
        </>
      )}
    </div>
  );
}
