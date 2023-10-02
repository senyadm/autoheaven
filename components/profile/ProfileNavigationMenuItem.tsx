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
const ProfileNavigationMenuItem = ({itemInfo}) => {
    const dispatch = useDispatch();
  return (
                 <NavigationMenuItem className='w-full' onClick={()=>dispatch(setProfileNavigationMenuItemName(itemInfo.componentName))} key={itemInfo.componentName}>
              <Button className='w-full'>{itemInfo.title}</Button>
        </NavigationMenuItem>
            )
}

export default ProfileNavigationMenuItem