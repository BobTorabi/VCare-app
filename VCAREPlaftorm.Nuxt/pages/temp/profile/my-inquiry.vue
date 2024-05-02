<script setup>
definePageMeta({
    layout: 'profile',
    middleware: 'logged-in',
})


//Composables
const { getAllInquiryHistory, getInquiryHistoryDetail } = useInquiry()

//States
const loading = ref(false)
const tab = ref(0)
const errMessage = ref(null)
const records = reactive({
    fines: '',
    fiensAccumulations: '',
    cardSanad: '',
    pelakStatus: '',
    licenceStatus: '',
    negativeScore: '',
})
const tabs = [
    'خلافی خودرو',
    'تجمیع خلافی',
    'کارت و سند',
    'وضعیت پلاک',
    'وضعیت گواهینامه',
    'نمره منفی',
]
const detailModal = ref(false);
// tab datas
const inquiryDetails = ref();             
const inquiryDetailsAccumulation = ref(); 
const inquiryDetailsCardSanad = ref();    
const inquiryDetailsPelak = ref();        
const inquiryLicenceStatus = ref();       
const inquiryNegativeScore = ref();       

const getDetail = (id) => {
    getInquiryHistoryDetail(id).then((r) => {
        if (r.status == 200) {
            if (r.data.callType === 'استعلام جزئیات خلافی خودرو') {
                inquiryDetails.value = r.data.data.item1;
            }else if(r.data.callType === 'استعلام تجمیع خلافی خودرو'){
                inquiryDetailsAccumulation.value = r.data.data.item1;
            }else if(r.data.callType === 'استعلام کارت و سند مالکیت خودرو'){
                inquiryDetailsCardSanad.value = r.data.data.item1;
            }else if(r.data.callType === 'استعلام وضعیت پلاک ها'){
                inquiryDetailsPelak.value = r.data.data.item1;
            }else if(r.data.callType === 'استعلام وضعیت گواهینامه'){
                inquiryLicenceStatus.value = r.data.data.item1;
            }else if(r.data.callType === 'استعلام نمره منفی گواهینامه'){
                inquiryNegativeScore.value = r.data.data.item1;
            }
        }
    })
}

const childValue = null;

