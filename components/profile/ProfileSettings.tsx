import { Checkbox } from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'
import { Separator } from '@/components/ui/separator'
import { PenSquare, Eye, Trash2 } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { Send } from 'lucide-react'

import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
const ProfileSettings = () => {

  const [authorized, setAuthorized] = useState<boolean>(true)

  const languages = [
    { value: "English" },
    { value: "French" },
    { value: "German" },
    { value: "Spanish" },
  ]

  return (
    <div className=' flex flex-col h-full overflow-hidden w-full px-8 py-5'>
    <div className='flex items-start mb-10 text-large text-foreground'>
      <Label className='text-xl font-bold'>Settings</Label>
    </div>

    <div className=' items-start space-y-5  '>
           <Separator/>
      <div className='flex  gap-x-[96px]'>
    <div className='flex flex-col w-[260px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>My Profile</Label>
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Button className='bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2'> <Trash2 size={16}/><Label className='font-semibold leading-relaxed'>Edit my profile</Label></Button>
   
</div>
</div>

<Separator/>

<div className='flex items-start  gap-x-[96px] '>
    <div className='flex flex-col w-[260px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Dark Theme</Label>
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Switch/>
   
</div>
</div>

<Separator/>

<div className='flex items-start  gap-x-[96px] '>
    <div className='flex flex-col w-[260px] '>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Language</Label>
      
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Select

      >
        <SelectTrigger className="mb-2" >
          Languages
        </SelectTrigger>
        <SelectContent>
          {languages.map((item: any, index: number) => (
            <SelectItem key={index} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
   
</div>
</div>
<Separator/>
<div className='flex items-start gap-x-[96px] '>
    <div className='flex flex-col w-[260px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Privacy</Label>
        <Label className='text-muted-foreground font-inter text-xs w-[350px]'>I would like to receive emails from Autoheven about offers, surveys and information on products and services from</Label>
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Switch/> 
   
</div>
</div>
{authorized && 
<>
<Separator/>
      <div className='flex items-start gap-x-[96px] mt-5 mb-4'>
    <div className='flex flex-col w-[260px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>My Profile</Label>
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Button className='bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2'><Send size={16}/> <Label className='font-semibold text-xs'>Resend Activation link</Label></Button>
   
</div>
</div>
</>}


    </div>
  </div>
  )
}

export default ProfileSettings