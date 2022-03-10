<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <v-card>
      <v-card-title class="grey lighten-2">新規タスク</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            item-text="title"
            item-value="id"
            :items="tags"
            label="タグ"
            v-model="newTask.tag_id"
          ></v-select>
          <v-text-field
            v-model="newTask.title"
            :counter="10"
            label="タイトル"
            required
          ></v-text-field>
          <v-textarea
            v-model="newTask.memo"
            label="メモ"
          ></v-textarea>
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="newTask.deadline_date"
          label="期日"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="newTask.deadline_date"
        @input="menu2 = false"
      ></v-date-picker>
    </v-menu>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile @click="cancel">
          キャンセル
        </v-btn>
        <v-btn tile @click="addTask(newTask); cancel();">
          追加
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      dialog:false,
      tag:'',
      newTask:{title:'',memo:'',tag_id:'',deadline_date:null,path:this.$route.params.id},
      items:['Vue.js', 'React', 'Angular', 'Buzz'],
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tagsTitle','tasksByTag']),
  },
  methods:{
    ...mapActions('tasks',['addTask']),
    openDialog(arg){
      this.dialog = true
      if(this.$route.params.id !== 'all'){
        this.newTask.tag_id = Number(this.$route.params.id)
      }
    },
    cancel(){
      this.newTask = {title:'',memo:'',tag_id:'',deadline_date:null,path:this.$route.params.id}
      this.dialog = false
    }
  },
  watch:{
    // モーダルが開閉を監視し閉じられた値をリセットする
    dialog(newVal) {
      if(!newVal){
        this.newTask = {title:'',memo:'',tag_id:'',deadline_date:null,}
      }
    }
  }
}
</script>
