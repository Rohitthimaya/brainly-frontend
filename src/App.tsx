import './App.css'
import { Button } from "./components/Button";
import { Card } from './components/Card';
import { PlusIcon } from './icons/PlusIcon';
import { ShareIcon } from './icons/ShareIcon';


function App() {

  return (
    <div className='p-4'>
      <div className='flex justify-end gap-4'>
      <Button variant={'primary'} text={'Add content'} startIcon={<PlusIcon />} />
      <Button variant={'secondary'} text={'Share brain'} startIcon={<ShareIcon />} />
      </div>
      <div className='flex gap-4'>
        <Card type='twitter' link='https://x.com/aaditsh/status/1918659821915803923' title='First Tweet' />
        <Card type='youtube' link='https://www.youtube.com/watch?v=4XVvbZj794o' title='First video' />
      </div>
    </div>
  )
}

export default App
