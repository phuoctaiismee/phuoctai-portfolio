export interface AppSettingsData {
    navLinks?: Array<{
        label: string
        href: string
    }>
    footerCta?: string
    isAvailable?: boolean
    availabilityText?: string
    phoneNumber?: string
    copyrightName?: string
    socialLinks?: Array<{
        platformName: string
        url: string
    }>
}
