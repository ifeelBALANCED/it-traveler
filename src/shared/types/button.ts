export const ButtonVariants = {
  Primary: 'primary',
  Link: 'link',
  Gradient: 'gradient',
} as const

export type ButtonVariant = (typeof ButtonVariants)[keyof typeof ButtonVariants]
