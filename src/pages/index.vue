<script setup lang="ts">
const appStore = useAppStore()
const { t } = useI18n()

showToast('xsxs')
</script>

<template>
  <div class="text-18">
    {{ appStore.count }}{{ t('jiaoshoujia') }}
    {{ dayjs().format('YYYY-HH-DD HH:mm:ss') }}
  </div>
</template>
