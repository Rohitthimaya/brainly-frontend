import { useState } from 'react';
import { Button } from "../components/Button";
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const contents = useContent();

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-1'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
        }} />
        <div className='flex justify-end gap-4'>
          <Button onClick={() => {
            setModalOpen(true)
          }} variant={'primary'} text={'Add content'} startIcon={<PlusIcon />} />
          <Button variant={'secondary'} text={'Share brain'} startIcon={<ShareIcon />} />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {JSON.stringify(contents)}
          {contents.map(({type, link, title}) => 
            <Card type={type} link={link} title={title}/>
          )}
        </div>
      </div>
    </div>
  )
}
