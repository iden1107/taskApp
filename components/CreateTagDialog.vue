<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <v-card>
      <v-card-title class="grey lighten-2">新規タグ</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newTag.title"
            :counter="10"
            label="タグタイトル"
            required
          ></v-text-field>
          <h4 class="grey--text ">カラーラベル</h4>
            <v-btn
              v-for="color in colorLabel"
              :key="color" :color="color"
              fab
              :outlined="(newTag.colorLabel !== color)"
              class="mx-2 mt-1"
              @click="selectColor(color)"
            ></v-btn>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile @click="cancel">
          キャンセル
        </v-btn>
        <v-btn tile @click="createTagAction(newTag); cancel();">
          追加
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>

<script>
import {mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      dialog:false,
      tag:'',
      newTag:{title:'',colorLabel:'#EF9A9A'},
      colorLabel:['#EF9A9A','#FFCC80','#FFF59D','#C5E1A5','#81D4FA','#9FA8DA','#CE93D8',]
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tagsTitle','tasksByTag']),
  },
  methods:{
    ...mapActions('tasks',['createTagAction']),
    openDialog(arg){
      this.dialog = true
    },
    cancel(){
      this.newTask = {title:'',colorLabel:'#EF9A9A'},
      this.dialog = false
    },
    selectColor(arg){
      this.newTag.colorLabel = arg
    }
  },
  watch:{
    // モーダルが開閉を監視し閉じられた値をリセットする
    dialog(newVal) {
      if(!newVal){
        this.newTag = {title:'',colorLabel:'#EF9A9A'}
      }
    }
  }
}
</script>
