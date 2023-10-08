import React, {useState, useEffect} from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import SvgIcon from '../SvgIcon'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import PhoneInput from 'react-phone-number-input'
import { PenSquare, Eye, Trash2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { set } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import flags from 'react-phone-number-input/flags'
const ProfileEdit = () => {
  useEffect(() => {
    console.log(flags.AD);
  },[]
  )
  const [value, setValue] = useState<string | undefined>("")

  return (
    <Card className='w-full border-none'>
      <CardHeader className='relative'>
        <div className='bg-secondary h-[100px]'></div>

        <div className="flex items-center px-16 space-x-4 absolute top-1/2 transform translate-y-1/4"> 
          <div className="mr-4 flex-shrink-0">
            <SvgIcon filepath="/icons/profile.svg" alt="Logo" width={96} height={96} /> 
          </div>
          <div className="flex flex-col">
            <span className="font-bold">John Doe</span>
            <span className="text-foreground text-sm text-muted-foreground">johndoe@gmail.com</span>
          </div>
        </div>
      </CardHeader>
 
      <CardContent className='pt-20 flex items-center px-16 space-x-4 flex-col text-large text-foreground'> 
        <Separator/>
        <div className='flex items-start w-[650px] gap-x-[96px] mt-5 mb-4'>
    <div className='flex flex-col w-[160px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Public profile</Label>
        <Label className='text-muted-foreground font-inter text-xs font-normal leading-relaxed'>This will be displayed in your profile</Label>
    </div>
    <div className='flex flex-col space-y-4 flex-1'>
        <div className='flex flex-row space-x-2'>
            <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1' placeholder='Name'/>
            <Input className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1' placeholder='Surname'/>
        </div>
   
            <PhoneInput
                international
                defaultCountry="US"
                value={value}
                onChange={setValue}
                style={{ paddingLeft: '5px' }}
             
            />
      
        <Button className='self-end bg-white hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 '> <PenSquare className='mr-2' size={16}/>Edit</Button>
    </div>
</div>

<Separator/>

<div className='flex items-start w-[650px] gap-x-[96px] mt-5 mb-4'>
    <div className='flex flex-col w-[160px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Credentials</Label>
        <Label className='text-muted-foreground font-inter text-xs font-normal leading-3'>Your login info</Label>
    </div>
    <div className='flex flex-col space-y-4 flex-1'>
    <Input type='text' className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1' placeholder='Email'/>

    <div className="flex items-center space-x-2">
        <Input type='password' className='border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1' placeholder='Password'/>
        <Button 
        className='bg-white hover:bg-gray-300 text-secondary-foreground border-r border-gray-300 rounded-r-md flex justify-center items-center w-10 h-10 p-2'
    >
        <Eye size={16}/>
    </Button>  </div>

    <Button className='self-end bg-white hover:bg-gray-300 text-secondary-foreground border border-gray-300 rounded-md mt-2 '> <PenSquare className='mr-2' size={16}/>Edit</Button>
</div>
</div>

<Separator/>

<div className='flex items-start w-[650px] gap-x-[96px] mt-5 mb-4'>
    <div className='flex flex-col w-[160px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Privacy</Label>
        
    </div>
    <div className='flex items-center space-x-4 justify-end flex-1'>
    <Checkbox className='rounded-full '/>
    <Label className='text-foreground font-inter font-semibold leading-relaxed'>I agree that my data is used for market research</Label>
</div>

</div>
<Separator/>
<div className='flex items-start w-[650px] gap-x-[96px] mt-5 mb-4'>
    <div className='flex flex-col w-[260px]'>
        <Label className='text-foreground font-inter text-lg font-semibold leading-relaxed'>Credentials</Label>
        <Label className='text-muted-foreground font-inter text-xs font-normal leading-relaxed'>Once you delete your account, there is no going back. Please be certain.</Label>
    </div>
    <div className='flex items-center space-x-2 justify-end flex-1'>
    <Button className='bg-white text-secondary-foreground hover:bg-gray-300 space-x-2 border border-destructive'> <Label className='font-semibold leading-relaxed'>Delete my account</Label><Trash2 size={16}/></Button>
   
</div>
</div>



      </CardContent>
    </Card>
  )
}

export default ProfileEdit
