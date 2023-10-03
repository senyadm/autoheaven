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
import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";


import { Button } from '../ui/button'
import ProfileNavigationMenuItem from './ProfileNavigationMenuItem'
import { Label } from '../ui/label'

export interface itemInfoModel {
  title: string
  componentName: menuItemType
  icon: string
}

  const navigationMenuGeneralItemsInfo:itemInfoModel[] = [
    {
      title: "Overview",
      componentName: "overview",
      icon: '/icons/overview.svg'
    },
    {
      title: "Edit my profile",
      componentName: "edit",
      icon: '/icons/edit.svg'
    },
    {
      title: "Settings",
      componentName: "settings",
      icon: '/icons/settings.svg'
    },
  ]
    const navigationMenuVehiclesItemsInfo: itemInfoModel[] = [
    {
      title: "My cars",
      componentName: "cars",
      icon: '/icons/Car.svg'
    },
    {
      title: "Messages",
      componentName: "messages",
      icon: '/icons/messages.svg'
    },
    {
      title: "Liked ads",
      componentName: "ads",
      icon: '/icons/ads.svg'
    },
  ]

  const ProfileNavigationMenu = () => {
    return (
     <NavigationMenu>
        <div className="flex flex-col space-y-4 list-none ">
          <div className="flex flex-col mb-4 mt-4">
            <Label className="text-sm font-medium leading-none text-muted-foreground mb-2">General</Label>
            {
              navigationMenuGeneralItemsInfo.map(itemInfo => <ProfileNavigationMenuItem itemInfo={itemInfo} key={itemInfo.componentName}/>)
            }
          </div>
          
          <div className="flex flex-col">
            <Label className="text-sm font-medium leading-none text-muted-foreground mb-2">Vehicles</Label>
            {
              navigationMenuVehiclesItemsInfo.map(itemInfo => <ProfileNavigationMenuItem itemInfo={itemInfo} key={itemInfo.componentName}/>)
            }
          </div>
        </div>
      </NavigationMenu>
    )
  }
  
  export default ProfileNavigationMenu
  