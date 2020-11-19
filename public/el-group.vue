<!--  -->
<template>
<el-dialog
      :title="$t('participant')"
      :visible.sync="dialogVisible"
      width="780px"
      :before-close="handleClose"
      center>
      <div>
        <div class="elZtree">
    <el-row
      class="searchRow"
      :gutter="20"
    >
      <el-col :span="21">
        <el-select
          class="select"
          v-model="person"
          value-key="id"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('enterkeyword')"
          :remote-method="remoteMethod"
          :no-data-text='selectNoDataText'
          :loading="personLoading"
        >
          <el-option
            v-for="person in personList"
            :key="person.id"
            :label="person.label"
            :value="person"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          class="findBtn"
          @click="handleAppendUser()"
        >{{$t('add')}}</el-button>
      </el-col>
    </el-row>
    <el-row class="row row2">
      <el-col
        :span="12"
        class="col col2"
      >
        <el-tree
          class="tree"
          :props="props"
          :load="loadNode"
          :empty-text='emptyText'
          ref="tree"
          :default-expanded-keys="defaultExpandedKeys"
          lazy
          show-checkbox
          node-key="id"
          @check="handleCheck"
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-col>
      <el-col
        :span="12"
        class="col"
      >
        <el-tag
          :key="tag.id"
          v-for="tag in renderCheckedNodes"
          closable
          :disable-transitions="false"
          @close="handleRemoveTag(tag)"
        >
          <!-- {{ tag.label }} -->
          {{ tag._nickName ? tag._nickName : tag.label }}
        </el-tag>
      </el-col>
    </el-row>
    <span slot="footer"
          class="dialog-footer" style="float:right">
      <el-button type="primary" @click="handleSubmit">{{$t('ok')}}</el-button>
      <el-button @click="cancel">{{$t('cancel')}}</el-button>
    </span>
  </div>
      </div>
    </el-dialog>
