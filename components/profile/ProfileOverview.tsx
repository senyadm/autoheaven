import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ActivitySquare, Book, Bookmark, Mail, Search,  } from 'lucide-react'
const ProfileOverview = () => {
  return (
    <div>

    <Card>

      <CardContent>
    <Search/>
      </CardContent>
    </Card>

    <Card>

<CardContent>
    <ActivitySquare/>
</CardContent>
</Card>
<Card>

<CardContent>
<Mail/>
</CardContent>
</Card>
<Card>

<CardContent>
<Bookmark/>
</CardContent>
</Card>


    </div>
  )
}

export default ProfileOverview