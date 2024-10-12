export default defineEventHandler((event) => {
    const brands = [
        {
            value: 'moondrop',
            label: 'Moondrop',
            logo: 'moondrop/logo.webp',
            link: 'https://moondroplab.com/'
        },
        {
            value: 'thieaudio',
            label: 'Thieaudio',
            logo: 'thieaudio/logo.jpg',
            link: 'https://www.thieaudio.com/'

        },
        {
            value: 'tinhifi',
            label: 'Tin Hifi',
            logo: 'tinhifi/logo.jpg',
            link: 'https://www.tinhifi.com/'

        },
        {
            value: 'dunu',
            label: 'Dunu',
            logo: 'dunu/logo.png',
            link: 'https://www.dunu-topsound.com/'
        },
        {
            value: 'letshuoer',
            label: 'Letshuoer',
            logo: 'letshuoer/logo.webp',
            link: 'https://letshuoer.net/'

        },
        {
            value: 'hifiman',
            label: 'Hifiman',
            logo: 'hifiman/logo.png',
            link: 'https://hifiman.com/'

        },
        {
            value: '7hz',
            label: '7hz',
            logo: '7hertz/logo.webp',
            link: 'https://www.linsoul.com/collections/7hz'

        },
        {
            value: 'kiwi-ears',
            label: 'Kiwi Ears',
            logo: 'kiwi-ears/logo.jpg',
            link: 'https://kiwiears.com/'


        },
        {
            value: 'kz',
            label: 'KZ',
            logo: 'kz/logo.jpg',
            link: 'https://kz-audio.com/'

        },
        {
            value: 'hidisz',
            label: 'Hidisz',
            logo: 'hidisz/logo.webp',
            link: 'https://www.hidizs.net/'

        },
        {
            value: 'aful',
            label: 'Aful',
            logo: 'aful/logo.jpg',
            link: 'https://afulaudio.com/'

        },       
        {
            value: 'simgot',
            label: 'Simgot',
            logo: 'simgot/logo.jpg',
            link: 'https://afulaudio.com/'

        },
        {
            value: 'truthear',
            label: 'Truthear',
            logo: 'truthear/logo.jpg',
            link: 'https://truthear.com/'

        },
        {
            value: 'hisenior',
            label: 'Hisenior',
            logo: 'hisenior/logo.webp',
            link: 'https://www.hisenior-iem.com/'

        },
        {
            value: 'ziigaat',
            label: 'Ziigaat',
            logo: 'ziigaat/logo.svg',
            link: 'https://www.ziigaat.com/'

        },
        {
            value: 'fiio',
            label: 'Fiio',
            logo: 'fiio/logo.webp',
            link: 'https://www.fiio.com/'
        },
        {
            value: 'fearless-audio',
            label: 'Fearless Audio',
            logo: 'fearless-audio/logo.jpg',
            link: ''
        },
        
        {
            value: 'softears',
            label: 'Softears',
            logo: 'softears/logo.webp',
            link: ''
        },

        {
            value: 'tanchjim',
            label: 'Tanchjim',
            logo: 'tanchjim/logo.webp',
            link: ''
        },

        {
            value: 'tangzu',
            label: 'Tangzu',
            logo: '',
            link: ''
        },

        {
            value: 'kinera',
            label: 'Kinera',
            logo: 'kinera/logo.png',
            link: ''
        },

        {
            value: 'qdc',
            label: 'QDC',
            logo: 'qdc/logo.png',
            link: ''
        },

        {
            value: 'shozy',
            label: 'Shozy',
            logo: 'shozy/logo.png',
            link: ''
        },

        {
            value: 'tipsy',
            label: 'Tipsy',
            logo: 'tipsy/logo.jpg',
            link: ''
        },

        {
            value: 'tfz',
            label: 'TFZ',
            logo: 'tfz/logo.jpg',
            link: ''
        },

        {
            value: 'blon',
            label: 'Blon',
            logo: 'blon/logo.webp',
            link: ''
        },

        {
            value: 'tansio-mirai',
            label: 'Tansio Mirai',
            logo: 'tansio-mirai/logo.png',
            link: ''
        },

        {
            value: 'cca',
            label: 'CCA',
            logo: 'cca/logo.webp',
            link: ''
        },

        {
            value: 'seeaudio',
            label: 'SeeAudio',
            logo: 'seeaudio/logo.jpg',
            link: ''
        },
        {
            value: 'gold-planar',
            label: 'Gold Planar',
            logo: 'goldplanar/logo.webp',
            link: ''
        },
        {
            value: 'harmonicdyne',
            label: 'HarmonicDyne',
            logo: 'harmonicdyne/logo.webp',
            link: ''
        },
        {
            value: 'nicehck',
            label: 'NiceHCK',
            logo: 'nicehck/logo.webp',
            link: ''
        },
        {
            value: 'sabbat',
            label: 'Sabbat',
            logo: 'sabbat/logo.webp',
            link: ''
        },
        {
            value: 'ibasso',
            label: 'iBasso',
            logo: 'ibasso/logo.png',
            link: ''
        },
        {
            value: 'hiby',
            label: 'Hiby',
            logo: 'hiby/logo.png',
            link: ''
        },
        {
            value: 'aune',
            label: 'Aune',
            logo: '',
            link: ''
        },
        {
            value: 'shanling',
            label: 'Shanling',
            logo: '',
            link: ''
        },
        {
            value: 'acmee',
            label: 'Acmee',
            logo: '',
            link: ''
        },
        {
            value: 'xduoo',
            label: 'xDuoo',
            logo: '',
            link: ''
        },
        {
            value: 'e1da',
            label: 'E1da',
            logo: '',
            link: ''
        },
        {
            value: 'yinlvmei',
            label: 'YinLvMei',
            logo: '',
            link: ''
        },
        {
            value: 'xiaomi',
            label: 'Xiaomi',
            logo: '',
            link: ''
        },
        {
            value: 'lz-hifi-audio',
            label: 'LZ HiFi Audio',
            logo: '',
            link: ''
        },
        {
            value: 'trn',
            label: 'TRN',
            logo: '',
            link: ''
        },
        {
            value: 'aaw',
            label: 'AAW',
            logo: '',
            link: ''
        },
        {
            value: 'aoshida',
            label: 'Aoshida',
            logo: '',
            link: ''
        },
        {
            value: 'astrotec',
            label: 'Astrotec',
            logo: '',
            link: ''
        },
        {
            value: 'celest',
            label: 'Celest',
            logo: '',
            link: ''
        },
        {
            value: 'sivga',
            label: 'Sivga',
            logo: '',
            link: ''
        },
    ]

    brands.sort((a, b) => {
        const nameA = a.value.toUpperCase(); // ignore upper and lowercase
        const nameB = b.value.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });

      return brands
      
  })