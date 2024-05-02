const redirects =
    [
        { from: '/مستند-احراز-هویت-مشتریان-از-طریق-سماوا' },
        { from: '/مستند-احراز-هویت-مشتریان-از-طریق-سماوا/' },
        { from: '/راهنمای-فرم-ثبت-نام-سایپا'},
        { from: '/راهنمای-فرم-ثبت-نام-سایپا/'},
        { from: '/راهنمای-فروش-اینترنتی-بهمن'},
        { from: '/نکات-امنیتی-استفاده-از-درگاه-های-پرداخ/'},
        { from: '/نکات-امنیتی-استفاده-از-درگاه-های-پرداخ/'},
        { from: '/category/sales-notices/'},
        { from: '/category/driver-assistance/'},
        { from: '/mag/'},
        { from: '/partnership-2/'},
        { from: '/landing/apk/'},
        { from: '/موقعیت-های-شغلی/'},
        { from: '/faq/'},
        { from: '/درخواست-تبلیغات'},
        { from: '/landing/apk'},
    ]

export default defineNuxtRouteMiddleware((to, from) => {
  const redirect = redirects.find((r) =>
    decodeURIComponent(to.path).startsWith(r.from),
  )
  if (redirect) {
    return navigateTo('/blog' + to.path)
  }
})
