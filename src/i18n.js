import { serviceItemsForLang } from './serviceItems.js';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'sa', label: 'संस्कृतम्' },
];

export const translations = {
  en: {
    brand: 'Pandit Sitaram Sharma',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      badge: 'Trusted Vedic Scholars',
      title1: 'Divine Rituals for',
      title2: 'Spiritual Wellbeing',
      subtitle:
        'Bringing the purity of Kashi and the wisdom of Vedas to your doorstep. Expertly performed Pujas, Havans, and Sanskars.',
      ctaConsult: 'Get Free Consultation',
      ctaServices: 'Explore Services',
    },
    about: {
      title: 'About Pandit Ji Seva',
      panditName: 'Pandit Sitaram Sharma',
      experience: '23 years of experience',
      intro:
        'We are a dedicated team of Vedic scholars and experienced Pandits from Kashi and beyond, committed to performing rituals with scriptural accuracy, devotion, and clarity for your family.',
      cards: [
        {
          title: 'Our lineage',
          text: 'Trained in traditional Gurukul methods and decades of practical experience in homes, temples, and community ceremonies.',
        },
        {
          title: 'Authentic practice',
          text: 'Mantras, muhurat, and procedures follow established Vedic and regional customs—explained in simple terms when you wish.',
        },
        {
          title: 'Your convenience',
          text: 'Visit us at F-2, 2nd Block, Durga Mandir, Madan Gir, New Delhi—or book E-Puja and guidance for devotees anywhere.',
        },
      ],
    },
    services: {
      title: 'Services We Offer',
      intro:
        'From marriage and sanskars to havan, katha, shraddha, and graha shanti—we tailor every ceremony to your gotra, language, and schedule.',
      book: 'Book or enquire',
      prev: 'Previous',
      next: 'Next',
      pageStatus: 'Page {current} of {total}',
      items: serviceItemsForLang('en'),
    },
    gallery: {
      title: 'Moments of Devotion',
      alt: 'Rituals',
      prev: 'Previous',
      next: 'Next',
      pageStatus: 'Page {current} of {total}',
    },
    guruDakshina: {
      title: 'Guru Dakshina',
      qrAlt: 'PhonePe QR code for guru dakshina',
    },
    welcome: {
      title: 'Welcome',
      greeting: 'Namaste — welcome to Pandit Sitaram Sharma',
      body: 'We are glad you are here. For pujas, havans, and spiritual guidance, call us or open our location on Google Maps.',
      close: 'Continue to site',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Do you provide Samagri for the Puja?',
          a: 'Yes, we can provide a complete Samagri list or bring everything required for the ceremony ourselves upon request.',
        },
        {
          q: 'Can we perform Puja online via Video Call?',
          a: 'Absolutely. We offer E-Puja services for devotees living abroad or unable to travel.',
        },
        {
          q: 'Which languages can you perform rituals in?',
          a: 'Our Pandits are fluent in Sanskrit, Hindi, and English to ensure you understand every mantra.',
        },
      ],
    },
    testimonials: {
      title: 'Blessings from our Devotees',
      items: [
        {
          name: 'Rajesh Kumar',
          text: 'The Grah Pravesh puja was done very professionally. Every mantra was explained.',
        },
        {
          name: 'Anjali Sharma',
          text: 'Pandit ji is very knowledgeable. Our wedding ceremony was peaceful and beautiful.',
        },
        {
          name: 'Amit Verma',
          text: 'Truly authentic Vedic experience. Their punctuality and dedication are remarkable.',
        },
      ],
    },
    contact: {
      title: 'Contact Info',
      location: '📍 F-2, 2nd Block\nDurga Mandir, Madan Gir\nNew Delhi',
      mapOpen: 'Open in Google Maps',
      callNow: 'Call now',
      namePh: 'Your Name',
      phonePh: 'Phone Number',
      ritualPh: 'Select Ritual Type',
      messagePh: 'Your Message',
      submit: 'Submit Request',
      otherRitual: 'Other / not listed',
    },
    footer: {
      mission:
        'Our mission is to bridge the gap between ancient Vedic wisdom and modern busy lifestyles, ensuring spiritual practices remain accessible and authentic.',
      quickLinks: 'Quick Links',
      connect: 'Connect',
      copyright: '© 2026 Pandit Ji Rituals. All Mantras & Ceremonies performed per Vedic Traditions.',
      linkServices: 'All Services',
      linkFaq: 'FAQs',
    },
  },
  hi: {
    brand: 'पण्डित सीताराम शर्मा',
    nav: {
      home: 'मुख्य',
      about: 'परिचय',
      services: 'सेवाएँ',
      gallery: 'गैलरी',
      faq: 'प्रश्नोत्तर',
      contact: 'संपर्क',
    },
    hero: {
      badge: 'विश्वसनीय वैदिक विद्वान',
      title1: 'आध्यात्मिक कल्याण हेतु',
      title2: 'दिव्य अनुष्ठान',
      subtitle:
        'काशी की पवित्रता और वेदों का ज्ञान आपके द्वार तक। विशेषज्ञतापूर्ण पूजा, हवन और संस्कार।',
      ctaConsult: 'निःशुल्क परामर्श',
      ctaServices: 'सेवाएँ देखें',
    },
    about: {
      title: 'पण्डित जी सेवा के बारे में',
      panditName: 'पण्डित सीताराम शर्मा',
      experience: '२३ वर्षों का अनुभव',
      intro:
        'हम काशी और अन्यत्र के वैदिक विद्वानों व अनुभवी पण्डितों की एक समर्पित टीम हैं—शास्त्रीय शुद्धता, भक्ति और स्पष्टता के साथ आपके परिवार के लिए अनुष्ठान करने हेतु।',
      cards: [
        {
          title: 'हमारी परम्परा',
          text: 'पारम्परिक गुरुकुल शिक्षा और घरों, मंदिरों व सामुदायिक अनुष्ठानों में दशकों का अनुभव।',
        },
        {
          title: 'प्रामाणिक विधि',
          text: 'मंत्र, मुहूर्त और विधि स्थापित वैदिक व क्षेत्रीय रीति अनुसार—आपकी इच्छानुसार सरल भाषा में स्पष्टीकरण।',
        },
        {
          title: 'आपकी सुविधा',
          text: 'नई दिल्ली (मदन गिरि, दुर्गा मंदिर, एफ-2 द्वितीय ब्लॉक) पर प्रत्यक्ष मुलाकात, या कहीं से भी ई-पूजा व मार्गदर्शन।',
        },
      ],
    },
    services: {
      title: 'हमारी सेवाएँ',
      intro:
        'विवाह व संस्कारों से लेकर हवन, कथा, श्राद्ध व ग्रह शांति तक—हम आपकी गोत्र, भाषा व समयानुसार विधि तैयार करते हैं।',
      book: 'बुक करें या पूछताछ',
      prev: 'पिछला',
      next: 'अगला',
      pageStatus: 'पृष्ठ {current} / {total}',
      items: serviceItemsForLang('hi'),
    },
    gallery: {
      title: 'भक्ति के क्षण',
      alt: 'अनुष्ठान',
      prev: 'पिछला',
      next: 'अगला',
      pageStatus: 'पृष्ठ {current} / {total}',
    },
    guruDakshina: {
      title: 'गुरु दक्षिणा',
      qrAlt: 'गुरु दक्षिणा हेतु फोनपे क्यूआर कोड',
    },
    welcome: {
      title: 'स्वागत है',
      greeting: 'नमस्ते — पण्डित सीताराम शर्मा जी की वेबसाइट पर आपका स्वागत है',
      body: 'पूजा, हवन व आध्यात्मिक मार्गदर्शन हेतु हमसे जुड़ें। कॉल करें या गूगल मैप्स पर स्थान देखें।',
      close: 'आगे बढ़ें',
    },
    faq: {
      title: 'अक्सर पूछे जाने वाले प्रश्न',
      items: [
        {
          q: 'क्या आप पूजा की समग्री उपलब्ध कराते हैं?',
          a: 'हाँ, हम पूरी समग्री सूची दे सकते हैं या आपके अनुरोध पर स्वयं सामग्री ला सकते हैं।',
        },
        {
          q: 'क्या वीडियो कॉल से ऑनलाइन पूजा हो सकती है?',
          a: 'बिल्कुल। विदेश में रहने वाले या यात्रा न कर सकने वाले भक्तों हेतु ई-पूजा उपलब्ध है।',
        },
        {
          q: 'अनुष्ठान किन भाषाओं में हो सकते हैं?',
          a: 'हमारे पण्डित संस्कृत, हिन्दी व अंग्रेज़ी में दक्ष हैं ताकि आप प्रत्येक मंत्र समझ सकें।',
        },
      ],
    },
    testimonials: {
      title: 'भक्तों की आशीर्वचन',
      items: [
        {
          name: 'राजेश कुमार',
          text: 'गृह प्रवेश पूजा बहुत विधिपूर्वक हुई। प्रत्येक मंत्र समझाया गया।',
        },
        {
          name: 'अंजलि शर्मा',
          text: 'पण्डित जी बहुत ज्ञानी हैं। हमारा विवाह संस्कार शांत और सुन्दर रहा।',
        },
        {
          name: 'अमित वर्मा',
          text: 'सचमुच प्रामाणिक वैदिक अनुभव। समय की पाबन्दी और समर्पण उल्लेखनीय।',
        },
      ],
    },
    contact: {
      title: 'संपर्क सूत्र',
      location: '📍 एफ-2, द्वितीय ब्लॉक\nदुर्गा मंदिर, मदन गिरि\nनई दिल्ली',
      mapOpen: 'गूगल मैप्स में खोलें',
      callNow: 'अभी कॉल करें',
      namePh: 'आपका नाम',
      phonePh: 'फ़ोन नंबर',
      ritualPh: 'अनुष्ठान का प्रकार',
      messagePh: 'आपका संदेश',
      submit: 'अनुरोध भेजें',
      otherRitual: 'अन्य / सूची में नहीं',
    },
    footer: {
      mission:
        'हमारा उद्देश्य प्राचीन वैदिक ज्ञान व आधुनिक व्यस्त जीवनशैली के बीच सेतु बनाना है—आध्यात्मिक अभ्यास सुलभ व प्रामाणिक रहें।',
      quickLinks: 'त्वरित लिंक',
      connect: 'जुड़ें',
      copyright: '© 2026 पण्डित जी अनुष्ठान। सर्वे मन्त्राः व संस्काराः वैदिक परम्परानुसार।',
      linkServices: 'सभी सेवाएँ',
      linkFaq: 'प्रश्नोत्तर',
    },
  },
  sa: {
    brand: 'पण्डितः सीताराम-शर्मा',
    nav: {
      home: 'गृहम्',
      about: 'विषये',
      services: 'सेवाः',
      gallery: 'चित्रशाला',
      faq: 'प्रश्नाः',
      contact: 'सम्पर्कः',
    },
    hero: {
      badge: 'विश्वासनीयाः वैदिकाः विद्वांसः',
      title1: 'आध्यात्मिक-कल्याणाय',
      title2: 'दिव्याः संस्काराः',
      subtitle:
        'काश्याः शुद्धिः वेदानां च ज्ञानं भवतः द्वारम् आगच्छति। पूजा-हवन-संस्काराः विशेषज्ञैः सम्पाद्यन्ते।',
      ctaConsult: 'निःशुल्कं परामर्शम्',
      ctaServices: 'सेवाः अन्विष्यन्ताम्',
    },
    about: {
      title: 'पण्डितजी-सेवायाः विषये',
      panditName: 'पण्डितः सीताराम-शर्मा',
      experience: 'त्रयोविंशतेः वर्षाणाम् अनुभवः',
      intro:
        'वयं काश्यादिभ्यः वैदिक-विद्वद्भिः अनुभविभिः पण्डितैः च समर्पिताः—शास्त्रानुकूलतया भक्त्या स्पष्टतया च कुटुम्बाय अनुष्ठानानि कर्तुम्।',
      cards: [
        {
          title: 'वंश-परम्परा',
          text: 'पारम्परिक-गुरुकुल-पद्धत्या दीर्घकालीन-अनुभवः गृहेषु मन्दिरेषु सामाजिक-कर्मसु च।',
        },
        {
          title: 'प्रामाणिक-अभ्यासः',
          text: 'मन्त्राः मुहूर्तं विधिः च स्थापित-वैदिक-आचारानुसारम्—इच्छानुसारं सरल-भाषया व्याख्या।',
        },
        {
          title: 'भवतः सुविधा',
          text: 'नवदिल्ल्यां मदनगिरौ दुर्गा-मन्दिर-समीपे F-2 द्वितीय-खण्डे प्रत्यक्षम्; विश्वे च ई-पूजा-मार्गदर्शनम्।',
        },
      ],
    },
    services: {
      title: 'प्रदत्ताः सेवाः',
      intro:
        'विवाह-संस्कारेभ्यः हवन-कथा-श्राद्ध-ग्रहशान्त्यन्तम्—गोत्र-भाषा-कालानुसारं विधिः विधीयते।',
      book: 'आरक्षणं पृच्छा वा',
      prev: 'पूर्वम्',
      next: 'अग्रिमम्',
      pageStatus: 'पृष्ठम् {current} / {total}',
      items: serviceItemsForLang('sa'),
    },
    gallery: {
      title: 'भक्ति-क्षणाः',
      alt: 'अनुष्ठानम्',
      prev: 'पूर्वम्',
      next: 'अग्रिमम्',
      pageStatus: 'पृष्ठम् {current} / {total}',
    },
    guruDakshina: {
      title: 'गुरु-दक्षिणा',
      qrAlt: 'गुरु-दक्षिणायै फोनपे-क्यूआर-संकेतः',
    },
    welcome: {
      title: 'स्वागतम्',
      greeting: 'नमस्ते — पण्डितः सीताराम-शर्मा',
      body: 'पूजा-हवन-मार्गदर्शनाय सम्पर्कं करोतु। दूरवाणीम् आह्वयतु वा गूगल-मानचित्रे स्थानं उद्घाट्य।',
      close: 'जालपुटं अवलोकय',
    },
    faq: {
      title: 'बहुधा पृष्टाः प्रश्नाः',
      items: [
        {
          q: 'पूजायाः समग्रीं प्रददाति वा?',
          a: 'आम्। समग्री-सूचिकां दातुं स्वयं वा समग्रीं आनयितुं अनुरोधानुसारं शक्नुमः।',
        },
        {
          q: 'दूरदर्शन-सम्पर्केण ऽनलाइन-पूजा भवति वा?',
          a: 'निश्चितम्। विदेश-स्थिताः यात्रां न शक्नुवन्ति च ते भक्ताः ई-पूजया सेव्यन्ते।',
        },
        {
          q: 'कासु भाषासु अनुष्ठानानि भवन्ति?',
          a: 'वयं संस्कृत-हिन्दी-आङ्ग्ल-भाषासु दक्षाः यतः प्रत्येकं मन्त्रं भवान् अवगन्तुं शक्नोति।',
        },
      ],
    },
    testimonials: {
      title: 'भक्तानां आशीर्वादाः',
      items: [
        {
          name: 'राजेश-कुमारः',
          text: 'गृहप्रवेश-पूजा अतीव विधिपूर्वकम्। प्रत्येकः मन्त्रः व्याख्यातः।',
        },
        {
          name: 'अञ्जलि-शर्मा',
          text: 'पण्डितजी अतीव विद्वान्। अस्माकं विवाह-संस्कारः शान्तः सुन्दरः च आसीत्।',
        },
        {
          name: 'अमित-वर्मः',
          text: 'सत्यं वैदिक-अनुभवः। समय-पालनं समर्पणं च उल्लेखनीयम्।',
        },
      ],
    },
    contact: {
      title: 'सम्पर्क-विवरणम्',
      location: '📍 F-2, द्वितीय-खण्डः\nदुर्गा-मन्दिरः, मदनगिरिः\nनवदिल्ली',
      mapOpen: 'गूगल-मानचित्रे उद्घाट्य',
      callNow: 'अधुना आह्वयन्तु',
      namePh: 'भवतः नाम',
      phonePh: 'दूरवाणी-सङ्ख्या',
      ritualPh: 'अनुष्ठान-प्रकारः',
      messagePh: 'भवतः सन्देशः',
      submit: 'अनुरोधं प्रेषयन्तु',
      otherRitual: 'अन्यत् / असूचितम्',
    },
    footer: {
      mission:
        'वयं प्राचीन-वैदिक-ज्ञानं आधुनिक-व्यस्त-जीवनेन मध्ये सेतुं बध्नीमः—आध्यात्मिक-अभ्यासाः सुलभाः प्रामाणिकाः च सन्तु।',
      quickLinks: 'शीघ्र-सम्पर्काः',
      connect: 'सम्बद्ध्यन्ताम्',
      copyright: '© 2026 पण्डितजी-अनुष्ठानम्। सर्वे मन्त्राः संस्काराः च वैदिक-परम्परानुसारम्।',
      linkServices: 'सर्वाः सेवाः',
      linkFaq: 'प्रश्नाः',
    },
  },
};
