<template>
  <div class="display">
    <div class="form-group row category-heading">
      <div class="col-1 text-right">
        <h4>節</h4>
      </div>
      <div class="col-11">
        <h4>內容</h4>
      </div>
    </div>
    <div class="form-group row verse-content" v-if="matchVerse != null && matchVerse.length > 0">
      <div class="col-1 text-right" v-bind:style="{ fontSize: (selectedFontSize || 14) + 'px' }">
        <div v-for="entry in matchVerse" :key="entry.verse">
          {{ entry.verse }}
          <br />
        </div>
      </div>
      <div class="col-11" v-bind:style="{ 'white-space': 'nowrap', 'overflow-x': 'scroll', fontSize: +(selectedFontSize || 14) + 'px' }">
        <div v-for="entry in matchVerse" :key="entry.verse" v-html="entry.content">
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bible from '../data/bible.json';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

export default {
  name: 'display',
  props: {
    selectedFontSize: {
      type: Number,
      default: 16,
      required: false,
    },
  },
  data() {
    return {
      matchVerse: [],
    };
  },
  methods: {
    query(startbook, endbook, queryField) {
      //console.log("startbook:" + startbook);
      //console.log("endbook:" + endbook);
      //console.log("queryField:" + queryField);

      let startIndex = 0 || this.$books.findIndex((book) => book.abbr === startbook);
      let endIndex = 0 || this.$books.findIndex((book) => book.abbr === endbook);

      // 起始章節沒選
      if (startIndex == -1) {
        startIndex = 0;
      }

      // 結束章節沒選
      if (endIndex == -1) {
        endIndex = this.$books.length;
      }

      if (startIndex > endIndex) {
        alert('開始書卷不能大於結束書卷');
      } else {
        this.matchVerse = [];
        //console.log(JSON.stringify(matchVerse));
        // 書卷 loop
        this.$books.slice(startIndex, endIndex + 1).forEach((item) => {
          // 章 loop
          for (let i = 1; i <= item.verse; i++) {
            // 節 loop
            //console.log(item.abbr + i);
            bible[item.abbr + i].forEach((verse, index) => {
              if (verse.indexOf(queryField) >= 0) {
                //console.log(verse);
                let obj = {};
                obj.verse = item.abbr + i + ':' + (index + 1);
                obj.content = verse.replace(queryField, `<span class="text-danger">${queryField}</span>`);
                this.matchVerse.push(obj);
              }
            });
          }
        });
        //console.log(JSON.stringify(this.matchVerse));
      }
    },
    read(selectedBook, chapter) {
      this.matchVerse = [];
      bible[selectedBook + chapter].forEach((verse, index) => {
        let obj = {};
        obj.verse = selectedBook + chapter + ':' + (index + 1);
        obj.content = verse;
        this.matchVerse.push(obj);
      });
    },
    getSelectedText() {
      if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          this.selectedRange = sel.getRangeAt(0);
        }
        return window.getSelection().toString();
      } else if (document.selection) {
        this.selectedRange = document.selection.createRange();
        return document.selection.createRange().text;
      }
      return '';
    },
    loadFile(url, callback) {
      console.log(url);
      // 匯出功能
      JSZipUtils.getBinaryContent(url, (error, data) => {
        if (error) {
          throw error;
        }
        callback(null, data);
      });
    },
    exportFile(selectedExportOption) {
      console.log(selectedExportOption);
      this.loadFile('template/' + selectedExportOption, (err, content) => {
        let exportText = this.getSelectedText();
        exportText = exportText.length > 0 ? exportText : this.matchVerse.map((m) => m.content).join('');

        console.log(JSON.stringify(content));
        let zip = new JSZip(content);
        console.log('4');
        let doc = new Docxtemplater().loadZip(zip);
        console.log('2');
        doc.setData({
          content: exportText.replace(/\r\n|\n/g, ''), // replace space and new line
        }); //set the templateVariables
        doc.render(); //apply them (replace all occurences of {title} by Hipp, ...)
        console.log('1');
        let out = doc.getZip().generate({
          type: 'blob',
        }); //Output the document using Data-URI

        let now = new Date();
        now.setHours(now.getHours() + 8);
        saveAs(out, now.toISOString().slice(0, 10) + '.docx');
      });
    },
  },
};
</script>
