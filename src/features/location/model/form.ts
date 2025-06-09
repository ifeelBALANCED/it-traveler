import { useForm } from 'vee-validate'
import { LocationFormSchema } from './schema'
import { toTypedSchema } from '@vee-validate/zod'
import { elysiaClient } from '@/shared/api'
import { useLocations } from './model'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'

const FORM_INITIAL_VALUES = {
  title: '',
  description: '',
  latitude: 0,
  longitude: 0,
  address: '',
  imageUrl: '',
}

export const useAddLocationForm = () => {
  const isLoading = ref(false)
  const locationsStore = useLocations()
  const { refetch } = locationsStore
  const form = useForm({
    validationSchema: toTypedSchema(LocationFormSchema),
    initialValues: FORM_INITIAL_VALUES,
  })

  const onLocationCreate = form.handleSubmit(async (values) => {
    try {
      isLoading.value = true
      const { success } = await elysiaClient.postApiMarkers(values)
      if (success) {
        form.resetForm()
        toast.success('Маркер успішно додано')
        locationsStore.addLocationModal.close()
        refetch()
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })

  return { onLocationCreate, isLoading, form }
}

export const useEditLocationForm = () => {
  const isLoading = ref(false)
  const locationsStore = useLocations()
  const { locationEditId } = storeToRefs(locationsStore)
  const { refetch } = locationsStore
  const form = useForm({
    validationSchema: toTypedSchema(LocationFormSchema),
    initialValues: FORM_INITIAL_VALUES,
  })

  const onLocationEdit = form.handleSubmit(async (values) => {
    try {
      isLoading.value = true
      const { success } = await elysiaClient.putApiMarkersById(locationEditId.value!, values)

      if (success) {
        form.resetForm()
        toast.success('Маркер успішно оновлено')
        locationsStore.editLocationModal.close()
        refetch()
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })

  return { onLocationEdit, isLoading, form }
}
