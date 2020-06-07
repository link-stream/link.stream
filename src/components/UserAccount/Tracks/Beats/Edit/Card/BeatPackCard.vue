<template>
    <div class="Card BeatPackCard">
        <div class="Card-title">
            Add to Beat Pack
        </div>
        <div class="Card-body">
            <b-form-group>
                <div class="search-box">
                    <LsIcon class="search-icon" icon="search" />
                    <b-form-input
                        class="search-input"
                        placeholder="Search for beat packs"
                    ></b-form-input>
                </div>
            </b-form-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeatPackCard',
}
</script>