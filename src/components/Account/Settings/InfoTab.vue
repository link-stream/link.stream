<template>
    <div class="tab info-tab">
        <h2 class="tab-title">Account Info</h2>

        <form>
            <b-form-group label="Username">
                <b-form-input
                    v-model="form.username"
                    placeholder="Username"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Display Name">
                <b-form-input
                    v-model="form.display_name"
                    placeholder="Display Name"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Time Zone">
                <BasicSelect placeholder="Select Time Zone" />
            </b-form-group>
            <b-form-group label="Current Password">
                <b-form-input
                    v-model="form.currentPassword"
                    placeholder="Current Password"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="New Password">
                <b-form-input
                    v-model="form.newPassword"
                    placeholder="New Password"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password">
                <b-form-input
                    v-model="form.confirmPassword"
                    placeholder="Confirm Password"
                ></b-form-input>
            </b-form-group>
        </form>
    </div>
</template>

<script>
export default {
    name: 'InfoTab',
    data() {
        return {
            form: {},
        }
    },
}
</script>