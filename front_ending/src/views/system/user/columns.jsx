import { ref } from "vue";
import dayjs from "dayjs";
import { ElMessageBox } from "element-plus";
import { Switch, message } from "@pureadmin/components";

export function useColumns() {
  const switchLoadMap = ref({});

  const columns = ref([
   {
      type: "selection",
      width: 55,
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      width: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "用户id",
      prop: "admin_id"
    },
    {
      label: "登录名称",
      prop: "admin_login_name"
    },
    {
      label: "用户名称",
      prop: "admin_name"
    },
    {
      label: "角色",
      prop: "admin_type",
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.admin_type === 1 ? "danger" : ""}
          effect="plain"
        >
          {row.admin_type === 1 ? "管理员" : "普通管理员"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      width: 180,
      prop: "admin_created_time",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ]);

  return {
    columns
  };
}