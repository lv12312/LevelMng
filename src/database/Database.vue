<template>
  <header style="background: #fff!important;">
    <n3-container fluid style="width:92%;">
      <n3-nav theme="default">
        <n3-nav-item>
          <a href="/"><strong>LevelMng</strong></a>
        </n3-nav-item>
        <n3-nav-item active>
          <n3-sub-nav>
            <a slot="title">Console</a>
            <n3-nav-item>
              <a href="/database">Database</a>
            </n3-nav-item>
            <n3-nav-item>
              <a>API</a>
            </n3-nav-item>
          </n3-sub-nav>
        </n3-nav-item>
      </n3-nav>
    </n3-container>
  </header>
  <n3-container id="level-container">
    <n3-breadcrumb>
      <n3-breadcrumb-item href="/">Home</n3-breadcrumb-item>
      <n3-breadcrumb-item active>Database</n3-breadcrumb-item>
    </n3-breadcrumb>
    <n3-row>
      <n3-column :col="12">
        <h4>Database List</h4>
      </n3-column>
    </n3-row>
    <n3-row>
      <n3-column :col="2">
        <n3-button type="primary" size="xs" @click="showModal = true">Add Database</n3-button>
        <n3-modal title="Add Database" :show.sync="showModal" effect="fade" width="400px" :backdrop="false"
                  :on-confirm="addDatabase">
          <div slot="body">
            <n3-form v-ref:form>
              <n3-form-item
                need
                label="Name"
                :label-col="4">
                <n3-input
                  name="name"
                  :value.sync="model.name"
                  :rules="[{type:'required'}]">
                </n3-input>
              </n3-form-item>
              <n3-form-item
                need
                label="Type"
                :label-col="4">
                <n3-radio-group
                  name="type"
                  :value.sync = "model.type"
                  :rules="[{type:'required'}]">
                  <n3-radio value="LevelDOWN">LevelDOWN</n3-radio>
                  <n3-radio value="MemDOWN">MemDOWN</n3-radio>
                </n3-radio-group>
              </n3-form-item>
              <n3-form-item
                need
                label="Description"
                :label-col="4">
                <n3-textarea
                  name="description"
                  :value.sync = "model.description"
                  :rules="[{type:'required'}]">
                </n3-textarea>
              </n3-form-item>
            </n3-form>
          </div>
        </n3-modal>
        <n3-pop-confirm
          content="Delete All？"
          :on-confirm="delAll">
          <n3-button type="danger" size="xs">Delete All</n3-button>
        </n3-pop-confirm>
      </n3-column>
    </n3-row>
    <n3-row>
      <n3-column :col="12">
        <n3-data-table :source="source" :columns="columns" :select-col="false" :page="false"
                       :search="false"></n3-data-table>
      </n3-column>
    </n3-row>
  </n3-container>
</template>

<script>
  export default {
    data () {
      return {
        columns: [{
          title: 'Name',
          dataIndex: 'name',
          sort: true,
          width: '20%'
        }, {
          title: 'Type',
          dataIndex: 'type',
          sort: true,
          width: '30%'
        }, {
          title: 'Description',
          dataIndex: 'description',
          sort: true,
          width: '20%'
        }, {
          title: '',
          dataIndex: '',
          sort: false,
          width: '30%'
        }],
        source: [],
        model: {
          name: '',
          type: '',
          description: ''
        },
        showModal: false
      }
    },
    methods: {
      addDatabase () {
        this.$refs.form.validateFields(result => {
          if (result.isvalid) {
            this.$http.post('/database/addDatabase', this.model).then((response) => {
              if (response.ok) {
                this.showModal = false
                this.refreshData()
              }
            }, (response) => {

            })
          }
        })
      },
      delAll () {
        this.$http.post('/database/deleteDatabaseMeta', this.model).then((response) => {
          if (response.ok) {
            this.refreshData()
          }
        }, (response) => {

        })
      },
      refreshData () {
        this.$http.get('/database/getMetaDatabase').then((response) => {
          if (response.ok) {
            this.source = response.body
          }
        }, (response) => {

        })
      }
    },
    created () {
      this.$http.get('/database/getMetaDatabase').then((response) => {
        if (response.ok) {
          this.source = response.body
        }
      }, (response) => {

      })
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#level-container{
  background: #fff;
  width: 92%!important;
  min-height: 700px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #ddd;
  margin: 20px auto;
  padding-bottom: 20px;
}
</style>
