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

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  const navItems = footer?.navItems || []

  return (
    <nav className="sticky w-fit mx-auto bottom-5 border">
      <NavigationMenu className="navbar">
        <NavigationMenuList>

          {navItems.map(async ({ link }, i) => {

            let _reference = link.reference

            if (_reference !== undefined && _reference !== null && link.type === 'reference' && typeof link.reference?.value === 'string') {
              const pageOrPost = await getPageOrPostById({collection: _reference.relationTo, id: _reference.value})
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
          <NavigationMenuItem>
            <ThemeSelector />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export async function getPageOrPostById({collection, id}) {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageOrPost = await payload.findByID({
    collection: collection,
    draft: false,
    id: id,
    overrideAccess: false,
  })

  return pageOrPost
}
