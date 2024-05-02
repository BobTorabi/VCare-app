<script setup>
const props = defineProps({
    default: String,
    digitCount: {
        type: Number,
        required: true
    }
});
const digits = reactive([])
if (props.default && props.default.length === props.digitCount) {
    for (let i = 0; i < props.digitCount; i++) {
        digits[i] = props.default.charAt(i)
    }
} else {
    for (let i = 0; i < props.digitCount; i++) {
        digits[i] = null;
    }
}
const otpCont = ref(null)
const emit = defineEmits(['update:otp']);
const isDigitsFull = function () {
    for (const elem of digits) {
        if (elem == null || elem == undefined) {
            return false;
        }
    }
    return true;
}
const handleKeyDown = function (event, index) {
    if (event.key !== "Tab" &&
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        digits[index] = null;
        emit('update:otp', null)

        if (index != 0) {
            (otpCont.value.children)[index - 1].focus();
        }
        return;
    }
    if ((new RegExp('^([0-9])$')).test(event.key)) {
        digits[index] = event.key;
        if (index != props.digitCount - 1) {
            (otpCont.value.children)[index + 1].focus();
        }
        if (isDigitsFull()) {
            emit('update:otp', digits.join(''))
        } else if (!isDigitsFull()) {
            emit('update:otp', null)
        }
    }
}
</script>


<template>
    <div dir="ltr" ref="otpCont" class="flex gap-3 farsi-num">
        <input type="tel"
            class="text-center border w-10 h-10 rounded-sm outline-1 outline-offset-4 outline-blue-500 appearance-none text-lg"
            v-for="(el, index) in digits" :key="el + index" v-model="digits[index]" autofocus :placeholder="index + 1"
            maxlength="1" @keydown="handleKeyDown($event, index)" :class="{ bounce: digits[index] !== null }">
    </div>
</template>


<style scoped>
.bounce {
    animation: pulse .3s ease-in-out alternate;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.3);
    }
}
</style>