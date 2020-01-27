<!DOCTYPE html>
<html lang="en" dir="">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title><?= $title ?></title>
        <link href="<?= HTTP_ASSETS ?>images/logo/streamy_icon_RGB.png" rel="shortcut icon" type="image/png" />
        <link href="<?= HTTP_ASSETS ?>css/streamy.css" rel="stylesheet" />
        <link href="<?= HTTP_ASSETS ?>node_modules/quasar/dist/quasar.min.css" rel="stylesheet" />
        <link href="<?= HTTP_ASSETS ?>node_modules/typeface-montserrat/index.css" rel="stylesheet" />      
    </head>
    <body class="text-left">
        <div id="q-app">
            <template>
                <q-layout view="hHh lpR fFf">
                    <q-header reveal class="bg-black text-white" style="height: 80px">
                        <q-toolbar>
                            <q-toolbar-title class="row items-center">
                                <img src="assets/images/logo/streamy_icon_RGB.png" alt="streamy" class="q-mt-sm q-pa-none streamy_logo" />
                                <img :src="menuState" @click="left = !left" alt="menu" class="q-mt-sm q-ml-sm cursor-pointer menu_icon" />
                            </q-toolbar-title>
                            <div class="q-gutter-sm row items-center q-mr-sm">
                                <q-btn round dense flat color="grey-8" icon="img:assets/images/icons/icon-alerts.svg" class="q-mr-none">
                                    <q-badge color="red-12" text-color="white" floating>2</q-badge>
                                    <q-tooltip>Notifications</q-tooltip>
                                    <q-menu :offset="[280, 5]">
                                        <q-list style="width: 303px" bordered separator v-for="(notificationItem, index) in notificationsMenu" :key="index">
                                            <q-item v-close-popup v-ripple>                                            
                                                <q-item-section avatar>                                                
                                                    <q-img :src="notificationItem.icon" sizes="max-width: 40px"/>
                                                </q-item-section>
                                                <q-item-section lines="2">
                                                    <q-item-label caption lines="2">{{ notificationItem.notification }}</q-item-label>                                                
                                                </q-item-section>
                                                <!--q-btn style="background: #FF0080; color: white" label="Follow" rounded size="sm" dense/-->
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-btn>
                                <q-btn round flat>
                                    <q-avatar size="40px">
                                    <img src="<?= base_url() . 'app/get_avatar' ?>" alt="avatar" class="self-center"/>
                                    </q-avatar>
                                    <q-tooltip>Account</q-tooltip>
                                    <q-menu :offset="[100, 5]">
                                        <q-list style="width: 145px" v-for="(settingItem, index) in accountSettings" :key="index">
                                            <q-item v-close-popup v-ripple clickable >  
                                                <q-item-section>
                                                    <q-item-label>{{ settingItem.setting }}</q-item-label>                                                
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-btn>                                    
                            </div>
                        </q-toolbar>
                    </q-header>
                    <q-drawer show-if-above v-model="left" side="left" :width="128" :content-style="{backgroundColor: '#333333'}">
                        <q-scroll-area class="fit">
                            <q-list v-for="(menuItem, index) in menuList" :key="index" class="text-grey-8" separator dark>
                                <q-item clickable style="height: 85px" class="column items-center content-center q-pa-sm">
                                    <q-item-section class="q-ml-none q-mt-md">                                       
                                        <q-icon color="white" size="20px" :name="menuItem.icon" />
                                    </q-item-section>
                                    <q-item-section class="q-mx-none q-mb-sm q-my-none">
                                        <q-item-label  class="font-menu">{{ menuItem.label }}</q-item-label>
                                    </q-item-section> 
                                    <q-slide-transition>                                                                                                                              
                                </q-item>
                                <q-separator dark/>
                            </q-list>                            
                        </q-scroll-area>                        
                    </q-drawer>
                    
                    <q-page-container>
                        <!--?php $this->load->view('app/partials/' . $body_content); ?-->
                    </q-page-container>
                </q-layout>
            </template>

            <script src="<?= HTTP_ASSETS ?>node_modules/vue/dist/vue.min.js"></script>
            <script src="<?= HTTP_ASSETS ?>node_modules/quasar/dist/quasar.umd.min.js"></script>
            <script>
                Vue.use('typeface-montserrat');
                new Vue({
                    el: '#q-app',
                    components: {
                    },
                    data: function () {
                        return {
                            size: window.screen.height,
                            version: Quasar.version,
                            drawerState: true,
                            left: false,
                            menuState: '',
                            menuList: [
                                { icon: 'img:assets/images/icons/tachometer-alt.svg', label: 'Dashboard' },
                                { icon: 'img:assets/images/icons/icon-user-circle.svg', label: 'My Profile' },
                                { icon: 'img:assets/images/icons/icon-tracks.svg', label: 'My Tracks' },
                                { icon: 'img:assets/images/icons/icon-user-circle.svg', label: 'My Content' },
                                { icon: 'img:assets/images/icons/icon-link.svg', label: 'My Links' },
                                { icon: 'img:assets/images/icons/chart-bar.svg', label: 'Analytics' },
                                { icon: 'img:assets/images/icons/icon-reports.svg', label: 'Reports' },
                                { icon: 'img:assets/images/icons/icon-upgrade.svg', label: 'Upgrade' },
                                { icon: 'img:assets/images/icons/icon-settings.svg', label: 'Account Settings' }
                            ],
                            notificationsMenu: [
                                { icon: 'assets/images/testimonials/1.png', notification: 'theredfantastic started following you 1h' },
                                { icon: 'assets/images/testimonials/2.png', notification: 'jmirra started following you 2d' }
                            ],
                            accountSettings: [
                                { setting: 'Account Settings'},
                                { setting: 'Billing History'},
                                { setting: 'Sign Out'}
                            ]
                        }
                    },
                    mounted() {
                        console.log(this.size)
                        console.log(window.screen.width)
                    },
                    watch: {
                        left () {
                            (this.left === false) ? this.menuState = 'assets/images/icons/bars.svg' : this.menuState = 'assets/images/icons/icon-close-sharp.svg';
                        }
                    },
                    methods: {
                        onItemClick () {
                        // console.log('Clicked on an Item')
                        }
                    }
                })
            </script>
            <script> var urlBase = "<?= base_url(); ?>";</script>
            <!--script>
                var $plan_modal = "<?= $plan_modal; ?>";
                $(document).ready(function () {
                    if ($plan_modal) {
                        console.log('OK');
                        $('#orderDetail').modal('show');
                    }
                });
            </script-->
        </div>
    </body>
</html>
