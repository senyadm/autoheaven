import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ActivitySquare, Book, Bookmark, Mail, Search } from 'lucide-react';
import { Label } from '../ui/label';

const ProfileOverview = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
            <Card className="w-[232.667px] h-[174px]">
            <CardContent className='flex flex-col p-6 items-start '>
                    <Search size={64} color='#2563EB'/>
                    <Label className='mt-3 text-foreground font-bold'>Start a new search</Label>
                    <Label className='text-foreground text-sm'>2341 Vehicles available</Label>
                </CardContent>
            </Card>
            
            <Card className="w-[232.667px] h-[174px]">
                <CardContent className='flex flex-col p-6 items-start'>
                    <ActivitySquare size={64} color='#2563EB'/>
                    <Label className='mt-3 text-foreground font-bold'>Show my active ads</Label>
                    <Label className='text-foreground text-sm'>2341 Vehicles available</Label>
                </CardContent>
            </Card>
            <Card className="w-[232.667px] h-[174px]">
                <CardContent className='flex flex-col p-6 items-start'>
                    <Mail size={64} color='#2563EB'/>
                    <Label className='mt-3 text-foreground font-bold'>Inbox</Label>
                    <Label className='text-foreground text-sm'>2341 Vehicles available</Label>
                </CardContent>
            </Card>

            <Card className="w-[232.667px] h-[174px]">
                <CardContent className='flex flex-col p-6 items-start'>
                    <Bookmark size={64} color='#2563EB'/>
                    <Label className='mt-3 text-foreground font-bold'>Saved</Label>
                    <Label className='text-foreground text-sm'>2341 Vehicles available</Label>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileOverview;
