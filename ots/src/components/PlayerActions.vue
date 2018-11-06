<template>
    <v-card>
        <v-toolbar :color="playerColor" dark>

            <v-toolbar-title>
                <v-icon medium>supervised_user_circle</v-icon>
                {{playerTag}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn @click="" icon>
                <v-icon>add</v-icon>
            </v-btn>
        </v-toolbar>


        <v-list two-line>
            <template v-for="(item, index) in items">
                <v-subheader
                        v-if="item.header"
                        :key="item.header"
                >
                    {{ item.header }}
                </v-subheader>

                <v-divider
                        v-else-if="item.divider"
                        :inset="item.inset"
                        :key="index"
                ></v-divider>

                <v-list-tile
                        v-else
                        :key="item.title"
                        avatar
                        @click=""
                >

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
        <v-card-actions> <v-btn
                :color="playerColor"
                @click="dialog = false">Disagree</v-btn>
            <v-btn
                    :color="playerColor"
                    @click="dialog = false">Agree</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "PlayerActions",
        props: ['playerTag','playerColor'],
        data() {
            return {
                items: [
                    {header: 'Contracts'},
                    {
                        title: 'Contract 1',
                        subtitle: "<span class='text--primary'>Running</span> &mdash; 3 Players"
                    },
                    {divider: true, inset: true},
                    {
                        title: 'Contract 2',
                        subtitle: "<span class='text--primary'>Waiting</span> &mdash; 2 Players"
                    },
                    {divider: true, inset: true},
                    {
                        title: 'Contract 3',
                        subtitle: "<span class='text--primary'>Finished</span> &mdash; 4 Players"
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>