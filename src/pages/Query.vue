<template>
  <div class="query">
    <div class="row">
      <div class="col-md-2 col-sm-4">
        <v-select
          :options="$books"
          label="name"
          :reduce="book => book.abbr"
          v-model="startbook"
          placeholder="開始"
        />
      </div>
      <div class="col-md-2 col-sm-4">
        <v-select
          :options="$books"
          label="name"
          :reduce="book => book.abbr"
          v-model="endbook"
          placeholder="結束"
        />
      </div>
      <div class="col-md-2 col-sm-4">
        <input v-model="queryField" class="form-control" placeholder="關鍵字" />
      </div>
      <button type="button" class="btn btn-primary col-3" @click="query">查詢</button>
    </div>
    <Display ref="Display" source="query"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Display from "@/components/Display.vue";

export default {
  components: {
    Display
  },
  data() {
    return {
      queryField: "",
      startbook: "",
      endbook: ""
    };
  },
  methods: {
    query() {
      this.$refs.Display.query(this.startbook, this.endbook, this.queryField);
    }
  }
};
</script>