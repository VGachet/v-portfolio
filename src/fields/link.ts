import { ArrayField, Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'

type LinkType = (options?: {
  overrides?: Partial<ArrayField>
}) => Field

export const link: LinkType = ({ overrides = {} } = {}) => {
  const linkResult: Field = {
   name: 'link',
    label: 'Link',
    type: 'group',
    fields: [
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        required: true,
      },
      {
        name: 'type',
        type: 'radio',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
        ],
        defaultValue: 'reference',
        admin: {
          layout: 'horizontal',
          width: '50%',
        },
      },
      {
        name: 'newTab',
        label: 'Open in new tab',
        type: 'checkbox',
        admin: {
          width: '50%',
        },
      },
      {
        name: 'reference',
        label: 'Document to link to',
        type: 'relationship',
        relationTo: ['pages'],
        required: true,
        maxDepth: 1,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
      },
      {
        name: 'url',
        label: 'Custom URL',
        type: 'text',
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
      },
      {
        name: 'appearance',
        label: 'Appearance',
        type: 'select',
        options: [
          {
            label: 'Default',
            value: 'default',
          },
          {
            label: 'Button',
            value: 'button',
          },
        ],
        defaultValue: 'default',
      },
    ],
  }

  return deepMerge(linkResult, overrides)
}
