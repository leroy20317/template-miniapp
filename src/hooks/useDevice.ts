import { onMounted, reactive } from 'vue'

export const useDevice = () => {
  const deviceInfo = reactive({data:{}})

  onMounted(() => {
    uni.getSystemInfo({
      success: (res) => {
        deviceInfo.data = res
      },
    })
  })

  return deviceInfo
}
