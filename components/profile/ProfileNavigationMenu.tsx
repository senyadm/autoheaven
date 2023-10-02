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
  const navigationMenuItemsInfo = [
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

const ProfileNavigationMenu = ({onItemClick}) => {
  return (
   <NavigationMenu>
      <NavigationMenuList className="flex flex-col">
        {
            navigationMenuItemsInfo.map(itemInfo => (
                 <NavigationMenuItem onClick={()=>onItemClick(itemInfo.componentName)} key={itemInfo.componentName}>
              {itemInfo.title}
        </NavigationMenuItem>
            ))
        }
       
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default ProfileNavigationMenu