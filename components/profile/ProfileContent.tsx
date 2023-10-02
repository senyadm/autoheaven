import React from 'react'
import ProfileEdit from './ProfileEdit'
import ProfileOverview from './ProfileOverview'
import ProfileSettings from './ProfileSettings'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import ProfileAds from './ProfileAds'
import ProfileMessages from './ProfileMessages'
import ProfileCars from './ProfileCars'

const ProfileContent = () => {
     const profileComponentName = useSelector((state: RootState )=> state.profileNavigationMenu.menuItemName)

    switch(profileComponentName){
        case "edit":
            return (
                <ProfileEdit />
            )
        case "settings":
            return (
                <ProfileSettings />
            )
        case "ads":
            return (
                <ProfileAds />
            )
        case "messages":
            return (
                <ProfileMessages />
            )
        case "cars":
            return (
                <ProfileCars />
            )
        default: return (
            <ProfileOverview />
        )
    }
  
}

export default ProfileContent