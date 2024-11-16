import React from 'react'
import SectionComponent1 from '../SectionComponent1/SectionComponent1'
import Backup from '../BackupComponents/Backup'
import Consult from '../ConsultComponents/Consult'

export default function Homepage() {
  return (
    <div>
      <SectionComponent1 />
      <Backup />
      <Consult />
    </div>
    
  )
}
