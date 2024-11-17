import React from 'react'

import type { Page } from '@/payload-types'
import { DefaultHero } from '@/heros/DefaultHero'

export const RenderHero: React.FC<Page> = (props) => <DefaultHero page={props} />
