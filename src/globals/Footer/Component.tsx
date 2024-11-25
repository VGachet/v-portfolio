import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  const navItems = footer?.navItems || []

  return (
    <div className={'container pb-8'}>
      <div className={'grid grid-cols-2'}>
        <NavigationMenu>
          <NavigationMenuList className={'flex flex-col'}>
            {navItems.map(async ({ link }, i) => (
                <NavigationMenuItem key={i}>
                  <CMSLink {...link} variant={'ghost'} displayIcon={true}/>
                </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className={'flex justify-end items-center'}>
          <ThemeSelector />
        </div>
      </div>
    </div>
  )
}
