import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateMenu } from './hooks/revalidateMenu'

export const Menu: GlobalConfig = {
  slug: 'menu',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link(),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateMenu],
  },
}
