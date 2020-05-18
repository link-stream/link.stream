<template>
    <div class="page page-ua-tracks">
        <h1>Tracks</h1>
        <ls-button :to="{ name: 'userAccountTracksAdd' }">
            Add New Track
        </ls-button>
    </div>
</template>

<script>
export default {
    name: 'Tracks',
}
</script>
