<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <v-card>
      <v-card-title class="grey lighten-2">タグ編集</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="editTag.title"
            :counter="10"
            label="タグタイトル"
            required
          ></v-text-field>
          <h4 class="grey--text ">カラーラベル</h4>
            <v-btn
              v-for="color in colorLabel"
              :key="color" :color="color"
              fab
              :outlined="(editTag.colorLabel !== color)"
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
        <v-btn tile @click="updateTagAction(editTag); cancel();">
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
      editTag:{id:'',title:'',colorLabel:''},
      colorLabel:['#EF9A9A','#FFCC80','#FFF59D','#C5E1A5','#81D4FA','#9FA8DA','#CE93D8',]
    }
  },
  methods:{
    ...mapActions('tasks',['updateTagAction']),
    openDialog(arg){
      this.dialog = true
      this.editTag = {id:arg.id,title:arg.title,colorLabel:arg.color_label,path:this.$route.params.id}
    },
    selectColor(arg){
      this.editTag.colorLabel = arg
    },
    cancel(){
      this.dialog = false
    }
  },
}
</script>
