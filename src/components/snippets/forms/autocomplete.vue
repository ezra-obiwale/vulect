<template>
  <div>
    <input type="search" :id="name" @keyup="keyup" v-model="query" class="form-control" :class="css" autocomplete="off">
    <slot>
      <ul class="nav nav-pills auto-group">
        <li v-for="(item, index) in filtered" :key="item.id" class="list">
          <a style="color: #38AECC!important" href="#" @click.prevent="clicked(item)">{{ item.name }}</a>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Autocomplete",
  props: {
    css: {
      type: String,
    },
    data: {
      type: Array
    },
    delay: {
      type: Number
    },
    filterKeys: {
      type: Array,
      required: true
    },
    minChars: {
      type: Number
    },
    name: {
      type: String
    },
    queryKey: {
      type: String
    },
    url: {
      type: String
    },
  },
  data() {
    return {
      tmot: null,
      respData: [],
      query: '',
      hidden: []
    };
  },
  computed: {
    filtered() {
      if (this.url) return this.respData;
      else if (!this.query.trim()) return [];
      let filterKeys = this.value('filterKeys', []);
      return this.data.filter(item => {
        let ok = false;
        for (let i = 0; i < filterKeys.length; i++) {
          if (this.hidden.indexOf(item.id) === -1 && item[filterKeys[i]]
            && item[filterKeys[i]].toLowerCase().indexOf(this.query.toLowerCase()) !== -1) {
            ok = true;
            break;
          }
        }
        return ok;
      });
    }
  },
  methods: {
    clickedAutocomplete(item) {
      this.pullValue(this.hidden, item.id);
    },
    value(key, def) {
      return this[key] || def;
    },
    clicked(item) {
      this.push(this.hidden, item.id);
      this.eventBus.$emit('autocomplete.clicked', null, item);
    },
    keyup(e) {
      let url = this.url
        data = this.data || this.fieldData,
        query = e.target.value.trim();
      if (!url) return;
      clearTimeout(this.tmot);
      if (query.length < this.value('minChars', 1)) {
        this.eventBus.$emit('autocomplete.empty', e);
        return;
      }
      this.tmot = setTimeout(() => {
        this.http.get(url + '?' + this.value('queryKey', 'query') + '=' + e.target.value)
          .then(resp => {
            this.respData = resp.data;
            this.eventBus.$emit('autocomplete.loaded', e, resp.data);
          });
      }, parseInt(this.value('delay', 300)));
    },
    emit(evtStr, evtObj, data) {
      let name = this.name;
      if (evtObj) {
        let $target = $(evtObj.target);
        if (name)
          this.eventBus.$emit(name + '.' + evtStr, $target.val(), evtObj, data);
        this.eventBus.$emit(evtStr, $target.attr('id') || $target.attr('name'), $target.val(), evtObj, data);
      }
      else {
        if (name) this.eventBus.$emit(name + '.' + evtStr, data);
        this.eventBus.$emit(evtStr, this.name, data);
      }
    }
  },
  created(){
    let name = this.name;
    if (name) name += '.';
    this.eventBus.$on(name + 'autocomplete.unclick', this.clickedAutocomplete);
  },
  beforeDestroy() {
    let name = this.name;
    if (name) name += '.';
    this.eventBus.$off(name + 'autocomplete.unclick', this.clickedAutocomplete)
  }
}
</script>


<style>
.auto-group {
  margin: 0px 2px;
}
.auto-group .list {
  padding: 5px 0px;
  border: 1px solid #38aecc!important;
  margin: 0.5px;
  border-radius: 0px;
  display: block;
  width: 100%;
}
</style>
