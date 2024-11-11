import type {Field} from "payload";

import {link} from "./link";

export const linkGroup: Field = {
  name: 'links',
  label: 'Links',
  type: 'array',
  fields: [
    link(),
  ],
}
