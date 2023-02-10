<template>
  <div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>密码: {{ scope.row.password }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.role }}</span>
        </template>
      </el-table-column>
       <el-table-column label="权限" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-for="(item,index) in scope.row.rights" :key='index'>
            <span v-for="(q,i) in item.children[0].rights" :key='i'>{{q}},</span>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ item.authName }}</el-tag>
            </div>
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-permission="{ action: 'edit', effect: 'disabled' }"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            v-permission="{ action: 'delete', effect: 'disabled' }"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="btn"
      type="primary"
      round
      @click="handleNew"
      v-permission="{ action: 'add', effect: 'disabled' }"
      >新增管理员</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单权限">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="userManger" name="type">用户管理</el-checkbox>
            <el-checkbox label="test" name="type">测试页面</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <hr />
        <el-form-item label="用户权限">
          <el-checkbox-group v-model="form.type2">
            <el-checkbox label="edit" name="type">编辑</el-checkbox>
            <el-checkbox label="view" name="type">查看</el-checkbox>
            <el-checkbox label="delete" name="type">删除</el-checkbox>
            <el-checkbox label="add" name="type">新增</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="newVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
      :append-to-body="true"
    >
      <el-form ref="form" :model="newForm" label-width="80px">
        <el-form-item label="角色">
          <el-radio-group v-model="newForm.role">
            <el-radio label="admin">超级管理员</el-radio>
            <el-radio label="student">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="newForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="newForm.password"></el-input>
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-checkbox-group v-model="newForm.type">
            <el-checkbox label="userManger" name="type">用户管理</el-checkbox>
            <el-checkbox label="test" name="type">测试页面</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <hr />
        <el-form-item label="用户权限">
          <el-checkbox-group v-model="newForm.type2">
            <el-checkbox label="edit" name="type">编辑</el-checkbox>
            <el-checkbox label="view" name="type">查看</el-checkbox>
            <el-checkbox label="delete" name="type">删除</el-checkbox>
            <el-checkbox label="add" name="type">新增</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newVisible = false">取 消</el-button>
        <el-button type="primary" @click="newSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTableData, deleteTableData, getUsers, addUsers,editUsers,deleteUsers } from "@/api";
export default {
  name: "TableIndex",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      loading: true,
      dialogVisible: false,
      newVisible: false,
      form: {
        type: [],
        type2: [],
      },
      newForm: {
        username: "",
        password: "",
        type: [],
        type2: [],
        role: "",
      },
      editName:'',
      editId:''
    };
  },
  computed: {
    ...mapState(['username']) // 映射
  },
  watch: {},
  created() {},
  mounted() {
    this.getUsers();
    // getTableData().then(res => {
    //   this.tableData = res.data
    //   this.loading = false
    // })
  },
  methods: {
    async getUsers() {
      let { data } = await getUsers();
      this.tableData = data.user;
      this.loading = false;
      console.log(data.user);
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      // console.log(this.newForm);
      this.editName = row.username;
      this.editId = row._id
      console.log(index, row);
    },
    handleNew() {
      this.newVisible = true;
      // console.log(index, row)
    },
    async handleDelete(index, row) {
      console.log(index, row);
      const {username} = row
      let res = await deleteUsers({username})
      console.log(res)
      if(res.data.res.ok == 1){
        this.$message.success('删除成功')
      }
    },
    handleClose(done) {
      console.log(this.form);
      this.form.type = [];
      this.form.type2 = [];
      this.newForm.type = [];
      this.newForm.type2 = [];
      done();
    },
    async newSubmit() {
      console.log(this.newForm);
      const form = JSON.stringify(this.newForm);
      // this.loading = true;
      await addUsers({ form });
      this.loading = false;
      this.newVisible = false;
      this.newForm = {
        username: "",
        password: "",
        type: [],
        type2: [],
        role: "",
      };
    },
    async editSubmit() {
      // console.log(this.form);
      const {form,editId,editName} = this;
      let data = {...form,username:editName};
      // this.loading = true;
      let res = await editUsers({data});
      console.log(res)
      if(res.data.res.ok == 1){
        this.$message.success('更新成功')
      }
      // this.loading = false;
      this.dialogVisible = false;
      this.form = {
        type: [],
        type2: [],
      };
    },
  },
};
</script>

<style scoped lang="less">
.dialog {
  position: absolute;
  z-index: 999999;
}
.btn {
  position: absolute;
  right: 50px;
  margin-top: 20px;
}
</style>
