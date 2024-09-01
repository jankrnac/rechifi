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
  console.log(modifiers)

  const dev = import.meta.dev

  operations = operations.replaceAll('/',',')
 
  let  finalUrl
  if (dev && modifiers.alwaysCDN != true)
  { 
    finalUrl = src.includes('blob') ? src: '/images' + src
  }
  else
  {
    finalUrl = src.includes('blob') ? src : joinURL(baseURL, (operations ? '' + operations : '') + src)
  }
  
  return {
    url: finalUrl,
  }
}