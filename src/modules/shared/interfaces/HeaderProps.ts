interface HeaderProps {
    isAtTop: boolean
    toggleSearch: () => void
    isSearchOpen: boolean
    toggleMobileMenu: () => void   
}

export type HeaderPropsPreview = Pick<HeaderProps, "isAtTop">;

export type HeaderPropsPreviewIcon = Pick<HeaderProps, "isAtTop" | "toggleSearch" | "toggleMobileMenu">;

export type {HeaderProps};