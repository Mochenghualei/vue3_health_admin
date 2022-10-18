<template>
  <a-table class="ant-table-striped" bordered :data-source="data" :columns="columns" :scroll="{ x: 900, y: 300 }"
    size="middle" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'date'">
        <span style="color: #1890ff">日期</span>
      </template>
    </template>
    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input ref="searchInput" placeholder="搜索日期" :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          重置
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ text, column,record }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template v-for="(fragment, i) in text
        .toString()
        .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-if="['weight', 'caloric','trainingTime'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.key === 'trainingType'">
        <span>
          <a-tag v-for="tag in record.types" :key="tag"
            :color="tag === '胸' ? 'volcano' : tag === '核心' ? 'geekblue' : 'green'">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'operation'">
        <div :style="{display:'flex',width:'190px',justifyContent:'space-around'}">
          <a-popconfirm v-if="data.length" title="确认删除?" cancelText="取消" okText="确认" @confirm="onDelete(record.key)">
            <a>删除</a>
          </a-popconfirm>
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <a-popconfirm title="确认取消?" cancelText="取消" okText="确认" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
            </span>
          </div>
        </div>

      </template>
    </template>
  </a-table>
</template>
<script>
import { SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { cloneDeep } from "lodash-es"
let data = ref([{
  key: '1',
  date: '2022-10-16',
  weight: 63.5,
  caloric: 300,
  types: ['胸'],
  trainingTime: 25
}, {
  key: '2',
  date: '2022-10-15',
  weight: 64,
  caloric: 200,
  types: ['胸', "核心"],
  trainingTime: 25
}, {
  key: '3',
  date: '2022-10-14',
  weight: 64,
  caloric: 500,
  types: ['胸', "肩"],
  trainingTime: 25
}, {
  key: '4',
  date: '2022-10-13',
  weight: 63.5,
  caloric: 150,
  types: ["核心"],
  trainingTime: 25
}, {
  key: '5',
  date: '2022-10-12',
  weight: 63.5,
  caloric: 220,
  types: ['胸', "核心"],
  trainingTime: 25
},
{
  key: '6',
  date: '2022-10-11',
  weight: 64,
  caloric: 250,
  types: ['HIIT'],
  trainingTime: 25
}]);
export default defineComponent({
  components: {
    SearchOutlined,
  },

  setup() {

    const state = reactive({
      searchText: '',
      searchedColumn: '',
    });
    const searchInput = ref();
    const columns = [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      width: 80,
      sorter: (a, b) => a.date - b.date,
      sortDirections: ['descend', 'ascend'],
      customFilterDropdown: true,
      onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    }, {
      title: '体重',
      dataIndex: 'weight',
      key: 'weight',
      width: 50,
      align: "center"
    }, {
      title: '热量',
      dataIndex: 'caloric',
      key: 'caloric',
      width: 50,
      align: "center"
    },
    {
      title: '训练类型',
      dataIndex: 'trainingType',
      key: 'trainingType',
      width: 80,
      align: "center"
    },
    {
      title: '运动时长',
      dataIndex: 'trainingTime',
      key: 'trainingTime',
      width: 50,
      align: "center"
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 90,
      align: "center"
    }];

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters({
        confirm: true,
      });
      state.searchText = '';
    };

    const onDelete = key => {
      data.value = data.value.filter(item => item.key !== key);
    };

    const editableData = reactive({});

    const edit = key => {
      editableData[key] = cloneDeep(data.value.filter(item => key === item.key)[0]);
    };

    const save = key => {
      Object.assign(data.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };

    const cancel = key => {
      delete editableData[key];
    };

    return {
      data,
      columns,
      handleSearch,
      handleReset,
      onDelete,
      searchInput,
      editingKey: '',
      editableData,
      edit,
      save,
      cancel,
      ...toRefs(state),
    };
  },

});
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}

.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>