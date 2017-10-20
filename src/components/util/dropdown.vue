<template>
  <div v-if="links.length > 1" class="dropdown">
    <button class="btn btn-default dropdown-toggle filter-button cussor" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      {{ buttonText }}{{ selected }}
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <template v-for="(link, index) in links">
        <li v-if="link.type === 'divider'" class="divider" role="separator" :key="link.type"></li>
        <li v-else :key="link.text">
          <a class="dropdown-item cussor" :href="link.url" :class="link.class" :data-index="index" @click.prevent="clicked">
            {{ link.text }}
          </a>
        </li>
      </template>
    </ul>
  </div>
  <a v-else-if="allowSingle" :href="links[0].url" class="btn btn-default" :class="links[0].class" data-index="0" @click.prevent="clicked" v-html="links[0].text"></a>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    allowSingle: {
      type: Boolean
    },
    buttonText: {
      type: String
    },
    default: {
      type: String
    },
    index: {
      type: Number
    },
    links: {
      type: Array
    },
    trackSelection: {
      type: Boolean
    },
    ulClass: {
      type: String
    }
  },
  data() {
    return {
      selection: ''
    };
  },
  computed: {
    selected() {
      if (this.trackSelection === false) return '';
      let selected = this.selection || this.default;
      return selected ? ': ' + selected : '';
    }
  },
  methods: {
    clicked(e) {
      let $target = $(e.target),
        ev = this.links[$target.data('index')].event;
      this.selection = $target.html();
      if (ev) {
        if (!Array.isArray(ev)) ev = [ev];
        ev.forEach(evt => {
          this.eventBus.$emit(evt, this.index, e);
        });
      }
    }
  }
}
</script>
