import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator()

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL } = {}
) => {

  if (!baseURL) {
    // also support runtime config 
    baseURL = useRuntimeConfig().public.siteUrl
  }

  let operations = operationsGenerator(modifiers)

  operations = operations.replaceAll('/',',')
  const finalUrl = src.includes('blob') ? src : joinURL(baseURL, (operations ? '' + operations : '') + src)
  
  return {
    url: finalUrl,
  }
}