  export type NavbarData = {
    notifications: string
    login: string
    logout: string
    make_ad: string
    country_select: string
    home: string
    country: string
    city: string
    search: string
    profile: string
  }

  export interface FooterDictionary {
    company: string;
    aboutUs: string;
    careers: string;
    advertising: string;
    helpContact: string;
    information: string;
    termsConditions: string;
    priceList: string;
    privacyPolicy: string;
  }
  
  export interface ProfileEdit {
    save: string
    cancel: string
    edit: string
    publicProfile: string;
    publicProfileSubtext: string;
    credentials: string;
    credentialsSubtext: string;
    privacy: string;
    privacyPolicy: string;
    deleteAccount: string;
    deleteAccountSubtext: string;
    deleteAccountButton: string;
    agreeMarketResearch: string;
  }

 export interface ProfileSettingsDictionary {
    settings: string;
    myProfile: string;
    editMyProfile: string;
    darkTheme: string;
    language: string;
    privacy: string;
    privacySubtext: string;
    emailConfirmation: string;
    emailConfirmationSubtext: string;
    resendActivationLink: string;
    english: string;
    czech: string;
    german: string;
    spanish: string;
    french: string;
  }
  
  export interface SideBarItemsDictionary {
    overview: string
    edit: string
    settings: string
    cars: string
    messages: string
    ads: string
  }

  export interface CarouselDictionary {
    cruise: string
    discover: string
  }

  export interface FiltersDictionary {
    brandAndModel: string
    body: string
    fuel: string
    price: string
    mileage: string
    year: string
    selectBrand: string
    selectBody: string
    selectFuel: string
    passengerCars: string
    motorcycles: string
    trucks: string
    busses: string
    offers: string
  }

  export interface OverviewDictionary {
    startNewSearch: string
    showActiveAds: string
    inbox: string
    saved: string
    vehicles: string
  }

  export interface TipsBlockDictionary {
    learnPlatformTitle: string;
    tips: Record<'tip1' | 'tip2' | 'tip3' | 'tip4' | 'tip5' | 'tip6', {
      type: string;
      title: string;
      description: string;
      readMore: string;
    }>;
  }
  
  export type PageData = {
    navbar: NavbarData
    profile: ProfileSettingsDictionary
    profileEdit: ProfileEdit
    overview: OverviewDictionary
    sidebarItems: SideBarItemsDictionary
    footer: FooterDictionary
    carousel: CarouselDictionary
    filters: FiltersDictionary
    tipsBlock: TipsBlockDictionary
    popularBrands: string
  }