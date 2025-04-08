import React, { useState } from 'react'

export default function Collapsable({title, description}) {
  const [collapsed, setcollapsed] = useState(false)

  return (
    <div className='flex-column1'>
      <div 
        onClick={()=>setcollapsed(!collapsed)}
        style={{cursor: 'pointer'}}
      >
        {title}
      </div>
      {collapsed && (
        <>
          <div>{description}</div>
        </>
      )}
    </div>
  )
}
