<template>
  <div>
    <table class="table table-hover util-table">
      <thead>
        <tr>
          <th v-show="selectable" class="chkbx">
            <div class="checkbox">
              <label>
                <input type="checkbox" value="">
              </label>
            </div>
          </th>
          <th v-if="sn" class="sn">#</th>
          <template v-for="header in headers">
            <th class='fater' v-html="header"></th>
          </template>
          <th v-if="moreBtn !== false" class="action fater">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(rw, index) in data">
          <tr :data-index="index" :id="row(rw).id" :key="row(rw).id" :class="row(rw).class">
            <td v-if="selectable" class="chkbx">
              <input type="checkbox" @change="select" />
            </td>
            <td v-if="sn" class="sn">
              {{ index + 1 }}
            </td>
            <template v-for="cell in row(rw).cells">
              <td v-if="!cell" class="empty-cell"></td>
              <td v-else-if="typeof cell !== 'object'" v-html="cell"></td>
              <td v-else-if="cell.type">
                <form-field :field="cell"></form-field>
              </td>
              <template v-else>
              <td v-if="cell.text" :class="cell.class" v-html="cell.text"></td>
              <td v-else class="empty-cell" :class="cell.class" v-html="cell.text"></td>
              </template>
            </template>
            <td v-if="moreBtn !== false" class="action">
              <dropdown buttonText="More" :allowSingle="true" :links="moreBtnLinks" :index="index" :track-selection="false"></dropdown>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
td.sn,
th.sn {
  width: 30px;
}

td.chkbx,
th.chkbx {
  width: 10px;
}

td.action,
th.action {
  width: 100px;
}
</style>

<script>
import Dropdown from '@/components/util/dropdown';
import FormField from '@/components/snippets/forms/field';
export default {
  name: "Table",
  props: {
    selectable: Boolean,
    sn: Boolean,
    headers: Array,
    moreBtn: [Object, Boolean],
    rowData: Function,
    data: Array,
    event: String,
    rows: Array
  },
  data() {
    return {
      selected: 0
    };
  },
  computed: {
    moreBtnLinks() {
      let viewEv = [], editEv = [], delEv = [],
        links = [];
      if (this.event) {
        viewEv.push('show.' + this.event);
        editEv.push('edit.' + this.event);
        delEv.push('delete.' + this.event);
      }
      viewEv.push('show.details');

      if (this.moreBtn.view !== false) {
        let btn = this.moreBtn.view;
        if (!btn || typeof btn === 'boolean') btn = {};
        links.push({ text: btn.text || 'View', link: btn.link || '#', event: viewEv });
      }
      if (this.moreBtn.edit !== false) {
        let btn = this.moreBtn.edit;
        if (!btn || typeof btn === 'boolean') btn = {};
        links.push({ text: btn.text || 'Edit', link: btn.link || '#', event: editEv });
      }
      if (this.moreBtn.delete !== false) {
        let btn = this.moreBtn.delete;
        if (!btn || typeof btn === 'boolean') btn = {};
        links.push({ text: btn.text || 'Delete', link: btn.link || '#', event: delEv });
      }

      if (Array.isArray(this.moreBtn.custom))
        links = links.concat(this.moreBtn.custom);

      return links;
    },
  },
  components: { Dropdown, FormField },
  methods: {
    row(data) {
      return this.rowData(data);
    },
    select(e) {
      let $target = $(e.target);
      if ($target.is(':checked')) this.selected++;
      else this.selected--;

      if (this.selected === this.rows.length)
        $target.closest('table').find('thead [type="checkbox"]')
          .prop('checked', true).attr('checked', 'checked');
      else
        $target.closest('table').find('thead [type="checkbox"]')
          .prop('checked', false).removeAttr('checked');
    }
  },
  mounted() {
    let self = this;
    $('th [type="checkbox"]').on('change', function() {
      if ($(this).is(':checked')) {
        $(this).closest('table').find('td>[type="checkbox"]')
          .prop('checked', true).attr('checked', 'checked');
        self.selected = self.rows.length;
      }
      else {
        $(this).closest('table').find('td>[type="checkbox"]')
          .prop('checked', false).removeAttr('checked');
        self.selected = 0;
      }
    });
    $('.util-table .input-blend').on('mousedown', function() {
      $(this).addClass('on');
      if ($(this).data('previous') === undefined && $(this).val() !== undefined)
        $(this).data('previous', $(this).val());
      $(this).closest('tr').addClass('on')
        .siblings('.on').find('.input-blend')
        .each(function() {
          $(this).removeClass('on').val($(this).data('previous') || '');
        });
    });
  },
}
</script>
