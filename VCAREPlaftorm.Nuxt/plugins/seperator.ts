export default defineNuxtPlugin(() => {
    return {
    provide: {
      seperator: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
});