</template>
<script type="text/ecmascript-6">
import { apiGetDepartment, apiGetMember, apigetUserByName } from '@/api/api'
let groupMessage = null
export default {
  data () {
    return {
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'leaf'
      },
      times: -1,
      levelArray: [],
      selectUsersList: '',
      renderCheckedNodes: [],
      editListDataCopy: {},
      defaultExpandedKeys: ['1'],
      setCheckedNodes: new Set(),
      person: '',
      personList: [],
      personLoading: false,
      departmentList: null,
      searchList: [],
      editListData: {},
      query: '',
      remotetime: null,
      emptyText: ' ',
      selectNoDataText: ' '
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.treeRender()
    // this.$nextTick(() => {
    // if (Object.keys(this.editListData).length > 0) {
    //   const defaultExpandedKeys = [1]
    //   const { persons, departments } = this.editListData
    //   this.renderCheckedNodes = [...persons, ...departments]
    //   this.handleDefaultExpandedKeys([
    //     { id: 1 },
    //     ...persons.map(person => ({ id: person._departmentId })),
    //     ...departments.map(department => ({ id: department.id, isDept: true }))
    //   ])
    //   // this.handleAppendUser1([1], {});
    // }
    //     const defaultExpandedKeys = [1];
    //    var a =  {
    //     "uids":[{id: 18221,label: "张宁 - 三医联平台|云通信技术部|应用组|Web组",leaf: true,_departmentId: 115390204}, {id: 18240,label: "杨增凯",leaf: true,_departmentId: 115390204}],
    //      "dids":[{id: 1108,label: "宁夏省"},{id: 101,label: "微医传媒"}]
    //     }
    //     this.renderCheckedNodes = a.dids
    //     a.uids.map(personItem => this.handleAppendUser1(defaultExpandedKeys, personItem))
    // });
  },
  watch: {
    editEltree: {
      immediate: true,
      handler (val) {
        this.editListData = val
        this.editListDataCopy = this.editListData
        console.log(val)
      }
    },
    dialogVisible: function (val) {
      if (val) {
        if (Object.keys(this.editListData).length > 0) {
          const defaultExpandedKeys = ['1']
          const { persons, departments } = this.editListData
          this.renderCheckedNodes = [...persons, ...departments]
          departments.forEach((item) => {
            this.setCheckedNodes.add(item.id)
          })
          persons.forEach((item) => {
            this.setCheckedNodes.add(item.id)
          })
          this.handleDefaultExpandedKeys([
            { id: 1 },
            ...persons.map(person => ({ id: person._departmentId })),
            ...departments.map(department => ({
              id: department.id,
              isDept: true
            }))
          ])
        }
      }
    }
  },
  props: {
    editEltree: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    /**
     * 处理 departmentList
     *
     * 把 部门列表 改成按照 level 划分，数组0 - level0，以此类推
     */
    async treeRender () {},
    /**
     * 加载树
     *
     * 取 部门id 和 部门level 如果 level 大于1，则请求数据，通过部门level和id取该部门下一级人数据
     * 再把人数据和部门数据合成
     */
    async loadNode (node, resolve) {
      let levelArray = []
      this.emptyText = ''
      await apiGetDepartment().then(res => {
        const { code, dataResult } = res
        if (code === '0') {
          dataResult.forEach(department => {
            // console.log(department)
            levelArray[department.groupLevel - 1] = levelArray[
              department.groupLevel - 1
            ]
              ? [...levelArray[department.groupLevel - 1], department]
              : [department]
          })
          if (dataResult.length === 0) {
            this.emptyText = this.$t('nodata')
          }
        } else {
          this.emptyText = this.$t('nodata')
        }
      })

      this.levelArray = levelArray
      const { _level, id: groupNumber } = node.data || {}
      let res = []
      if (_level - 1) {
        try {
          const result = await apiGetMember({
            level: _level - 2,
            groupNumber: groupNumber
          })
          res = result.dataResult
        } catch (err) {
          console.error(err)
        }
      }
      /**
       * TODO: 此处可以用 reduce 优化算法
       * 不过损耗也不是很大，先不做了
       */

      // 筛选出parentNumber为当前部门的部门
      let levelArray2 = []

      for (var i = node.level; i < 9; i++) {
        let levelArray3 = this.levelArray[i] || []
        levelArray2.push(...levelArray3
          .filter(dept => !node.data || dept.parentNumber === node.data.id)
          .map(dept => ({
            id: dept.groupNumber,
            _groupId: dept.groupId,
            label: dept.groupName,
            _level: dept.groupLevel,
            _pid: dept.parentNumber
          })))
      }
      console.log('node', node)
      console.log('levelArray2', levelArray2)
      if (node.data) {
        resolve(levelArray2.concat(
          res.map(r => ({
            id: r.userId,
            label: r.nickName,
            leaf: true,
            _pid: r.groupNumber,
            _groupId: r.groupId,
            _departmentId: r.groupNumber,
            _nickName: r.nickName,
            _isPerson: true,
            _gender: r.gender || 0,
            _mobile: r.mobile,
            _level: _level + 1
          }))
        ))
      } else {
        let levelArray1 = this.levelArray[node.level] || []
        resolve(
          levelArray1
            .filter(dept => !node.data || dept.parentNumber === node.data.id)
            .map(dept => ({
              id: dept.groupNumber,
              _groupId: dept.groupId,
              label: dept.groupName,
              _level: dept.groupLevel,
              _pid: dept.parentNumber
            }))
            .concat(
              res.map(r => ({
                id: r.userId,
                label: r.nickName,
                leaf: true,
                _pid: r.groupNumber,
                _groupId: r.groupId,
                _departmentId: r.groupNumber,
                _nickName: r.nickName,
                _isPerson: true,
                _gender: r.gender || 0,
                _mobile: r.mobile,
                _level: _level + 1
              }))
            )
        )
      }
    },
    /**
     * 点击复选框触发
     *
     * 判断在 setCheckedNodes 里的节点的 pid 是否存在与 已经选中节点数组（checkedNodes） 中
     */
    handleCheck (data, { checkedNodes }) {
      this.renderCheckedNodes = checkedNodes.filter(
        node => !this.setCheckedNodes.has(node._pid)
      )
    },
    /**
     * 点击复选框触发变化时触发
     *
     * 把选中的数据且非半选的，放到 setCheckedNodes 里
     */
    handleCheckChange (data, checked, indeterminate) {
      this.setCheckedNodes[!indeterminate && checked ? 'add' : 'delete'](
        data.id
      )
      this.renderCheckedNodes = this.$refs.tree.getCheckedNodes().filter(
        node => !this.setCheckedNodes.has(node._pid)
      )
    },
    reset () {
      console.log('this.editListDataCopy', this.editListDataCopy)
      console.log('object-0', Object.keys(this.editListDataCopy).length)
      if (Object.keys(this.editListDataCopy).length > 0) {
        console.log('object-1')
        const defaultExpandedKeys = ['1']
        const { persons, departments } = this.editListDataCopy
        this.renderCheckedNodes = [...persons, ...departments]
        this.handleDefaultExpandedKeys([
          { id: 1 },
          ...persons.map(person => ({ id: person._departmentId })),
          ...departments.map(department => ({
            id: department.id,
            isDept: true
          }))
        ])
      } else {
        console.log('object-2')
        this.renderCheckedNodes = []
        this.$refs.tree.setCheckedKeys([])
      }
    },
    handleSubmit () {
      const groupNumbers = []
      let obj = { persons: [], departments: [] }
      console.log('this.renderCheckedNodes', this.renderCheckedNodes)
      console.log('this.editListData--', this.editListData)
      this.renderCheckedNodes.forEach(node => {
        if (node._isPerson) {
          obj.persons.push({
            id: node.id,
            label: node._nickName,
            leaf: true,
            _departmentId: node._departmentId,
            _nickName: node._nickName,
            _isPerson: true
          })
        } else {
          groupNumbers.push(node.id)
          obj.departments.push({
            _groupId: node._groupId,
            id: node.id,
            label: node.label
          })
        }
      })
      // if (this.renderCheckedNodes.length > 0) {
      //   if (groupMessage) {
      //     groupMessage.close()
      //   }
      //   groupMessage = this.$message({
      //     message: '提交成功',
      //     type: 'success'
      //   })
      // }
      this.$emit('submitElztree', obj)
      this.editListDataCopy = this.editListData
      //   await oaBatchAdd({ groupNumbers, users, roleId: this.type });
      this.handleClose()
      //   this.refreshRender();
    },
    async remoteMethod (query) {
      this.query = query
      this.personLoading = true
      this.selectNoDataText = ' '
      clearTimeout(this.remotetime)
      this.remotetime = setTimeout(async () => {
        await apigetUserByName({
          name: query
        }).then(res => {
          console.log('apigetUserByName', res)
          const { code, dataResult } = res
          console.log(dataResult)
          if (code === '0') {
            this.searchList = dataResult
            if (dataResult.length === 0) {
              this.selectNoDataText = this.$t('nodata')
            }
            if (query && this.query === query) {
              this.personList = this.searchList.map(searchItem => ({
                label: `${searchItem.nickName} - ${searchItem.groupFullName}`,
                id: searchItem.userId,
                leaf: true,
                _pid: Number(searchItem.groupNumber),
                _isPerson: true,
                _nickName: searchItem.nickName,
                _gender: searchItem.gender || 0,
                _mobile: searchItem.mobile,
                _departmentId: Number(searchItem.groupNumber)
              }))
            }
          }
        })
      }, 400)

      this.personLoading = false
    },
    async handleDefaultExpandedKeys (itemsList) {
      const defaultExpandedKeys = new Set()
      console.log(itemsList)
      itemsList.forEach(item => {
        const departmentId = item.id.toString()
        let departmentIdLength = item.isDept
          ? departmentId.length - 2
          : departmentId.length
        do {
          const _dId = departmentId.slice(0, departmentIdLength)
          defaultExpandedKeys.add(_dId)
        } while ((departmentIdLength -= 2) > 1)
      })
      this.defaultExpandedKeys = Array.from(defaultExpandedKeys)
      Array.from([...defaultExpandedKeys, 1, 2, 3, 4, 5]).forEach((_, i) => {
        setTimeout(
          () =>
            this.$refs.tree && this.$refs.tree.setCheckedKeys(
              this.renderCheckedNodes.map(checkItem => checkItem.id)
            ),
          1000 + 600 * i
        )
      })
    },
    /**
     * 查找到人之后，添加进选中列表
     *
     * 麻烦在于做反向关联，这里先提取了渲染组件列表
     * 然后检测是否存在
     * 如果已添加，就跳过并提示
     * 反之则通过 setCheckedKeys 更新状态
     * 然后在解析一下 departmentId ，拿到 链式部门id
     * 把 链式部门id 放到 defaultExpandedKeys 里
     * [{id: 18221,label: "张宁 - 三医联平台|云通信技术部|应用组|Web组",leaf: true,_departmentId: 115390204},{id: 18240,label: "杨增凯",leaf: true,_departmentId: 115390204}]
     * const defaultExpandedKeys = [1];
     * this.person.map(personItem => handleAppendUser(defaultExpandedKeys, personItem))
     */
    async handleAppendUser () {
      if (this.person) {
        let personLength = this.person._pid.toString().length
        do {
          const _dId = this.person._pid.toString().slice(0, personLength)
          if (this.setCheckedNodes.has(_dId)) {
            this.$message(this.$t('userapply'))
            return
          }
        } while ((personLength -= 2) > 1)
      }
      const cacheCheckedNodesIdList = this.renderCheckedNodes.map(
        nodeItem => nodeItem.id
      )
      console.log('cacheCheckedNodesIdList', cacheCheckedNodesIdList)
      console.log('this.person', this.person, this.person.id)
      if (!cacheCheckedNodesIdList.includes(this.person.id)) {
        let renderCheckedNodes = this.renderCheckedNodes
        console.log(this.renderCheckedNodes)
        if (
          !this.$refs.tree
            .getCheckedNodes()
            .filter(node => this.person.id === node.id).length
        ) {
          if (this.person !== '') {
            renderCheckedNodes = [...renderCheckedNodes, this.person]
          } else {
            renderCheckedNodes = [...renderCheckedNodes]
          }
        } else {
          this.$message(this.$t('userapply'))
        }
        this.renderCheckedNodes = renderCheckedNodes
        console.log(
          'this.renderCheckedNodes-----------',
          this.renderCheckedNodes
        )
        this.$refs.tree.setCheckedKeys(
          renderCheckedNodes.map(checkItem => checkItem.id)
        )
        let departmentId
        if (this.person._departmentId) {
          departmentId = this.person._departmentId.toString()
          const defaultExpandedKeys = new Set([
            '1',
            ...this.defaultExpandedKeys
          ])
          let departmentIdLength = departmentId.length
          do {
            const _dId = departmentId.slice(0, departmentIdLength)
            defaultExpandedKeys.add(_dId)
          } while ((departmentIdLength -= 2) > 1)
          this.defaultExpandedKeys = Array.from(defaultExpandedKeys)
        }
      } else {
        this.$message({
          type: 'error',
          message: this.$t('people_is_Select'),
          center: true
        })
      }
      this.person = ''
    },
    handleRemoveTag (tag) {
      const renderCheckedNodes = this.renderCheckedNodes.filter(
        node => node.id !== tag.id
      )
      this.renderCheckedNodes = renderCheckedNodes
      this.$refs.tree.setCheckedKeys(
        renderCheckedNodes.map(personItem => personItem.id)
      )
    },
    handleDialogCancel () {},
    cancel () {
      // this.initFn()
      this.reset()
      this.handleClose()
    }
  }
}
</script>
<style lang="less" scoped>
.elZtree {
  width: 700px;
  height: 500px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  overflow: hidden;
  /deep/ .select {
    width: 100%;
  }
  /deep/ .el-input {
    width: 100% !important;
  }
  /deep/ .row2 {
    margin-top: 20px;
    height: 410px;
    overflow: auto;
  }
}
.col {
  overflow-y: scroll;
  height: 100%;
}
.col2 {
  border-right: 1px solid #ccc;
}
.el-tag {
  margin-left: 10px;
}
</style>
