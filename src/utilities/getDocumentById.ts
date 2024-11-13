import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function getDocumentById({collection, id}) {
  const payload = await getPayloadHMR({ config: configPromise })
  return await payload.findByID({
    collection: collection,
    draft: false,
    id: id,
    overrideAccess: false,
  })
}
