import { useEffect, useState } from 'react';
import { Button } from "../components/Button";
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { Logout } from './Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const contents = useContent();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin")
    }
  }, [isLoggedIn])

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-1'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
        }} />
        <div className='flex justify-start gap-4'>
          <Button onClick={() => {
            setModalOpen(true)
          }} variant={'primary'} text={'Add content'} startIcon={<PlusIcon />} />
          <Button variant={'secondary'} text={'Share brain'} startIcon={<ShareIcon />} />
        </div>

        <div className='flex justify-end gap-4'>
          <Button onClick={() => { <Logout /> }} variant={'primary'} text={'Logout'} />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {contents.map(({ type, link, title }) =>
            <Card type={type} link={link} title={title} />
          )}
        </div>
      </div>
    </div>
  )
}
