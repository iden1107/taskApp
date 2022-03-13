
<template>
  <v-row justify="center">

    <!-- メニューバー -->
    <v-tabs color="#999999"  class="d-sm-none d-md-block mb-4">
      <v-tab nuxt to="/tags/all">タスク一覧</v-tab>
      <v-tab nuxt to="/chart">タスクグラフ</v-tab>
    </v-tabs>

    <!-- モーダルコンポーネント -->
    <CreateTaskDialog ref="createTaskDialog"/>
    <EditTaskDialog ref="editTaskDialog" />
    <CreateTagDialog ref="createTagDialog"/>
    <EditTagDialog ref="editTagDialog" />

    <!-- タグ一覧 -->
    <v-col cols="12" md="4" >
      <v-card class="logo pa-4 justify-center" style="position:sticky; top: 76px;">
        <v-card-title>タグ</v-card-title>
        <v-simple-table>
          <tbody>
            <tr style="cursor: pointer" >
              <td @click="selectTag('all')" :class="{'active': ($route.params.id === 'all')}" class="font-weight-bold">すべて</td>
              <td @click="selectTag('all')" :class="{'active': ($route.params.id === 'all')}"></td>
              <td @click="selectTag('all')" :class="{'active': ($route.params.id === 'all')}"></td>
            </tr>

            <tr v-for="tag in $store.getters['tasks/tags']" :key="tag.id"  style="cursor: pointer">
              <!-- trタグはlinkにできないためクリックで遷移するメソッドを作った  またstyleでポインターに変更-->
              <td  @click="selectTag(tag.id)" :class="{'active': ($route.params.id == tag.id)}" class="font-weight-bold" :style="{'color':tag.color_label}">{{ tag.title }}</td>
              <td width="5%"  class="pa-0" :class="{'active': ($route.params.id == tag.id)}">
                <v-btn text x-small height="100%" width="100%" @click="openEditTagDialog(task)">
                  <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                </v-btn>
              </td>
              <td width="5%" class="pa-0" :class="{'active': ($route.params.id == tag.id)}">
                <v-btn text x-small height="100%" width="100%" @click="hoge()">
                  <v-icon color="grey lighten-1" >mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            <tr v-show="addTagButton">
              <td class="pa-0">
                <v-form @submit.prevent="$refs.textField.blur()">
                  <v-text-field  @blur="createTag" v-model="addTagField.title" ref="textField"></v-text-field>
                </v-form>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-card-actions class="pt-10">
          <v-btn fab @click="addTagButton = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <!-- タスク一覧 -->
    <v-col cols="12"  md="8">
      <v-card class="pa-4">
        <v-text-field
          v-model="searchWord"
          append-icon="mdi-magnify"
          label="検索"
          single-line
          hide-details
        ></v-text-field>
        <div class="d-flex">
          <v-card-title v-for="tag in $store.getters['tasks/tag']" class="font-weight-bold" :key="tag.id" :style="{'color':tag.color_label}">{{tag.title}}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn fab x-small class="mt-5">
            <v-icon @click="openCreateDialog()">mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-simple-table dense>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">タイトル</th>
              <th class="text-left">期日</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in filterTasks" :key="task.id" style="cursor: pointer">
              <td><v-checkbox :input-value="task.unfinished" color="gray lighten-3" @change="toggle(task)"></v-checkbox></td>
              <td  @click="openEditDialog(task)" >{{ task.title }}</td>
              <td  @click="openEditDialog(task)" :class="judgeUnfinished(task)">{{ task.deadline_date }}</td>
              <td class="pa-0">
                <v-btn text x-small @click="taskDelete(task)" height="100%" width="100%" >
                  <v-icon color="grey lighten-1">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-divider></v-divider>
      </v-card>
    </v-col>


  </v-row>
</template>

<style scoped>
.active{
  background-color: #f3f3f3;
}
.finished {
  color:#bbbbbb;
}
.expired{
  color:red;
}
</style>

<script>
import {mapGetters, mapActions } from 'vuex'
export default {
  name:'tags_id',
  data () {
    return {
      addTagButton :false,
      addTagField: {
        title:'',
      },
      searchWord: '',
    }
  },
  computed:{
    ...mapGetters('tasks',['tags','tasksByTag']),
    ...mapGetters('auth',['authUser']),
    taskTitle(){
      if(this.$route.params.id == 'all'){
        return 'すべて'
      }else{
        return this.tag
      }
    },
      // 検索の絞り込み
    filterTasks(){
      let tasks = this.$store.state.tasks.tasksByTag
      if(this.searchWord == ""){
        return tasks
      }else{
        var filterTasks = []
        for (var i in tasks) {
          var filterTask = tasks[i];
          if (filterTask.title.indexOf(this.searchWord) > -1) {
            filterTasks.push(filterTask)
          }
        }
        return filterTasks
      }
    }
  },
  methods:{
    hoge(){
      console.log(7)
    },
    ...mapActions('tasks',['getAllTasks','getTasksByTag','createTagAction','toggleUnfinished','taskDeleteAction']),
    async selectTag(tag_id){
      this.active = tag_id
      this.$router.push({ path: `/tags/${tag_id}` })
    },
    async createTag(){
      if(this.addTagField.title.trim() == ''){
        this.addTagButton = false
      }else{
        await this.createTagAction(this.addTagField)
        this.addTagField.title = ''
        this.addTagButton = false
      }
    },
    openCreateDialog(){
      this.$refs.createTaskDialog.openDialog()
    },
    openEditDialog(arg){
      this.$refs.editTaskDialog.openDialog(arg)
    },
    openCreateTagDialog(){
      this.$refs.createTagDialog.openDialog()
    },
    openEditTagDialog(arg){
      this.$refs.editTagDialog.openDialog(arg)
    },
    toggle(arg){
      const formData = {id:arg.id,unfinished:!arg.unfinished,path:this.$route.params.id}
      this.toggleUnfinished(formData)
    },
    taskDelete(arg){
      arg['path'] = this.$route.params.id
      this.taskDeleteAction(arg)
    },
    judgeUnfinished(arg){
      const today = new Date()
      today.setHours(9,0,0)
      const date = new Date(arg.deadline_date);
      if(arg.unfinished){
        return 'finished'
      }else if(!arg.unfinished && date <= today){
        return 'expired'
      }else{
        return null
      }
    },
  },
  async created(){
    await this.getTasksByTag(this.$route.params.id)
  },
}

</script>
