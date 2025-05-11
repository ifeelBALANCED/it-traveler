import { defineRegleConfig } from '@regle/core'
import { required, withMessage } from '@regle/rules'
import { strongPassword } from './custom-rules/strong-password.rule'

export const { useRegle: useGlobalRegle } = defineRegleConfig({
  rules: () => ({
    required: withMessage(required, 'You need to provide a value'),
    strongPassword,
  }),
  shortcuts: {
    fields: {
      $isRequired: (field) => field.$rules.required?.$active ?? false,
    },
    nested: {
      $isEmpty: (nest) => Object.keys(nest.$fields).length === 0,
    },
  },
})
