import { elysiaClient } from '@/shared/api'
import { useLocations } from './model'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useAsync } from '@/shared/lib/composables'
import { LocationFormSchema } from './schema'

const FORM_INITIAL_VALUES = {
  title: '',
  description: '',
  latitude: 0,
  longitude: 0,
  address: '',
  imageUrl: '',
}

export function useAddLocationForm() {
  const locationsStore = useLocations()
  const { refetch, addLocationModal, resetAddLocationCoords } = locationsStore

  return useAsync({
    schema: LocationFormSchema,
    initialValues: FORM_INITIAL_VALUES,
    requestFn: async (values) => {
      const { data } = await elysiaClient.postApiMarkers(values)
      return data
    },
    onSuccess: () => {
      toast.success('Маркер успішно додано')
      addLocationModal.close()
      refetch()
      resetAddLocationCoords()
    },
  })
}

export function useEditLocationForm() {
  const locationsStore = useLocations()
  const { locationEditId } = storeToRefs(locationsStore)
  const { refetch, editLocationModal } = locationsStore

  return useAsync({
    schema: LocationFormSchema,
    initialValues: FORM_INITIAL_VALUES,
    requestFn: async (values) => {
      const id = locationEditId.value
      if (!id) return
      const { data } = await elysiaClient.putApiMarkersById(id, values)
      return data
    },
    onSuccess: () => {
      toast.success('Маркер успішно оновлено')
      editLocationModal.close()
      refetch()
    },
  })
}
