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
import { setProfileNavigationMenuItemName } from '@/app/GlobalRedux/profile/profileNavigationMenuSlice'
import { useDispatch } from 'react-redux'
import SvgIcon from '../SvgIcon'
import { itemInfoModel } from './ProfileNavigationMenu'
import { Label } from '../ui/label'



interface ProfileNavigationMenuItemProps {
  itemInfo: itemInfoModel
}

const ProfileNavigationMenuItem = ({itemInfo} : ProfileNavigationMenuItemProps) => {
    const dispatch = useDispatch();
  return (
                 <NavigationMenuItem className='w-full mb-4 flex flex-row' onClick={()=>dispatch(setProfileNavigationMenuItemName(itemInfo.componentName))} key={itemInfo.componentName}>
              
              <Button 
    className={`w-full text-foreground cursor-pointer hover:bg-gray-300 shadow-none flex justify-start ${itemInfo.componentName === "ads" ? "bg-primary text-primary-foreground" : "bg-white"}`}
>{itemInfo.icon}<Label className='ml-3'>{itemInfo.title}</Label></Button>
        

        </NavigationMenuItem>
            )
}

export default ProfileNavigationMenuItem