<template>
  <div class="home">
    <div class="row">
      <div class="col-2">
        <v-select :options="$books" label="name" v-model="selectedBook" @input="bookChange" placeholder="書卷" />
      </div>
      <div class="col-2">
        <v-select :options="chapters" v-model="selectedChapter" @input="chapterChange" placeholder="章" />
      </div>

      <div class="col-2">
        <v-select class="style-chooser" v-model="selectedExportOption" :options="exportOptions" :reduce="(exportOption) => exportOption.file" label="name" placeholder="匯出字體"></v-select>
      </div>
      <button type="button" class="btn btn-primary col-1" @click="exportFile">匯出</button>
    </div>
    <Display ref="Display" />
  </div>
</template>

<script>
// @ is an alias to /src
import Display from '@/components/Display.vue';
import exportOptions from '../data/exportOption.json';

export default {
  components: {
    Display,
  },
  data() {
    return {
      selectedBook: {},
      selectedChapter: null,
      exportOptions: exportOptions,
      selectedExportOption: '',
    };
  },
  methods: {
    bookChange() {
      this.selectedChapter = null;
    },
    chapterChange() {
      //console.log(this.selectedChapter);
      this.$refs.Display.read(this.selectedBook.abbr, this.selectedChapter);
    },
    exportFile() {
      this.$refs.Display.exportFile(this.selectedExportOption);
    },
  },
  computed: {
    chapters() {
      //console.log(JSON.stringify(this.selectedBook));
      // 根據取得的書卷，長出1-verse的章數
      return [...Array(this.selectedBook.verse).keys()].map((x) => ++x); // 產生1到n節
    },
  },
};
</script>
