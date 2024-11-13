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
    <div className={'container'}>
      <div className={'grid grid-cols-2'}>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList>
            {navItems.map(async ({ link }, i) => (
                <NavigationMenuItem key={i}>
                  <CMSLink {...link}/>
                </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <ThemeSelector />
        </div>
      </div>
    </div>
  )
}
