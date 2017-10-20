<template>
    <div :class="`panel panel-${typeClass}`">
        <div class="panel-heading">
            <h3 class="panel-title" v-html="title"></h3>
             <a class="float-right" style="margin-top: -19px; color: #f3f3f3;" data-toggle="collapse" :href="`#${id}`">
                <i class="ion-chevron-down"></i>
            </a>
        </div>
        <div class="panel-body collapse" :id="id">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Panel",
    props: {
        id: {
            type: String,
            required: true
        },
        type: String,
        title: String
    },
    computed: {
        typeClass() {
            return this.type || 'default';
        }
    }
}
</script>