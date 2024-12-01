import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getDocumentById({collection, id}) {
  const payload = await getPayload({ config: configPromise })
  return await payload.findByID({
    collection: collection,
    draft: false,
    id: id,
    overrideAccess: false,
  })
}