//Logics
// Initial User Cars Call
getAllInquiryHistory()
    .then((r) => {
        if (r.status == 200) {
            records.fines = r.data.filter(
                (item) => item.type === 'استعلام جزئیات خلافی خودرو',
            )
            records.fiensAccumulations = r.data.filter(
                (item) => item.type === 'استعلام تجمیع خلافی خودرو',
            )
            records.licenceStatus = r.data.filter(
                (item) => item.type === 'استعلام وضعیت گواهینامه',
            )
            records.pelakStatus = r.data.filter(
                (item) => item.type === 'استعلام وضعیت پلاک ها',
            )
            records.cardSanad = r.data.filter(
                (item) => item.type === 'استعلام کارت و سند مالکیت خودرو',
            )
            records.negativeScore = r.data.filter(
                (item) => item.type === 'استعلام نمره منفی گواهینامه',
            )
        }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => (loading.value = false));
</script>

<template>
    <div class="w-full farsi-num">

        <Head>
            <Title>استعلام‌های من</Title>
            <Meta name="description" content="متا دیسکریپشن صفحه اول" />
        </Head>


        <!-- <SharedInquiryDetailModal v-if="detailModal" /> -->
        <div class="flex flex-col gap-2 w-full">
            
            <!-- Banner -->
            <!-- <ProfileBanner class="hidden lg:flex" /> -->

            <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold print:hidden">
                <img src="/icons/arrow-right.svg" alt="">
                <p>بازگشت</p>
            </NuxtLink> 

            <!-- Tabs -->
            <ProfileTabs v-model="tab" :titles="tabs"  class="print:hidden"/>

            <!-- Fines Details -->
            <div v-if="tab == 0" class="w-full flex justify-center border rounded-md p-5">
                <div v-if="inquiryDetails">
                    <button @click="inquiryDetails = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button> 
                    <InquiryFinesDetailsResponse :data="inquiryDetails" />
                </div>
                <div v-else-if="records && records.fines.length" class="flex flex-col w-full gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.fines" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">
                                    زمان استعلام :
                                </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)"
                            class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5 whitespace-nowrap">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>

                <div v-else class="flex flex-col gap-10 items-center justify-center h-96">
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام خلافی خودرو با جزئیات استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/fines-details" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        خلافی خودرو با جزئیات
                    </NuxtLink>
                </div>
            </div>

            <!-- Fines Accumulation -->
            <div v-if="tab == 1" class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
                <div v-if="inquiryDetailsAccumulation">
                    <button @click="inquiryDetailsAccumulation = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button> 
                    <InquiryFinesAccumulationResponse :data="inquiryDetailsAccumulation" />
                </div>        
                <div v-else-if="records && records.fiensAccumulations.length" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.fiensAccumulations" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">
                                    زمان استعلام :
                                </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)" class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-10 items-center justify-center h-96" v-else>
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام تجمیع خلافی خودرو استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/fines-accumulation" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        تجمیع خلافی خودرو
                    </NuxtLink>
                </div>
            </div>

            <!-- Card Sanad -->
            <div v-if="tab == 2" class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
                <div v-if="inquiryDetailsCardSanad">
                    <button @click="inquiryDetailsCardSanad = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button> 
                    <InquiryCardSanadResponse :data="inquiryDetailsCardSanad" />
                </div> 
                <div v-else-if="records && records.cardSanad.length" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.cardSanad" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">
                                    زمان استعلام :
                                </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)" class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-10 items-center justify-center h-96" v-else>
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام کارت و سند وسیله نقلیه استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/card-sanad" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        استعلام کارت و سند
                    </NuxtLink>
                </div>
            </div>

            <!-- Pelak Status -->
            <div v-if="tab == 3" class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
                <div v-if="inquiryDetailsPelak">
                    <button @click="inquiryDetailsPelak = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button>
                    <InquiryPelakStatusResponse :data="inquiryDetailsPelak" />
                </div>

                <div v-else-if="records && records.pelakStatus.length" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.pelakStatus" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">زمان استعلام : </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)" class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-10 items-center justify-center h-96" v-else>
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام پلاک‌های فعال استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/pelak-status" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        استعلام پلاک های فعال
                    </NuxtLink>
                </div>
            </div>

            <!-- Licence Status -->
            <div v-if="tab == 4" class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
                <div v-if="inquiryLicenceStatus">
                    <button @click="inquiryLicenceStatus = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button>
                    <InquiryLicenceStatusResponse :data="inquiryLicenceStatus" />
                </div>
                <div v-else-if="records && records.licenceStatus.length" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.licenceStatus" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">
                                    زمان استعلام :
                                </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)" class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-10 items-center justify-center h-96" v-else>
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام وضعیت گواهینامه استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/licence-status" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        استعلام وضعیت گواهینامه
                    </NuxtLink>
                </div>
            </div>

            <!-- Negative Score inquiryNegativeScore -->
            <div v-if="tab == 5" class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
                <div v-if="inquiryNegativeScore">
                    <button @click="inquiryNegativeScore = null" type="button" class="flex gap-1 text-xs mb-2 items-center text-brand-red font-semibold print:hidden">
                        <img src="/icons/arrow-right.svg" class="w-3" alt="">
                        <p>بازگشت به لیست</p>
                    </button>
                    <InquiryNegativeScoreResponse :data="inquiryNegativeScore" />
                </div>
                <div v-else-if="records && records.negativeScore.length" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-5 md:flex-row justify-between py-5 px-2 border shadow rounded-md"
                        v-for="(item, index) in records.negativeScore" :key="index">
                        <div class="flex items-center gap-5">
                            <img class="w-8 bg-blue-200 p-1 rounded-full" src="/icons/fines-details.svg" alt="" />
                            <p>
                                <span class="font-semibold text-brand-blue">شناسه :</span>
                                {{ item.id }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">نوع :</span>
                                {{ item.type }}
                            </p>
                            <p>
                                <span class="font-semibold text-brand-blue">
                                    زمان استعلام :
                                </span>
                                {{ item.date }}
                            </p>
                        </div>
                        <button @click="getDetail(item.id)" class="bg-brand-blue-light text-white rounded-md px-3 py-2 mx-5">
                            مشاهده جزئیات
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-10 items-center justify-center h-96" v-else>
                    <img src="/icons/back-car.svg" alt="" />
                    <h5 class="font-bold">
                        تا به حال از سرویس استعلام نمره منفی گواهینامه استفاده نکرده‌اید.
                    </h5>
                    <NuxtLink to="/inquiry/negative-score" class="bg-brand-blue text-white py-3 px-8 rounded-md">
                        استعلام نمره منفی
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
