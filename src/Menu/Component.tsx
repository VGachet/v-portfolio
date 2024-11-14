import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Menu } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { getDocumentById } from '@/utilities/getDocumentById'

export async function Menu() {
  const menu: Menu = await getCachedGlobal('menu')()

  const navItems = menu?.navItems || []

  return (
    <NavigationMenu className="sticky w-fit mx-auto bottom-10 border bg-inherit rounded-lg">
      <NavigationMenuList>

        {navItems.map(async ({ link }, i) => {

          let _reference = link.reference

          if (_reference !== undefined && _reference !== null && link.type === 'reference' && typeof link.reference?.value === 'string') {
            const pageOrPost = await getDocumentById({collection: _reference.relationTo, id: _reference.value})
            if (!pageOrPost) {
              return null
            }
            _reference.value = pageOrPost
          }

          return (
            <NavigationMenuItem key={i}>
              <CMSLink {...link} variant='ghost'/>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
