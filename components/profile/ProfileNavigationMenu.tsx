import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from '../ui/button'
import ProfileNavigationMenuItem from './ProfileNavigationMenuItem'
  const navigationMenuGeneralItemsInfo = [
    {
      title: "Overview",
      componentName: "overview"
    },
    {
      title: "Edit my profile",
      componentName: "edit"
    },
    {
      title: "Settings",
      componentName: "settings"
    },
  ]
    const navigationMenuVehiclesItemsInfo = [
    {
      title: "My cars",
      componentName: "cars"
    },
    {
      title: "Messages",
      componentName: "messages"
    },
    {
      title: "Liked ads",
      componentName: "ads"
    },
  ]

const ProfileNavigationMenu = () => {
  return (
   <NavigationMenu>
      <NavigationMenuList className="flex flex-col">
        General
        {
            navigationMenuGeneralItemsInfo.map(itemInfo => <ProfileNavigationMenuItem itemInfo={itemInfo} key={itemInfo.componentName}/>)
        }
        Vehicles 
        {
            navigationMenuVehiclesItemsInfo.map(itemInfo => <ProfileNavigationMenuItem itemInfo={itemInfo} key={itemInfo.componentName}/>)
        }
       
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default ProfileNavigationMenu