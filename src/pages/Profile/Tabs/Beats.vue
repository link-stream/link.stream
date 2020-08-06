<template>
    <div class="beats-container">
        <b-form-row>
            <b-col
                cols="12"
                lg="3"
                md="6"
                v-for="(item, index) in beats"
                :key="index"
            >
                <ArtItem
                    :artItem="item"
                    :selected="index === currentIndex"
                />
            </b-col>
        </b-form-row>
        <div class="text-center mb-5">
            <basic-button variant="outline-black" size="md">
                view More
            </basic-button>
        </div>
        <BuyLicenseModal />
        <AddedCartModal />
    </div>
</template>
<script>
import { appConstants } from '~/constants'
import ArtItem from '@/components/Profile/ArtItem'
import BuyLicenseModal from '@/components/Modal/BuyLicenseModal'
import AddedCartModal from '@/components/Modal/AddedCartModal'
export default {
    name: 'ProfileBeats',
    components: {
        ArtItem,
        BuyLicenseModal,
        AddedCartModal,
    },
    data: () => ({
        beats: [
            {
                img: '/static/img/profile/Spaceman-Bitmap.jpg',
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: true,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: true,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            },
            {
                img: appConstants.defaultCoverArt,
                title: 'Beat Title',
                minPrice: 19.95,
                maxPrice: 100,
                bogo: false,
            }
        ],
        currentIndex: 1,
    })
}
</script>
