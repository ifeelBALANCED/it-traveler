export const ButtonVariants = {
  Primary: 'primary',
  Link: 'link',
} as const

export type ButtonVariant = (typeof ButtonVariants)[keyof typeof ButtonVariants]
