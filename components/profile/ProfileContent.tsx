import React from 'react'
import ProfileEdit from './ProfileEdit'
import ProfileOverview from './ProfileOverview'
import ProfileSettings from './ProfileSettings'

const ProfileContent = ({tabName}) => {
    switch(tabName){
        case "edit":
            return (
                <ProfileEdit />
            )
        case "settings":
            return (
                <ProfileSettings />
            )
        default: return (
            <ProfileOverview />
        )
    }
  
}

export default ProfileContent