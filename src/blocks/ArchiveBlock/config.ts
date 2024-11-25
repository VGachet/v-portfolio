import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'columns',
      type: 'number',
      defaultValue: 1,
      label: 'Columns',
    },
    {
      name: 'hasIntroContent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Display Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
      admin: {
        condition: (_, siblingData) => siblingData.hasIntroContent,
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collections To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Experiences',
          value: 'experiences',
        },
        {
          label: 'Projects',
          value: 'projects',
        },
        {
          label: 'Stacks',
          value: 'stacks',
        },
        {
          label: 'Tools',
          value: 'tools',
        },
        {
          label: 'Songs',
          value: 'songs',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection' && siblingData.relationTo === 'posts',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['posts', 'experiences', 'projects', 'stacks', 'tools', 'songs'],
    },
    {
      name: 'showAllLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Display "Show All" Link',
    },
    {
      name: 'showAllLinkUrl',
      label: '"Show all" link url',
      type: 'relationship',
      relationTo: ['pages'],
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) => siblingData.showAllLink,
        width: '50%',
      },
    },
    {
      name: 'showAllLinkLabel',
      label: '"Show all" link label',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.showAllLink,
        width: '50%',
      },
    }
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
