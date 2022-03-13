<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <v-card>
      <v-card-title class="grey lighten-2">タスク編集</v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            item-text="title"
            item-value="id"
            :items="tags"
            label="タグ"
            v-model="editTask.tag_id"
          ></v-select>
          <v-text-field
            v-model="editTask.title"
            :counter="10"
            label="タイトル"
            required
          ></v-text-field>
          <v-textarea
            v-model="editTask.memo"
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
                v-model="editTask.deadline_date"
                label="期日"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="editTask.deadline_date"
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
        <v-btn tile @click="updateTask(editTask); cancel();">
          更新
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
      editTask:{id:'',title:'',memo:'',tag_id:'',deadline_date:null},
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tagsTitle','tasksByTag']),
  },
  methods:{
    ...mapActions('tasks',['updateTask']),
    openDialog(arg){
      this.dialog = true
      this.editTask = {id:arg.id,title:arg.title,memo:arg.memo,tag_id:arg.tag_id,deadline_date:arg.deadline_date,path:this.$route.params.id}
    },
    cancel(){
      this.dialog = false
    }
  },
}
</script>
